"use strict";

const STORAGE_KEY = "rocone.classic.portal.v1";
const PBKDF2_ITERATIONS = 120000;
const ADMIN_PASSWORD_SALT = "726f636f6e652d61646d696e2d763031";
const ADMIN_PASSWORD_HASH = "3ef54a2f3ad0db73194c3390663a0c30f06291d4097b387cf4042178808b364d";
const ADMIN_USERNAMES = new Map([["admin", "Admin"], ["rocone", "Rocone"]]);
const CUSTOM_THEME_VARS = {
  bg: "#222428",
  surface: "#232529",
  raised: "#2c2e33",
  hover: "#373a40",
  line: "#383a3f",
  text: "#f6f6f7",
  muted: "#bfc2c6",
  accent: "#80dcb4",
  pix: "#ceb0ff",
};
const THEME_CHOICES = [
  { id: "dark", name: "Midnight", swatch: "#202328" },
  { id: "light", name: "Daylight", swatch: "#fff" },
];
const SKIN_COLORS = [
  { id: "#f3c887", name: "Toasted peach" },
  { id: "#edbc91", name: "Warm sand" },
  { id: "#b77c5d", name: "Terracotta" },
  { id: "#855448", name: "Cinnamon" },
  { id: "#e4ae9a", name: "Soft rose" },
];
const SHIRT_COLORS = [
  { id: "#f06463", name: "Classic red" },
  { id: "#5687e8", name: "True blue" },
  { id: "#46ae83", name: "Forest green" },
  { id: "#e7aa3f", name: "Golden yellow" },
  { id: "#9277d0", name: "Lavender" },
  { id: "#323744", name: "Midnight" },
];
const PANTS_COLORS = [
  { id: "#38435d", name: "Denim blue" },
  { id: "#54535a", name: "Stone gray" },
  { id: "#273a35", name: "Pine green" },
  { id: "#8c604e", name: "Cocoa" },
  { id: "#eee9de", name: "Canvas" },
];
const GAME_PALETTES = [
  { id: "mint", name: "Mint valley", sky: "#81d6bb", ground: "#366759", char: "#f1c779" },
  { id: "sunset", name: "Sunset club", sky: "#f19b84", ground: "#975c68", char: "#ffeeaa" },
  { id: "ocean", name: "Tidal blue", sky: "#72bbe1", ground: "#335c91", char: "#e1beff" },
  { id: "lilac", name: "Lilac skies", sky: "#c5a4ed", ground: "#70598f", char: "#ffe590" },
  { id: "golden", name: "Golden hour", sky: "#efc56f", ground: "#8f6844", char: "#f9ebe1" },
  { id: "berry", name: "Berry bright", sky: "#ef95b6", ground: "#954f84", char: "#b2f2bb" },
];

const GAMES = [
  {
    id: "cone-dash",
    name: "Cone Dash!",
    creator: "Rocone Studios",
    genre: "Arcade",
    description: "Pick a lane, dodge the blocks, and see how long you can dash. Space also jumps!",
    sky: "#91dfbf",
    ground: "#33785c",
    char: "#f3c46d",
    icon: "▲",
    type: "dash",
    players: "1.2k",
    likes: "98%",
  },
  {
    id: "cloud-hop",
    name: "Cloud Hop",
    creator: "Rocone Studios",
    genre: "Adventure",
    description: "Hop over a parade of blocks in this tiny, big-hearted platform game.",
    sky: "#93c7f2",
    ground: "#6468b5",
    char: "#ffd4a1",
    icon: "☁",
    type: "hop",
    players: "824",
    likes: "96%",
  },
  {
    id: "block-party",
    name: "Block Party",
    creator: "Rocone Studios",
    genre: "Social",
    description: "Meet friends, celebrate, and explore the happiest place on your screen.",
    sky: "#f49ab2",
    ground: "#70477f",
    char: "#ffd46a",
    icon: "✦",
    type: "party",
    players: "2.4k",
    likes: "99%",
  },
  {
    id: "tiny-tycoon",
    name: "Tiny Tycoon",
    creator: "Rocone Studios",
    genre: "Simulator",
    description: "Build up your little corner of the world, one satisfying tap at a time.",
    sky: "#f1cd81",
    ground: "#598975",
    char: "#f5826c",
    icon: "✹",
    type: "tycoon",
    players: "647",
    likes: "94%",
  },
  {
    id: "petal-place",
    name: "Petal Place",
    creator: "Rocone Studios",
    genre: "Roleplay",
    description: "Make a comfy little garden and see what starts blooming.",
    sky: "#b6d991",
    ground: "#558764",
    char: "#f3a6ca",
    icon: "✿",
    type: "party",
    players: "953",
    likes: "97%",
  },
  {
    id: "neon-obby",
    name: "Neon Obby",
    creator: "Rocone Studios",
    genre: "Obby",
    description: "A bright, bouncy obstacle course. Don't look down!",
    sky: "#ab93e8",
    ground: "#52387d",
    char: "#9eebfa",
    icon: "★",
    type: "hop",
    players: "1.6k",
    likes: "95%",
  },
];

const CATALOG = [
  {
    id: "classic-cone",
    name: "Classic Cone",
    description: "Small in stature. Legendary in spirit.",
    category: "Hats",
    icon: "▲",
    currency: "cones",
    price: 40,
    glow: "#83e0bc",
    color: "#fac268",
    avatar: { type: "hat", color: "#f3a94d", label: "Classic Cone" },
  },
  {
    id: "pixie-cap",
    name: "Pixie Cap",
    description: "For dreamers and collectors of shiny things.",
    category: "Hats",
    icon: "✦",
    currency: "pix",
    price: 90,
    glow: "#ceacf7",
    color: "#aa86e2",
    avatar: { type: "hat", color: "#9973d4", label: "Pixie Cap" },
  },
  {
    id: "star-specs",
    name: "Star Specs",
    description: "Put a little extra sparkle in your step.",
    category: "Faces",
    icon: "✧",
    currency: "pix",
    price: 65,
    glow: "#82c9ec",
    color: "#78bee7",
    avatar: { type: "glasses", color: "#82cfee", label: "Star Specs" },
  },
  {
    id: "smiley-face",
    name: "Super Smiley",
    description: "An extremely friendly face for new adventures.",
    category: "Faces",
    icon: "☺",
    currency: "cones",
    price: 25,
    glow: "#f3ca78",
    color: "#f5cb76",
    avatar: { type: "face", color: "#604b2a", label: "Super Smiley" },
  },
  {
    id: "leaf-crown",
    name: "Leaf Crown",
    description: "A tiny green crown for a big outdoor spirit.",
    category: "Hats",
    icon: "❧",
    currency: "pix",
    price: 115,
    glow: "#94cf91",
    color: "#70b982",
    avatar: { type: "hat", color: "#63a978", label: "Leaf Crown" },
  },
  {
    id: "rocket-pack",
    name: "Rocket Pack",
    description: "For the most important imaginary journeys.",
    category: "Gear",
    icon: "✦",
    currency: "cones",
    price: 55,
    glow: "#91b7fa",
    color: "#7398df",
    avatar: { type: "gear", color: "#7398df", label: "Rocket Pack" },
  },
  {
    id: "heart-pin",
    name: "Tiny Heart Pin",
    description: "A little reminder to bring your friends along.",
    category: "Gear",
    icon: "♥",
    currency: "pix",
    price: 55,
    glow: "#f49caa",
    color: "#ee899c",
    avatar: { type: "gear", color: "#e78196", label: "Tiny Heart Pin" },
  },
  {
    id: "cloud-cap",
    name: "Cloud Nine",
    description: "Cozy up with your own little piece of sky.",
    category: "Hats",
    icon: "☁",
    currency: "pix",
    price: 80,
    glow: "#bddaf6",
    color: "#9dc4ee",
    avatar: { type: "hat", color: "#e0f2fc", label: "Cloud Nine" },
  },
];

const SEED_PEOPLE = [
  { id: "seed-bluesky", username: "BrickBuddies", skin: "#f3c887", shirt: "#5986d9", pants: "#38435d", hat: "#a97345", smile: "smile" },
  { id: "seed-maple", username: "MossyMaple", skin: "#e9b88e", shirt: "#58ac79", pants: "#484343", hat: "#a9d29b", smile: "smile" },
  { id: "seed-star", username: "PixelPal", skin: "#dba27d", shirt: "#d66b73", pants: "#38435d", hat: "#f2c773", smile: "smile" },
  { id: "seed-cloud", username: "CloudieBuilds", skin: "#f0cca3", shirt: "#e6a96e", pants: "#535568", hat: "#8596d9", smile: "smile" },
  { id: "seed-berry", username: "BerryBrick", skin: "#c98e70", shirt: "#a682d5", pants: "#38435d", hat: "#e9a2be", smile: "smile" },
  { id: "seed-dash", username: "DashAndDoodle", skin: "#edc28c", shirt: "#59afac", pants: "#42465c", hat: "#eb835f", smile: "smile" },
];

const CATEGORIES = ["All", "Hats", "Faces", "Gear"];
const GAME_GENRES = ["All", "Arcade", "Adventure", "Obby", "Roleplay", "Simulator", "Social"];
const app = document.getElementById("app");
let state;
let route = "home";
let authMode = "signup";
let authBusy = false;
let authError = "";
let selectedLoginAccountId = null;
let accountMenuOpen = false;
let drawerOpen = false;
let catalogCategory = "All";
let gameGenre = "All";
let catalogSearch = "";
let gameSearch = "";
let creatorPalette = "mint";
let activeGame = null;
let toastTimers = new Set();

function freshState() {
  return {
    version: 1,
    session: null,
    accounts: [],
    theme: "dark",
    favorites: [],
    recentGames: [],
    bannedGames: [],
    site: { name: "Rocone", announcement: "", welcome: "WELCOME BACK" },
    customTheme: null,
  };
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  const cssVars = { bg: "--bg", surface: "--surface", raised: "--surface-raised", hover: "--surface-hover", line: "--line", text: "--text", muted: "--muted", accent: "--accent", pix: "--pix" };
  for (const [key, value] of Object.entries(CUSTOM_THEME_VARS)) {
    document.documentElement.style.removeProperty(cssVars[key]);
    if (isHexColor(state.customTheme?.[key])) {
      document.documentElement.style.setProperty(cssVars[key], state.customTheme[key]);
    }
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", state.theme === "light" ? "#f5f5f4" : "#17191d");
  document.title = `${state.site?.name || "Rocone"} — play, create, hang out`;
}

function cleanGame(game) {
  if (!game || typeof game.id !== "string" || !/^[A-Za-z0-9_-]{1,64}$/.test(game.id)) return null;
  const genre = GAME_GENRES.includes(game.genre) && game.genre !== "All" ? game.genre : "Arcade";
  const icons = ["▲", "✦", "★", "♥", "✹", "✿"];
  return {
    id: game.id,
    name: typeof game.name === "string" ? game.name.trim().slice(0, 36) : "",
    description: typeof game.description === "string" ? game.description.trim().slice(0, 200) : "",
    genre,
    sky: isHexColor(game.sky) ? game.sky : "#81d6bb",
    ground: isHexColor(game.ground) ? game.ground : "#366759",
    char: isHexColor(game.char) ? game.char : "#f1c779",
    icon: icons.includes(game.icon) ? game.icon : "▲",
    createdAt: typeof game.createdAt === "string" ? game.createdAt : new Date().toISOString(),
  };
}

function cleanAccount(account) {
  if (!account || typeof account.id !== "string" || typeof account.username !== "string") return null;
  const owned = Array.isArray(account.owned) ? [...new Set(account.owned.filter((id) => CATALOG.some((item) => item.id === id)))] : [];
  return {
    id: account.id,
    username: account.username.slice(0, 40),
    salt: typeof account.salt === "string" ? account.salt : "",
    passwordHash: typeof account.passwordHash === "string" ? account.passwordHash : "",
    cones: Number.isSafeInteger(account.cones) && account.cones >= 0 ? account.cones : 75,
    pix: Number.isSafeInteger(account.pix) && account.pix >= 0 ? account.pix : 125,
    conesInfinite: account.conesInfinite === true,
    pixInfinite: account.pixInfinite === true,
    avatar: {
      skin: isHexColor(account.avatar?.skin) ? account.avatar.skin : "#f3c887",
      shirt: isHexColor(account.avatar?.shirt) ? account.avatar.shirt : "#5687e8",
      pants: isHexColor(account.avatar?.pants) ? account.avatar.pants : "#38435d",
      face: ["smile", "wink", "cool", "star"].includes(account.avatar?.face) ? account.avatar.face : "smile",
      equipped: owned.includes(account.avatar?.equipped) ? account.avatar.equipped : null,
    },
    owned,
    isAdmin: account.isAdmin === true,
    isRootAdmin: account.isRootAdmin === true || account.isAdmin === true && ADMIN_USERNAMES.has(account.username.toLocaleLowerCase()),
    isFake: account.isFake === true,
    banned: account.banned === true,
    banReason: typeof account.banReason === "string" ? account.banReason.slice(0, 160) : "",
    friends: Array.isArray(account.friends)
      ? [...new Set(account.friends.filter((id) => typeof id === "string" && id !== account.id))]
      : [],
    games: Array.isArray(account.games) ? account.games.map(cleanGame).filter((game) => game && game.name.length > 0).slice(0, 100) : [],
    createdAt: typeof account.createdAt === "string" ? account.createdAt : new Date().toISOString(),
    runs: Number.isFinite(account.runs) ? Math.max(0, Math.floor(account.runs)) : 0,
  };
}

function readState() {
  let stored;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshState();
    stored = JSON.parse(raw);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Your saved Rocone data could not be read. Clear this site's saved data to start a fresh game.");
    }
    throw new Error("Your browser could not read saved Rocone data. Check your storage and reload the page.");
  }

  if (!stored || typeof stored !== "object" || !Array.isArray(stored.accounts)) {
    throw new Error("Your saved Rocone data has an unexpected format. Clear this site's saved data to start a fresh game.");
  }
  const accounts = stored.accounts.map(cleanAccount).filter(Boolean);
  const validIds = new Set(accounts.map((account) => account.id));
  const savedIds = new Set(stored.accounts.map((account) => account?.id).filter(Boolean));

  return {
    version: 1,
    session: typeof stored.session === "string" && validIds.has(stored.session) ? stored.session : null,
    accounts,
    theme: stored.theme === "light" ? "light" : "dark",
    favorites: Array.isArray(stored.favorites)
      ? [...new Set(stored.favorites.filter((id) => typeof id === "string" && (GAMES.some((game) => game.id === id) || accounts.some((account) => account.games.some((game) => game.id === id)))))]
      : [],
    recentGames: Array.isArray(stored.recentGames)
      ? [...new Set(stored.recentGames.filter((id) => typeof id === "string"))].slice(0, 12)
      : [],
    bannedGames: Array.isArray(stored.bannedGames)
      ? [...new Set(stored.bannedGames.filter((id) => typeof id === "string"))]
      : [],
    site: {
      name: typeof stored.site?.name === "string" && stored.site.name.trim() ? stored.site.name.trim().slice(0, 40) : "Rocone",
      announcement: typeof stored.site?.announcement === "string" ? stored.site.announcement.slice(0, 180) : "",
      welcome: typeof stored.site?.welcome === "string" && stored.site.welcome.trim() ? stored.site.welcome.trim().slice(0, 50) : "WELCOME BACK",
    },
    customTheme: stored.customTheme && typeof stored.customTheme === "object"
      ? Object.fromEntries(Object.keys(CUSTOM_THEME_VARS).filter((key) => isHexColor(stored.customTheme[key])).map((key) => [key, stored.customTheme[key]]))
      : null,
    savedIds,
  };
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: state.version,
      session: state.session,
      accounts: state.accounts,
      theme: state.theme,
      favorites: state.favorites,
      recentGames: state.recentGames,
      bannedGames: state.bannedGames,
      site: state.site,
      customTheme: state.customTheme,
    }));
    applyTheme();
  } catch (error) {
    if (error instanceof DOMException && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED")) {
      throw new Error("Your browser is out of saved-data space. Free up storage before saving more games.");
    }
    if (error instanceof DOMException && error.name === "SecurityError") {
      throw new Error("Your browser blocked saved data. Allow site storage in your browser settings.");
    }
    throw new Error(`Rocone couldn't save your changes${error instanceof Error ? `: ${error.message}` : "."}`);
  }
}

