# Rocone

Rocone is a Roblox-2020-inspired demo built with plain HTML, CSS, JavaScript,
and a Python standard-library server. SQLite keeps accounts and community data
across browsers that connect to the same Rocone server.

## Run on this computer

From the project folder, run:

```powershell
python server.py
```

Then open `http://127.0.0.1:8000`. The server creates its SQLite database at
`%LOCALAPPDATA%\Rocone\rocone.sqlite3` (or `~/Rocone/rocone.sqlite3` if
`LOCALAPPDATA` is unavailable). Set `ROCONE_DB_PATH` to choose another
database location.

## Features

- Sign up, log in, switch accounts, and retain account records in SQLite.
  Logging out or hiding an account from one device's switcher does not delete
  the account. Administrators can permanently delete fake accounts.
- Unique player IDs are shown prominently on dedicated profiles. Fake accounts
  receive unique IDs with the `f4k3-` prefix; administrators can change IDs
  without leaving duplicate IDs or broken friend/message references.
- Build and edit games with descriptions, icons, built-in game modes, covers,
  and configurable completion rewards. Every five starts of a created game,
  its creator receives either 5 Cones or 15 Pix at random.
- Send and accept friend requests, see account presence, and chat with accepted
  friends. Five filtered swear-word occurrences in messages within ten seconds
  create a report for the root administrator account ID 1 (`urGumball`). An
  administrator chooses whether to warn, ban, or dismiss each report.
- Customize avatars, body proportions, accessories, profile backgrounds,
  currency, and site appearance. Light/dark theme selection is stored per
  account on each device, so changing a theme on one device does not change it
  on another.
- Account ID `1` is reserved for the root administrator `urGumball`. Admin
  controls include a searchable directory of every account saved on the
  connected server (including root admins, fake accounts, and banned accounts),
  plus ID changes, fake-account deletion, currency/role/password changes,
  fake-account impersonation, game moderation, and report review. Passwords
  and password hashes are not shown in the directory.

## Important demo limitations

This is **not safe to expose as a public website**. The browser currently
performs login and admin checks, and `/api/state` has no server-side
authentication or authorization; anyone who can reach that API can read or
replace the shared database snapshot, including account password hashes and
optional contact fields. The server binds to loopback by default and refuses
network binding unless `ROCONE_ALLOW_UNAUTHENTICATED_NETWORK=1` is explicitly
set. Only use network access on a trusted private network, and do not port
forward or deploy it to the public internet. A public service needs a
server-authenticated account API and server-enforced admin permissions.

The shared API uses a SQLite revision check and merges unrelated concurrent
updates, but it is not a production synchronization or security service.
Presence and chat update when a page reloads; there is no live push service.
Game scripts are not arbitrary JavaScript: games use the supported built-in
mini-game modes to avoid executing untrusted code. Email and phone are optional,
unverified demo fields and are not used for account recovery.
