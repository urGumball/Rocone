import json
import os
import sqlite3
from contextlib import closing
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent
DEFAULT_DATA_DIR = Path(os.environ.get("LOCALAPPDATA", Path.home())) / "Rocone"
DATABASE = Path(os.environ.get("ROCONE_DB_PATH", DEFAULT_DATA_DIR / "rocone.sqlite3"))
MAX_BODY_SIZE = 8 * 1024 * 1024


def connect_database():
    DATABASE.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DATABASE, timeout=10)
    connection.execute(
        "CREATE TABLE IF NOT EXISTS shared_state "
        "(singleton INTEGER PRIMARY KEY CHECK (singleton = 1), "
        "revision INTEGER NOT NULL, payload TEXT NOT NULL)"
    )
    return connection


class RoconeHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_json(self, status, value):
        body = json.dumps(value, separators=(",", ":")).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if urlparse(self.path).path != "/api/state":
            requested = (ROOT / urlparse(self.path).path.lstrip("/")).resolve()
            if requested == DATABASE.resolve() or requested.suffix.lower() in {".sqlite", ".sqlite3", ".db"}:
                self.send_error(404)
                return
            return super().do_GET()
        with closing(connect_database()) as connection:
            row = connection.execute(
                "SELECT revision, payload FROM shared_state WHERE singleton = 1"
            ).fetchone()
        if row is None:
            self.send_json(200, {"revision": 0, "state": None})
            return
        self.send_json(200, {"revision": row[0], "state": json.loads(row[1])})

    def do_PUT(self):
        if urlparse(self.path).path != "/api/state":
            self.send_error(404)
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_json(400, {"error": "Invalid Content-Length."})
            return
        if length <= 0 or length > MAX_BODY_SIZE:
            self.send_json(413, {"error": "The saved Rocone data is too large."})
            return
        try:
            request = json.loads(self.rfile.read(length))
        except (json.JSONDecodeError, UnicodeDecodeError):
            self.send_json(400, {"error": "The saved data is not valid JSON."})
            return
        if not isinstance(request, dict) or not isinstance(request.get("state"), dict):
            self.send_json(400, {"error": "A Rocone state object is required."})
            return
        state = request["state"]
        accounts = state.get("accounts")
        if not isinstance(accounts, list):
            self.send_json(400, {"error": "The account list is missing."})
            return
        ids = [account.get("id") for account in accounts if isinstance(account, dict)]
        if len(ids) != len(accounts) or any(not isinstance(value, str) or not value for value in ids):
            self.send_json(400, {"error": "Every account must have a valid ID."})
            return
        if len(set(ids)) != len(ids):
            self.send_json(400, {"error": "Account IDs must be unique."})
            return
        if not isinstance(request.get("revision"), int) or request["revision"] < 0:
            self.send_json(400, {"error": "A valid state revision is required."})
            return

        # Sessions belong to a browser; never copy the active login to every device.
        state = dict(state)
        state["session"] = None
        payload = json.dumps(state, separators=(",", ":"))
        with closing(connect_database()) as connection:
            connection.execute("BEGIN IMMEDIATE")
            row = connection.execute(
                "SELECT revision FROM shared_state WHERE singleton = 1"
            ).fetchone()
            current_revision = row[0] if row else 0
            if current_revision != request["revision"]:
                connection.rollback()
                self.send_json(
                    409,
                    {
                        "error": "Rocone changed in another browser. Reload before saving again.",
                        "revision": current_revision,
                    },
                )
                return
            new_revision = current_revision + 1
            connection.execute(
                "INSERT INTO shared_state (singleton, revision, payload) VALUES (1, ?, ?) "
                "ON CONFLICT(singleton) DO UPDATE SET revision=excluded.revision, "
                "payload=excluded.payload",
                (new_revision, payload),
            )
            connection.commit()
        self.send_json(200, {"revision": new_revision})

    def log_message(self, format, *args):
        if self.path.startswith("/api/"):
            return
        super().log_message(format, *args)


if __name__ == "__main__":
    host = os.environ.get("ROCONE_HOST", "127.0.0.1")
    port = int(os.environ.get("PORT", "8000"))
    if host not in {"127.0.0.1", "::1", "localhost"} and os.environ.get("ROCONE_ALLOW_UNAUTHENTICATED_NETWORK") != "1":
        raise SystemExit(
            "Network binding is disabled because this demo has no server-side authentication. "
            "Only opt in on a trusted network with ROCONE_ALLOW_UNAUTHENTICATED_NETWORK=1."
        )
    print(f"Rocone is running at http://{host}:{port}")
    print(f"SQLite database: {DATABASE}")
    ThreadingHTTPServer((host, port), RoconeHandler).serve_forever()