function makeId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function isHexColor(value) {
  return typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function icon(name, className = "") {
  const paths = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    home: '<path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z"/>',
    games: '<path d="M4.5 6.7h15a3.5 3.5 0 0 1 3.4 4.3l-1.1 5.2a2.7 2.7 0 0 1-4.5 1.5l-2.2-2h-5l-2.2 2a2.7 2.7 0 0 1-4.5-1.5l-1.1-5.2a3.5 3.5 0 0 1 3.4-4.3Z"/><path d="M7 10v4M5 12h4m7-.8h.01m2.6 1.6h.01"/>',
    avatar: '<circle cx="12" cy="7.2" r="3.1"/><path d="m10.2 10.2-3.3 5.1v5h10.2v-5l-3.3-5.1M7 15h10M9.5 20.3v-3h5v3"/>',
    shop: '<path d="M4 7.5h16l1.1 12H2.9L4 7.5Z"/><path d="M8 7.5V5a4 4 0 0 1 8 0v2.5m-5 4v.01M13 13l3 3m0-3-3 3"/>',
    friends: '<circle cx="9" cy="8" r="3"/><circle cx="17.5" cy="9.2" r="2.3"/><path d="M3 20v-1.5a6 6 0 0 1 12 0V20H3Zm12-5.1a4.7 4.7 0 0 1 6 4.5V20h-3"/>',
    chat: '<path d="M20.5 11.5a7.6 7.6 0 0 1-8 7.2 8 8 0 0 1-3.7-.9L4 19l1.3-4a6.8 6.8 0 0 1-.9-3.5A7.6 7.6 0 0 1 12.5 4a7.6 7.6 0 0 1 8 7.5Z"/><path d="M9 12h.01m3 0h.01m3 0h.01"/>',
    currency: '<path d="M12 2.8 20 7v10l-8 4.2L4 17V7l8-4.2Z"/><path d="M12 7.5 16.5 10v4L12 16.5 7.5 14v-4L12 7.5Z"/>',
    create: '<path d="m5 19 4.2-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L5 19Z"/><path d="m14.5 7.5 3 3M4 21h16"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.6"/><path d="m16 16 4.2 4.2M8.4 10.8h4.8m-2.4-2.4v4.8"/>',
    settings: '<path d="M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Z"/><path d="m19.4 13.8 1.4 1.1-1.7 3-1.7-.6a7.5 7.5 0 0 1-1.7 1l-.3 1.8h-3.5l-.3-1.8a7.5 7.5 0 0 1-1.7-1l-1.7.6-1.7-3 1.4-1.1a7.2 7.2 0 0 1 0-2l-1.4-1.1 1.7-3 1.7.6a7.5 7.5 0 0 1 1.7-1l.3-1.8h3.5l.3 1.8a7.5 7.5 0 0 1 1.7 1l1.7-.6 1.7 3-1.4 1.1a7.2 7.2 0 0 1 0 2Z"/>',
    play: '<path d="m9 6 10 6-10 6V6Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    moon: '<path d="M20.2 15.2A8.4 8.4 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z"/>',
  };
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.games}</svg>`;
}

function currentAccount() {
  return state.accounts.find((account) => account.id === state.session) || null;
}

function hasInfiniteBalance(account, currency) {
  return currency === "cones" ? account.conesInfinite : account.pixInfinite;
}

function formatBalance(account, currency) {
  return hasInfiniteBalance(account, currency) ? "∞" : String(account[currency]);
}

function findPerson(id) {
  const account = state.accounts.find((candidate) => candidate.id === id);
  if (account?.banned) return null;
  if (account) {
    return {
      id: account.id,
      username: account.username,
      avatar: account.avatar,
      games: account.games,
      friends: account.friends,
      cones: account.cones,
      pix: account.pix,
      runs: account.runs,
      createdAt: account.createdAt,
      isDemo: false,
    };
  }
  const seed = SEED_PEOPLE.find((person) => person.id === id);
  return seed ? { ...seed, avatar: { ...seed }, games: [], friends: [], isDemo: true } : null;
}

function allGames() {
  const created = state.accounts.filter((account) => !account.banned).flatMap((account) => account.games.map((game) => ({
    ...game,
    creator: account.username,
    type: "dash",
    players: "1",
    likes: "100%",
    isCreated: true,
  })));
  return [...created.reverse(), ...GAMES].filter((game) => !state.bannedGames.includes(game.id));
}

function myGames() {
  const account = currentAccount();
  return account ? account.games.filter((game) => !state.bannedGames.includes(game.id)).slice().reverse() : [];
}

function avatarSVG(value, large = false) {
  const avatar = value?.avatar || value || {};
  const skin = isHexColor(avatar.skin) ? avatar.skin : "#f3c887";
  const shirt = isHexColor(avatar.shirt) ? avatar.shirt : "#5687e8";
  const pants = isHexColor(avatar.pants) ? avatar.pants : "#38435d";
  const face = avatar.face || "smile";
  const equipped = CATALOG.find((item) => item.id === avatar.equipped)?.avatar || null;
  const glasses = equipped?.type === "glasses"
    ? `<g fill="#242333" stroke="${equipped.color}" stroke-width="2"><rect x="28" y="50" width="20" height="15" rx="6"/><rect x="54" y="50" width="20" height="15" rx="6"/><path d="M48 56h6"/></g>`
    : "";
  const hat = equipped?.type === "hat"
    ? `<g><path d="M27 42Q51 ${equipped.label === "Classic Cone" ? "2" : "19"} 76 42l-4 5H31Z" fill="${equipped.color}" stroke="#342c27" stroke-width="2"/><path d="M28 43h47" stroke="#342c27" stroke-width="3" stroke-linecap="round"/></g>`
    : `<g><path d="M27 44Q29 20 51 21Q73 20 76 44L73 51H30Z" fill="#544333"/><path d="M30 37Q45 19 70 34" fill="none" stroke="#745535" stroke-width="7" stroke-linecap="round"/></g>`;
  const eyes = face === "cool"
    ? '<path d="M37 51h12m9 0h12" stroke="#312c2b" stroke-width="4" stroke-linecap="round"/>'
    : face === "star"
      ? '<path d="m41 47 1.6 3.2 3.4.5-2.5 2.4.6 3.4-3.1-1.6-3 1.6.6-3.4-2.5-2.4 3.4-.5ZM62 47l1.5 3.2 3.4.5-2.5 2.4.6 3.4-3-1.6-3.1 1.6.6-3.4-2.5-2.4 3.4-.5Z" fill="#493a35"/>'
      : '<ellipse cx="42" cy="52" rx="2.1" ry="3" fill="#352b27"/><ellipse cx="62" cy="52" rx="2.1" ry="3" fill="#352b27"/>';
  const mouth = face === "wink"
    ? '<path d="M38 62h8m11 0q6 7 13-1" fill="none" stroke="#72423a" stroke-width="2" stroke-linecap="round"/>'
    : face === "cool" || face === "star"
      ? '<path d="M43 64q8 7 17 0" fill="none" stroke="#72423a" stroke-width="2" stroke-linecap="round"/>'
      : '<path d="M42 62q10 12 20 0" fill="none" stroke="#72423a" stroke-width="2.3" stroke-linecap="round"/>';
  const gear = equipped?.type === "gear"
    ? `<g><rect x="23" y="77" width="16" height="32" rx="7" fill="${equipped.color}" stroke="#283129" stroke-width="2"/><path d="m29 85 5-4-2 8 4 4-8 8 2-8-4-4Z" fill="#fff2ac"/></g>`
    : "";
  const svg = `<svg class="avatar-art" viewBox="0 0 102 114" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Classic ${escapeHTML(value?.username || "player")} avatar"><defs><linearGradient id="bg-${escapeHTML(value?.id || "preview").replace(/[^a-zA-Z0-9-]/g, "")}-${large ? "l" : "s"}" x2="0" y2="1"><stop stop-color="#d8e6dc"/><stop offset="1" stop-color="#b4c3be"/></linearGradient></defs><rect width="102" height="114" fill="url(#bg-${escapeHTML(value?.id || "preview").replace(/[^a-zA-Z0-9-]/g, "")}-${large ? "l" : "s"})"/><path d="M0 87h102v27H0z" fill="${pants}"/><path d="M18 84q2-8 14-9h37q12 1 16 10l5 29H12Z" fill="${shirt}"/><rect x="37" y="66" width="28" height="17" rx="4" fill="${skin}"/><rect x="27" y="32" width="49" height="40" rx="11" fill="${skin}"/>${hat}${eyes}${glasses}${mouth}${gear}<circle cx="78" cy="53" r="3.2" fill="${skin}"/><path d="M18 89h66" stroke="#ffffff29" stroke-width="2"/></svg>`;
  return svg;
}

function gameCard(game) {
  return `<article class="game-card" data-game-card="${escapeHTML(game.id)}"><div class="game-cover" data-classic-art="${escapeHTML(game.id)}" style="--cover-a:${escapeHTML(game.sky)};--cover-b:${escapeHTML(game.ground)};--character:${escapeHTML(game.char)}"><span class="cover-sky"></span><span class="cover-character">${escapeHTML(game.icon || "★")}</span><span class="cover-word">${escapeHTML(game.name)}</span></div><div class="game-info"><h3 class="game-title">${escapeHTML(game.name)}</h3><div class="game-byline">By ${escapeHTML(game.creator)}</div><div class="game-stats"><span><span class="game-stat-icon">👍</span>${escapeHTML(game.likes || "96%")}</span><span><span class="game-stat-icon">♟</span>${escapeHTML(game.players || "1")}</span><span>${escapeHTML(game.genre || "Arcade")}</span></div></div></article>`;
}

function sectionHeading(title, action, actionLabel = "See all →", id = "") {
  return `<div class="section-heading"><h2 class="section-title"${id ? ` id="${escapeHTML(id)}"` : ""}>${escapeHTML(title)}</h2>${action ? `<button class="section-link" data-route="${escapeHTML(action)}">${escapeHTML(actionLabel)}</button>` : ""}</div>`;
}

function pageHeading(title, subtitle, action = "") {
  return `<div class="page-heading"><div><h1 class="page-title">${escapeHTML(title)}</h1><p class="page-subtitle">${escapeHTML(subtitle)}</p></div>${action}</div>`;
}

function miniAvatar(person, cssClass = "person-avatar") {
  return `<div class="${cssClass} avatar-frame">${avatarSVG(person)}</div>`;
}

function emptyState(title, text, button = "") {
  return `<div class="empty-state"><strong>${escapeHTML(title)}</strong><br>${escapeHTML(text)}${button ? `<div style="margin-top:14px">${button}</div>` : ""}</div>`;
}

function classicAdvertisement(side) {
  return `<aside class="classic-advertisement" aria-label="Advertisement"><a class="classic-ad-art ${side === "left" ? "left-ad-art" : "right-ad-art"}" href="#" data-ad-placeholder aria-label="${side === "left" ? "Featured community outfits" : "Rocone community message"}"></a><div class="classic-ad-caption"><span>ADVERTISEMENT</span><button data-report-ad>Report</button></div></aside>`;
}

function renderHome() {
  const account = currentAccount();
  const people = account.friends.map(findPerson).filter(Boolean);
  const friends = people.length ? people : SEED_PEOPLE.slice(0, 9).map((person) => ({ ...person, avatar: person }));
  const library = [
    ...account.games.filter((game) => !state.bannedGames.includes(game.id)).slice().reverse().map((game) => ({ ...game, creator: account.username })),
    ...GAMES.filter((game) => !account.games.some((created) => created.id === game.id) && !state.bannedGames.includes(game.id)),
  ];
  const recentIds = new Set(state.recentGames);
  const recommendations = GAMES.filter((game) => !state.bannedGames.includes(game.id)).sort((a, b) => Number(recentIds.has(b.id)) - Number(recentIds.has(a.id))).slice(0, 6);
  return `<div class="classic-home-layout">${classicAdvertisement("left")}<div class="classic-home-center"><section class="classic-home-hero"><div class="classic-home-avatar avatar-frame">${avatarSVG(account, true)}</div><div class="classic-home-greeting"><div class="classic-welcome-label">${escapeHTML(state.site.welcome)}, ${escapeHTML(account.username.toLocaleUpperCase())}</div><h1 class="classic-home-wordmark"><span class="classic-home-logo-mark">${escapeHTML(state.site.name.slice(0, 1).toUpperCase())}</span> ${escapeHTML(state.site.name)}</h1><button class="classic-customize-link" data-route="avatar">${icon("avatar")} Customize your character</button></div></section><section class="classic-section classic-friends-section">${sectionHeading(`Friends (${people.length})`, "friends", "See All →")}<div class="classic-friends-strip">${friends.map((person) => `<button class="classic-friend-card" data-profile="${escapeHTML(person.id)}" aria-label="View ${escapeHTML(person.username)}'s profile">${miniAvatar(person, "classic-friend-avatar avatar-frame")}<span class="classic-friend-name">${escapeHTML(person.username)}</span></button>`).join("")}<button class="classic-add-friend" data-route="friends" aria-label="Find more friends">${icon("plus")}</button></div></section><section class="classic-section">${sectionHeading("My Library", "my-games", "See All →")}<div class="game-grid classic-game-grid">${library.slice(0, 6).map(gameCard).join("")}</div></section><section class="classic-section classic-recommended">${sectionHeading("Recommended For You", "games", "See All →")}<div class="game-grid classic-game-grid">${recommendations.map(gameCard).join("")}</div></section><section class="classic-section classic-creator-promo"><div><strong>Make something of your own.</strong><span>The next big game can start with you.</span></div><button class="primary-button small" data-route="create">${icon("create")}Create</button></section></div>${classicAdvertisement("right")}</div>`;
}

