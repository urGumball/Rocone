import json
import tempfile
import threading
import unittest
from pathlib import Path
from http.server import ThreadingHTTPServer
from urllib.error import HTTPError
from urllib.request import Request, urlopen

import server


class SharedStateApiTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.original_database = server.DATABASE
        server.DATABASE = Path(self.temp_dir.name) / "test.sqlite3"
        self.httpd = ThreadingHTTPServer(("127.0.0.1", 0), server.RoconeHandler)
        self.thread = threading.Thread(target=self.httpd.serve_forever, daemon=True)
        self.thread.start()
        self.base_url = f"http://127.0.0.1:{self.httpd.server_port}"

    def tearDown(self):
        self.httpd.shutdown()
        self.httpd.server_close()
        self.thread.join()
        server.DATABASE = self.original_database
        self.temp_dir.cleanup()

    def request(self, method, payload=None):
        data = json.dumps(payload).encode("utf-8") if payload is not None else None
        request = Request(
            f"{self.base_url}/api/state",
            data=data,
            headers={"Content-Type": "application/json"} if data else {},
            method=method,
        )
        try:
            with urlopen(request) as response:
                return response.status, json.loads(response.read())
        except HTTPError as error:
            with error:
                return error.code, json.loads(error.read())

    def test_state_is_durable_and_server_does_not_share_device_session(self):
        state = {"accounts": [{"id": "1", "username": "urGumball"}], "session": "1"}
        status, saved = self.request("PUT", {"revision": 0, "state": state})
        self.assertEqual(status, 200)
        self.assertEqual(saved["revision"], 1)
        status, loaded = self.request("GET")
        self.assertEqual(status, 200)
        self.assertEqual(loaded["revision"], 1)
        self.assertIsNone(loaded["state"]["session"])
        self.assertEqual(loaded["state"]["accounts"][0]["id"], "1")

    def test_stale_revision_is_rejected_without_overwriting_state(self):
        first = {"accounts": [{"id": "player-1", "username": "Player"}]}
        self.assertEqual(self.request("PUT", {"revision": 0, "state": first})[0], 200)
        replacement = {"accounts": [{"id": "player-2", "username": "Other"}]}
        status, failure = self.request("PUT", {"revision": 0, "state": replacement})
        self.assertEqual(status, 409)
        self.assertEqual(failure["revision"], 1)
        self.assertEqual(self.request("GET")[1]["state"]["accounts"], first["accounts"])

    def test_duplicate_account_ids_are_rejected(self):
        state = {"accounts": [{"id": "duplicate"}, {"id": "duplicate"}]}
        status, failure = self.request("PUT", {"revision": 0, "state": state})
        self.assertEqual(status, 400)
        self.assertIn("unique", failure["error"])

    def test_database_file_is_not_served_as_a_static_asset(self):
        server.DATABASE.write_bytes(b"private database")
        try:
            with urlopen(f"{self.base_url}/{server.DATABASE.name}"):
                self.fail("The database file should not be served as a static asset.")
        except HTTPError as error:
            with error:
                self.assertEqual(error.code, 404)


if __name__ == "__main__":
    unittest.main()
