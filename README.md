# Rocone

Rocone is a browser-based, retro-inspired games portal built from plain HTML,
CSS, and JavaScript. No build step, account with an external service, package
installation, or server is needed.

## Run

Open `index.html` in a modern browser, or serve this folder locally:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`. Using localhost is recommended: it makes
secure password hashing available across browsers and avoids `file://` storage
restrictions.

## What works

- Create accounts, log in, sign out, choose from saved accounts at login, and
  switch or remove saved accounts in the same browser.
- Browse built-in and player-created games; publish your own games from the
  creator, save favorite games, and play the short arcade mini-game.
- Add or remove friends, find community demo profiles, and connect multiple
  accounts in the same browser.
- Customize your avatar, buy shop accessories with Cones or Pix, and equip
  things from your closet.
- Switch between midnight and daylight themes.
- Sign in as the built-in `Admin` or `Rocone` demo administrator to create real
  or fake local accounts, edit duplicate display names and balances, set
  passwords, grant infinite Cones or Pix, customize avatars, grant or remove
  administrator roles, and ban or restore accounts and games.
- Use the local administration page to customize portal branding, announcements,
  and theme colors. Saved-account selection allows accounts with duplicate
  display names to be chosen individually.

## About saved data

Account names, a PBKDF2 password hash (not the original password), avatars,
friends, balances, purchases, created games, ban status, and settings are saved
in this browser's local storage. Passwords are not sent to a server; clearing
the browser's site data also removes these accounts and their saved games.
Administrator tools are a local demo feature, not secure website administration:
the app has no server-side authentication or shared user database, and saved
data can be changed by anyone with access to this browser. A real Rocone service
needs a separately hosted backend with server-enforced roles and moderation.
Passwords are stored only as salted PBKDF2 hashes. Fake/demo accounts receive a
random password that is not shown; an administrator must set a new password
before signing into one. The built-in administrator identities cannot be
renamed, banned, or demoted.