function renderGames() {
  const games = allGames().filter((game) => {
    const matchesGenre = gameGenre === "All" || game.genre === gameGenre;
    const matchesSearch = !gameSearch || `${game.name} ${game.description} ${game.creator} ${game.genre}`.toLowerCase().includes(gameSearch.toLowerCase());
    return matchesGenre && matchesSearch;
  });
  return `${pageHeading("Discover", "Good games, little adventures, and creations made by the Rocone community.", `<button class="primary-button" data-route="create">${icon("plus")}Make a game</button>`)}<div class="filter-row">${GAME_GENRES.map((genre) => `<button class="filter-chip${gameGenre === genre ? " active" : ""}" data-genre="${escapeHTML(genre)}">${escapeHTML(genre)}</button>`).join("")}</div>${games.length ? `<div class="game-grid">${games.map(gameCard).join("")}</div>` : emptyState("No games found.", "Try another search or category.")}`;
}

function catalogItem(item, account) {
  const owned = account.owned.includes(item.id);
  const equipped = account.avatar.equipped === item.id;
  const balance = item.currency === "cones" ? account.cones : account.pix;
  const hasEnough = hasInfiniteBalance(account, item.currency) || balance >= item.price;
  const currencySymbol = item.currency === "cones" ? "◆" : "✦";
  const action = owned
    ? `<button class="secondary-button small" data-equip="${escapeHTML(item.id)}">${equipped ? "Equipped ✓" : "Wear it"}</button>`
    : `<button class="primary-button small" data-buy="${escapeHTML(item.id)}"${hasEnough ? "" : " disabled"}>${item.price} ${currencySymbol}</button>`;
  return `<article class="game-card catalog-card"><div class="item-art" style="--art-glow:${escapeHTML(item.glow)};color:${escapeHTML(item.color)}"><span aria-hidden="true">${escapeHTML(item.icon)}</span></div><div class="item-card-info"><h3 class="item-title">${escapeHTML(item.name)}</h3><p class="item-description">${escapeHTML(item.description)}</p><div class="item-bottom"><span class="price-tag" style="color:var(--${item.currency === "cones" ? "accent" : "pix"})">${owned ? "In your closet" : `${currencySymbol} ${item.price} ${item.currency === "cones" ? "Cones" : "Pix"}`}</span>${action}</div></div></article>`;
}

function renderCatalog() {
  const account = currentAccount();
  const visible = CATALOG.filter((item) => {
    const matchesCategory = catalogCategory === "All" || item.category === catalogCategory;
    const matchesSearch = !catalogSearch || `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(catalogSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return `<div class="shop-layout"><div><div class="filter-row">${CATEGORIES.map((category) => `<button class="filter-chip${catalogCategory === category ? " active" : ""}" data-category="${escapeHTML(category)}">${escapeHTML(category)}</button>`).join("")}</div>${visible.length ? `<div class="game-grid">${visible.map((item) => catalogItem(item, account)).join("")}</div>` : emptyState("No items found.", "Try a different search or browse everything.")}</div><aside class="shop-side"><h2 class="side-title">Your little fortune</h2><p class="side-copy">Two currencies, twice the fun. Pick something out for your avatar.</p><div class="currency-card"><div class="currency-row"><span>◆ &nbsp;Cones</span><span class="currency-count">${formatBalance(account, "cones")}</span></div><div class="currency-row"><span>✦ &nbsp;Pix</span><span class="currency-count">${formatBalance(account, "pix")}</span></div></div><div class="subtle-divider"></div><p class="side-copy">New around here? Every avatar starts with some Cones and Pix. Finish an arcade run to find more Pix.</p></aside></div>`;
}

function editorOption(group, choice, selected, type = "color") {
  const selectedNow = choice.id === selected;
  const swatch = type === "color"
    ? `<span class="choice-swatch" style="background:${escapeHTML(choice.id)}"></span>`
    : `<span class="choice-swatch" style="display:grid;place-items:center;background:var(--surface-hover);color:var(--text);font-size:14px">${choice.icon}</span>`;
  return `<button class="editor-choice${selectedNow ? " selected" : ""}" data-avatar-group="${escapeHTML(group)}" data-avatar-value="${escapeHTML(choice.id)}" aria-pressed="${selectedNow}">${swatch}<span class="choice-label">${escapeHTML(choice.name)}</span></button>`;
}

function renderAvatar() {
  const account = currentAccount();
  const a = account.avatar;
  const faces = [{ id: "smile", name: "Classic Smile", icon: "☺" }, { id: "wink", name: "Friendly Wink", icon: "⌣" }, { id: "cool", name: "Cool Look", icon: "☻" }, { id: "star", name: "Starry Eyes", icon: "✦" }];
  const wardrobe = account.owned.map((id) => CATALOG.find((item) => item.id === id)).filter(Boolean);
  return pageHeading("Your avatar", "Make someone who feels unmistakably you.") + `<div class="avatar-editor"><aside class="avatar-preview-panel"><div class="preview-avatar avatar-frame">${avatarSVG(account, true)}</div><div><h2 class="avatar-preview-name">${escapeHTML(account.username)}</h2><p class="avatar-preview-caption">Looking pretty good.</p></div></aside><div><section class="editor-section"><div class="section-heading"><h2 class="section-title">Skin tone</h2></div><div class="editor-grid">${SKIN_COLORS.map((choice) => editorOption("skin", choice, a.skin)).join("")}</div></section><section class="editor-section"><div class="section-heading"><h2 class="section-title">Shirt</h2></div><div class="editor-grid">${SHIRT_COLORS.map((choice) => editorOption("shirt", choice, a.shirt)).join("")}</div></section><section class="editor-section"><div class="section-heading"><h2 class="section-title">Pants</h2></div><div class="editor-grid">${PANTS_COLORS.map((choice) => editorOption("pants", choice, a.pants)).join("")}</div></section><section class="editor-section"><div class="section-heading"><h2 class="section-title">Face</h2></div><div class="editor-grid">${faces.map((choice) => editorOption("face", choice, a.face, "face")).join("")}</div></section><section class="editor-section"><div class="section-heading"><h2 class="section-title">Your closet</h2><button class="section-link" data-route="catalog">Find more accessories →</button></div><div class="editor-grid"><button class="editor-choice${a.equipped ? "" : " selected"}" data-avatar-group="equipped" data-avatar-value="" aria-pressed="${!a.equipped}"><span class="choice-swatch" style="display:grid;place-items:center;background:var(--surface-hover);font-size:14px">—</span><span class="choice-label">No accessory</span></button>${wardrobe.map((item) => editorOption("equipped", { id: item.id, name: item.name, icon: item.icon }, a.equipped, "face")).join("")}</div></section></div></div>`;
}

function renderFriends() {
  const account = currentAccount();
  const friends = account.friends.map(findPerson).filter(Boolean);
  const query = document.querySelector("#app-friend-search")?.value || "";
  const people = [...SEED_PEOPLE, ...state.accounts.filter((person) => person.id !== account.id && !person.friends.includes(account.id))];
  const suggestions = people.filter((person) => {
    if (account.friends.includes(person.id) || person.id === account.id) return false;
    return !query || person.username.toLowerCase().includes(query.toLowerCase());
  }).slice(0, 10);
  return `${pageHeading("Your people", "Say hi to someone new or catch up with a friend.", `<button class="primary-button" data-focus="#friend-search">${icon("plus")}Find friends</button>`)}<div class="friends-layout"><section class="panel"><div class="section-heading"><h2 class="section-title">Friends</h2><span style="color:var(--muted);font-size:12px">${friends.length}</span></div>${friends.length ? friends.map((person) => `<div class="friend-row">${miniAvatar(person)}<div class="friend-details"><h3 class="friend-username">${escapeHTML(person.username)}</h3><div class="friend-status">${person.isDemo ? "Rocone community" : "On Rocone · added friend"}</div></div><button class="secondary-button small" data-profile="${escapeHTML(person.id)}">View profile</button><button class="danger-button small" data-unfriend="${escapeHTML(person.id)}" aria-label="Remove ${escapeHTML(person.username)} as a friend">Remove</button></div>`).join("") : emptyState("Every adventure's better together.", "Pick someone from the community to send your first friend request.")}</section><aside class="panel"><h2 class="panel-title">People to meet</h2><p class="panel-copy">Find your friends from the Rocone community.</p><label class="form-label" style="margin-top:14px"><span>Search by username</span><div class="search-wrap" style="flex:initial"><span class="search-icon">${icon("search")}</span><input id="friend-search" class="search-input" type="search" placeholder="Try a username…" autocomplete="off" aria-label="Search friends"/></div></label><div id="friend-suggestions" style="margin-top:10px">${suggestions.length ? suggestions.map((person) => `<div class="friend-row">${miniAvatar(person)}<div class="friend-details"><h3 class="friend-username">${escapeHTML(person.username)}</h3><div class="friend-status">${person.isDemo ? "Rocone community" : "Player"}</div></div><button class="primary-button small" data-friend="${escapeHTML(person.id)}" aria-label="Add ${escapeHTML(person.username)} as a friend">${icon("plus")}</button></div>`).join("") : `<p class="panel-copy" style="padding:12px 0">No players found. Try searching for someone else.</p>`}</div></aside></div>`;
}

function renderMyGames() {
  const games = myGames();
  const account = currentAccount();
  return `${pageHeading("Your games", "Every world you make has a home here.", `<button class="primary-button" data-route="create">${icon("plus")}Create game</button>`)}${games.length ? `<div class="game-grid">${games.map((game) => gameCard({ ...game, creator: account.username })).join("")}</div>` : emptyState("An empty shelf is full of possibility.", "Pick a name, set a scene, and publish your first tiny world.", '<button class="primary-button small" data-route="create">Create your first game →</button>')}`;
}

function renderCreate() {
  const palette = GAME_PALETTES.find((option) => option.id === creatorPalette) || GAME_PALETTES[0];
  return `${pageHeading("The game creator", "Every big adventure started with someone opening a notebook.")}<div class="create-layout"><section class="panel"><h2 class="panel-title">Give your game a start</h2><p class="panel-copy" style="margin-bottom:17px">A name, a little imagination, and you're ready to publish.</p><form id="game-form" class="game-form"><label class="form-label"><span>Game name</span><input class="text-input" name="name" maxlength="36" placeholder="e.g. My Tiny World" required autocomplete="off"/></label><label class="form-label"><span>Description</span><textarea class="text-area" name="description" maxlength="200" placeholder="What's waiting for players when they arrive?" required></textarea></label><label class="form-label"><span>Genre</span><select class="select-input" name="genre" required>${GAME_GENRES.filter((genre) => genre !== "All").map((genre) => `<option>${escapeHTML(genre)}</option>`).join("")}</select></label><div class="form-label"><span>Pick a world</span><div class="cover-picker">${GAME_PALETTES.map((option) => `<button type="button" class="cover-swatch${creatorPalette === option.id ? " selected" : ""}" data-palette="${escapeHTML(option.id)}" style="background:linear-gradient(135deg,${escapeHTML(option.sky)} 0 50%,${escapeHTML(option.ground)} 50%)" title="${escapeHTML(option.name)}" aria-label="${escapeHTML(option.name)}" aria-pressed="${creatorPalette === option.id}"></button>`).join("")}</div></div><button class="primary-button" type="submit">${icon("plus")}Publish your game</button></form></section><section><div class="game-cover hero-cover" style="--cover-a:${escapeHTML(palette.sky)};--cover-b:${escapeHTML(palette.ground)};--character:${escapeHTML(palette.char)}"><span class="cover-sky"></span><span class="cover-character">★</span><span class="cover-word">Your next big idea.</span></div><div class="creator-note" style="margin-top:13px"><strong style="color:var(--text)">What happens when I publish?</strong><br>Your game becomes a real, playable arcade in your Discover page. Give it a name and a description, pick its genre and colors, and Rocone fills in the rest. Your games are saved in this browser.</div></section></div>`;
}

function renderAdminLegacy() {
  if (!currentAccount()?.isAdmin) return "";
  const players = state.accounts.filter((account) => !account.isAdmin);
  const games = [...state.accounts.filter((account) => !account.banned).flatMap((account) => account.games.map((game) => ({ ...game, ownerId: account.id, ownerName: account.username }))), ...GAMES.map((game) => ({ ...game, ownerId: "", ownerName: game.creator }))];
  const colors = Object.keys(CUSTOM_THEME_VARS).map((key) => `<label class="admin-field"><span>${escapeHTML(key)}</span><input class="text-input admin-color-input" type="color" name="theme-${key}" value="${escapeHTML(state.customTheme?.[key] || CUSTOM_THEME_VARS[key])}"/></label>`).join("");
  const users = players.length
    ? `<div class="admin-list">${players.map((account) => `<article class="admin-user-row"><div class="admin-user-info">${miniAvatar(account, "menu-avatar")}<div><strong>${escapeHTML(account.username)}</strong><span>${account.isFake ? "Fake/demo user" : "Player"} · ${account.banned ? `Banned${account.banReason ? ` · ${escapeHTML(account.banReason)}` : ""}` : "Active"} · ID ${escapeHTML(account.id.slice(0, 8))}</span></div></div><label class="admin-field"><span>Username (duplicates allowed)</span><input class="text-input" data-admin-username="${escapeHTML(account.id)}" value="${escapeHTML(account.username)}" maxlength="40"/></label><label class="admin-field"><span>Cones</span><input class="text-input" data-admin-cones="${escapeHTML(account.id)}" type="number" min="0" max="1000000" value="${account.cones}"/></label><label class="admin-field"><span>Pix</span><input class="text-input" data-admin-pix="${escapeHTML(account.id)}" type="number" min="0" max="1000000" value="${account.pix}"/></label><div class="admin-user-actions"><button class="secondary-button small" data-admin-save="${escapeHTML(account.id)}">Save edits</button><button class="secondary-button small" data-admin-role="${escapeHTML(account.id)}" data-role-state="${account.isAdmin ? "remove" : "grant"}">${account.isAdmin ? "Remove admin" : "Grant admin"}</button><input class="text-input admin-ban-reason" data-admin-reason="${escapeHTML(account.id)}" maxlength="160" placeholder="Optional ban reason" value="${escapeHTML(account.banReason)}" ${account.banned ? "disabled" : ""}/><button class="${account.banned ? "secondary-button" : "danger-button"} small" data-admin-ban="${escapeHTML(account.id)}" data-ban-state="${account.banned ? "unban" : "ban"}">${account.banned ? "Unban" : "Ban"}</button></div><div class="admin-avatar-controls"><strong>Custom avatar</strong>${["skin", "shirt", "pants"].map((part) => `<label class="admin-field"><span>${part}</span><input class="text-input admin-color-input" type="color" data-admin-avatar="${escapeHTML(account.id)}" data-avatar-part="${part}" value="${escapeHTML(account.avatar[part])}"/></label>`).join("")}<label class="admin-field"><span>Face</span><select class="select-input" data-admin-face="${escapeHTML(account.id)}">${["smile", "wink", "cool", "star"].map((face) => `<option value="${face}"${account.avatar.face === face ? " selected" : ""}>${face}</option>`).join("")}</select></label><button class="secondary-button small" data-admin-avatar-save="${escapeHTML(account.id)}">Save avatar</button></div><div class="admin-password-controls"><label class="admin-field"><span>Set new password</span><input class="text-input" type="password" data-admin-password="${escapeHTML(account.id)}" minlength="8" autocomplete="new-password" placeholder="At least 8 characters"/></label><button class="secondary-button small" data-admin-password-save="${escapeHTML(account.id)}">Change password</button></div></article>`).join("")}</div>`
    : emptyState("No accounts yet.", "Create a user below.");
  const gameRows = games.length ? `<div class="admin-game-list">${games.map((game) => {
    const banned = state.bannedGames.includes(game.id);
    return `<article class="admin-game-row"><div><strong>${escapeHTML(game.name)}</strong><span>By ${escapeHTML(game.ownerName)} · ${escapeHTML(game.genre)}${banned ? " · Banned" : ""}</span></div><button class="${banned ? "secondary-button" : "danger-button"} small" data-admin-game-ban="${escapeHTML(game.id)}" data-admin-game-owner="${escapeHTML(game.ownerId)}" data-ban-state="${banned ? "unban" : "ban"}">${banned ? "Unban game" : "Ban game"}</button>${game.ownerId ? `<button class="danger-button small" data-admin-delete-game="${escapeHTML(game.id)}" data-admin-owner="${escapeHTML(game.ownerId)}">Delete</button>` : ""}</article>`;
  }).join("")}</div>` : emptyState("No games found.", "There are no games to moderate.");
  return `${pageHeading("Rocone administration", "Manage users, moderation, themes, games, and local website content.")}<div class="admin-notice"><strong>Local demo controls:</strong> these edits affect only accounts in this browser; they do not modify a hosted website or other devices.</div><section class="panel admin-section"><div class="admin-section-heading"><div><h2 class="panel-title">Create an account</h2><p class="panel-copy">Duplicate and unusual usernames are allowed here. Fake users receive a random inaccessible password until you reset it.</p></div></div><form class="admin-create-form" id="admin-create-form"><label class="admin-field"><span>Username</span><input class="text-input" name="username" maxlength="40" placeholder="Any display name; duplicates allowed" required/></label><label class="admin-field"><span>Password (required for real users)</span><input class="text-input" name="password" type="password" minlength="8" placeholder="At least 8 characters"/></label><label class="admin-checkbox"><input type="checkbox" name="fake"/> Create as fake/demo user</label><button class="primary-button small" type="submit">Create user</button></form></section><section class="panel admin-section"><div class="admin-section-heading"><div><h2 class="panel-title">Player accounts</h2><p class="panel-copy">Edit names, unlimited demo balances, roles, avatars, passwords, and ban status.</p></div><span class="admin-count">${players.length} users</span></div>${users}</section><section class="panel admin-section"><div class="admin-section-heading"><div><h2 class="panel-title">Games</h2><p class="panel-copy">Ban or restore built-in and player-made games. Delete community games permanently from this browser.</p></div><span class="admin-count">${games.length} games</span></div>${gameRows}</section><section class="panel admin-section"><h2 class="panel-title">Customize website</h2><p class="panel-copy">Change the local portal name, announcement, and home-page greeting.</p><form class="admin-site-form" id="admin-site-form"><label class="admin-field"><span>Site name</span><input class="text-input" name="siteName" maxlength="40" value="${escapeHTML(state.site.name)}" required/></label><label class="admin-field"><span>Announcement (leave blank to hide)</span><input class="text-input" name="announcement" maxlength="180" value="${escapeHTML(state.site.announcement)}"/></label><label class="admin-field"><span>Home greeting</span><input class="text-input" name="welcome" maxlength="50" value="${escapeHTML(state.site.welcome)}" required/></label><button class="primary-button small" type="submit">Save website edits</button></form></section><section class="panel admin-section"><h2 class="panel-title">Custom theme colors</h2><p class="panel-copy">Choose a color palette for this browser. Reset to use the selected light or dark theme.</p><form class="admin-theme-form" id="admin-theme-form">${colors}<div class="admin-user-actions"><button class="primary-button small" type="submit">Save custom theme</button><button class="secondary-button small" type="button" data-admin-theme-reset>Reset to standard theme</button></div></form></section>`;
}

function renderAdmin() {
  if (!currentAccount()?.isAdmin) return "";
  const players = state.accounts.filter((account) => !account.isRootAdmin);
  const games = [
    ...state.accounts.flatMap((account) => account.games.map((game) => ({ ...game, ownerId: account.id, ownerName: account.username }))),
    ...GAMES.map((game) => ({ ...game, ownerId: "", ownerName: game.creator })),
  ];
  const colors = Object.entries(CUSTOM_THEME_VARS).map(([key, color]) =>
    `<label class="admin-field"><span>${escapeHTML(key)}</span><input class="text-input admin-color-input" type="color" name="theme-${key}" value="${escapeHTML(state.customTheme?.[key] || color)}"/></label>`
  ).join("");
  const users = players.length ? `<div class="admin-list">${players.map((account) => `
    <article class="admin-user-row">
      <div class="admin-user-info">${miniAvatar(account, "menu-avatar")}<div><strong>${escapeHTML(account.username)}</strong><span>${account.isFake ? "Fake/demo user" : "Player"}${account.isAdmin ? " · Admin" : ""} · ${account.banned ? "Banned" : "Active"} · ID ${escapeHTML(account.id.slice(0, 8))}</span></div></div>
      <label class="admin-field"><span>Username (duplicates allowed)</span><input class="text-input" data-admin-username="${escapeHTML(account.id)}" value="${escapeHTML(account.username)}" maxlength="40"/></label>
      <label class="admin-field"><span>Cones</span><input class="text-input" data-admin-cones="${escapeHTML(account.id)}" type="number" min="0" max="${Number.MAX_SAFE_INTEGER}" value="${account.cones}"/><span class="admin-checkbox"><input type="checkbox" data-admin-cones-infinite="${escapeHTML(account.id)}"${account.conesInfinite ? " checked" : ""}/> Infinite</span></label>
      <label class="admin-field"><span>Pix</span><input class="text-input" data-admin-pix="${escapeHTML(account.id)}" type="number" min="0" max="${Number.MAX_SAFE_INTEGER}" value="${account.pix}"/><span class="admin-checkbox"><input type="checkbox" data-admin-pix-infinite="${escapeHTML(account.id)}"${account.pixInfinite ? " checked" : ""}/> Infinite</span></label>
      <div class="admin-user-actions">
        <button class="secondary-button small" data-admin-save="${escapeHTML(account.id)}">Save edits</button>
        <button class="secondary-button small" data-admin-role="${escapeHTML(account.id)}">${account.isAdmin ? "Remove admin" : "Grant admin"}</button>
        <input class="text-input admin-ban-reason" data-admin-reason="${escapeHTML(account.id)}" maxlength="160" placeholder="Optional ban reason" value="${escapeHTML(account.banReason)}" ${account.banned ? "disabled" : ""}/>
        <button class="${account.banned ? "secondary-button" : "danger-button"} small" data-admin-ban="${escapeHTML(account.id)}" data-ban-state="${account.banned ? "unban" : "ban"}">${account.banned ? "Unban" : "Ban"}</button>
      </div>
      <div class="admin-avatar-controls"><strong>Custom avatar</strong>${["skin", "shirt", "pants"].map((part) => `<label class="admin-field"><span>${part}</span><input class="text-input admin-color-input" type="color" data-admin-avatar="${escapeHTML(account.id)}" data-avatar-part="${part}" value="${escapeHTML(account.avatar[part])}"/></label>`).join("")}
        <label class="admin-field"><span>Face</span><select class="select-input" data-admin-face="${escapeHTML(account.id)}">${["smile", "wink", "cool", "star"].map((face) => `<option value="${face}"${account.avatar.face === face ? " selected" : ""}>${face}</option>`).join("")}</select></label>
        <button class="secondary-button small" data-admin-avatar-save="${escapeHTML(account.id)}">Save avatar</button>
      </div>
      <div class="admin-password-controls"><label class="admin-field"><span>Set new password</span><input class="text-input" type="password" data-admin-password="${escapeHTML(account.id)}" minlength="8" autocomplete="new-password" placeholder="At least 8 characters"/></label>
        <button class="secondary-button small" data-admin-password-save="${escapeHTML(account.id)}">Change password</button>
      </div>
    </article>`).join("")}</div>` : emptyState("No accounts yet.", "Create a user below.");
  const gameRows = games.length ? `<div class="admin-game-list">${games.map((game) => {
    const banned = state.bannedGames.includes(game.id);
    return `<article class="admin-game-row"><div><strong>${escapeHTML(game.name)}</strong><span>By ${escapeHTML(game.ownerName)} · ${escapeHTML(game.genre)}${banned ? " · Banned" : ""}</span></div><button class="${banned ? "secondary-button" : "danger-button"} small" data-admin-game-ban="${escapeHTML(game.id)}" data-admin-game-owner="${escapeHTML(game.ownerId)}" data-ban-state="${banned ? "unban" : "ban"}">${banned ? "Unban game" : "Ban game"}</button>${game.ownerId ? `<button class="danger-button small" data-admin-delete-game="${escapeHTML(game.id)}" data-admin-owner="${escapeHTML(game.ownerId)}">Delete</button>` : ""}</article>`;
  }).join("")}</div>` : emptyState("No games found.", "There are no games to moderate.");
  return `${pageHeading("Rocone administration", "Manage local users, games, website content, and themes.")}<div class="admin-notice"><strong>Local demo controls:</strong> changes are saved only in this browser and are not shared with other devices.</div>
    <section class="panel admin-section"><h2 class="panel-title">Create an account</h2><p class="panel-copy">Duplicate and unusual display names are allowed. Fake users get an inaccessible random password until you set one.</p><form class="admin-create-form" id="admin-create-form"><label class="admin-field"><span>Username</span><input class="text-input" name="username" maxlength="40" placeholder="Any display name; duplicates allowed" required/></label><label class="admin-field"><span>Password (required for real users)</span><input class="text-input" name="password" type="password" minlength="8" placeholder="At least 8 characters"/></label><label class="admin-checkbox"><input type="checkbox" name="fake"/> Create as fake/demo user</label><button class="primary-button small" type="submit">Create user</button></form></section>
    <section class="panel admin-section"><div class="admin-section-heading"><div><h2 class="panel-title">Player accounts</h2><p class="panel-copy">Edit names, balances, infinite currency, roles, avatars, passwords, and bans.</p></div><span class="admin-count">${players.length} users</span></div>${users}</section>
    <section class="panel admin-section"><div class="admin-section-heading"><div><h2 class="panel-title">Games</h2><p class="panel-copy">Ban or restore built-in and player-made games, or delete community games.</p></div><span class="admin-count">${games.length} games</span></div>${gameRows}</section>
    <section class="panel admin-section"><h2 class="panel-title">Customize website</h2><p class="panel-copy">Change the local portal name, announcement, and home-page greeting.</p><form class="admin-site-form" id="admin-site-form"><label class="admin-field"><span>Site name</span><input class="text-input" name="siteName" maxlength="40" value="${escapeHTML(state.site.name)}" required/></label><label class="admin-field"><span>Announcement (leave blank to hide)</span><input class="text-input" name="announcement" maxlength="180" value="${escapeHTML(state.site.announcement)}"/></label><label class="admin-field"><span>Home greeting</span><input class="text-input" name="welcome" maxlength="50" value="${escapeHTML(state.site.welcome)}" required/></label><button class="primary-button small" type="submit">Save website edits</button></form></section>
    <section class="panel admin-section"><h2 class="panel-title">Custom theme colors</h2><p class="panel-copy">Choose colors for this browser. Reset to use the selected light or dark theme.</p><form class="admin-theme-form" id="admin-theme-form">${colors}<div class="admin-user-actions"><button class="primary-button small" type="submit">Save custom theme</button><button class="secondary-button small" type="button" data-admin-theme-reset>Reset to standard theme</button></div></form></section>`;
}

function renderMainContent() {
  if (route === "admin") return renderAdmin();
  if (route === "games") return renderGames();
  if (route === "catalog") return pageHeading("Avatar shop", "Little finishing touches, original looks, and a handful of shiny favorites.") + renderCatalog();
  if (route === "avatar") return renderAvatar();
  if (route === "friends") return renderFriends();
  if (route === "create") return renderCreate();
  if (route === "my-games") return renderMyGames();
  return renderHome();
}

function applyAnnouncement() {
  const current = document.querySelector(".site-announcement");
  if (!state.site.announcement) {
    current?.remove();
    return;
  }
  const banner = document.createElement("aside");
  banner.className = "site-announcement";
  banner.textContent = state.site.announcement;
  if (current) current.replaceWith(banner);
  else document.querySelector(".app-header")?.after(banner);
}

function applyBalanceDisplay() {
  const account = currentAccount();
  if (!account) return;
  const balances = [
    { node: document.querySelector(".cones-balance"), currency: "cones", label: "Cones" },
    { node: document.querySelector(".legacy-balance:not(.cones-balance)"), currency: "pix", label: "Pix" },
  ];
  for (const { node, currency, label } of balances) {
    if (!node) continue;
    const value = formatBalance(account, currency);
    node.querySelector(".balance-count").textContent = value;
    node.setAttribute("aria-label", `${value} ${label}`);
    node.setAttribute("title", `${value} ${label}`);
  }
}

const NAV_ITEMS = [
  { id: "games", label: "Games", icon: "games" },
  { id: "avatar", label: "Avatar Shop", icon: "avatar" },
  { id: "friends", label: "Friends", icon: "friends" },
  { id: "create", label: "Create", icon: "create" },
  { id: "catalog", label: "Robux", icon: "currency" },
];

const DESKTOP_NAV_IDS = ["games", "avatar", "create", "catalog"];

function renderNavButton(item, isMobile = false) {
  return `<button class="${isMobile ? "mobile-nav-button" : "nav-button"}${route === item.id || item.id === "catalog" && route === "catalog" ? " active" : ""}" data-route="${escapeHTML(item.id)}" aria-label="${escapeHTML(item.label)}">${isMobile ? `<span>${icon(item.icon)}</span><span>${escapeHTML(item.label)}</span>` : `<span class="nav-icon">${icon(item.icon)}</span><span class="nav-label">${escapeHTML(item.label)}</span>`}</button>`;
}

function renderApp() {
  const account = currentAccount();
  if (!account) {
    renderAuth();
    return;
  }
  if (account.banned) {
    state.session = null;
    route = "login";
    authMode = "login";
    authError = "This account is banned in this browser. Contact a Rocone administrator.";
    try {
      persist();
    } catch (error) {
      toast(error instanceof Error ? error.message : "The banned account session could not be cleared.", "error");
    }
    renderAuth();
    return;
  }
  if (route === "admin" && !account.isAdmin) route = "home";
  const adminMenuItem = account.isAdmin ? `<button class="menu-item${route === "admin" ? " active" : ""}" data-route="admin">${icon("settings")}Administration</button>` : "";
  app.innerHTML = `<header class="app-header"><div class="header-inner"><div class="legacy-brand-group"><button class="legacy-menu-button" data-drawer-toggle aria-label="Open navigation menu" aria-expanded="${drawerOpen}">${icon("menu")}</button><button class="legacy-brand" data-route="home" aria-label="${escapeHTML(state.site.name)} home"><span class="brand-mark">${escapeHTML(state.site.name.slice(0, 1).toUpperCase())}</span></button></div><nav class="header-nav" aria-label="Main navigation">${DESKTOP_NAV_IDS.map((id) => renderNavButton(NAV_ITEMS.find((item) => item.id === id))).join("")}</nav><label class="search-wrap">${icon("search", "search-icon")}<input id="global-search" class="search-input" type="search" placeholder="Search" aria-label="Search games" value="${route === "games" ? escapeHTML(gameSearch) : escapeHTML(catalogSearch)}"/></label><div class="header-actions"><button class="legacy-user-button" data-profile="${escapeHTML(account.id)}">${escapeHTML(account.username)}${account.isAdmin ? ' <span class="legacy-admin-badge">ADMIN</span>' : ' <span class="legacy-age">13+</span>'}</button><button class="legacy-icon-button" data-route="friends" aria-label="Friends and messages" title="Friends and messages">${icon("chat")}</button><span class="balance legacy-balance cones-balance" aria-label="${account.cones} Cones" title="${account.cones} Cones"><span class="balance-icon cones">◆</span><span class="balance-count">${account.cones}</span><span class="balance-label">Cones</span></span><span class="balance legacy-balance" aria-label="${account.pix} Pix" title="${account.pix} Pix"><span class="balance-icon">${icon("currency")}</span><span class="balance-count">${account.pix}</span><span class="balance-label">Pix</span></span><button class="legacy-icon-button" data-open-settings aria-label="Settings" title="Settings">${icon("settings")}</button><div class="account-menu-wrap"><button class="legacy-icon-button account-trigger" data-account-menu aria-label="Switch accounts" aria-expanded="${accountMenuOpen}" title="Switch accounts">${miniAvatar(account, "menu-avatar")}</button>${accountMenuOpen ? renderAccountMenu() : ""}</div></div>${drawerOpen ? `<aside class="legacy-drawer"><div class="menu-label">Your Rocone</div><button class="menu-item" data-route="home">${icon("home")}Home</button><button class="menu-item" data-route="friends">${icon("friends")}Friends</button><button class="menu-item" data-route="my-games">${icon("games")}My library</button><button class="menu-item" data-route="create">${icon("create")}Create a game</button>${adminMenuItem}<div class="subtle-divider"></div><button class="menu-item" data-open-settings>${icon("settings")}Settings & theme</button><div class="menu-label">Switch account</div>${state.accounts.map((item) => `<button class="menu-item" data-switch-account="${escapeHTML(item.id)}">${miniAvatar(item, "menu-avatar")}<span>${escapeHTML(item.username)}</span>${item.id === state.session ? '<span style="color:var(--accent)">✓</span>' : ""}</button>`).join("")}<button class="menu-item" data-new-account>${icon("plus")}Add an account</button><button class="menu-item" data-logout>Log out</button></aside>` : ""}</div></header><nav class="mobile-bottom-nav" aria-label="Mobile navigation">${NAV_ITEMS.filter((item) => item.id !== "catalog").map((item) => renderNavButton(item, true)).join("")}</nav><main class="main${route === "home" ? " legacy-home-main" : ""}">${renderMainContent()}</main>${route === "home" ? '<button class="classic-chat-button" data-route="friends"><span>Chat</span><span class="classic-chat-count">1</span></button>' : ""}${renderModal()}`;
  wireRenderedState();
  applyAnnouncement();
  applyBalanceDisplay();
}

function renderAccountMenu() {
  return `<div class="account-menu"><div class="menu-label">Your accounts</div>${state.accounts.filter((account) => !account.banned).map((account) => `<div class="account-switcher-row"><button class="menu-item" data-switch-account="${escapeHTML(account.id)}">${miniAvatar(account, "menu-avatar")}<span class="account-switcher-name">${escapeHTML(account.username)}</span>${account.id === state.session ? '<span style="color:var(--accent)">✓</span>' : ""}</button><button class="account-remove-button" data-remove-account="${escapeHTML(account.id)}" aria-label="Remove ${escapeHTML(account.username)} from saved accounts" title="Remove saved account">×</button></div>`).join("")}<div class="subtle-divider" style="margin:6px 4px"></div><button class="menu-item" data-new-account>${icon("plus")}Add another account</button><button class="menu-item" data-open-settings>${icon("settings")}Settings & theme</button><button class="menu-item" data-logout>Log out</button></div>`;
}

let openModal = null;
function renderModal() {
  if (!openModal) return "";
  if (openModal.type === "settings") return `<div class="modal-backdrop" data-backdrop><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="icon-button modal-close" data-close-modal aria-label="Close settings">${icon("close")}</button><h2 id="modal-title" class="modal-title">Make yourself at home.</h2><p class="modal-subtitle">A couple of switches to make your little corner of Rocone feel right.</p>${THEME_CHOICES.map((choice) => `<label class="setting-option" style="margin-bottom:10px"><input type="radio" name="theme-choice" value="${choice.id}"${state.theme === choice.id ? " checked" : ""}/><span class="setting-icon" style="background:${choice.swatch};color:${choice.id === "dark" ? "#fff" : "#222"}">${choice.id === "dark" ? icon("moon") : icon("sun")}</span><span class="setting-detail"><span class="setting-name">${choice.name} theme</span><span class="setting-help">${choice.id === "dark" ? "A quiet midnight palette with soft green." : "A bright, easy-on-the-eyes palette."}</span></span></label>`).join("")}<div class="subtle-divider"></div><p class="panel-copy"><strong style="color:var(--text)">Your data stays here.</strong> Accounts, passwords (hashed in your browser), friends, avatars, games, and purchases live in this browser's local storage. This demo does not send your details to a server.</p></section></div>`;
  if (openModal.type === "profile") {
    const person = findPerson(openModal.id);
    if (!person) return "";
    const isFriend = currentAccount().friends.includes(person.id);
    return `<div class="modal-backdrop" data-backdrop><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="icon-button modal-close" data-close-modal aria-label="Close profile">${icon("close")}</button><div class="profile-card">${miniAvatar(person, "person-avatar avatar-frame")}<div><h2 id="modal-title" class="modal-title">${escapeHTML(person.username)}</h2><p class="modal-subtitle" style="margin:0">${person.isDemo ? "Rocone community creator" : "Rocone player"}</p></div></div>${person.isDemo ? "" : `<div class="subtle-divider"></div><div class="play-metrics"><div class="metric"><strong>${person.friends.length}</strong>Friends</div><div class="metric"><strong>${person.games.length}</strong>Games</div><div class="metric"><strong>${person.runs}</strong>Runs</div></div>`}<div class="button-row" style="margin-top:20px">${isFriend ? `<button class="secondary-button" disabled>${icon("check")}Already friends</button>` : `<button class="primary-button" data-friend="${escapeHTML(person.id)}">${icon("plus")}Add friend</button>`}<button class="secondary-button" data-close-modal>Maybe later</button></div><section class="profile-games"><h3 class="panel-title">${person.isDemo ? "A little about this player" : "Games made"}</h3>${person.isDemo ? '<p class="profile-empty">An example community player, here to make your first visit to Rocone feel less like an empty room.</p>' : person.games.length ? `<div class="game-grid" style="grid-template-columns:repeat(auto-fill,minmax(140px,1fr));margin-top:12px">${person.games.map((game) => gameCard({ ...game, creator: person.username })).join("")}</div>` : '<p class="profile-empty">No games here just yet. Maybe make something together?</p>'}</section></section></div>`;
  }
  if (openModal.type === "play") return renderPlayModal();
  return "";
}

function renderPlayModal() {
  const game = allGames().find((item) => item.id === openModal.id);
  if (!game) return "";
  const gameBody = activeGame?.id === game.id
    ? `<div class="game-hud"><span>✦ <span id="run-score">0</span></span><span>Best ${activeGame.best}</span><span>Time <span id="run-time">30</span>s</span></div><div class="playground-sky"></div><div class="playground-ground"></div><div id="player-piece" class="player-piece" role="img" aria-label="Your player">▲</div><div id="obstacle-piece" class="obstacle-piece" aria-label="Obstacle">✦</div><div id="collectible-piece" class="collectible-piece" aria-label="Collectible Pix">✦</div>`
    : `<div class="playground-sky"></div><div class="playground-ground"></div><div class="player-piece" style="left:36%;transform:rotate(-7deg)">▲</div><div class="collectible-piece" style="right:35%;top:35%">✦</div><div class="obstacle-piece" style="right:17%">✦</div>`;
  const directions = `<div class="direction-pad"><button class="secondary-button small" data-game-move="left" aria-label="Move left">← Left</button><button class="secondary-button small" data-game-move="jump" aria-label="Jump">↑ Jump</button><button class="primary-button small" data-game-move="collect" aria-label="Collect Pix">✦ Collect Pix</button><button class="secondary-button small" data-game-move="right" aria-label="Move right">Right →</button></div>`;
  return `<div class="modal-backdrop" data-backdrop><section class="modal wide" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="icon-button modal-close" data-close-modal aria-label="Close game">${icon("close")}</button><div class="game-board">${gameBody}</div><h2 id="modal-title" class="modal-title" style="margin-top:20px">${escapeHTML(game.name)}</h2><p class="modal-subtitle">Made by ${escapeHTML(game.creator)} · ${escapeHTML(game.genre)}</p>${activeGame?.id === game.id ? directions + '<p class="game-instructions">Use the ← → keys to dodge; press Space or ↑ to jump. Collect Pix, dodge blocks, and survive 30 seconds!</p>' : `<p class="page-subtitle" style="margin:10px 0 17px">${escapeHTML(game.description || "A brand-new community creation. Jump in and make it your own.")}</p><div class="button-row"><button class="primary-button" data-start-game="${escapeHTML(game.id)}">${icon("play")}${game.type === "party" ? "Visit this world" : "Play a round"}</button><button class="secondary-button" data-favorite="${escapeHTML(game.id)}">${state.favorites.includes(game.id) ? "♥ Saved" : "♡ Save game"}</button></div>${activeGame?.finished ? '<p class="game-instructions">Great run! Your Pix are waiting in your balance.</p>' : '<p class="game-instructions">A small, playable Rocone arcade—right in your browser.</p>'}`}</section></div>`;
}

function createSceneCollage() {
  const scenes = [
    ["#577da7", "#e7a862", "#e7cb87"],
    ["#795be3", "#262e75", "#77d8e8"],
    ["#e29061", "#843e52", "#f1c57a"],
    ["#4ca88f", "#2b655e", "#f4cb88"],
    ["#529cbe", "#535694", "#f4d597"],
    ["#dd7297", "#54366d", "#f2c486"],
    ["#617da6", "#36565f", "#f2c989"],
    ["#6a9b67", "#4a674d", "#efc77d"],
    ["#db8064", "#6b4761", "#e9bb86"],
    ["#525e9b", "#343265", "#f5c973"],
    ["#459698", "#37547b", "#edc68e"],
    ["#c280ac", "#694a91", "#f2bd78"],
    ["#5686ab", "#49527e", "#edca95"],
    ["#b98448", "#60523c", "#f4c474"],
    ["#6b76af", "#5a447e", "#f5d283"],
    ["#54a283", "#43665a", "#ecc68b"],
    ["#c87b69", "#613959", "#efd295"],
    ["#428aae", "#426277", "#eabd84"],
    ["#8e78b0", "#514776", "#f4c787"],
    ["#64a77e", "#395a4b", "#f0bf7a"],
    ["#cf9260", "#635568", "#f2d49a"],
  ];
  return scenes.map(([a, b, face], index) => `<div class="auth-scene" style="--scene-a:${a};--scene-b:${b};--scene-face:${face};--scene-shirt:${["#60c49a", "#658ee0", "#dd7866", "#d7a14d"][index % 4]};--tilt:${index % 2 === 0 ? "3deg" : "-4deg"}"></div>`).join("");
}

function renderAuth() {
  const signup = authMode === "signup";
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({ length: 101 }, (_, index) => new Date().getFullYear() - index);
  const savedAccounts = state.accounts.filter((account) => !account.banned);
  const savedAccountPicker = !signup && savedAccounts.length
    ? `<section class="saved-account-picker" aria-label="Saved accounts"><h2>Choose a saved account</h2><div>${savedAccounts.map((account) => `<div class="saved-account-row"><button class="saved-account-select" data-login-account="${escapeHTML(account.id)}">${miniAvatar(account, "menu-avatar")}<span>${escapeHTML(account.username)}${account.isFake ? " · demo" : ""}</span></button><button class="account-remove-button" data-remove-account="${escapeHTML(account.id)}" aria-label="Remove ${escapeHTML(account.username)} from saved accounts" title="Remove saved account">×</button></div>`).join("")}</div></section>`
    : "";
  const birthdayFields = `<label class="form-label"><span>Birthday</span><div class="auth-birthday-grid"><select class="select-input" name="birthMonth" aria-label="Birthday month" required><option value="">Month</option>${months.map((month, index) => `<option value="${index + 1}">${month}</option>`).join("")}</select><select class="select-input" name="birthDay" aria-label="Birthday day" required><option value="">Day</option>${Array.from({ length: 31 }, (_, index) => `<option value="${index + 1}">${index + 1}</option>`).join("")}</select><select class="select-input" name="birthYear" aria-label="Birthday year" required><option value="">Year</option>${years.map((year) => `<option value="${year}">${year}</option>`).join("")}</select></div></label>`;
  const genderField = `<fieldset class="auth-gender-fieldset"><legend class="auth-gender-legend">Gender</legend><div class="auth-gender-grid"><label><input type="radio" name="gender" value="boy"/><span aria-label="Boy">♙</span></label><label><input type="radio" name="gender" value="girl"/><span aria-label="Girl">♙</span></label></div></fieldset>`;
  const footer = `<section class="auth-below-card"><h2>ROCONE ON YOUR DEVICE</h2><div class="auth-store-badges"><a href="#app-store" data-ad-placeholder><span>●</span> App Store</a><a href="#google-play" data-ad-placeholder><span>▶</span> Google Play</a><a href="#amazon-store" data-ad-placeholder><span>amazon</span> appstore</a><a href="#xbox" data-ad-placeholder><span>◉</span> XBOX ONE</a><a href="#microsoft" data-ad-placeholder><span>▦</span> Microsoft</a></div></section><footer class="auth-footer"><nav>${["About Us", "Jobs", "Blog", "Parents", "Help", "Terms", "Privacy"].map((label) => `<a href="#${label.toLowerCase().replace(" ", "-")}" data-ad-placeholder>${label}</a>`).join("")}</nav><div class="auth-footer-bottom"><span>◉ &nbsp; English　⌄</span><small>Local demo. Accounts and games are saved in this browser only; store badges and information links are examples.</small></div></footer>`;
  app.innerHTML = `
    <main class="auth-screen">
      <section class="auth-content">
        <div class="auth-brand"><span class="auth-wordmark">${escapeHTML(state.site.name)}</span></div>
        <div class="auth-card">
          <h1 class="auth-heading">${signup ? "SIGN UP AND START HAVING FUN!" : "WELCOME BACK!"}</h1>
          ${signup ? "" : `<p class="auth-description">Pick up right where you left off.</p>`}
          ${savedAccountPicker}
          <form id="auth-form" class="auth-form">
            ${signup ? birthdayFields : ""}
            <label class="form-label">
              <span>Username</span>
              <input class="text-input" name="username" minlength="${signup ? "3" : "1"}" maxlength="${signup ? "20" : "40"}" ${signup ? 'pattern="[A-Za-z0-9_]+" required' : ""} autocomplete="username" placeholder="Username" ${signup ? "required" : ""} autofocus/>
            </label>
            ${signup ? `<span class="auth-input-note">Don't use your real name</span>` : ""}
            <label class="form-label">
              <span>Password</span>
              <input class="text-input" name="password" type="password" minlength="8" autocomplete="${signup ? "new-password" : "current-password"}" placeholder="Password" required/>
            </label>
            ${signup ? genderField : ""}
            ${authError ? `<p role="alert" class="auth-error">${escapeHTML(authError)}</p>` : ""}
            ${signup ? `<p class="auth-terms">By clicking Sign Up, you are agreeing to the <a href="#terms" data-ad-placeholder>Terms of Use</a> and acknowledging the <a href="#privacy" data-ad-placeholder>Privacy Policy.</a></p>` : ""}
            <button class="primary-button auth-submit" type="submit"${authBusy ? " disabled" : ""}>${authBusy ? "Please wait…" : signup ? "Sign Up" : "Log In"}</button>
          </form>
          <p class="auth-toggle">${signup ? "Already have an account?" : "New to Rocone?"} <button class="text-button" data-auth-mode="${signup ? "login" : "signup"}">${signup ? "Log In" : "Sign Up"}</button></p>
          ${!signup ? `<p class="auth-footnote">Your account is saved privately in this browser.</p>` : ""}
        </div>
        ${signup ? footer : ""}
      </section>
    </main>`;
}

function toast(message, kind = "success") {
  const region = document.getElementById("toast-region");
  if (!region) return;
  const el = document.createElement("div");
  el.className = `toast${kind === "error" ? " error" : ""}`;
  el.setAttribute("role", kind === "error" ? "alert" : "status");
  el.innerHTML = `<span class="toast-icon">${kind === "error" ? "!" : "✓"}</span><span>${escapeHTML(message)}</span>`;
  region.appendChild(el);
  const timer = setTimeout(() => {
    el.remove();
    toastTimers.delete(timer);
  }, 3400);
  toastTimers.add(timer);
}

function commitOrToast(message = "Saved.") {
  try {
    persist();
    renderApp();
    if (message) toast(message);
    return true;
  } catch (error) {
    toast(error instanceof Error ? error.message : "Your changes could not be saved.", "error");
    return false;
  }
}

function navigate(destination) {
  if (!currentAccount() && destination !== "login" && destination !== "signup") return;
  if (destination === "admin" && !currentAccount()?.isAdmin) {
    toast("Administrator access is required.", "error");
    return;
  }
  route = destination;
  accountMenuOpen = false;
  drawerOpen = false;
  if (route === "catalog") catalogSearch = "";
  if (route === "games") gameSearch = "";
  renderApp();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setAccount(accountId) {
  const account = state.accounts.find((candidate) => candidate.id === accountId);
  if (!account || account.banned) {
    toast("That account is no longer saved here.", "error");
    return;
  }
  if (activeGame?.timerId) clearInterval(activeGame.timerId);
  activeGame = null;
  const previousSession = state.session;
  state.session = accountId;
  route = "home";
  accountMenuOpen = false;
  if (!commitOrToast(`Welcome back, ${account.username}!`)) {
    state.session = previousSession;
    renderApp();
  }
}

async function derivePasswordHash(password, saltHex) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Secure password storage isn't available in this browser context. Open Rocone on localhost or in a modern, secure browser.");
  }
  const encoder = new TextEncoder();
  const salt = Uint8Array.from(saltHex.match(/.{1,2}/g).map((part) => Number.parseInt(part, 16)));
  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: PBKDF2_ITERATIONS }, keyMaterial, 256);
  return Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  if (authBusy) return;
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  const values = new FormData(form);
  const username = String(values.get("username") || "").trim();
  const password = String(values.get("password") || "");
  const normalUsername = username.toLocaleLowerCase();
  authError = "";

  if (authMode === "signup" && !/^[A-Za-z0-9_]{3,20}$/.test(username)) {
    authError = "Choose 3–20 letters, numbers, or underscores for your username.";
    renderAuth();
    return;
  }
  if (authMode === "login" && !username) {
    authError = "Enter a username.";
    renderAuth();
    return;
  }
  if (password.length < 8) {
    authError = "Your password needs at least 8 characters.";
    renderAuth();
    return;
  }
  if (authMode === "signup" && ADMIN_USERNAMES.has(normalUsername)) {
    authError = "That username is reserved for Rocone's administrator accounts.";
    renderAuth();
    return;
  }
  if (authMode === "signup") {
    const month = Number(values.get("birthMonth"));
    const day = Number(values.get("birthDay"));
    const year = Number(values.get("birthYear"));
    const birthday = new Date(year, month - 1, day);
    const today = new Date();
    const cutoff = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
    if (!month || !day || !year || birthday.getFullYear() !== year || birthday.getMonth() !== month - 1 || birthday.getDate() !== day) {
      authError = "Please choose a valid birthday to sign up.";
      renderAuth();
      return;
    }
    if (birthday > cutoff) {
      authError = "You need to be 13 or older to sign up for Rocone.";
      renderAuth();
      return;
    }
  }

  authBusy = true;
  renderAuth();
  try {
    if (authMode === "signup") {
      if (state.accounts.some((account) => account.username.toLocaleLowerCase() === normalUsername)) {
        authError = "That username is already saved in this browser. Try another one or log in.";
        authBusy = false;
        renderAuth();
        return;
      }
      const randomSalt = crypto.getRandomValues(new Uint8Array(16));
      const salt = Array.from(randomSalt, (byte) => byte.toString(16).padStart(2, "0")).join("");
      const passwordHash = await derivePasswordHash(password, salt);
      const shirtChoice = { blue: "#5687e8", green: "#46ae83", red: "#f06463" }[String(values.get("starter"))] || "#5687e8";
      const account = cleanAccount({
        id: makeId(),
        username,
        salt,
        passwordHash,
        cones: 75,
        pix: 125,
        avatar: { skin: "#f3c887", shirt: shirtChoice, pants: "#38435d", face: "smile", equipped: null },
        owned: [],
        friends: [],
        games: [],
        createdAt: new Date().toISOString(),
        runs: 0,
      });
      state.accounts.push(account);
      state.session = account.id;
      selectedLoginAccountId = null;
      route = "home";
      authBusy = false;
      if (!commitOrToast(`Your world is ready. Welcome, ${account.username}!`)) {
        state.accounts = state.accounts.filter((candidate) => candidate.id !== account.id);
        state.session = null;
        route = "signup";
        renderAuth();
      }
      return;
    }

    if (!selectedLoginAccountId && ADMIN_USERNAMES.has(normalUsername)) {
      const passwordHash = await derivePasswordHash(password, ADMIN_PASSWORD_SALT);
      if (passwordHash !== ADMIN_PASSWORD_HASH) {
        authError = "That administrator password doesn't match.";
        authBusy = false;
        renderAuth();
        return;
      }
      const previousState = JSON.stringify(state);
      let account = state.accounts.find((candidate) => candidate.isRootAdmin && candidate.username.toLocaleLowerCase() === normalUsername);
      if (!account) {
        account = cleanAccount({
          id: makeId(),
          username: ADMIN_USERNAMES.get(normalUsername),
          salt: ADMIN_PASSWORD_SALT,
          passwordHash: ADMIN_PASSWORD_HASH,
          isAdmin: true,
          isRootAdmin: true,
          cones: 75,
          pix: 125,
          avatar: { skin: "#f3c887", shirt: "#5687e8", pants: "#38435d", face: "smile", equipped: null },
          owned: [],
          friends: [],
          games: [],
          createdAt: new Date().toISOString(),
          runs: 0,
        });
        state.accounts.push(account);
      } else {
        account.username = ADMIN_USERNAMES.get(normalUsername);
        account.salt = ADMIN_PASSWORD_SALT;
        account.passwordHash = ADMIN_PASSWORD_HASH;
        account.isAdmin = true;
        account.isRootAdmin = true;
        account.banned = false;
      }
      state.session = account.id;
      route = "home";
      authBusy = false;
      if (!commitOrToast(`Administrator access granted. Welcome, ${account.username}.`)) {
        state = JSON.parse(previousState);
        renderAuth();
      }
      return;
    }

    const matchingAccounts = state.accounts.filter((candidate) => candidate.username.toLocaleLowerCase() === normalUsername);
    const account = selectedLoginAccountId
      ? state.accounts.find((candidate) => candidate.id === selectedLoginAccountId)
      : matchingAccounts.length === 1 ? matchingAccounts[0] : null;
    if (!selectedLoginAccountId && matchingAccounts.length > 1) {
      authError = "More than one saved account has that name. Choose the correct account above.";
    } else
    if (!account) {
      authError = "We couldn't find that username in this browser. Check it, or create a new account.";
    } else if (account.banned) {
      authError = "This account is banned in this browser. Contact a Rocone administrator.";
    } else {
      const passwordHash = await derivePasswordHash(password, account.salt);
      if (!account.passwordHash || passwordHash !== account.passwordHash) {
        authError = "That password doesn't match this account. Give it another try.";
      } else {
        state.session = account.id;
        selectedLoginAccountId = null;
        route = "home";
        authBusy = false;
        if (!commitOrToast(`Welcome back, ${account.username}!`)) {
          state.session = null;
          renderAuth();
        }
        return;
      }
    }
  } catch (error) {
    authError = error instanceof Error ? error.message : "Couldn't save your account. Please try again.";
  }
  authBusy = false;
  renderAuth();
}

function handleSignupGame(event) {
  event.preventDefault();
  const account = currentAccount();
  const form = event.target;
  if (!account || !(form instanceof HTMLFormElement)) return;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const description = String(data.get("description") || "").trim();
  const genre = String(data.get("genre") || "");
  if (name.length < 2 || description.length < 6 || !GAME_GENRES.slice(1).includes(genre)) {
    toast("Give your game a name, a little description, and a genre.", "error");
    return;
  }
  const palette = GAME_PALETTES.find((option) => option.id === creatorPalette) || GAME_PALETTES[0];
  const game = {
    id: makeId(),
    name,
    description,
    genre,
    sky: palette.sky,
    ground: palette.ground,
    char: palette.char,
    icon: genre === "Adventure" ? "✦" : genre === "Obby" ? "★" : genre === "Roleplay" ? "♥" : genre === "Simulator" ? "✹" : genre === "Social" ? "✿" : "▲",
    createdAt: new Date().toISOString(),
  };
  account.games.push(game);
  route = "my-games";
  if (!commitOrToast(`"${name}" is on the shelf! It's yours to play.`)) {
    account.games.pop();
    route = "create";
    renderApp();
  }
}

function updateFriendSearch(value) {
  const account = currentAccount();
  const target = document.getElementById("friend-suggestions");
  if (!account || !target) return;
  const query = value.trim();
  const people = [...SEED_PEOPLE, ...state.accounts.filter((person) => person.id !== account.id)];
  const suggestions = people.filter((person) => !account.friends.includes(person.id) && person.id !== account.id && (!query || person.username.toLowerCase().includes(query.toLowerCase()))).slice(0, 10);
  target.innerHTML = suggestions.length ? suggestions.map((person) => `<div class="friend-row">${miniAvatar(person)}<div class="friend-details"><h3 class="friend-username">${escapeHTML(person.username)}</h3><div class="friend-status">${person.id.startsWith("seed-") ? "Rocone community" : "Player"}</div></div><button class="primary-button small" data-friend="${escapeHTML(person.id)}" aria-label="Add ${escapeHTML(person.username)} as a friend">${icon("plus")}</button></div>`).join("") : '<p class="panel-copy" style="padding:12px 0">No players found. Try searching for someone else.</p>';
}

function changeAvatar(group, value) {
  const account = currentAccount();
  if (!account || !["skin", "shirt", "pants", "face", "equipped"].includes(group)) return;
  if (group === "equipped") {
    if (value && (!account.owned.includes(value) || !CATALOG.some((item) => item.id === value))) {
      toast("That accessory isn't in your closet yet.", "error");
      return;
    }
    account.avatar.equipped = value || null;
  } else if (group === "face" && ["smile", "wink", "cool", "star"].includes(value)) {
    account.avatar.face = value;
  } else if ((group === "skin" && SKIN_COLORS.some((item) => item.id === value)) || (group === "shirt" && SHIRT_COLORS.some((item) => item.id === value)) || (group === "pants" && PANTS_COLORS.some((item) => item.id === value))) {
    account.avatar[group] = value;
  } else {
    toast("That avatar choice isn't available.", "error");
    return;
  }
  commitOrToast("Avatar updated.");
}

function buyItem(id) {
  const account = currentAccount();
  const item = CATALOG.find((candidate) => candidate.id === id);
  if (!account || !item) return;
  if (account.owned.includes(id)) {
    toast("You already have that one. Go wear it!", "error");
    return;
  }
  const key = item.currency;
  if (!hasInfiniteBalance(account, key) && account[key] < item.price) {
    toast(`You need ${item.price} ${key === "cones" ? "Cones" : "Pix"} to pick this up.`, "error");
    return;
  }
  if (!hasInfiniteBalance(account, key)) account[key] -= item.price;
  account.owned.push(id);
  commitOrToast(`Picked up ${item.name}! It's all yours.`);
}

function toggleFavorite(id) {
  const index = state.favorites.indexOf(id);
  if (index >= 0) state.favorites.splice(index, 1);
  else state.favorites.push(id);
  return commitOrToast(index >= 0 ? "Removed from your favorites." : "Saved to your favorite games.");
}

function addFriend(id) {
  const account = currentAccount();
  const person = findPerson(id);
  if (!account || !person || id === account.id || account.friends.includes(id)) {
    toast("This player is already on your friends list.", "error");
    return;
  }
  const added = [];
  account.friends.push(id);
  added.push([account, id]);
  const otherAccount = state.accounts.find((candidate) => candidate.id === id);
  if (otherAccount && !otherAccount.friends.includes(account.id)) {
    otherAccount.friends.push(account.id);
    added.push([otherAccount, account.id]);
  }
  const oldModal = openModal;
  openModal = null;
  if (!commitOrToast(`${person.username} is now your friend!`)) {
    for (const [owner, friendId] of added) owner.friends = owner.friends.filter((existing) => existing !== friendId);
    openModal = oldModal;
    renderApp();
  }
}

function removeFriend(id) {
  const account = currentAccount();
  if (!account) return;
  const person = findPerson(id);
  const previous = account.friends;
  account.friends = previous.filter((friendId) => friendId !== id);
  const other = state.accounts.find((candidate) => candidate.id === id);
  const previousOther = other?.friends;
  if (other) other.friends = other.friends.filter((friendId) => friendId !== account.id);
  if (!commitOrToast(person ? `${person.username} was removed from your friends.` : "Friend removed.")) {
    account.friends = previous;
    if (other && previousOther) other.friends = previousOther;
    renderApp();
  }
}

function startGame(id) {
  const game = allGames().find((item) => item.id === id);
  if (!game) return;
  const nextRecent = [id, ...state.recentGames.filter((item) => item !== id)].slice(0, 12);
  state.recentGames = nextRecent;
  if (!commitOrToast(null)) {
    state.recentGames = state.recentGames.filter((item) => item !== id);
    return;
  }
  if (activeGame?.timerId) clearInterval(activeGame.timerId);
  const best = Number(localStorage.getItem(`${STORAGE_KEY}.best.${currentAccount().id}.${id}`)) || 0;
  activeGame = { id, score: 0, best, time: 30, lane: 45, running: true, finished: false, timerId: null, lastReward: 0 };
  openModal = { type: "play", id };
  renderApp();
  activeGame.timerId = setInterval(gameTick, 1100);
  gameTick();
}

function gameTick() {
  if (!activeGame?.running || !openModal || openModal.type !== "play") return;
  activeGame.time = Math.max(0, activeGame.time - 1);
  const scoreNode = document.getElementById("run-score");
  const timeNode = document.getElementById("run-time");
  const blocker = document.getElementById("obstacle-piece");
  const collectible = document.getElementById("collectible-piece");
  const player = document.getElementById("player-piece");
  if (timeNode) timeNode.textContent = String(activeGame.time);
  if (blocker) blocker.style.right = `${9 + Math.random() * 77}%`;
  if (collectible) collectible.style.right = `${8 + Math.random() * 78}%`;
  if (player) player.style.left = `${activeGame.lane}%`;
  if (scoreNode && Math.random() > 0.45) {
    activeGame.score += 1;
    scoreNode.textContent = String(activeGame.score);
  }
  if (activeGame.time === 0) finishGame();
}

function movePlayer(direction) {
  if (!activeGame?.running) return;
  if (direction === "left") activeGame.lane = Math.max(10, activeGame.lane - 14);
  if (direction === "right") activeGame.lane = Math.min(90, activeGame.lane + 14);
  if (direction === "jump") {
    const player = document.getElementById("player-piece");
    player?.classList.add("jumping");
    setTimeout(() => player?.classList.remove("jumping"), 320);
  }
  if (direction === "collect") {
    const account = currentAccount();
    if (!account || !activeGame.running) return;
    if (Date.now() - (activeGame.lastCollectAt || 0) < 650) return;
    activeGame.lastCollectAt = Date.now();
    if (!account.pixInfinite) account.pix += 2;
    activeGame.score += 1;
    activeGame.lastReward += 2;
    const scoreNode = document.getElementById("run-score");
    if (scoreNode) scoreNode.textContent = String(activeGame.score);
    try {
      persist();
      applyBalanceDisplay();
    } catch (error) {
      if (!account.pixInfinite) account.pix -= 2;
      activeGame.score -= 1;
      toast(error instanceof Error ? error.message : "Your Pix could not be saved.", "error");
    }
  }
  const player = document.getElementById("player-piece");
  if (player) player.style.left = `${activeGame.lane}%`;
}

function finishGame() {
  if (!activeGame || !activeGame.running) return;
  clearInterval(activeGame.timerId);
  activeGame.timerId = null;
  activeGame.running = false;
  activeGame.finished = true;
  activeGame.best = Math.max(activeGame.best, activeGame.score);
  const account = currentAccount();
  if (!account) return;
  account.runs += 1;
  const bonus = 10 + Math.min(20, Math.floor(activeGame.score / 2));
  if (!account.pixInfinite) account.pix += bonus;
  activeGame.lastReward += bonus;
  try {
    localStorage.setItem(`${STORAGE_KEY}.best.${account.id}.${activeGame.id}`, String(activeGame.best));
    persist();
  } catch (error) {
    if (!account.pixInfinite) account.pix -= bonus;
    account.runs = Math.max(0, account.runs - 1);
    toast(error instanceof Error ? error.message : "Your run could not be saved.", "error");
  }
  const playButton = document.getElementById("run-time");
  if (playButton) playButton.textContent = "0";
  const hud = document.querySelector(".game-hud");
  if (hud) hud.innerHTML = `<span>✦ ${activeGame.score} score</span><span>Best ${activeGame.best}</span><span>Finished!</span>`;
  const instruction = document.querySelector(".game-instructions");
  if (instruction) instruction.textContent = `Great run! ${account.username}, you found ${activeGame.lastReward} Pix. Your score: ${activeGame.score}.`;
  toast(`Run complete! You picked up ${activeGame.lastReward} Pix.`);
  applyBalanceDisplay();
}

function startSearch(destination, input) {
  if (!destination || !input) return;
  const query = input.value;
  if (destination === "games") {
    if (route !== "games") navigate("games");
    gameSearch = query;
    const newInput = document.getElementById("global-search");
    if (newInput) newInput.value = query;
    refreshGameCards();
  } else {
    if (route !== "catalog") navigate("catalog");
    catalogSearch = query;
    const newInput = document.getElementById("global-search");
    if (newInput) newInput.value = query;
    refreshCatalog();
  }
}

function refreshCatalog() {
  const main = document.querySelector(".main");
  if (main && route === "catalog") {
    main.innerHTML = pageHeading("Avatar shop", "Little finishing touches, original looks, and a handful of shiny favorites.") + renderCatalog();
  }
}

function refreshGameCards() {
  const main = document.querySelector(".main");
  if (!main || route !== "games") return;
  main.innerHTML = renderGames();
}

function commitAdminMutation(snapshot, message) {
  try {
    persist();
    renderApp();
    toast(message);
    return true;
  } catch (error) {
    state = JSON.parse(snapshot);
    applyTheme();
    renderApp();
    toast(error instanceof Error ? error.message : "The administrator change could not be saved.", "error");
    return false;
  }
}

function saveAdminAccount(id) {
  if (!currentAccount()?.isAdmin) {
    toast("Administrator access is required.", "error");
    return;
  }
  const account = state.accounts.find((candidate) => candidate.id === id && !candidate.isRootAdmin);
  const row = [...document.querySelectorAll(".admin-user-row")].find((candidate) => candidate.querySelector(`[data-admin-username="${id}"]`));
  if (!account || !row) return;
  const username = row.querySelector(`[data-admin-username="${id}"]`).value.trim();
  const cones = Number(row.querySelector(`[data-admin-cones="${id}"]`).value);
  const pix = Number(row.querySelector(`[data-admin-pix="${id}"]`).value);
  const conesInfinite = row.querySelector(`[data-admin-cones-infinite="${id}"]`).checked;
  const pixInfinite = row.querySelector(`[data-admin-pix-infinite="${id}"]`).checked;
  if (!username || username.length > 40) {
    toast("Enter a display name from 1 to 40 characters.", "error");
    return;
  }
  if (account.isAdmin && ADMIN_USERNAMES.has(username.toLocaleLowerCase())) {
    toast("Administrator accounts must use a different display name.", "error");
    return;
  }
  if (!Number.isSafeInteger(cones) || !Number.isSafeInteger(pix) || cones < 0 || pix < 0) {
    toast("Balances must be non-negative whole numbers within the safe integer range.", "error");
    return;
  }
  const snapshot = JSON.stringify(state);
  account.username = username;
  account.cones = cones;
  account.pix = pix;
  account.conesInfinite = conesInfinite;
  account.pixInfinite = pixInfinite;
  commitAdminMutation(snapshot, `Saved edits for ${username}.`);
}

function toggleAdminBan(id, shouldBan) {
  if (!currentAccount()?.isAdmin) {
    toast("Administrator access is required.", "error");
    return;
  }
  const account = state.accounts.find((candidate) => candidate.id === id && !candidate.isRootAdmin);
  if (!account) {
    toast("That player can't be moderated.", "error");
    return;
  }
  const row = [...document.querySelectorAll(".admin-user-row")].find((candidate) => candidate.querySelector(`[data-admin-ban="${id}"]`));
  const reason = shouldBan ? row?.querySelector(`[data-admin-reason="${id}"]`)?.value.trim().slice(0, 160) || "" : "";
  const snapshot = JSON.stringify(state);
  account.banned = shouldBan;
  account.banReason = reason;
  if (shouldBan) {
    for (const player of state.accounts) player.friends = player.friends.filter((friendId) => friendId !== id);
  }
  commitAdminMutation(snapshot, shouldBan ? `${account.username} was banned in this browser.` : `${account.username} was unbanned.`);
}

function removeAdminGame(ownerId, gameId) {
  if (!currentAccount()?.isAdmin) {
    toast("Administrator access is required.", "error");
    return;
  }
  const owner = state.accounts.find((account) => account.id === ownerId);
  const index = owner?.games.findIndex((game) => game.id === gameId) ?? -1;
  if (!owner || index < 0) {
    toast("That community game is no longer available.", "error");
    return;
  }
  const snapshot = JSON.stringify(state);
  const [removedGame] = owner.games.splice(index, 1);
  state.favorites = state.favorites.filter((id) => id !== gameId);
  state.recentGames = state.recentGames.filter((id) => id !== gameId);
  commitAdminMutation(snapshot, `Removed "${removedGame.name}" from community games.`);
}

function makeSalt() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function toggleAdminRole(id) {
  if (!currentAccount()?.isAdmin) return toast("Administrator access is required.", "error");
  const account = state.accounts.find((candidate) => candidate.id === id && !candidate.isRootAdmin);
  if (!account) return toast("That account's administrator role can't be changed.", "error");
  if (!account.isAdmin && ADMIN_USERNAMES.has(account.username.toLocaleLowerCase())) {
    return toast("Use a different display name before granting administrator access.", "error");
  }
  const snapshot = JSON.stringify(state);
  account.isAdmin = !account.isAdmin;
  const previousRoute = route;
  if (!account.isAdmin && account.id === state.session) route = "home";
  if (!commitAdminMutation(snapshot, account.isAdmin ? `${account.username} is now an administrator.` : `${account.username} is no longer an administrator.`)) route = previousRoute;
}

function saveAdminAvatar(id) {
  if (!currentAccount()?.isAdmin) return toast("Administrator access is required.", "error");
  const account = state.accounts.find((candidate) => candidate.id === id && !candidate.isRootAdmin);
  if (!account) return toast("That account can't be edited.", "error");
  const row = [...document.querySelectorAll(".admin-user-row")].find((candidate) => candidate.querySelector(`[data-admin-avatar="${id}"]`));
  if (!row) return;
  const parts = ["skin", "shirt", "pants"];
  const avatar = Object.fromEntries(parts.map((part) => [part, row.querySelector(`[data-admin-avatar="${id}"][data-avatar-part="${part}"]`)?.value]));
  const face = row.querySelector(`[data-admin-face="${id}"]`)?.value;
  if (parts.some((part) => !isHexColor(avatar[part])) || !["smile", "wink", "cool", "star"].includes(face)) {
    return toast("Choose valid colors and a supported face.", "error");
  }
  const snapshot = JSON.stringify(state);
  Object.assign(account.avatar, avatar, { face });
  commitAdminMutation(snapshot, `Updated ${account.username}'s avatar.`);
}

async function saveAdminPassword(id) {
  if (!currentAccount()?.isAdmin) return toast("Administrator access is required.", "error");
  const account = state.accounts.find((candidate) => candidate.id === id && !candidate.isRootAdmin);
  const input = document.querySelector(`[data-admin-password="${id}"]`);
  const password = input instanceof HTMLInputElement ? input.value : "";
  if (!account || password.length < 8) return toast("Enter a new password with at least 8 characters.", "error");
  try {
    const salt = makeSalt();
    const passwordHash = await derivePasswordHash(password, salt);
    const currentTarget = state.accounts.find((candidate) => candidate.id === id && !candidate.isRootAdmin);
    if (!currentAccount()?.isAdmin || !currentTarget) return toast("Administrator access is required.", "error");
    const snapshot = JSON.stringify(state);
    currentTarget.salt = salt;
    currentTarget.passwordHash = passwordHash;
    commitAdminMutation(snapshot, `Changed ${currentTarget.username}'s password.`);
  } catch (error) {
    toast(error instanceof Error ? error.message : "The password could not be changed.", "error");
  }
}

async function createAdminAccount(form) {
  if (!currentAccount()?.isAdmin || !(form instanceof HTMLFormElement)) return;
  const values = new FormData(form);
  const username = String(values.get("username") || "").trim();
  const password = String(values.get("password") || "");
  const isFake = values.has("fake");
  if (!username || username.length > 40 || (!isFake && password.length < 8)) {
    return toast("Enter a display name and, for real accounts, a password of at least 8 characters.", "error");
  }
  const effectivePassword = isFake ? Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, "0")).join("") : password;
  const salt = makeSalt();
  try {
    const passwordHash = await derivePasswordHash(effectivePassword, salt);
    if (!currentAccount()?.isAdmin) return toast("Administrator access is required.", "error");
    const snapshot = JSON.stringify(state);
    const account = cleanAccount({
      id: makeId(), username, salt, passwordHash, isFake,
      cones: 75, pix: 125,
      avatar: { skin: "#f3c887", shirt: "#5687e8", pants: "#38435d", face: "smile", equipped: null },
      owned: [], friends: [], games: [], createdAt: new Date().toISOString(), runs: 0,
    });
    state.accounts.push(account);
    commitAdminMutation(snapshot, `${isFake ? "Fake/demo user" : "User"} ${username} created.`);
  } catch (error) {
    toast(error instanceof Error ? error.message : "The account could not be created.", "error");
  }
}

function toggleAdminGameBan(gameId, shouldBan) {
  if (!currentAccount()?.isAdmin) return toast("Administrator access is required.", "error");
  const known = GAMES.some((game) => game.id === gameId) || state.accounts.some((account) => account.games.some((game) => game.id === gameId));
  if (!known) return toast("That game is no longer available.", "error");
  const snapshot = JSON.stringify(state);
  state.bannedGames = shouldBan
    ? [...new Set([...state.bannedGames, gameId])]
    : state.bannedGames.filter((id) => id !== gameId);
  commitAdminMutation(snapshot, shouldBan ? "Game banned in this browser." : "Game ban lifted.");
}

function handleAdminSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return false;
  if (form.id === "admin-create-form") {
    event.preventDefault();
    createAdminAccount(form);
  } else if (form.id === "admin-site-form") {
    event.preventDefault();
    if (!currentAccount()?.isAdmin) return true;
    const values = new FormData(form);
    const name = String(values.get("siteName") || "").trim();
    const welcome = String(values.get("welcome") || "").trim();
    if (!name || !welcome) return toast("Site name and home greeting can't be empty.", "error"), true;
    const snapshot = JSON.stringify(state);
    state.site = { name: name.slice(0, 40), welcome: welcome.slice(0, 50), announcement: String(values.get("announcement") || "").trim().slice(0, 180) };
    commitAdminMutation(snapshot, "Website text updated.");
  } else if (form.id === "admin-theme-form") {
    event.preventDefault();
    if (!currentAccount()?.isAdmin) return true;
    const colors = {};
    for (const key of Object.keys(CUSTOM_THEME_VARS)) {
      const value = new FormData(form).get(`theme-${key}`);
      if (!isHexColor(value)) return toast("Choose a valid hex color for every theme value.", "error"), true;
      colors[key] = value;
    }
    const snapshot = JSON.stringify(state);
    state.customTheme = colors;
    commitAdminMutation(snapshot, "Custom theme saved.");
  }
  return true;
}

function selectLoginAccount(id) {
  const account = state.accounts.find((candidate) => candidate.id === id && !candidate.banned);
  if (!account) {
    toast("That saved account is no longer available.", "error");
    renderAuth();
    return;
  }
  authError = "";
  selectedLoginAccountId = account.id;
  renderAuth();
  const usernameInput = document.querySelector('#auth-form [name="username"]');
  const passwordInput = document.querySelector('#auth-form [name="password"]');
  if (usernameInput instanceof HTMLInputElement && passwordInput instanceof HTMLInputElement) {
    usernameInput.value = account.username;
    passwordInput.focus();
  }
}

function removeSavedAccount(id) {
  const index = state.accounts.findIndex((account) => account.id === id);
  if (index < 0) {
    toast("That saved account is no longer available.", "error");
    return;
  }
  const snapshot = JSON.stringify(state);
  const [account] = state.accounts.splice(index, 1);
  if (selectedLoginAccountId === id) selectedLoginAccountId = null;
  const removedGameIds = new Set(account.games.map((game) => game.id));
  state.favorites = state.favorites.filter((gameId) => !removedGameIds.has(gameId));
  state.recentGames = state.recentGames.filter((gameId) => !removedGameIds.has(gameId));
  for (const player of state.accounts) player.friends = player.friends.filter((friendId) => friendId !== id);
  const wasActive = state.session === id;
  if (wasActive) {
    if (activeGame?.timerId) clearInterval(activeGame.timerId);
    activeGame = null;
    openModal = null;
    accountMenuOpen = false;
    drawerOpen = false;
    state.session = null;
    route = "login";
    authMode = "login";
    authError = "";
  }
  try {
    persist();
    renderApp();
    toast(wasActive ? `Removed ${account.username}. Choose another saved account to log in.` : `Removed ${account.username} from saved accounts.`);
  } catch (error) {
    state = JSON.parse(snapshot);
    applyTheme();
    renderApp();
    toast(error instanceof Error ? error.message : "The saved account could not be removed.", "error");
  }
}

function handleClick(event) {
  const target = event.target.closest("button, [data-game-card], [data-backdrop]");
  if (!target) return;
  if (target instanceof HTMLElement && target.hasAttribute("data-game-card")) {
    const game = allGames().find((item) => item.id === target.dataset.gameCard);
    if (game) {
      openModal = { type: "play", id: game.id };
      activeGame = null;
      renderApp();
    }
    return;
  }
  if (target.hasAttribute("data-auth-mode")) {
    authMode = target.dataset.authMode === "login" ? "login" : "signup";
    authError = "";
    selectedLoginAccountId = null;
    renderAuth();
    return;
  }
  if (target.hasAttribute("data-login-account")) {
    selectLoginAccount(target.dataset.loginAccount);
    return;
  }
  if (target.hasAttribute("data-remove-account")) {
    removeSavedAccount(target.dataset.removeAccount);
    return;
  }
  if (target.hasAttribute("data-admin-save")) {
    saveAdminAccount(target.dataset.adminSave);
    return;
  }
  if (target.hasAttribute("data-admin-role")) {
    toggleAdminRole(target.dataset.adminRole);
    return;
  }
  if (target.hasAttribute("data-admin-avatar-save")) {
    saveAdminAvatar(target.dataset.adminAvatarSave);
    return;
  }
  if (target.hasAttribute("data-admin-password-save")) {
    saveAdminPassword(target.dataset.adminPasswordSave);
    return;
  }
  if (target.hasAttribute("data-admin-game-ban")) {
    toggleAdminGameBan(target.dataset.adminGameBan, target.dataset.banState === "ban");
    return;
  }
  if (target.hasAttribute("data-admin-theme-reset")) {
    if (!currentAccount()?.isAdmin) return toast("Administrator access is required.", "error");
    const snapshot = JSON.stringify(state);
    state.customTheme = null;
    commitAdminMutation(snapshot, "Standard theme restored.");
    return;
  }
  if (target.hasAttribute("data-admin-ban")) {
    toggleAdminBan(target.dataset.adminBan, target.dataset.banState === "ban");
    return;
  }
  if (target.hasAttribute("data-admin-delete-game")) {
    removeAdminGame(target.dataset.adminOwner, target.dataset.adminDeleteGame);
    return;
  }
  if (target.hasAttribute("data-route")) {
    navigate(target.dataset.route);
    return;
  }
  if (target.hasAttribute("data-ad-placeholder")) {
    event.preventDefault();
    return;
  }
  if (target.hasAttribute("data-report-ad")) {
    toast("Thanks for looking out. There aren't any third-party ads in this demo.");
    return;
  }
  if (target.hasAttribute("data-account-menu")) {
    accountMenuOpen = !accountMenuOpen;
    renderApp();
    return;
  }
  if (target.hasAttribute("data-drawer-toggle")) {
    drawerOpen = !drawerOpen;
    accountMenuOpen = false;
    renderApp();
    return;
  }
  if (target.hasAttribute("data-new-account")) {
    state.session = null;
    openModal = null;
    authMode = "signup";
    authError = "";
    accountMenuOpen = false;
    try {
      persist();
    } catch (error) {
      state.session = currentAccount()?.id || null;
      toast(error instanceof Error ? error.message : "Couldn't safely switch accounts.", "error");
      renderApp();
      return;
    }
    renderAuth();
    return;
  }
  if (target.hasAttribute("data-switch-account")) {
    setAccount(target.dataset.switchAccount);
    return;
  }
  if (target.hasAttribute("data-logout")) {
    if (activeGame?.timerId) clearInterval(activeGame.timerId);
    activeGame = null;
    const previousSession = state.session;
    state.session = null;
    openModal = null;
    authMode = "login";
    authError = "";
    accountMenuOpen = false;
    try {
      persist();
      renderAuth();
    } catch (error) {
      state.session = previousSession;
      toast(error instanceof Error ? error.message : "Couldn't save your sign-out.", "error");
      renderApp();
    }
    return;
  }
  if (target.hasAttribute("data-open-settings")) {
    accountMenuOpen = false;
    openModal = { type: "settings" };
    renderApp();
    return;
  }
  if (target.hasAttribute("data-close-modal")) {
    if (activeGame?.timerId) clearInterval(activeGame.timerId);
    activeGame = null;
    openModal = null;
    renderApp();
    return;
  }
  if (target.hasAttribute("data-backdrop") && event.target === target) {
    if (activeGame?.timerId) clearInterval(activeGame.timerId);
    activeGame = null;
    openModal = null;
    renderApp();
    return;
  }
  if (target.hasAttribute("data-profile")) {
    const person = findPerson(target.dataset.profile);
    if (person) {
      openModal = { type: "profile", id: person.id };
      renderApp();
    }
    return;
  }
  if (target.hasAttribute("data-buy")) {
    buyItem(target.dataset.buy);
    return;
  }
  if (target.hasAttribute("data-equip")) {
    const account = currentAccount();
    if (account) {
      const id = target.dataset.equip;
      account.avatar.equipped = account.avatar.equipped === id ? null : id;
      commitOrToast(account.avatar.equipped ? `${CATALOG.find((item) => item.id === id)?.name || "Accessory"} looks great on you.` : "Accessory put away.");
    }
    return;
  }
  if (target.hasAttribute("data-avatar-group")) {
    changeAvatar(target.dataset.avatarGroup, target.dataset.avatarValue || "");
    return;
  }
  if (target.hasAttribute("data-friend")) {
    addFriend(target.dataset.friend);
    return;
  }
  if (target.hasAttribute("data-unfriend")) {
    removeFriend(target.dataset.unfriend);
    return;
  }
  if (target.hasAttribute("data-category")) {
    catalogCategory = target.dataset.category;
    rerender();
    return;
  }
  if (target.hasAttribute("data-genre")) {
    gameGenre = target.dataset.genre;
    rerender();
    return;
  }
  if (target.hasAttribute("data-palette")) {
    creatorPalette = target.dataset.palette;
    rerender();
    return;
  }
  if (target.hasAttribute("data-start-game")) {
    startGame(target.dataset.startGame);
    return;
  }
  if (target.hasAttribute("data-move") || target.hasAttribute("data-game-move")) {
    movePlayer(target.dataset.move || target.dataset.gameMove);
    return;
  }
  if (target.hasAttribute("data-favorite")) {
    toggleFavorite(target.dataset.favorite);
    return;
  }
  if (target.hasAttribute("data-focus")) {
    const destination = target.dataset.focus;
    document.querySelector(destination)?.focus();
    return;
  }
}

function rerender() {
  if (currentAccount()) renderApp();
  else renderAuth();
}

function wireRenderedState() {
  for (const input of document.querySelectorAll('input[name="theme-choice"]')) {
    input.addEventListener("change", () => {
      state.theme = input.value === "light" ? "light" : "dark";
      commitOrToast(state.theme === "light" ? "Daylight mode on." : "Midnight mode on.");
      openModal = { type: "settings" };
      renderApp();
    });
  }
}

app.addEventListener("submit", (event) => {
  if (event.target instanceof HTMLFormElement && event.target.id === "auth-form") handleAuthSubmit(event);
  else handleAdminSubmit(event);
});

app.addEventListener("click", handleClick);

app.addEventListener("input", (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  if (input.id === "global-search") {
    const destination = route === "catalog" ? "catalog" : "games";
    if (route === "catalog") {
      catalogSearch = input.value;
      startSearch(destination, input);
    } else {
      gameSearch = input.value;
      startSearch(destination, input);
    }
  }
  if (input.id === "friend-search") {
    updateFriendSearch(input.value);
  }
  if (input.form?.id === "auth-form" && input.name === "username" && selectedLoginAccountId) {
    const selected = state.accounts.find((account) => account.id === selectedLoginAccountId);
    if (selected && input.value.trim().toLocaleLowerCase() !== selected.username.toLocaleLowerCase()) selectedLoginAccountId = null;
  }
});

app.addEventListener("keydown", (event) => {
  if (openModal?.type === "play" && activeGame?.running) {
    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
      event.preventDefault();
      movePlayer("left");
    } else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
      event.preventDefault();
      movePlayer("right");
    } else if (event.key === " " || event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
      event.preventDefault();
      movePlayer("jump");
    } else if (event.key === "Enter") {
      movePlayer("collect");
    }
  }
  if (event.key === "Escape" && openModal) {
    if (activeGame?.timerId) clearInterval(activeGame.timerId);
    activeGame = null;
    openModal = null;
    renderApp();
  }
});

app.addEventListener("submit", (event) => {
  if (event.target instanceof HTMLFormElement && event.target.id === "game-form") handleSignupGame(event);
});

try {
  state = readState();
  delete state.savedIds;
  applyTheme();
  if (state.session && !state.accounts.some((account) => account.id === state.session)) state.session = null;
  renderApp();
} catch (error) {
  app.innerHTML = `<main class="auth-screen"><section class="auth-content"><div class="auth-brand"><span class="auth-wordmark">ROᴄONE</span></div><div class="auth-card"><h1 class="auth-heading">A small hiccup.</h1><p class="auth-description" role="alert">${escapeHTML(error instanceof Error ? error.message : "Your saved Rocone data couldn't be loaded.")}</p><p class="auth-footnote">Your saved data hasn't been changed. You can check your browser's local storage and reload.</p></div></section></main>`;
}
