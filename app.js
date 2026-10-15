"use strict";

const STORAGE_KEY = "rocone.classic.portal.v1";
const HIDDEN_ACCOUNTS_KEY = `${STORAGE_KEY}.hidden`;
const DEVICE_THEMES_KEY = `${STORAGE_KEY}.device-themes`;
const PBKDF2_ITERATIONS = 120000;
const ROOT_ADMIN_ID = "1";
const ROOT_ADMIN_USERNAME = "urGumball";
const ADMIN_PASSWORD_SALT = "726f636f6e652d61646d696e2d763031";
const ADMIN_PASSWORD_HASH = "3ef54a2f3ad0db73194c3390663a0c30f06291d4097b387cf4042178808b364d";
const ADMIN_USERNAMES = new Map([["admin", "Admin"], ["rocone", "Rocone"], [ROOT_ADMIN_USERNAME.toLocaleLowerCase(), ROOT_ADMIN_USERNAME]]);
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
const PROFILE_BACKGROUNDS = [
  { id: "sky", name: "Classic sky", currency: "cones", price: 0 },
  { id: "sunset", name: "Sunset", currency: "cones", price: 30 },
  { id: "ocean", name: "Ocean", currency: "pix", price: 60 },
  { id: "garden", name: "Garden", currency: "pix", price: 150 },
  { id: "midnight", name: "Midnight", currency: "cones", price: 100 },
  { id: "royal", name: "Royal", currency: "pix", price: 300 },
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
  {
    id: "round-spectacles",
    name: "Round Spectacles",
    description: "A thoughtful look for curious explorers.",
    category: "Faces",
    icon: "◉",
    currency: "cones",
    price: 45,
    glow: "#f2d181",
    color: "#e6be64",
    avatar: { type: "glasses", color: "#e6be64", label: "Round Spectacles" },
  },
  {
    id: "comet-crown",
    name: "Comet Crown",
    description: "A tiny orbit of stardust for your next adventure.",
    category: "Hats",
    icon: "☄",
    currency: "pix",
    price: 140,
    glow: "#d8a9f3",
    color: "#ad78db",
    avatar: { type: "hat", color: "#ad78db", label: "Comet Crown" },
  },
  {
    id: "bunny-ears",
    name: "Bunny Ears",
    description: "Soft, floppy ears made for springtime.",
    category: "Hats",
    icon: "♧",
    currency: "cones",
    price: 70,
    glow: "#f4b4c9",
    color: "#e598b1",
    avatar: { type: "ears", color: "#e598b1", label: "Bunny Ears" },
  },
  {
    id: "butterfly-wings",
    name: "Butterfly Wings",
    description: "A colorful little flutter follows you everywhere.",
    category: "Gear",
    icon: "🦋",
    currency: "pix",
    price: 175,
    glow: "#95dbe1",
    color: "#71b9cb",
    avatar: { type: "wings", color: "#71b9cb", label: "Butterfly Wings" },
  },
  {
    id: "music-headphones",
    name: "Music Headphones",
    description: "Bring your own soundtrack to the block party.",
    category: "Gear",
    icon: "♫",
    currency: "cones",
    price: 85,
    glow: "#9bb7f0",
    color: "#718bd4",
    avatar: { type: "headphones", color: "#718bd4", label: "Music Headphones" },
  },
  {
    id: "rainbow-scarf",
    name: "Rainbow Scarf",
    description: "A cozy stripe of color for breezy game worlds.",
    category: "Gear",
    icon: "〰",
    currency: "pix",
    price: 105,
    glow: "#edb7d9",
    color: "#e681ad",
    avatar: { type: "scarf", color: "#e681ad", label: "Rainbow Scarf" },
  },
];

const EXTRA_ACCESSORIES = [
  ["sun-halo", "Sun Halo", "A bright little ring for sunny-day explorers.", "Hats", "☼", "pix", 95, "#f0c45a", "halo"],
  ["moon-halo", "Moon Halo", "A crescent glow for late-night builders.", "Hats", "☾", "cones", 110, "#9da9ee", "halo"],
  ["rose-crown", "Rose Crown", "A royal ring of little red roses.", "Hats", "❀", "pix", 130, "#d87591", "flower"],
  ["daisy-crown", "Daisy Crown", "A sunny daisy chain for your hair.", "Hats", "✿", "cones", 90, "#f2d56d", "flower"],
  ["royal-crown", "Royal Crown", "A tiny crown fit for a block kingdom.", "Hats", "♛", "pix", 160, "#e1b64f", "crown"],
  ["ice-crown", "Ice Crown", "Frosty blue points sparkle overhead.", "Hats", "♕", "pix", 150, "#88d6e8", "crown"],
  ["propeller-cap", "Propeller Cap", "A spinning topper for big ideas.", "Hats", "✣", "cones", 80, "#e88062", "propeller"],
  ["denim-cap", "Denim Cap", "A classic cap for all-day exploring.", "Hats", "⌂", "cones", 55, "#5687bd", "cap"],
  ["wizard-hat", "Wizard Hat", "A starry hat for magical mischief.", "Hats", "✧", "pix", 145, "#7662b8", "hat"],
  ["cowboy-hat", "Cowboy Hat", "Saddle up for a dusty adventure.", "Hats", "♧", "cones", 100, "#a87648", "cap"],
  ["gold-monocle", "Gold Monocle", "Inspect every pixel in style.", "Faces", "◉", "pix", 85, "#e3bc5e", "monocle"],
  ["neon-visor", "Neon Visor", "A bright visor for your next arcade run.", "Faces", "▰", "cones", 75, "#62dbc5", "visor"],
  ["fox-mask", "Fox Mask", "A clever mask with a playful point.", "Faces", "◈", "pix", 125, "#ed985e", "mask"],
  ["sleep-mask", "Sleepy Mask", "Dream of your next big game.", "Faces", "☁", "cones", 60, "#8b78bf", "mask"],
  ["pixel-beard", "Pixel Beard", "A mighty beard for seasoned builders.", "Faces", "▰", "pix", 100, "#81533f", "beard"],
  ["sparkle-earrings", "Sparkle Earrings", "Tiny stars beside your smile.", "Faces", "✧", "cones", 45, "#f4d66d", "earrings"],
  ["blue-bow", "Blue Bow", "A soft bow with a little extra flair.", "Hats", "🎀", "pix", 70, "#729ee4", "bow"],
  ["red-bow", "Cherry Bow", "A bright cherry-red finishing touch.", "Hats", "❣", "cones", 65, "#df6675", "bow"],
  ["royal-cape", "Royal Cape", "A flowing cape for heroic entrances.", "Gear", "⚑", "pix", 180, "#7655a5", "cape"],
  ["rainbow-cape", "Rainbow Cape", "A colorful trail follows every step.", "Gear", "🌈", "pix", 190, "#de79a6", "cape"],
  ["fox-tail", "Fox Tail", "A fluffy tail for quick adventures.", "Gear", "〰", "cones", 120, "#df9862", "tail"],
  ["star-backpack", "Star Backpack", "Pack your dreams and a spare star.", "Gear", "★", "pix", 135, "#6c88d5", "gear"],
  ["turtle-shell", "Turtle Shell", "A sturdy shell for taking it slow.", "Gear", "⬟", "cones", 145, "#6a9e72", "shell"],
  ["cloud-wings", "Cloud Wings", "Float through the day on soft clouds.", "Gear", "☁", "pix", 165, "#bad9ec", "wings"],
  ["dragon-wings", "Dragon Wings", "Small wings with big dragon energy.", "Gear", "♢", "pix", 210, "#a95c6b", "wings"],
  ["glow-wings", "Glow Wings", "Shimmering wings for evening worlds.", "Gear", "✦", "cones", 175, "#b87adb", "wings"],
  ["bow-tie", "Dapper Bow Tie", "A neat little bow for special occasions.", "Gear", "◆", "cones", 50, "#cf5f70", "bowtie"],
  ["flower-scarf", "Flower Scarf", "A cozy scarf sprinkled with petals.", "Gear", "❀", "pix", 95, "#d98bad", "scarf"],
  ["golden-shoulder-pet", "Golden Shoulder Pet", "A tiny golden friend comes along.", "Gear", "★", "pix", 200, "#efc45c", "pet"],
  ["crystal-circlet", "Crystal Circlet", "A cool blue crystal rests on your brow.", "Hats", "◇", "pix", 155, "#86cce8", "crown"],
  ["leafy-hood", "Leafy Hood", "A woodland hood for forest trails.", "Hats", "❧", "cones", 115, "#70a76c", "hood"],
  ["star-face-paint", "Star Face Paint", "Two tiny stars brighten your cheeks.", "Faces", "✦", "cones", 40, "#f3cb68", "facepaint"],
];
CATALOG.push(...EXTRA_ACCESSORIES.map(([id, name, description, category, icon, currency, price, color, type]) => ({
  id,
  name,
  description,
  category,
  icon,
  currency,
  price,
  glow: color,
  color,
  avatar: { type, color, label: name },
})));

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
const GAME_ICONS = ["▲", "✦", "★", "♥", "✹", "✿", "☁", "⚡", "☂", "♛", "☀", "♫"];
const PRESENCE_OPTIONS = [
  { id: "online", label: "Online" },
  { id: "idle", label: "Idle" },
  { id: "dnd", label: "Do not disturb" },
  { id: "invisible", label: "Invisible" },
];
const app = document.getElementById("app");
let state;
let sharedRevision = 0;
let sharedStorageAvailable = false;
let sharedSaveQueue = Promise.resolve();
let sharedBaseline = null;
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
let friendSearch = "";
let creatorPalette = "mint";
let editorGameId = null;
let creatorIcon = "▲";
let profileId = null;
let activeChatId = null;
let exchangeFrom = "cones";
let activeGame = null;
let toastTimers = new Set();

function freshState() {
  return {
    version: 1,
    session: null,
    accounts: [],
    messages: [],
    moderationReports: [],
    theme: "dark",
    favorites: [],
    recentGames: [],
    bannedGames: [],
    site: { name: "Rocone", announcement: "", welcome: "WELCOME BACK" },
    customTheme: null,
  };
}

function makeAccountId(isFake) {
  let id;
  do {
    id = isFake ? `f4k3-${makeId()}` : makeId();
  } while (state.accounts.some((account) => account.id === id));
  return id;
}

function mergeSharedList(localItems, baselineItems, remoteItems) {
  const merged = new Map(remoteItems.map((item) => [item.id, item]));
  const localById = new Map(localItems.map((item) => [item.id, item]));
  for (const previous of baselineItems) {
    if (!localById.has(previous.id)) merged.delete(previous.id);
  }
  for (const item of localItems) {
    const previous = baselineItems.find((candidate) => candidate.id === item.id);
    if (!previous || JSON.stringify(previous) !== JSON.stringify(item)) merged.set(item.id, item);
  }
  return [...merged.values()];
}

function mergeSharedState(local, baseline, remote) {
  const merged = { ...remote, session: null };
  for (const key of ["version", "theme", "favorites", "recentGames", "bannedGames", "site", "customTheme"]) {
    if (JSON.stringify(local[key]) !== JSON.stringify(baseline[key])) merged[key] = local[key];
  }
  merged.accounts = mergeSharedList(local.accounts, baseline.accounts || [], remote.accounts || []);
  merged.messages = mergeSharedList(local.messages || [], baseline.messages || [], remote.messages || []).slice(-5000);
  merged.moderationReports = mergeSharedList(
    local.moderationReports || [],
    baseline.moderationReports || [],
    remote.moderationReports || [],
  ).slice(-1000);
  return merged;
}

async function saveSharedSnapshot(snapshot) {
  let payload = snapshot;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch("/api/state", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ revision: sharedRevision, state: payload }),
    });
    const result = await response.json();
    if (response.ok) {
      sharedRevision = result.revision;
      sharedBaseline = JSON.parse(JSON.stringify(payload));
      return;
    }
    if (response.status !== 409 || attempt === 2) {
      throw new Error(result.error || "Shared Rocone data could not be saved.");
    }
    const latestResponse = await fetch("/api/state", { headers: { Accept: "application/json" } });
    if (!latestResponse.ok) throw new Error(`Shared account storage returned HTTP ${latestResponse.status}.`);
    const latest = await latestResponse.json();
    if (!Number.isInteger(latest.revision) || !latest.state) {
      throw new Error("Shared account storage returned an invalid conflict response.");
    }
    const baseline = sharedBaseline || freshState();
    payload = mergeSharedState(payload, baseline, latest.state);
    sharedRevision = latest.revision;
    sharedBaseline = latest.state;
  }
}

async function loadSharedState() {
  if (location.protocol === "file:") return;
  try {
    const response = await fetch("/api/state", { headers: { Accept: "application/json" } });
    if (response.status === 404 || response.status === 405) return;
    if (!response.ok) throw new Error(`Shared account storage returned HTTP ${response.status}.`);
    const result = await response.json();
    if (!Number.isInteger(result.revision) || result.revision < 0) {
      throw new Error("Shared account storage returned an invalid revision.");
    }
    sharedStorageAvailable = true;
    sharedRevision = result.revision;
    if (result.state) {
      const localSession = state.session;
      const storedRootAdmin = result.state.accounts?.find((account) => account?.id === ROOT_ADMIN_ID);
      const rootAdminNeedsNormalization = storedRootAdmin && (
        storedRootAdmin.username !== ROOT_ADMIN_USERNAME ||
        storedRootAdmin.isAdmin !== true ||
        storedRootAdmin.isRootAdmin !== true ||
        storedRootAdmin.isFake === true ||
        storedRootAdmin.banned === true
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result.state));
      state = readState();
      delete state.savedIds;
      if (state.accounts.some((account) => account.id === localSession && !account.banned)) state.session = localSession;
      sharedBaseline = JSON.parse(JSON.stringify({ ...state, session: null }));
      if (rootAdminNeedsNormalization) persist();
    } else if (state.accounts.length) {
      persist();
    }
  } catch (error) {
    sharedStorageAvailable = false;
    console.error("Rocone shared storage could not be loaded.", error);
    toast(error instanceof Error ? error.message : "Rocone could not load shared account storage.", "error");
  }
}

function applyTheme() {
  const account = currentAccount();
  const theme = account ? themeForAccount(account) : state.theme;
  document.documentElement.dataset.theme = theme;
  const cssVars = { bg: "--bg", surface: "--surface", raised: "--surface-raised", hover: "--surface-hover", line: "--line", text: "--text", muted: "--muted", accent: "--accent", pix: "--pix" };
  for (const [key, value] of Object.entries(CUSTOM_THEME_VARS)) {
    document.documentElement.style.removeProperty(cssVars[key]);
    if (isHexColor(state.customTheme?.[key])) {
      document.documentElement.style.setProperty(cssVars[key], state.customTheme[key]);
    }
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f5f5f4" : "#17191d");
  document.title = `${state.site?.name || "Rocone"} — play, create, hang out`;
}

function themeForAccount(account) {
  const raw = localStorage.getItem(DEVICE_THEMES_KEY);
  if (!raw) return account.theme || state.theme;
  const preferences = JSON.parse(raw);
  if (!preferences || typeof preferences !== "object" || Array.isArray(preferences)) {
    throw new Error("This device's theme preferences are invalid. Clear its Rocone theme preference and reload.");
  }
  return preferences[account.id] === "light" ? "light" : preferences[account.id] === "dark" ? "dark" : account.theme || state.theme;
}

function saveDeviceTheme(accountId, theme) {
  const raw = localStorage.getItem(DEVICE_THEMES_KEY);
  const preferences = raw ? JSON.parse(raw) : {};
  if (!preferences || typeof preferences !== "object" || Array.isArray(preferences)) {
    throw new Error("This device's theme preferences are invalid. Clear its Rocone theme preference and reload.");
  }
  preferences[accountId] = theme;
  localStorage.setItem(DEVICE_THEMES_KEY, JSON.stringify(preferences));
}

function cleanGame(game) {
  if (!game || typeof game.id !== "string" || !/^[A-Za-z0-9_-]{1,64}$/.test(game.id)) return null;
  const genre = GAME_GENRES.includes(game.genre) && game.genre !== "All" ? game.genre : "Arcade";
  const iconValue = GAME_ICONS.includes(game.icon) ? game.icon : "▲";
  return {
    id: game.id,
    name: typeof game.name === "string" ? game.name.trim().slice(0, 36) : "",
    description: typeof game.description === "string" ? game.description.trim().slice(0, 200) : "",
    genre,
    sky: isHexColor(game.sky) ? game.sky : "#81d6bb",
    ground: isHexColor(game.ground) ? game.ground : "#366759",
    char: isHexColor(game.char) ? game.char : "#f1c779",
    icon: iconValue,
    type: ["dash", "hop"].includes(game.type) ? game.type : "dash",
    rewardCurrency: game.rewardCurrency === "cones" ? "cones" : "pix",
    rewardAmount: Number.isSafeInteger(game.rewardAmount) ? Math.max(0, Math.min(1000, game.rewardAmount)) : 10,
    visits: Number.isSafeInteger(game.visits) ? Math.max(0, game.visits) : 0,
    createdAt: typeof game.createdAt === "string" ? game.createdAt : new Date().toISOString(),
  };
}

function cleanAccount(account) {
  if (!account || typeof account.id !== "string" || typeof account.username !== "string") return null;
  const isRootAdmin = account.id === ROOT_ADMIN_ID;
  const owned = Array.isArray(account.owned) ? [...new Set(account.owned.filter((id) => CATALOG.some((item) => item.id === id)))] : [];
  const ownedBackgrounds = Array.isArray(account.ownedBackgrounds)
    ? [...new Set(account.ownedBackgrounds.filter((id) => PROFILE_BACKGROUNDS.some((background) => background.id === id)))]
    : ["sky"];
  return {
    id: account.id,
    username: isRootAdmin ? ROOT_ADMIN_USERNAME : account.username.slice(0, 40),
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
      bodyWidth: Number.isFinite(account.avatar?.bodyWidth) ? Math.min(1.3, Math.max(0.75, account.avatar.bodyWidth)) : 1,
      bodyHeight: Number.isFinite(account.avatar?.bodyHeight) ? Math.min(1.3, Math.max(0.75, account.avatar.bodyHeight)) : 1,
      headSize: Number.isFinite(account.avatar?.headSize) ? Math.min(1.25, Math.max(0.8, account.avatar.headSize)) : 1,
    },
    owned,
    ownedBackgrounds: ownedBackgrounds.includes("sky") ? ownedBackgrounds : ["sky", ...ownedBackgrounds],
    isAdmin: isRootAdmin || account.isAdmin === true,
    isRootAdmin,
    isFake: isRootAdmin ? false : account.isFake === true,
    status: PRESENCE_OPTIONS.some((option) => option.id === account.status) ? account.status : "online",
    statusText: typeof account.statusText === "string" ? account.statusText.slice(0, 60) : "",
    theme: account.theme === "light" ? "light" : "dark",
    profileBackground: ownedBackgrounds.includes(account.profileBackground) ? account.profileBackground : "sky",
    email: typeof account.email === "string" ? account.email.slice(0, 254) : "",
    phone: typeof account.phone === "string" ? account.phone.slice(0, 32) : "",
    banned: isRootAdmin ? false : account.banned === true,
    banReason: isRootAdmin ? "" : typeof account.banReason === "string" ? account.banReason.slice(0, 160) : "",
    banEvidence: Array.isArray(account.banEvidence) ? account.banEvidence.filter((item) => typeof item === "string").slice(-20) : [],
    warnings: Array.isArray(account.warnings) ? account.warnings.filter((item) => typeof item === "string").slice(-20) : [],
    friends: Array.isArray(account.friends)
      ? [...new Set(account.friends.filter((id) => typeof id === "string" && id !== account.id))]
      : [],
    friendRequests: {
      incoming: Array.isArray(account.friendRequests?.incoming) ? [...new Set(account.friendRequests.incoming.filter((id) => typeof id === "string" && id !== account.id))] : [],
      outgoing: Array.isArray(account.friendRequests?.outgoing) ? [...new Set(account.friendRequests.outgoing.filter((id) => typeof id === "string" && id !== account.id))] : [],
    },
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
  const accounts = stored.accounts.map((account) => cleanAccount({
    ...account,
    theme: account?.theme || stored.theme,
    friendRequests: account?.friendRequests || { incoming: [], outgoing: [] },
  })).filter(Boolean);
  const validIds = new Set(accounts.map((account) => account.id));
  const savedIds = new Set(stored.accounts.map((account) => account?.id).filter(Boolean));

  return {
    version: 1,
    session: typeof stored.session === "string" && validIds.has(stored.session) ? stored.session : null,
    accounts,
    messages: Array.isArray(stored.messages) ? stored.messages.filter((item) =>
      item && typeof item.id === "string" && typeof item.senderId === "string" &&
      typeof item.recipientId === "string" && typeof item.text === "string" &&
      typeof item.createdAt === "string"
    ).slice(-5000) : [],
    moderationReports: Array.isArray(stored.moderationReports) ? stored.moderationReports.filter((item) =>
      item && typeof item.id === "string" && typeof item.accountId === "string" &&
      typeof item.createdAt === "string" && ["pending", "warned", "banned", "ignored"].includes(item.status)
    ).slice(-1000) : [],
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
      messages: state.messages,
      moderationReports: state.moderationReports,
      theme: state.theme,
      favorites: state.favorites,
      recentGames: state.recentGames,
      bannedGames: state.bannedGames,
      site: state.site,
      customTheme: state.customTheme,
    }));
    applyTheme();
    if (sharedStorageAvailable) {
      const snapshot = JSON.stringify({ ...state, session: null });
      sharedSaveQueue = sharedSaveQueue.then(() => saveSharedSnapshot(JSON.parse(snapshot))).catch((error) => {
        toast(error instanceof Error ? error.message : "Shared Rocone data could not be saved. Reload to sync.", "error");
      });
    }
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

function hiddenAccountIds() {
  const raw = localStorage.getItem(HIDDEN_ACCOUNTS_KEY);
  if (!raw) return new Set();
  const stored = JSON.parse(raw);
  if (!Array.isArray(stored) || stored.some((id) => typeof id !== "string")) {
    throw new Error("Your saved-account list is invalid. Clear this browser's hidden-account preference and reload.");
  }
  return new Set(stored);
}

function savedAccounts() {
  const hidden = hiddenAccountIds();
  return state.accounts.filter((account) => !account.banned && !hidden.has(account.id));
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
      status: account.status,
      statusText: account.statusText,
      profileBackground: account.profileBackground,
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
    creatorId: account.id,
    type: game.type || "dash",
    players: "1",
    likes: "100%",
    isCreated: true,
  }))).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  return [...created, ...GAMES].filter((game) => !state.bannedGames.includes(game.id));
}

function presenceStatus(person) {
  if (person.isDemo) return { label: "Community demo", state: "demo" };
  if (state.session !== person.id) return { label: "Offline", state: "offline" };
  const status = PRESENCE_OPTIONS.find((option) => option.id === person.status) || PRESENCE_OPTIONS[0];
  let label = status.label;
  let stateName = status.id === "invisible" ? "offline" : status.id;
  if (activeGame?.running && status.id !== "invisible") {
    const game = allGames().find((item) => item.id === activeGame.id);
    const activity = game ? `Playing ${game.name}` : "Playing a game";
    label = status.id === "online" ? activity : `${activity} · ${status.label}`;
    if (status.id === "online") stateName = "playing";
  }
  return { label: person.statusText ? `${label} · ${person.statusText}` : label, state: stateName };
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
  const bodyWidth = Number.isFinite(avatar.bodyWidth) ? avatar.bodyWidth : 1;
  const bodyHeight = Number.isFinite(avatar.bodyHeight) ? avatar.bodyHeight : 1;
  const headSize = Number.isFinite(avatar.headSize) ? avatar.headSize : 1;
  const equipped = CATALOG.find((item) => item.id === avatar.equipped)?.avatar || null;
  const glasses = equipped?.type === "glasses"
    ? `<g fill="#242333" stroke="${equipped.color}" stroke-width="2"><rect x="28" y="50" width="20" height="15" rx="6"/><rect x="54" y="50" width="20" height="15" rx="6"/><path d="M48 56h6"/></g>`
    : "";
  const hat = equipped?.type === "hat"
    ? `<g><path d="M27 42Q51 ${equipped.label === "Classic Cone" ? "2" : "19"} 76 42l-4 5H31Z" fill="${equipped.color}" stroke="#342c27" stroke-width="2"/><path d="M28 43h47" stroke="#342c27" stroke-width="3" stroke-linecap="round"/></g>`
    : ["cap", "crown", "hood"].includes(equipped?.type)
      ? equipped.type === "crown"
        ? `<path d="m30 42 3-17 11 11 7-18 8 18 11-11 3 17Z" fill="${equipped.color}" stroke="#493a35" stroke-width="2"/><path d="M31 44h41" stroke="#493a35" stroke-width="3"/>`
        : equipped.type === "cap"
          ? `<g><path d="M28 42q2-22 24-22 21 0 23 23H29Z" fill="${equipped.color}" stroke="#493a35" stroke-width="2"/><path d="M46 43q19-8 36 1-17 7-37 2" fill="${equipped.color}" stroke="#493a35" stroke-width="2"/></g>`
          : `<path d="M26 47q0-29 25-29t25 29v9H26Z" fill="${equipped.color}" stroke="#493a35" stroke-width="2"/>`
      : `<g><path d="M27 44Q29 20 51 21Q73 20 76 44L73 51H30Z" fill="#544333"/><path d="M30 37Q45 19 70 34" fill="none" stroke="#745535" stroke-width="7" stroke-linecap="round"/></g>`;
  const ears = equipped?.type === "ears"
    ? `<g fill="${equipped.color}" stroke="#704b56" stroke-width="2"><ellipse cx="39" cy="25" rx="8" ry="19" transform="rotate(-13 39 25)"/><ellipse cx="63" cy="25" rx="8" ry="19" transform="rotate(13 63 25)"/><ellipse cx="39" cy="25" rx="3" ry="11" fill="#f8c8d1" stroke="none"/><ellipse cx="63" cy="25" rx="3" ry="11" fill="#f8c8d1" stroke="none"/></g>`
    : "";
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
  const wings = equipped?.type === "wings"
    ? `<g fill="${equipped.color}" fill-opacity=".8" stroke="#365b77" stroke-width="2"><path d="M26 79Q4 63 14 52q14 2 22 20Q25 55 29 48q13 9 15 30Z"/><path d="M76 79q22-16 12-27-14 2-22 20 11-17 7-24-13 9-15 30Z"/></g>`
    : "";
  const headphones = equipped?.type === "headphones"
    ? `<g fill="none" stroke="${equipped.color}" stroke-width="5"><path d="M28 48a23 23 0 0 1 46 0"/><rect x="24" y="47" width="9" height="18" rx="4" fill="${equipped.color}"/><rect x="69" y="47" width="9" height="18" rx="4" fill="${equipped.color}"/></g>`
    : "";
  const scarf = equipped?.type === "scarf"
    ? `<g fill="${equipped.color}" stroke="#704b56" stroke-width="1.5"><path d="M31 73q20 9 41 0l-2 11q-18 10-38 0Z"/><path d="M62 81h9l-3 23H56Z"/></g>`
    : "";
  const cape = equipped?.type === "cape"
    ? `<path d="M30 76q21 9 42 0l12 38H19Z" fill="${equipped.color}" stroke="#39465a" stroke-width="2"/>`
    : equipped?.type === "shell"
      ? `<ellipse cx="51" cy="91" rx="24" ry="18" fill="${equipped.color}" stroke="#385b43" stroke-width="3"/><path d="m51 74v34M29 91h44M36 80l30 23m0-23-30 23" stroke="#c9dfa0" stroke-width="2"/>`
      : "";
  const tail = equipped?.type === "tail"
    ? `<path d="M77 87q24 4 17 22-5 9-17 0 10 0 6-8-3-5-9-5Z" fill="${equipped.color}" stroke="#704b40" stroke-width="2"/>`
    : "";
  const hatExtras = equipped?.type === "halo"
    ? `<ellipse cx="51" cy="17" rx="22" ry="5" fill="none" stroke="${equipped.color}" stroke-width="4"/>`
    : equipped?.type === "flower"
      ? `<g fill="${equipped.color}" stroke="#79545b" stroke-width="1"><circle cx="35" cy="26" r="6"/><circle cx="44" cy="20" r="6"/><circle cx="53" cy="18" r="6"/><circle cx="62" cy="20" r="6"/><circle cx="70" cy="27" r="6"/><circle cx="35" cy="26" r="2" fill="#f5d56c"/><circle cx="44" cy="20" r="2" fill="#f5d56c"/><circle cx="53" cy="18" r="2" fill="#f5d56c"/><circle cx="62" cy="20" r="2" fill="#f5d56c"/><circle cx="70" cy="27" r="2" fill="#f5d56c"/></g>`
      : equipped?.type === "propeller"
        ? `<g stroke="${equipped.color}" stroke-width="3" stroke-linecap="round"><path d="M51 20V13"/><path d="M51 13q-16-7-18 1 3 6 18-1ZM51 13q16-7 18 1-3 6-18-1Z" fill="${equipped.color}"/></g>`
        : equipped?.type === "bow"
          ? `<path d="M48 27q-15-14-18 0 1 12 20 4m4-4q15-14 18 0-1 12-20 4m-1-5h2v5h-2Z" fill="${equipped.color}" stroke="#68474e" stroke-width="2"/>`
          : "";
  const faceExtras = equipped?.type === "monocle"
    ? `<circle cx="62" cy="52" r="9" fill="none" stroke="${equipped.color}" stroke-width="2.5"/><path d="M67 60 73 70" stroke="${equipped.color}" stroke-width="2"/>`
    : equipped?.type === "visor"
      ? `<path d="M29 47q22-8 47 0l-4 12q-19 5-39 0Z" fill="${equipped.color}" fill-opacity=".9" stroke="#34364b" stroke-width="2"/>`
      : equipped?.type === "mask"
        ? `<path d="m29 56 12 2 10-5 10 5 13-2-4 14q-19 8-37 0Z" fill="${equipped.color}" stroke="#604750" stroke-width="2"/><path d="M37 63h8m12 0h8" stroke="#49383a" stroke-width="2"/>`
        : equipped?.type === "beard"
          ? `<path d="M35 63q16 7 32 0l-2 9q-4 11-14 12-10-1-14-12Z" fill="${equipped.color}" stroke="#63483c" stroke-width="2"/>`
          : equipped?.type === "facepaint"
            ? `<path d="m37 57 2-4 2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3Zm27 0 2-4 2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3Z" fill="${equipped.color}"/>`
            : equipped?.type === "earrings"
              ? `<g fill="${equipped.color}" stroke="#66534a" stroke-width="1.5"><circle cx="28" cy="59" r="3"/><circle cx="77" cy="59" r="3"/></g>`
              : "";
  const neckExtras = equipped?.type === "bowtie"
    ? `<path d="m42 76 9 5-9 5Zm18 0-9 5 9 5Z" fill="${equipped.color}" stroke="#573b43" stroke-width="1.5"/><circle cx="51" cy="81" r="2" fill="#f7d774"/>`
    : equipped?.type === "pet"
      ? `<circle cx="23" cy="77" r="9" fill="${equipped.color}" stroke="#5b533a" stroke-width="2"/><circle cx="20" cy="75" r="1.2" fill="#352b27"/><circle cx="26" cy="75" r="1.2" fill="#352b27"/>`
      : "";
  const svg = `<svg class="avatar-art" viewBox="0 0 102 114" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Classic ${escapeHTML(value?.username || "player")} avatar"><defs><linearGradient id="bg-${escapeHTML(value?.id || "preview").replace(/[^a-zA-Z0-9-]/g, "")}-${large ? "l" : "s"}" x2="0" y2="1"><stop stop-color="#d8e6dc"/><stop offset="1" stop-color="#b4c3be"/></linearGradient></defs><rect width="102" height="114" fill="url(#bg-${escapeHTML(value?.id || "preview").replace(/[^a-zA-Z0-9-]/g, "")}-${large ? "l" : "s"})"/>${cape}${tail}<g transform="translate(51 83) scale(${bodyWidth} ${bodyHeight}) translate(-51 -83)"><path d="M0 87h102v27H0z" fill="${pants}"/><path d="M18 84q2-8 14-9h37q12 1 16 10l5 29H12Z" fill="${shirt}"/><rect x="37" y="66" width="28" height="17" rx="4" fill="${skin}"/><path d="M18 89h66" stroke="#ffffff29" stroke-width="2"/></g>${wings}<g transform="translate(51 51) scale(${headSize}) translate(-51 -51)"><rect x="27" y="32" width="49" height="40" rx="11" fill="${skin}"/>${hat}${ears}${headphones}${eyes}${glasses}${mouth}${faceExtras}<circle cx="78" cy="53" r="3.2" fill="${skin}"/></g>${hatExtras}${gear}${scarf}${neckExtras}</svg>`;
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
  const recommendations = allGames().sort((a, b) => Number(recentIds.has(b.id)) - Number(recentIds.has(a.id))).slice(0, 6);
  return `<div class="classic-home-layout">${classicAdvertisement("left")}<div class="classic-home-center"><section class="classic-home-hero"><div class="classic-home-avatar avatar-frame">${avatarSVG(account, true)}</div><div class="classic-home-greeting"><div class="classic-welcome-label">${escapeHTML(state.site.welcome)}, ${escapeHTML(account.username.toLocaleUpperCase())}</div><h1 class="classic-home-wordmark"><span class="classic-home-logo-mark">${escapeHTML(state.site.name.slice(0, 1).toUpperCase())}</span> ${escapeHTML(state.site.name)}</h1><button class="classic-customize-link" data-route="avatar">${icon("avatar")} Customize your character</button></div></section><section class="classic-section classic-friends-section">${sectionHeading(`Friends (${people.length})`, "friends", "See All →")}<div class="classic-friends-strip">${friends.map((person) => `<button class="classic-friend-card" data-profile="${escapeHTML(person.id)}" aria-label="View ${escapeHTML(person.username)}'s profile">${miniAvatar(person, "classic-friend-avatar avatar-frame")}<span class="classic-friend-name">${escapeHTML(person.username)}</span></button>`).join("")}<button class="classic-add-friend" data-route="friends" aria-label="Find more friends">${icon("plus")}</button></div></section><section class="classic-section">${sectionHeading("My Library", "my-games", "See All →")}<div class="game-grid classic-game-grid">${library.slice(0, 6).map(gameCard).join("")}</div></section><section class="classic-section classic-recommended">${sectionHeading("Recommended For You", "games", "See All →")}<div class="game-grid classic-game-grid">${recommendations.map(gameCard).join("")}</div></section><section class="classic-section classic-creator-promo"><div><strong>Make something of your own.</strong><span>The next big game can start with you.</span></div><button class="primary-button small" data-route="create">${icon("create")}Create</button></section></div>${classicAdvertisement("right")}</div>`;
}

function renderGames() {
  const games = allGames().filter((game) => {
    const matchesGenre = gameGenre === "All" || game.genre === gameGenre;
    const matchesSearch = !gameSearch || `${game.name} ${game.description} ${game.creator} ${game.genre}`.toLowerCase().includes(gameSearch.toLowerCase());
    return matchesGenre && matchesSearch;
  });
  return `${pageHeading("For You", "Community creations are shared in the local discovery feed for every account on this browser.", `<button class="primary-button" data-route="create">${icon("plus")}Make a game</button>`)}<div class="filter-row">${GAME_GENRES.map((genre) => `<button class="filter-chip${gameGenre === genre ? " active" : ""}" data-genre="${escapeHTML(genre)}">${escapeHTML(genre)}</button>`).join("")}</div>${games.length ? `<div class="game-grid">${games.map(gameCard).join("")}</div>` : emptyState("No games found.", "Try another search or category.")}`;
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
  return `<div class="shop-layout"><div><div class="filter-row">${CATEGORIES.map((category) => `<button class="filter-chip${catalogCategory === category ? " active" : ""}" data-category="${escapeHTML(category)}">${escapeHTML(category)}</button>`).join("")}</div>${visible.length ? `<div class="game-grid">${visible.map((item) => catalogItem(item, account)).join("")}</div>` : emptyState("No items found.", "Try a different search or browse everything.")}</div><aside class="shop-side"><h2 class="side-title">Your little fortune</h2><p class="side-copy">Two currencies, twice the fun. Pick something out for your avatar.</p><div class="currency-card"><div class="currency-row"><span>◆ &nbsp;Cones</span><span class="currency-count">${formatBalance(account, "cones")}</span></div><div class="currency-row"><span>✦ &nbsp;Pix</span><span class="currency-count">${formatBalance(account, "pix")}</span></div></div><button class="secondary-button" data-open-exchange style="width:100%;margin-top:12px">Exchange Cones ↔ Pix</button><div class="subtle-divider"></div><p class="side-copy">New around here? Every avatar starts with some Cones and Pix. Finish an arcade run to find more Pix.</p></aside></div>`;
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
  const shapeControl = (key, title, min, max, step) => `<label class="shape-control"><span>${title}: <output>${a[key].toFixed(2)}×</output></span><input type="range" min="${min}" max="${max}" step="${step}" value="${a[key]}" data-avatar-shape="${key}"/></label>`;
  return `${pageHeading("Your avatar", "Make someone who feels unmistakably you.")}<div class="avatar-editor"><aside class="avatar-preview-panel"><div class="preview-avatar avatar-frame">${avatarSVG(account, true)}</div><div><h2 class="avatar-preview-name">${escapeHTML(account.username)}</h2><p class="avatar-preview-caption">Looking pretty good.</p></div></aside><div><section class="editor-section"><div class="section-heading"><h2 class="section-title">Body shape</h2></div><div class="shape-controls">${shapeControl("bodyWidth", "Body width", .75, 1.3, .05)}${shapeControl("bodyHeight", "Body height", .75, 1.3, .05)}${shapeControl("headSize", "Head size", .8, 1.25, .05)}</div></section><section class="editor-section"><div class="section-heading"><h2 class="section-title">Skin tone</h2></div><div class="editor-grid">${SKIN_COLORS.map((choice) => editorOption("skin", choice, a.skin)).join("")}</div></section><section class="editor-section"><div class="section-heading"><h2 class="section-title">Shirt</h2></div><div class="editor-grid">${SHIRT_COLORS.map((choice) => editorOption("shirt", choice, a.shirt)).join("")}</div></section><section class="editor-section"><div class="section-heading"><h2 class="section-title">Pants</h2></div><div class="editor-grid">${PANTS_COLORS.map((choice) => editorOption("pants", choice, a.pants)).join("")}</div></section><section class="editor-section"><div class="section-heading"><h2 class="section-title">Face</h2></div><div class="editor-grid">${faces.map((choice) => editorOption("face", choice, a.face, "face")).join("")}</div></section><section class="editor-section"><div class="section-heading"><h2 class="section-title">Your closet</h2><button class="section-link" data-route="catalog">Find more accessories →</button></div><div class="editor-grid"><button class="editor-choice${a.equipped ? "" : " selected"}" data-avatar-group="equipped" data-avatar-value="" aria-pressed="${!a.equipped}"><span class="choice-swatch" style="display:grid;place-items:center;background:var(--surface-hover);font-size:14px">—</span><span class="choice-label">No accessory</span></button>${wardrobe.map((item) => editorOption("equipped", { id: item.id, name: item.name, icon: item.icon }, a.equipped, "face")).join("")}</div></section></div></div>`;
}

function renderFriends() {
  const account = currentAccount();
  const friends = account.friends.map(findPerson).filter(Boolean);
  const requests = account.friendRequests.incoming.map((id) => state.accounts.find((candidate) => candidate.id === id && !candidate.banned)).filter(Boolean);
  const outgoing = account.friendRequests.outgoing.map((id) => state.accounts.find((candidate) => candidate.id === id && !candidate.banned)).filter(Boolean);
  const people = state.accounts.filter((person) => person.id !== account.id && !person.banned && !account.friends.includes(person.id) && !account.friendRequests.incoming.includes(person.id) && !account.friendRequests.outgoing.includes(person.id));
  const query = friendSearch;
  const suggestions = people.filter((person) => !query || person.username.toLowerCase().includes(query.toLowerCase())).slice(0, 20);
  const friendRows = friends.map((person) => {
    const status = presenceStatus(person);
    return `<div class="friend-row">${miniAvatar(person)}<div class="friend-details"><h3 class="friend-username">${escapeHTML(person.username)}</h3><div class="friend-status status-${status.state}"><span class="presence-dot"></span>${escapeHTML(status.label)}</div></div><button class="secondary-button small" data-profile="${escapeHTML(person.id)}">View profile</button><button class="primary-button small" data-chat="${escapeHTML(person.id)}">${icon("chat")}Message</button><button class="danger-button small" data-unfriend="${escapeHTML(person.id)}" aria-label="Remove ${escapeHTML(person.username)} as a friend">Remove</button></div>`;
  }).join("");
  const incomingRows = requests.map((person) => `<div class="friend-row">${miniAvatar(person)}<div class="friend-details"><h3 class="friend-username">${escapeHTML(person.username)}</h3><div class="friend-status">Wants to be your friend</div></div><button class="primary-button small" data-friend-accept="${escapeHTML(person.id)}">Accept</button><button class="secondary-button small" data-friend-decline="${escapeHTML(person.id)}">Decline</button></div>`).join("");
  const outgoingRows = outgoing.map((person) => `<div class="friend-row">${miniAvatar(person)}<div class="friend-details"><h3 class="friend-username">${escapeHTML(person.username)}</h3><div class="friend-status">Request sent · ${escapeHTML(presenceStatus(person).label)}</div></div><button class="secondary-button small" data-friend-cancel="${escapeHTML(person.id)}">Cancel</button></div>`).join("");
  const suggestionRows = suggestions.map((person) => {
    const status = presenceStatus(person);
    return `<div class="friend-row">${miniAvatar(person)}<div class="friend-details"><h3 class="friend-username">${escapeHTML(person.username)}</h3><div class="friend-status status-${status.state}"><span class="presence-dot"></span>${escapeHTML(status.label)}</div></div><button class="primary-button small" data-friend="${escapeHTML(person.id)}" aria-label="Send a friend request to ${escapeHTML(person.username)}">${icon("plus")}Add</button></div>`;
  }).join("");
  return `${pageHeading("Your people", "Send requests, accept new friends, and see who's around.", `<button class="primary-button" data-focus="#friend-search">${icon("plus")}Find friends</button>`)}<div class="friends-layout"><section class="panel"><div class="section-heading"><h2 class="section-title">Friends</h2><span style="color:var(--muted);font-size:12px">${friends.length}</span></div>${friendRows || emptyState("Every adventure's better together.", "Find a player and send a friend request.")}${requests.length ? `<div class="section-heading"><h2 class="section-title">Incoming requests (${requests.length})</h2></div>${incomingRows}` : ""}${outgoing.length ? `<div class="section-heading"><h2 class="section-title">Sent requests (${outgoing.length})</h2></div>${outgoingRows}` : ""}</section><aside class="panel"><h2 class="panel-title">People to meet</h2><p class="panel-copy">Friend requests need to be accepted before you become friends.</p><label class="form-label" style="margin-top:14px"><span>Search by username</span><div class="search-wrap" style="flex:initial"><span class="search-icon">${icon("search")}</span><input id="friend-search" class="search-input" type="search" placeholder="Try a username…" autocomplete="off" aria-label="Search friends"/></div></label><div id="friend-suggestions" style="margin-top:10px">${suggestionRows || `<p class="panel-copy" style="padding:12px 0">No players found. Try searching for someone else.</p>`}</div></aside></div>`;
}

function renderProfilePage() {
  const person = findPerson(profileId);
  if (!person) return `${pageHeading("Profile unavailable", "This account could not be found.")}<button class="secondary-button" data-route="friends">Back to friends</button>`;
  const personAccount = state.accounts.find((candidate) => candidate.id === person.id);
  const owner = person.id === state.session;
  const presence = presenceStatus(person);
  const background = person.profileBackground || "sky";
  const friends = person.friends.map(findPerson).filter(Boolean);
  const backgroundControls = owner ? `<section class="profile-background-controls"><h2 class="panel-title">Profile backgrounds</h2><div>${PROFILE_BACKGROUNDS.map((item) => {
    const owned = personAccount.ownedBackgrounds.includes(item.id);
    return owned
      ? `<button class="secondary-button small" data-profile-bg="${item.id}">${personAccount.profileBackground === item.id ? "Using " : "Use "}${escapeHTML(item.name)}</button>`
      : `<button class="primary-button small" data-profile-buy-bg="${item.id}">Buy ${escapeHTML(item.name)} · ${item.price} ${item.currency === "cones" ? "Cones" : "Pix"}</button>`;
  }).join("")}</div></section>` : "";
  return `<section class="profile-page profile-background-${escapeHTML(background)}"><header class="profile-page-banner"><div class="profile-page-avatar avatar-frame">${avatarSVG(person, true)}</div><div class="profile-page-intro"><p class="profile-id">PLAYER ID · ${escapeHTML(person.id)}</p><h1>${escapeHTML(person.username)}</h1><p class="friend-status status-${presence.state}"><span class="presence-dot"></span>${escapeHTML(presence.label)}</p>${personAccount?.statusText ? `<p>${escapeHTML(personAccount.statusText)}</p>` : ""}</div>${owner ? '<button class="secondary-button" data-route="avatar">Customize avatar</button>' : personAccount && !currentAccount().friends.includes(person.id) ? `<button class="primary-button" data-friend="${escapeHTML(person.id)}">${icon("plus")}Add friend</button>` : personAccount ? `<button class="primary-button" data-chat="${escapeHTML(person.id)}">${icon("chat")}Message</button>` : ""}</header><div class="profile-page-content"><div class="profile-summary"><span>Joined ${escapeHTML(new Date(person.createdAt || Date.now()).toLocaleDateString())}</span><span>${person.games.length} games</span><span>${friends.length} friends</span></div>${backgroundControls}<section class="profile-games"><h2 class="panel-title">Games</h2>${person.games.length ? `<div class="game-grid">${person.games.filter((game) => !state.bannedGames.includes(game.id)).map((game) => gameCard({ ...game, creator: person.username })).join("")}</div>` : '<p class="profile-empty">No games published yet.</p>'}</section></div></section>`;
}

function renderChat() {
  const account = currentAccount();
  const friends = account.friends.map((id) => state.accounts.find((person) => person.id === id && !person.banned)).filter(Boolean);
  if (!friends.some((person) => person.id === activeChatId)) activeChatId = friends[0]?.id || null;
  const activeFriend = friends.find((person) => person.id === activeChatId);
  const conversation = activeFriend
    ? state.messages.filter((message) =>
      (message.senderId === account.id && message.recipientId === activeFriend.id) ||
      (message.senderId === activeFriend.id && message.recipientId === account.id)
    ).slice(-200)
    : [];
  const friendList = friends.map((person) => `<button class="chat-friend${person.id === activeChatId ? " active" : ""}" data-chat="${escapeHTML(person.id)}">${miniAvatar(person, "menu-avatar")}<span>${escapeHTML(person.username)}</span></button>`).join("");
  return `${pageHeading("Messages", "Chat privately with your accepted friends.")}<div class="chat-layout"><aside class="panel chat-friend-list"><h2 class="panel-title">Friends</h2>${friendList || '<p class="panel-copy">Add a friend before starting a chat.</p>'}</aside><section class="panel chat-conversation">${activeFriend ? `<header class="chat-heading">${miniAvatar(activeFriend, "menu-avatar")}<strong>${escapeHTML(activeFriend.username)}</strong></header><div class="chat-messages" aria-live="polite">${conversation.map((message) => `<article class="chat-message${message.senderId === account.id ? " own" : ""}"><p>${escapeHTML(message.text)}</p><time>${escapeHTML(new Date(message.createdAt).toLocaleString())}</time></article>`).join("") || '<p class="panel-copy">Say hello to get the conversation started.</p>'}</div><form id="chat-message-form" class="chat-compose"><input type="hidden" name="recipientId" value="${escapeHTML(activeFriend.id)}"/><label class="sr-only" for="chat-message-input">Message</label><textarea id="chat-message-input" class="text-area" name="message" maxlength="300" rows="2" placeholder="Write a message…" required></textarea><button class="primary-button" type="submit">Send</button></form>` : '<div class="chat-empty"><h2 class="panel-title">No friends to message yet</h2><p class="panel-copy">Friend requests are accepted before chatting is available.</p><button class="primary-button" data-route="friends">Find friends</button></div>'}</section></div>`;
}

function renderMyGames() {
  const games = myGames();
  const account = currentAccount();
  return `${pageHeading("Your games", "Your published creations appear in the For You feed for every account in this browser.", `<button class="primary-button" data-route="create">${icon("plus")}Create game</button>`)}${games.length ? `<div class="game-grid">${games.map((game) => `<div class="my-game-entry">${gameCard({ ...game, creator: account.username })}<button class="secondary-button small my-game-edit" data-game-edit="${escapeHTML(game.id)}">Edit game details</button></div>`).join("")}</div>` : emptyState("An empty shelf is full of possibility.", "Pick a name, set a scene, and publish your first tiny world.", '<button class="primary-button small" data-route="create">Create your first game →</button>')}`;
}

function renderCreateLegacy() {
  const account = currentAccount();
  const editing = editorGameId ? account.games.find((game) => game.id === editorGameId) : null;
  if (editorGameId && !editing) editorGameId = null;
  const palette = editing
    ? GAME_PALETTES.find((item) => item.sky === editing.sky && item.ground === editing.ground) || GAME_PALETTES[0]
    : GAME_PALETTES.find((option) => option.id === creatorPalette) || GAME_PALETTES[0];
  if (editing) creatorPalette = palette.id;
  return `${pageHeading(editing ? "Game details editor" : "The game creator", editing ? "Update your published game's name, about, genre, and cover." : "Start a world and publish it to the For You feed.")}<div class="create-layout"><section class="panel"><h2 class="panel-title">${editing ? "Edit your game" : "Give your game a start"}</h2><p class="panel-copy" style="margin-bottom:17px">Edit the experience card players see in discovery and when they open your game.</p><form id="game-form" class="game-form"><label class="form-label"><span>Game name</span><input class="text-input" name="name" maxlength="36" placeholder="e.g. My Tiny World" value="${escapeHTML(editing?.name || "")}" required autocomplete="off"/></label><label class="form-label"><span>About this game</span><textarea class="text-area" name="description" maxlength="200" placeholder="Tell players what your game is about and what they can do there." required>${escapeHTML(editing?.description || "")}</textarea></label><label class="form-label"><span>Genre</span><select class="select-input" name="genre" required>${GAME_GENRES.filter((genre) => genre !== "All").map((genre) => `<option${editing?.genre === genre ? " selected" : ""}>${escapeHTML(genre)}</option>`).join("")}</select></label><div class="form-label"><span>Choose a cover world</span><div class="cover-picker">${GAME_PALETTES.map((option) => `<button type="button" class="cover-swatch${palette.id === option.id ? " selected" : ""}" data-palette="${escapeHTML(option.id)}" style="background:linear-gradient(135deg,${escapeHTML(option.sky)} 0 50%,${escapeHTML(option.ground)} 50%)" title="${escapeHTML(option.name)}" aria-label="${escapeHTML(option.name)}" aria-pressed="${palette.id === option.id}"></button>`).join("")}</div></div><div class="button-row">${editing ? '<button class="primary-button" type="submit">Save game details</button><button class="secondary-button" type="button" data-game-edit-cancel>Cancel</button>' : `<button class="primary-button" type="submit">${icon("plus")}Publish game</button>`}</div></form></section><section><div class="game-cover hero-cover" style="--cover-a:${escapeHTML(palette.sky)};--cover-b:${escapeHTML(palette.ground)};--character:${escapeHTML(palette.char)}"><span class="cover-sky"></span><span class="cover-character">★</span><span class="cover-word">${escapeHTML(editing?.name || "Your next big idea.")}</span></div><div class="creator-note" style="margin-top:13px"><strong style="color:var(--text)">Publishing and discovery</strong><br>Your games are immediately listed in For You for all accounts saved in this browser. This local demo has no shared server, so the feed is not visible on other computers.</div></section></div>`;
}

function renderCreate() {
  const account = currentAccount();
  const editing = editorGameId ? account.games.find((game) => game.id === editorGameId) : null;
  if (editorGameId && !editing) editorGameId = null;
  const palette = editing
    ? GAME_PALETTES.find((item) => item.sky === editing.sky && item.ground === editing.ground) || GAME_PALETTES[0]
    : GAME_PALETTES.find((option) => option.id === creatorPalette) || GAME_PALETTES[0];
  if (editing) creatorPalette = palette.id;
  const selectedIcon = creatorIcon;
  const rewardCurrency = editing?.rewardCurrency || "pix";
  return `${pageHeading(editing ? "Game details editor" : "The game creator", editing ? "Update your published game's settings." : "Start a world and publish it to the For You feed.")}<div class="create-layout"><section class="panel"><h2 class="panel-title">${editing ? "Edit your game" : "Give your game a start"}</h2><p class="panel-copy" style="margin-bottom:17px">Choose a supported built-in game mode, icon, and reward. Rocone never runs pasted JavaScript.</p><form id="game-form" class="game-form"><label class="form-label"><span>Game name</span><input class="text-input" name="name" maxlength="36" placeholder="e.g. My Tiny World" value="${escapeHTML(editing?.name || "")}" required autocomplete="off"/></label><label class="form-label"><span>About this game</span><textarea class="text-area" name="description" maxlength="200" placeholder="Tell players what your game is about and what they can do there." required>${escapeHTML(editing?.description || "")}</textarea></label><label class="form-label"><span>Genre</span><select class="select-input" name="genre" required>${GAME_GENRES.filter((genre) => genre !== "All").map((genre) => `<option${editing?.genre === genre ? " selected" : ""}>${escapeHTML(genre)}</option>`).join("")}</select></label><label class="form-label"><span>Built-in game mode</span><select class="select-input" name="gameMode"><option value="dash"${(editing?.type || "dash") === "dash" ? " selected" : ""}>Cone Dash</option><option value="hop"${editing?.type === "hop" ? " selected" : ""}>Cloud Hop</option></select></label><div class="form-label"><span>Game icon</span><div class="game-icon-picker">${GAME_ICONS.map((symbol) => `<button type="button" class="game-icon-choice${symbol === selectedIcon ? " selected" : ""}" data-game-icon="${escapeHTML(symbol)}" aria-pressed="${symbol === selectedIcon}">${escapeHTML(symbol)}</button>`).join("")}</div></div><div class="form-label"><span>Choose a cover world</span><div class="cover-picker">${GAME_PALETTES.map((option) => `<button type="button" class="cover-swatch${palette.id === option.id ? " selected" : ""}" data-palette="${escapeHTML(option.id)}" style="background:linear-gradient(135deg,${escapeHTML(option.sky)} 0 50%,${escapeHTML(option.ground)} 50%)" title="${escapeHTML(option.name)}" aria-label="${escapeHTML(option.name)}" aria-pressed="${palette.id === option.id}"></button>`).join("")}</div></div><label class="form-label"><span>Reward for a completed run</span><div class="game-reward-controls"><input class="text-input" name="rewardAmount" type="number" min="0" max="1000" step="1" value="${editing?.rewardAmount ?? 10}" required/><select class="select-input" name="rewardCurrency"><option value="pix"${rewardCurrency === "pix" ? " selected" : ""}>Pix</option><option value="cones"${rewardCurrency === "cones" ? " selected" : ""}>Cones</option></select></div></label><div class="button-row">${editing ? '<button class="primary-button" type="submit">Save game settings</button><button class="secondary-button" type="button" data-game-edit-cancel>Cancel</button>' : `<button class="primary-button" type="submit">${icon("plus")}Publish game</button>`}</div></form></section><section><div class="game-cover hero-cover" style="--cover-a:${escapeHTML(palette.sky)};--cover-b:${escapeHTML(palette.ground)};--character:${escapeHTML(palette.char)}"><span class="cover-sky"></span><span class="cover-character">${escapeHTML(selectedIcon)}</span><span class="cover-word">${escapeHTML(editing?.name || "Your next big idea.")}</span></div><div class="creator-note" style="margin-top:13px"><strong style="color:var(--text)">Safe game modes</strong><br>Games use Rocone's built-in mini-game templates; arbitrary scripts are not executed. Shared discovery and settings require the Rocone SQLite server.</div></section></div>`;
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
  const accountDirectory = state.accounts.length ? `<div class="admin-account-directory-list">${state.accounts.map((account) => {
    const accountType = account.isFake ? "fake demo" : "registered";
    const createdAt = new Date(account.createdAt);
    const createdLabel = Number.isNaN(createdAt.getTime()) ? "Unknown" : createdAt.toLocaleString();
    const searchText = [account.username, account.id, account.email, account.phone, accountType, account.isAdmin ? "admin" : "", account.banned ? "banned" : "active"].join(" ").toLocaleLowerCase();
    return `<details class="admin-account-directory-row" data-account-search="${escapeHTML(searchText)}">
      <summary><span class="admin-account-directory-identity">${miniAvatar(account, "menu-avatar")}<span><strong>${escapeHTML(account.username)}</strong><small>ID ${escapeHTML(account.id)}</small></span></span>
        <span class="admin-account-directory-meta">${account.isRootAdmin ? "Root admin" : account.isAdmin ? "Admin" : accountType}</span>
        <span class="admin-account-directory-meta">${account.banned ? "Banned" : "Active"}</span>
        <span class="admin-account-directory-date">${escapeHTML(createdLabel)}</span>
      </summary>
      <div class="admin-account-directory-details"><span>Cones: ${account.conesInfinite ? "∞" : account.cones}</span><span>Pix: ${account.pixInfinite ? "∞" : account.pix}</span><span>Friends: ${account.friends.length}</span><span>Games: ${account.games.length}</span><span>Email: ${escapeHTML(account.email || "Not provided")}</span><span>Phone: ${escapeHTML(account.phone || "Not provided")}</span>${account.banned && account.banReason ? `<span>Ban reason: ${escapeHTML(account.banReason)}</span>` : ""}</div>
    </details>`;
  }).join("")}</div><p class="panel-copy admin-account-directory-empty" hidden>No accounts match that search.</p>` : emptyState("No accounts have been created yet.", "Newly registered accounts will appear here.");
  const games = [
    ...state.accounts.flatMap((account) => account.games.map((game) => ({ ...game, ownerId: account.id, ownerName: account.username }))),
    ...GAMES.map((game) => ({ ...game, ownerId: "", ownerName: game.creator })),
  ];
  const colors = Object.entries(CUSTOM_THEME_VARS).map(([key, color]) =>
    `<label class="admin-field"><span>${escapeHTML(key)}</span><input class="text-input admin-color-input" type="color" name="theme-${key}" value="${escapeHTML(state.customTheme?.[key] || color)}"/></label>`
  ).join("");
  const pendingReports = state.moderationReports.filter((report) => report.status === "pending");
  const reportRows = pendingReports.length ? `<div class="admin-list">${pendingReports.map((report) => `<article class="moderation-report"><div><strong>${escapeHTML(report.username)} · ID ${escapeHTML(report.accountId)}</strong><span>${escapeHTML(new Date(report.createdAt).toLocaleString())}</span></div><blockquote>${(report.evidence || []).map((text) => `<p>${escapeHTML(text)}</p>`).join("")}</blockquote><div class="admin-user-actions"><button class="danger-button small" data-report-action="ban" data-report-id="${escapeHTML(report.id)}">Ban</button><button class="secondary-button small" data-report-action="warn" data-report-id="${escapeHTML(report.id)}">Warn</button><button class="secondary-button small" data-report-action="ignore" data-report-id="${escapeHTML(report.id)}">Nothing</button></div></article>`).join("")}</div>` : '<p class="panel-copy">No pending profanity reports.</p>';
  const users = players.length ? `<div class="admin-list">${players.map((account) => `
    <article class="admin-user-row">
      <div class="admin-user-info">${miniAvatar(account, "menu-avatar")}<div><strong>${escapeHTML(account.username)}</strong><span>${account.isFake ? "Fake/demo user" : "Player"}${account.isAdmin ? " · Admin" : ""} · ${account.banned ? "Banned" : "Active"} · ID ${escapeHTML(account.id)}</span></div></div>
      <label class="admin-field"><span>Account ID</span><input class="text-input" data-admin-id="${escapeHTML(account.id)}" value="${escapeHTML(account.id)}" maxlength="64" ${account.id === "1" ? "disabled" : ""}/></label>
      <label class="admin-field"><span>Username (duplicates allowed)</span><input class="text-input" data-admin-username="${escapeHTML(account.id)}" value="${escapeHTML(account.username)}" maxlength="40"/></label>
      <label class="admin-field"><span>Cones</span><input class="text-input" data-admin-cones="${escapeHTML(account.id)}" type="number" min="0" max="${Number.MAX_SAFE_INTEGER}" value="${account.cones}"/><span class="admin-checkbox"><input type="checkbox" data-admin-cones-infinite="${escapeHTML(account.id)}"${account.conesInfinite ? " checked" : ""}/> Infinite</span></label>
      <label class="admin-field"><span>Pix</span><input class="text-input" data-admin-pix="${escapeHTML(account.id)}" type="number" min="0" max="${Number.MAX_SAFE_INTEGER}" value="${account.pix}"/><span class="admin-checkbox"><input type="checkbox" data-admin-pix-infinite="${escapeHTML(account.id)}"${account.pixInfinite ? " checked" : ""}/> Infinite</span></label>
      <div class="admin-user-actions">
        <button class="secondary-button small" data-admin-save="${escapeHTML(account.id)}">Save edits</button>
        <button class="secondary-button small" data-admin-role="${escapeHTML(account.id)}">${account.isAdmin ? "Remove admin" : "Grant admin"}</button>
        ${account.isFake && !account.banned ? `<button class="primary-button small" data-admin-login-as="${escapeHTML(account.id)}">Log in as this fake user</button>` : ""}
        <input class="text-input admin-ban-reason" data-admin-reason="${escapeHTML(account.id)}" maxlength="160" placeholder="Optional ban reason" value="${escapeHTML(account.banReason)}" ${account.banned ? "disabled" : ""}/>
        <button class="${account.banned ? "secondary-button" : "danger-button"} small" data-admin-ban="${escapeHTML(account.id)}" data-ban-state="${account.banned ? "unban" : "ban"}">${account.banned ? "Unban" : "Ban"}</button>
        ${account.isFake ? `<button class="danger-button small" data-admin-delete-account="${escapeHTML(account.id)}">Permanently delete fake account</button>` : ""}
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
  return `${pageHeading("Rocone administration", "Manage users, reports, games, website content, and themes.")}<div class="admin-notice"><strong>Demo controls:</strong> shared records are stored in this server's SQLite database. This demo has no server-side account authorization; do not expose it to untrusted networks.</div>
    <section class="panel admin-section"><div class="admin-section-heading"><div><h2 class="panel-title">All accounts</h2><p class="panel-copy">Browse every account saved on this Rocone server, including admins and banned or fake accounts. Passwords and password hashes are never shown.</p></div><span class="admin-count">${state.accounts.length} total</span></div><label class="admin-field admin-account-search"><span>Search by username, ID, email, phone, or account type</span><input id="admin-account-search" class="text-input" type="search" placeholder="Search all accounts…" autocomplete="off"/></label>${accountDirectory}</section>
    <section class="panel admin-section"><div class="admin-section-heading"><div><h2 class="panel-title">Profanity reports</h2><p class="panel-copy">Five filtered messages within 10 seconds sends evidence here for administrator ID 1 (urGumball). No ban is automatic.</p></div><span class="admin-count">${pendingReports.length} pending</span></div>${reportRows}</section>
    <section class="panel admin-section"><h2 class="panel-title">Create an account</h2><p class="panel-copy">Set roles and starting balances, allow unusual usernames, or create a fake account for local testing. Duplicate names are allowed.</p><form class="admin-create-form" id="admin-create-form"><label class="admin-field"><span>Username</span><input class="text-input" name="username" maxlength="40" placeholder="Any display name; duplicates allowed" required/></label><label class="admin-field"><span>Password (required for real users)</span><input class="text-input" name="password" type="password" minlength="8" placeholder="At least 8 characters"/></label><label class="admin-field"><span>Starting Cones</span><input class="text-input" name="cones" type="number" min="0" max="${Number.MAX_SAFE_INTEGER}" value="75" required/></label><label class="admin-field"><span>Starting Pix</span><input class="text-input" name="pix" type="number" min="0" max="${Number.MAX_SAFE_INTEGER}" value="125" required/></label><label class="admin-checkbox"><input type="checkbox" name="admin"/> Make this user an administrator</label><label class="admin-checkbox"><input type="checkbox" name="fake"/> Create as fake/demo user (admin-only testing)</label><label class="admin-checkbox"><input type="checkbox" name="allowAnyUsername"/> Allow any username characters</label><button class="primary-button small" type="submit">Create user</button></form></section>
    <section class="panel admin-section"><div class="admin-section-heading"><div><h2 class="panel-title">Player accounts</h2><p class="panel-copy">Edit names, balances, infinite currency, roles, avatars, passwords, and bans.</p></div><span class="admin-count">${players.length} users</span></div>${users}</section>
    <section class="panel admin-section"><div class="admin-section-heading"><div><h2 class="panel-title">Games</h2><p class="panel-copy">Ban or restore built-in and player-made games, or delete community games.</p></div><span class="admin-count">${games.length} games</span></div>${gameRows}</section>
    <section class="panel admin-section"><h2 class="panel-title">Customize website</h2><p class="panel-copy">Change the local portal name, announcement, and home-page greeting.</p><form class="admin-site-form" id="admin-site-form"><label class="admin-field"><span>Site name</span><input class="text-input" name="siteName" maxlength="40" value="${escapeHTML(state.site.name)}" required/></label><label class="admin-field"><span>Announcement (leave blank to hide)</span><input class="text-input" name="announcement" maxlength="180" value="${escapeHTML(state.site.announcement)}"/></label><label class="admin-field"><span>Home greeting</span><input class="text-input" name="welcome" maxlength="50" value="${escapeHTML(state.site.welcome)}" required/></label><button class="primary-button small" type="submit">Save website edits</button></form></section>
    <section class="panel admin-section"><h2 class="panel-title">Custom theme colors</h2><p class="panel-copy">Choose colors for this browser. Reset to use the selected light or dark theme.</p><form class="admin-theme-form" id="admin-theme-form">${colors}<div class="admin-user-actions"><button class="primary-button small" type="submit">Save custom theme</button><button class="secondary-button small" type="button" data-admin-theme-reset>Reset to standard theme</button></div></form></section>`;
}

function renderMainContent() {
  if (route === "admin") return renderAdmin();
  if (route === "profile") return renderProfilePage();
  if (route === "chat") return renderChat();
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
  { id: "chat", label: "Chat", icon: "chat" },
  { id: "create", label: "Create", icon: "create" },
  { id: "catalog", label: "Robux", icon: "currency" },
];

const DESKTOP_NAV_IDS = ["games", "avatar", "create", "catalog"];

function renderNavButton(item, isMobile = false) {
  return `<button class="${isMobile ? "mobile-nav-button" : "nav-button"}${route === item.id || item.id === "catalog" && route === "catalog" ? " active" : ""}" data-route="${escapeHTML(item.id)}" aria-label="${escapeHTML(item.label)}">${isMobile ? `<span>${icon(item.icon)}</span><span class="nav-label">${escapeHTML(item.label)}</span>` : `<span class="nav-icon">${icon(item.icon)}</span><span class="nav-label">${escapeHTML(item.label)}</span>`}</button>`;
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
  const ownPresence = presenceStatus(account);
  const adminMenuItem = account.isAdmin ? `<button class="menu-item${route === "admin" ? " active" : ""}" data-route="admin">${icon("settings")}Administration</button>` : "";
  app.innerHTML = `<header class="app-header"><div class="header-inner"><div class="legacy-brand-group"><button class="legacy-menu-button" data-drawer-toggle aria-label="Open navigation menu" aria-expanded="${drawerOpen}">${icon("menu")}</button><button class="legacy-brand" data-route="home" aria-label="${escapeHTML(state.site.name)} home"><span class="brand-mark">${escapeHTML(state.site.name.slice(0, 1).toUpperCase())}</span></button></div><nav class="header-nav" aria-label="Main navigation">${DESKTOP_NAV_IDS.map((id) => renderNavButton(NAV_ITEMS.find((item) => item.id === id))).join("")}</nav><label class="search-wrap">${icon("search", "search-icon")}<input id="global-search" class="search-input" type="search" placeholder="Search" aria-label="Search games" value="${route === "games" ? escapeHTML(gameSearch) : escapeHTML(catalogSearch)}"/></label><div class="header-actions"><button class="legacy-user-button" data-profile="${escapeHTML(account.id)}">${escapeHTML(account.username)}<span class="presence-dot header-presence-dot status-${ownPresence.state}" title="${escapeHTML(ownPresence.label)}"></span>${account.isAdmin ? ' <span class="legacy-admin-badge">ADMIN</span>' : ' <span class="legacy-age">13+</span>'}</button><button class="legacy-icon-button" data-route="friends" aria-label="Friends and messages" title="Friends and messages">${icon("chat")}</button><span class="balance legacy-balance cones-balance" aria-label="${account.cones} Cones" title="${account.cones} Cones"><span class="balance-icon cones">◆</span><span class="balance-count">${account.cones}</span><span class="balance-label">Cones</span></span><span class="balance legacy-balance" aria-label="${account.pix} Pix" title="${account.pix} Pix"><span class="balance-icon">${icon("currency")}</span><span class="balance-count">${account.pix}</span><span class="balance-label">Pix</span></span><button class="legacy-icon-button" data-open-settings aria-label="Settings" title="Settings">${icon("settings")}</button><div class="account-menu-wrap"><button class="legacy-icon-button account-trigger" data-account-menu aria-label="Switch accounts" aria-expanded="${accountMenuOpen}" title="Switch accounts">${miniAvatar(account, "menu-avatar")}</button>${accountMenuOpen ? renderAccountMenu() : ""}</div></div>${drawerOpen ? `<aside class="legacy-drawer"><div class="menu-label">Your Rocone</div><button class="menu-item" data-route="home">${icon("home")}Home</button><button class="menu-item" data-route="friends">${icon("friends")}Friends</button><button class="menu-item" data-route="my-games">${icon("games")}My library</button><button class="menu-item" data-route="create">${icon("create")}Create a game</button>${adminMenuItem}<div class="subtle-divider"></div><button class="menu-item" data-open-settings>${icon("settings")}Settings & theme</button><div class="menu-label">Switch account</div>${state.accounts.map((item) => `<button class="menu-item" data-switch-account="${escapeHTML(item.id)}">${miniAvatar(item, "menu-avatar")}<span>${escapeHTML(item.username)}</span>${item.id === state.session ? '<span style="color:var(--accent)">✓</span>' : ""}</button>`).join("")}<button class="menu-item" data-new-account>${icon("plus")}Add an account</button><button class="menu-item" data-logout>Log out</button></aside>` : ""}</div></header><nav class="mobile-bottom-nav" aria-label="Mobile navigation">${NAV_ITEMS.filter((item) => item.id !== "catalog").map((item) => renderNavButton(item, true)).join("")}</nav><main class="main${route === "home" ? " legacy-home-main" : ""}">${renderMainContent()}</main>${route === "home" ? '<button class="classic-chat-button" data-route="friends"><span>Chat</span><span class="classic-chat-count">1</span></button>' : ""}${renderModal()}`;
  wireRenderedState();
  applyAnnouncement();
  applyBalanceDisplay();
}

function renderAccountMenu() {
  return `<div class="account-menu"><div class="menu-label">Your accounts</div>${savedAccounts().map((account) => `<div class="account-switcher-row"><button class="menu-item" data-switch-account="${escapeHTML(account.id)}">${miniAvatar(account, "menu-avatar")}<span class="account-switcher-name">${escapeHTML(account.username)}</span>${account.id === state.session ? '<span style="color:var(--accent)">✓</span>' : ""}</button><button class="account-remove-button" data-remove-account="${escapeHTML(account.id)}" aria-label="Hide ${escapeHTML(account.username)} from this device's switcher" title="Hide from this device">×</button></div>`).join("")}<p class="menu-label">Accounts remain saved on the server.</p><div class="subtle-divider" style="margin:6px 4px"></div><button class="menu-item" data-new-account>${icon("plus")}Add another account</button><button class="menu-item" data-open-settings>${icon("settings")}Settings & theme</button><button class="menu-item" data-logout>Log out</button></div>`;
}

let openModal = null;
function renderSettingsModal(account) {
  return `<div class="modal-backdrop" data-backdrop><section class="modal wide" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="icon-button modal-close" data-close-modal aria-label="Close settings">${icon("close")}</button><h2 id="modal-title" class="modal-title">Make yourself at home.</h2><p class="modal-subtitle">Themes are saved separately on each device.</p>${THEME_CHOICES.map((choice) => `<label class="setting-option" style="margin-bottom:10px"><input type="radio" name="theme-choice" value="${choice.id}"${account.theme === choice.id ? " checked" : ""}/><span class="setting-icon" style="background:${choice.swatch};color:${choice.id === "dark" ? "#fff" : "#222"}">${choice.id === "dark" ? icon("moon") : icon("sun")}</span><span class="setting-detail"><span class="setting-name">${choice.name} theme</span><span class="setting-help">${choice.id === "dark" ? "A quiet midnight palette with soft green." : "A bright, easy-on-the-eyes palette."}</span></span></label>`).join("")}<div class="subtle-divider"></div><h3 class="panel-title">Your status</h3><p class="panel-copy">Choose how you appear to other players. Presence updates when your page reloads.</p><form id="settings-status-form" class="settings-contact-form"><label class="form-label"><span>Availability</span><select class="select-input" name="status">${PRESENCE_OPTIONS.map((option) => `<option value="${option.id}"${account.status === option.id ? " selected" : ""}>${option.label}</option>`).join("")}</select></label><label class="form-label"><span>Status message (optional)</span><input class="text-input" name="statusText" maxlength="60" value="${escapeHTML(account.statusText)}" placeholder="What are you up to?"/></label><button class="primary-button" type="submit">Save status</button></form><div class="subtle-divider"></div><h3 class="panel-title">Optional contact details</h3><p class="panel-copy">Stored in the shared SQLite database, unverified, and not used for recovery.</p><form id="settings-contact-form" class="settings-contact-form"><label class="form-label"><span>Email (optional)</span><input class="text-input" type="email" name="email" maxlength="254" autocomplete="email" value="${escapeHTML(account.email)}" placeholder="you@example.com"/></label><label class="form-label"><span>Phone (optional)</span><input class="text-input" type="tel" name="phone" maxlength="32" autocomplete="tel" value="${escapeHTML(account.phone)}" placeholder="+1 555 0100"/></label><button class="primary-button" type="submit">Save contact details</button></form><div class="subtle-divider"></div><p class="panel-copy"><strong style="color:var(--text)">Demo service.</strong> Shared accounts and games are kept by the SQLite server. Do not use real passwords or private contact information with this unauthenticated demo.</p></section></div>`;
}

function renderModal() {
  if (!openModal) return "";
  if (openModal.type === "settings") {
    const current = currentAccount();
    const account = { ...current, theme: themeForAccount(current) };
    return renderSettingsModal(account);
    return `<div class="modal-backdrop" data-backdrop><section class="modal wide" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="icon-button modal-close" data-close-modal aria-label="Close settings">${icon("close")}</button><h2 id="modal-title" class="modal-title">Make yourself at home.</h2><p class="modal-subtitle">Your theme belongs to this account on this device.</p>${THEME_CHOICES.map((choice) => `<label class="setting-option" style="margin-bottom:10px"><input type="radio" name="theme-choice" value="${choice.id}"${account.theme === choice.id ? " checked" : ""}/><span class="setting-icon" style="background:${choice.swatch};color:${choice.id === "dark" ? "#fff" : "#222"}">${choice.id === "dark" ? icon("moon") : icon("sun")}</span><span class="setting-detail"><span class="setting-name">${choice.name} theme</span><span class="setting-help">${choice.id === "dark" ? "A quiet midnight palette with soft green." : "A bright, easy-on-the-eyes palette."}</span></span></label>`).join("")}<div class="subtle-divider"></div><h3 class="panel-title">Your status</h3><p class="panel-copy">Choose how you appear to other players. Playing a game appears automatically while your status is Online.</p><form id="settings-status-form" class="settings-contact-form"><label class="form-label"><span>Availability</span><select class="select-input" name="status">${PRESENCE_OPTIONS.map((option) => `<option value="${option.id}"${account.status === option.id ? " selected" : ""}>${option.label}</option>`).join("")}</select></label><label class="form-label"><span>Status message (optional)</span><input class="text-input" name="statusText" maxlength="60" value="${escapeHTML(account.statusText)}" placeholder="What are you up to?"/></label><button class="primary-button" type="submit">Save status</button></form><div class="subtle-divider"></div><h3 class="panel-title">Optional contact details</h3><p class="panel-copy">Email and phone are stored only in this browser. This demo cannot verify them or send recovery codes.</p><form id="settings-contact-form" class="settings-contact-form"><label class="form-label"><span>Email (optional)</span><input class="text-input" type="email" name="email" maxlength="254" autocomplete="email" value="${escapeHTML(account.email)}" placeholder="you@example.com"/></label><label class="form-label"><span>Phone (optional)</span><input class="text-input" type="tel" name="phone" maxlength="32" autocomplete="tel" value="${escapeHTML(account.phone)}" placeholder="+1 555 0100"/></label><button class="primary-button" type="submit">Save contact details</button></form><div class="subtle-divider"></div><p class="panel-copy"><strong style="color:var(--text)">Local data only.</strong> Accounts, passwords (hashed in your browser), friends, avatars, games, and purchases live in this browser's local storage. Preferences do not sync to other computers.</p></section></div>`;
  }
  if (openModal.type === "exchange") return `<div class="modal-backdrop" data-backdrop><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="icon-button modal-close" data-close-modal aria-label="Close currency exchange">${icon("close")}</button><h2 id="modal-title" class="modal-title">Exchange currency</h2><p class="modal-subtitle">1 Cone is worth 10 Pix. Pix amounts exchanged for Cones must be multiples of 10.</p><form id="currency-exchange-form" class="game-form"><label class="form-label"><span>Exchange from</span><select class="select-input" name="from"><option value="cones"${exchangeFrom === "cones" ? " selected" : ""}>Cones → Pix (1 Cone = 10 Pix)</option><option value="pix"${exchangeFrom === "pix" ? " selected" : ""}>Pix → Cones (10 Pix = 1 Cone)</option></select></label><label class="form-label"><span id="exchange-amount-label">${exchangeFrom === "cones" ? "Cones to exchange" : "Pix to exchange (multiple of 10)"}</span><input class="text-input" type="number" name="amount" min="${exchangeFrom === "cones" ? "1" : "10"}" step="${exchangeFrom === "cones" ? "1" : "10"}" max="${Number.MAX_SAFE_INTEGER}" required/></label><button class="primary-button" type="submit">Exchange</button></form><p class="panel-copy" style="margin-top:12px">Balances are account-local. Exchanges can't be reversed automatically.</p></section></div>`;
  if (openModal.type === "profile") {
    const person = findPerson(openModal.id);
    if (!person) return "";
    const isFriend = currentAccount().friends.includes(person.id);
    const incoming = currentAccount().friendRequests.incoming.includes(person.id);
    const outgoing = currentAccount().friendRequests.outgoing.includes(person.id);
    const presence = presenceStatus(person);
    const friendAction = isFriend
      ? `<button class="secondary-button" disabled>${icon("check")}Already friends</button>`
      : incoming ? `<button class="primary-button" data-friend-accept="${escapeHTML(person.id)}">Accept request</button>`
        : outgoing ? `<button class="secondary-button" data-friend-cancel="${escapeHTML(person.id)}">Request sent · cancel</button>`
          : person.isDemo ? "" : `<button class="primary-button" data-friend="${escapeHTML(person.id)}">${icon("plus")}Send friend request</button>`;
    return `<div class="modal-backdrop" data-backdrop><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="icon-button modal-close" data-close-modal aria-label="Close profile">${icon("close")}</button><div class="profile-card">${miniAvatar(person, "person-avatar avatar-frame")}<div><h2 id="modal-title" class="modal-title">${escapeHTML(person.username)}</h2><p class="modal-subtitle status-${presence.state}" style="margin:0"><span class="presence-dot"></span>${escapeHTML(presence.label)}</p></div></div>${person.isDemo ? "" : `<div class="subtle-divider"></div><div class="play-metrics"><div class="metric"><strong>${person.friends.length}</strong>Friends</div><div class="metric"><strong>${person.games.length}</strong>Games</div><div class="metric"><strong>${person.runs}</strong>Runs</div></div>`}<div class="button-row" style="margin-top:20px">${friendAction}${incoming ? `<button class="secondary-button" data-friend-decline="${escapeHTML(person.id)}">Decline</button>` : ""}<button class="secondary-button" data-close-modal>Close</button></div><section class="profile-games"><h3 class="panel-title">${person.isDemo ? "A little about this player" : "Games made"}</h3>${person.isDemo ? '<p class="profile-empty">An example community player, here to make your first visit to Rocone feel less like an empty room.</p>' : person.games.length ? `<div class="game-grid" style="grid-template-columns:repeat(auto-fill,minmax(140px,1fr));margin-top:12px">${person.games.filter((game) => !state.bannedGames.includes(game.id)).map((game) => gameCard({ ...game, creator: person.username })).join("")}</div>` : '<p class="profile-empty">No games here just yet. Maybe make something together?</p>'}</section></section></div>`;
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
  const adminSignup = signup && state.accounts.some((account) => account.isAdmin && !account.banned);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({ length: 101 }, (_, index) => new Date().getFullYear() - index);
  const saved = savedAccounts();
  const savedAccountPicker = !signup && saved.length
    ? `<section class="saved-account-picker" aria-label="Saved accounts"><h2>Choose a saved account</h2><div>${saved.map((account) => `<div class="saved-account-row"><button class="saved-account-select" data-login-account="${escapeHTML(account.id)}">${miniAvatar(account, "menu-avatar")}<span>${escapeHTML(account.username)}${account.isFake ? " · demo" : ""}</span></button><button class="account-remove-button" data-remove-account="${escapeHTML(account.id)}" aria-label="Remove ${escapeHTML(account.username)} from this device's switcher" title="Hide from this device">×</button></div>`).join("")}</div><p class="panel-copy">Removing an account here only hides it on this device; it does not delete the account.</p></section>`
    : "";
  const adminSignupOptions = adminSignup
    ? `<section class="admin-signup-options"><h2>Administrator signup options</h2><p>Admin account detected in this browser. These settings apply only to this local demo.</p><label class="form-label"><span>Starting Cones</span><input class="text-input" type="number" name="signupCones" min="0" max="${Number.MAX_SAFE_INTEGER}" value="75" required/></label><label class="form-label"><span>Starting Pix</span><input class="text-input" type="number" name="signupPix" min="0" max="${Number.MAX_SAFE_INTEGER}" value="125" required/></label><label class="admin-checkbox"><input type="checkbox" name="signupAdmin"/> Make this account an administrator</label><label class="admin-checkbox"><input type="checkbox" name="signupFake"/> Create as a fake/demo user</label><label class="admin-checkbox"><input type="checkbox" name="signupConesInfinite"/> Give this account infinite Cones</label><label class="admin-checkbox"><input type="checkbox" name="signupPixInfinite"/> Give this account infinite Pix</label><label class="admin-checkbox"><input type="checkbox" name="signupAnyUsername"/> Allow any username characters</label><label class="admin-checkbox"><input type="checkbox" name="signupDuplicates"/> Allow a duplicate username</label></section>`
    : "";
  const birthdayFields = `<label class="form-label"><span>Birthday</span><div class="auth-birthday-grid"><select class="select-input" name="birthMonth" aria-label="Birthday month" required><option value="">Month</option>${months.map((month, index) => `<option value="${index + 1}">${month}</option>`).join("")}</select><select class="select-input" name="birthDay" aria-label="Birthday day" required><option value="">Day</option>${Array.from({ length: 31 }, (_, index) => `<option value="${index + 1}">${index + 1}</option>`).join("")}</select><select class="select-input" name="birthYear" aria-label="Birthday year" required><option value="">Year</option>${years.map((year) => `<option value="${year}">${year}</option>`).join("")}</select></div></label>`;
  const genderField = `<fieldset class="auth-gender-fieldset"><legend class="auth-gender-legend">Gender</legend><div class="auth-gender-grid"><label><input type="radio" name="gender" value="boy"/><span aria-label="Boy">♙</span></label><label><input type="radio" name="gender" value="girl"/><span aria-label="Girl">♙</span></label></div></fieldset>`;
  const footer = `<section class="auth-below-card"><h2>ROCONE ON YOUR DEVICE</h2><div class="auth-store-badges"><a href="#app-store" data-ad-placeholder><span>●</span> App Store</a><a href="#google-play" data-ad-placeholder><span>▶</span> Google Play</a><a href="#amazon-store" data-ad-placeholder><span>amazon</span> appstore</a><a href="#xbox" data-ad-placeholder><span>◉</span> XBOX ONE</a><a href="#microsoft" data-ad-placeholder><span>▦</span> Microsoft</a></div></section><footer class="auth-footer"><nav>${["About Us", "Jobs", "Blog", "Parents", "Help", "Terms", "Privacy"].map((label) => `<a href="#${label.toLowerCase().replace(" ", "-")}" data-ad-placeholder>${label}</a>`).join("")}</nav><div class="auth-footer-bottom"><span>◉ &nbsp; English　⌄</span><small>Rocone demo service. Accounts and games are stored by the connected SQLite server; these links are examples.</small></div></footer>`;
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
              <input class="text-input" name="username" minlength="${signup && !adminSignup ? "3" : "1"}" maxlength="${signup && !adminSignup ? "20" : "40"}" ${signup && !adminSignup ? 'pattern="[A-Za-z0-9_]+" required' : ""} autocomplete="username" placeholder="Username" ${signup ? "required" : ""} autofocus/>
            </label>
            ${signup ? `<span class="auth-input-note">Don't use your real name</span>` : ""}
            <label class="form-label">
              <span>Password</span>
              <input class="text-input" name="password" type="password" minlength="${signup && adminSignup ? "0" : "8"}" autocomplete="${signup ? "new-password" : "current-password"}" placeholder="Password" ${signup && adminSignup ? "" : "required"}/>
            </label>
            ${signup ? genderField : ""}
            ${adminSignupOptions}
            ${authError ? `<p role="alert" class="auth-error">${escapeHTML(authError)}</p>` : ""}
            ${signup ? `<p class="auth-terms">By clicking Sign Up, you are agreeing to the <a href="#terms" data-ad-placeholder>Terms of Use</a> and acknowledging the <a href="#privacy" data-ad-placeholder>Privacy Policy.</a></p>` : ""}
            <button class="primary-button auth-submit" type="submit"${authBusy ? " disabled" : ""}>${authBusy ? "Please wait…" : signup ? "Sign Up" : "Log In"}</button>
          </form>
          <p class="auth-toggle">${signup ? "Already have an account?" : "New to Rocone?"} <button class="text-button" data-auth-mode="${signup ? "login" : "signup"}">${signup ? "Log In" : "Sign Up"}</button></p>
          ${!signup ? `<p class="auth-footnote">Your account is saved by the connected Rocone server. This local demo is not for real passwords.</p>` : ""}
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
  const adminSignup = authMode === "signup" && state.accounts.some((account) => account.isAdmin && !account.banned);
  const allowAnyUsername = adminSignup && values.has("signupAnyUsername");
  const createFake = adminSignup && values.has("signupFake");
  authError = "";

  if (authMode === "signup" && (allowAnyUsername ? !username || username.length > 40 : !/^[A-Za-z0-9_]{3,20}$/.test(username))) {
    authError = allowAnyUsername
      ? "Choose a username from 1 to 40 characters."
      : "Choose 3–20 letters, numbers, or underscores for your username.";
    renderAuth();
    return;
  }
  if (authMode === "login" && !username) {
    authError = "Enter a username.";
    renderAuth();
    return;
  }
  if (password.length < 8 && !(adminSignup && createFake)) {
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
      const allowDuplicates = adminSignup && values.has("signupDuplicates");
      if (!allowDuplicates && state.accounts.some((account) => account.username.toLocaleLowerCase() === normalUsername)) {
        authError = "That username is already saved in this browser. Try another one or log in.";
        authBusy = false;
        renderAuth();
        return;
      }
      const cones = adminSignup ? Number(values.get("signupCones")) : 75;
      const pix = adminSignup ? Number(values.get("signupPix")) : 125;
      if (!Number.isSafeInteger(cones) || cones < 0 || !Number.isSafeInteger(pix) || pix < 0) {
        authError = "Starting Cones and Pix must be non-negative whole numbers within the safe integer range.";
        authBusy = false;
        renderAuth();
        return;
      }
      const effectivePassword = createFake
        ? Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, "0")).join("")
        : password;
      const randomSalt = crypto.getRandomValues(new Uint8Array(16));
      const salt = Array.from(randomSalt, (byte) => byte.toString(16).padStart(2, "0")).join("");
      const passwordHash = await derivePasswordHash(effectivePassword, salt);
      const shirtChoice = { blue: "#5687e8", green: "#46ae83", red: "#f06463" }[String(values.get("starter"))] || "#5687e8";
      const account = cleanAccount({
        id: makeAccountId(createFake),
        username,
        salt,
        passwordHash,
        cones,
        pix,
        conesInfinite: adminSignup && values.has("signupConesInfinite"),
        pixInfinite: adminSignup && values.has("signupPixInfinite"),
        isAdmin: adminSignup && values.has("signupAdmin"),
        isFake: createFake,
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
      if (!commitOrToast(`${createFake ? "Fake/demo account created. " : ""}Your world is ready. Welcome, ${account.username}!`)) {
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
      let account = state.accounts.find((candidate) => candidate.id === ROOT_ADMIN_ID);
      if (!account) {
        account = cleanAccount({
          id: ROOT_ADMIN_ID,
          username: ROOT_ADMIN_USERNAME,
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
        account.username = ROOT_ADMIN_USERNAME;
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
      const evidence = account.banEvidence?.length
        ? ` Evidence/messages: ${account.banEvidence.join(" | ")}`
        : "";
      authError = `Account Banned: Reason: ${account.banReason || "Not provided"}.${evidence}`;
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
  const type = String(data.get("gameMode") || "dash");
  const iconValue = String(data.get("icon") || creatorIcon);
  const rewardCurrency = String(data.get("rewardCurrency") || "pix");
  const rewardAmount = Number(data.get("rewardAmount"));
  if (name.length < 2 || description.length < 6 || !GAME_GENRES.slice(1).includes(genre)) {
    toast("Give your game a name, a little description, and a genre.", "error");
    return;
  }
  if (!["dash", "hop"].includes(type) || !GAME_ICONS.includes(iconValue) ||
      !["cones", "pix"].includes(rewardCurrency) || !Number.isSafeInteger(rewardAmount) || rewardAmount < 0 || rewardAmount > 1000) {
    toast("Choose a supported game mode, icon, and whole-number reward from 0 to 1,000.", "error");
    return;
  }
  const palette = GAME_PALETTES.find((option) => option.id === creatorPalette) || GAME_PALETTES[0];
  const game = editorGameId ? account.games.find((item) => item.id === editorGameId) : null;
  const previousGame = game ? { ...game } : null;
  const createdGame = {
    id: game?.id || makeId(),
    name,
    description,
    genre,
    sky: palette.sky,
    ground: palette.ground,
    char: palette.char,
    icon: iconValue,
    type,
    rewardCurrency,
    rewardAmount,
    createdAt: game?.createdAt || new Date().toISOString(),
  };
  if (game) Object.assign(game, createdGame);
  else account.games.push(createdGame);
  route = "my-games";
  editorGameId = null;
  if (!commitOrToast(game ? `Updated "${name}".` : `"${name}" is on the For You feed.`)) {
    if (game && previousGame) Object.assign(game, previousGame);
    else account.games.pop();
    editorGameId = game?.id || null;
    route = "create";
    renderApp();
  }
}

function updateFriendSearch(value) {
  friendSearch = value;
  const account = currentAccount();
  const target = document.getElementById("friend-suggestions");
  if (!account || !target) return;
  const suggestions = state.accounts.filter((person) =>
    person.id !== account.id &&
    !person.banned &&
    !account.friends.includes(person.id) &&
    !account.friendRequests.incoming.includes(person.id) &&
    !account.friendRequests.outgoing.includes(person.id) &&
    person.username.toLowerCase().includes(value.trim().toLowerCase())
  ).slice(0, 20);
  target.innerHTML = suggestions.length ? suggestions.map((person) => {
    const status = presenceStatus(person);
    return `<div class="friend-row">${miniAvatar(person)}<div class="friend-details"><h3 class="friend-username">${escapeHTML(person.username)}</h3><div class="friend-status status-${status.state}"><span class="presence-dot"></span>${escapeHTML(status.label)}</div></div><button class="primary-button small" data-friend="${escapeHTML(person.id)}">${icon("plus")}Add</button></div>`;
  }).join("") : '<p class="panel-copy" style="padding:12px 0">No players found. Try searching for someone else.</p>';
}

function changeAvatar(group, value) {
  const account = currentAccount();
  if (!account || !["skin", "shirt", "pants", "face", "equipped", "bodyWidth", "bodyHeight", "headSize"].includes(group)) return;
  if (group === "equipped") {
    if (value && (!account.owned.includes(value) || !CATALOG.some((item) => item.id === value))) {
      toast("That accessory isn't in your closet yet.", "error");
      return;
    }
    account.avatar.equipped = value || null;
  } else if (["bodyWidth", "bodyHeight", "headSize"].includes(group)) {
    const numeric = Number(value);
    const limits = group === "headSize" ? [0.8, 1.25] : [0.75, 1.3];
    if (!Number.isFinite(numeric) || numeric < limits[0] || numeric > limits[1]) {
      toast("That body proportion is outside the supported range.", "error");
      return;
    }
    account.avatar[group] = numeric;
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

function buyProfileBackground(id) {
  const account = currentAccount();
  const background = PROFILE_BACKGROUNDS.find((item) => item.id === id);
  if (!account || !background) return toast("That profile background is unavailable.", "error");
  if (account.ownedBackgrounds.includes(id)) return toast("You already own that profile background.", "error");
  if (!hasInfiniteBalance(account, background.currency) && account[background.currency] < background.price) {
    return toast(`You need ${background.price} ${background.currency === "cones" ? "Cones" : "Pix"} to buy this background.`, "error");
  }
  if (!hasInfiniteBalance(account, background.currency)) account[background.currency] -= background.price;
  account.ownedBackgrounds.push(id);
  account.profileBackground = id;
  commitOrToast(`${background.name} is now your profile background.`);
}

function setProfileBackground(id) {
  const account = currentAccount();
  if (!account || !account.ownedBackgrounds.includes(id)) return toast("Buy that profile background before using it.", "error");
  account.profileBackground = id;
  commitOrToast("Profile background updated.");
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
  const recipient = state.accounts.find((candidate) => candidate.id === id && !candidate.banned);
  if (!account || !person || !recipient || id === account.id || account.friends.includes(id)) {
    toast("Friend requests can only be sent to saved player accounts.", "error");
    return;
  }
  if (account.friendRequests.outgoing.includes(id)) return toast("You already sent this player a request.", "error");
  if (account.friendRequests.incoming.includes(id)) return toast("This player already sent you a request. Accept it from Friends.", "error");
  const snapshot = JSON.stringify(state);
  account.friendRequests.outgoing.push(id);
  recipient.friendRequests.incoming.push(account.id);
  commitAdminMutation(snapshot, `Friend request sent to ${person.username}.`);
}

function respondFriendRequest(id, response) {
  const account = currentAccount();
  const sender = state.accounts.find((candidate) => candidate.id === id && !candidate.banned);
  if (!account || !sender || !account.friendRequests.incoming.includes(id)) return toast("That friend request is no longer available.", "error");
  const snapshot = JSON.stringify(state);
  account.friendRequests.incoming = account.friendRequests.incoming.filter((requesterId) => requesterId !== id);
  sender.friendRequests.outgoing = sender.friendRequests.outgoing.filter((recipientId) => recipientId !== account.id);
  if (response === "accept") {
    if (!account.friends.includes(id)) account.friends.push(id);
    if (!sender.friends.includes(account.id)) sender.friends.push(account.id);
  }
  commitAdminMutation(snapshot, response === "accept" ? `You and ${sender.username} are now friends.` : `Declined ${sender.username}'s request.`);
}

function cancelFriendRequest(id) {
  const account = currentAccount();
  const recipient = state.accounts.find((candidate) => candidate.id === id);
  if (!account || !recipient || !account.friendRequests.outgoing.includes(id)) return toast("That sent request is no longer available.", "error");
  const snapshot = JSON.stringify(state);
  account.friendRequests.outgoing = account.friendRequests.outgoing.filter((recipientId) => recipientId !== id);
  recipient.friendRequests.incoming = recipient.friendRequests.incoming.filter((requesterId) => requesterId !== account.id);
  commitAdminMutation(snapshot, "Friend request cancelled.");
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
  account.friendRequests.incoming = account.friendRequests.incoming.filter((requesterId) => requesterId !== id);
  account.friendRequests.outgoing = account.friendRequests.outgoing.filter((recipientId) => recipientId !== id);
  if (other) {
    other.friendRequests.incoming = other.friendRequests.incoming.filter((requesterId) => requesterId !== account.id);
    other.friendRequests.outgoing = other.friendRequests.outgoing.filter((recipientId) => recipientId !== account.id);
  }
  if (!commitOrToast(person ? `${person.username} was removed from your friends.` : "Friend removed.")) {
    account.friends = previous;
    if (other && previousOther) other.friends = previousOther;
    renderApp();
  }
}

function ensureReportAdministrator() {
  let admin = state.accounts.find((account) => account.id === ROOT_ADMIN_ID);
  if (!admin) {
    admin = cleanAccount({
      id: ROOT_ADMIN_ID,
      username: ROOT_ADMIN_USERNAME,
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
    state.accounts.push(admin);
  } else if (!admin.isRootAdmin) {
    throw new Error("Reserved administrator ID 1 is already assigned to a non-admin account.");
  }
  return admin;
}

function profanityCount(text) {
  return text.match(/\b(?:fuck(?:er|ing|ed|s)?|shit(?:ty|ting|s)?|bitch(?:es)?|asshole(?:s)?|damn|crap|bastard(?:s)?)\b/gi)?.length || 0;
}

function sendChatMessage(event) {
  event.preventDefault();
  const account = currentAccount();
  const form = event.target;
  if (!account || !(form instanceof HTMLFormElement)) return;
  const data = new FormData(form);
  const recipientId = String(data.get("recipientId") || "");
  const text = String(data.get("message") || "").trim();
  const recipient = state.accounts.find((candidate) => candidate.id === recipientId && !candidate.banned);
  if (!recipient || !account.friends.includes(recipientId) || !recipient.friends.includes(account.id)) {
    return toast("Messages can only be sent to accepted friends.", "error");
  }
  if (!text || text.length > 300) return toast("Messages must be between 1 and 300 characters.", "error");
  const snapshot = JSON.stringify(state);
  const message = { id: makeId(), senderId: account.id, recipientId, text, createdAt: new Date().toISOString() };
  state.messages.push(message);
  const now = Date.now();
  const recentProfane = state.messages.filter((item) =>
    item.senderId === account.id &&
    now - Date.parse(item.createdAt) <= 10000 &&
    now >= Date.parse(item.createdAt) &&
    profanityCount(item.text) > 0
  ).slice(-5);
  if (recentProfane.reduce((count, item) => count + profanityCount(item.text), 0) >= 5 && !state.moderationReports.some((report) =>
    report.accountId === account.id && report.status === "pending" &&
    now - Date.parse(report.createdAt) <= 10000
  )) {
    const moderator = ensureReportAdministrator();
    state.moderationReports.push({
      id: makeId(),
      adminId: moderator.id,
      accountId: account.id,
      username: account.username,
      evidence: recentProfane.map((item) => item.text),
      createdAt: new Date().toISOString(),
      status: "pending",
    });
    toast("A profanity report was sent to administrator ID 1 for review.", "error");
  }
  if (!commitOrToast("Message sent.")) {
    state = JSON.parse(snapshot);
    renderApp();
  } else if (route === "chat") {
    document.getElementById("chat-message-input")?.focus();
  }
}

function reviewModerationReport(reportId, action) {
  if (!currentAccount()?.isAdmin) return toast("Administrator access is required.", "error");
  const report = state.moderationReports.find((item) => item.id === reportId && item.status === "pending");
  const offender = report && state.accounts.find((account) => account.id === report.accountId);
  if (!report || !offender || !["ban", "warn", "ignore"].includes(action)) {
    return toast("That moderation report is no longer available.", "error");
  }
  const snapshot = JSON.stringify(state);
  if (action === "ban") {
    offender.banned = true;
    offender.banReason = "Admin-reviewed profanity report";
    offender.banEvidence = report.evidence.slice(-20);
    for (const player of state.accounts) {
      player.friends = player.friends.filter((id) => id !== offender.id);
      player.friendRequests.incoming = player.friendRequests.incoming.filter((id) => id !== offender.id);
      player.friendRequests.outgoing = player.friendRequests.outgoing.filter((id) => id !== offender.id);
    }
    offender.friends = [];
    offender.friendRequests = { incoming: [], outgoing: [] };
    report.status = "banned";
  } else if (action === "warn") {
    offender.warnings.push(`Profanity warning · ${report.createdAt}`);
    offender.banEvidence = report.evidence.slice(-20);
    report.status = "warned";
  } else {
    report.status = "ignored";
  }
  if (offender.id === state.session && action === "ban") state.session = null;
  commitAdminMutation(snapshot, action === "ban" ? `${offender.username} was banned after report review.` : action === "warn" ? `${offender.username} was warned.` : "Report dismissed.");
}

function permanentlyDeleteFakeAccount(id) {
  if (!currentAccount()?.isAdmin) return toast("Administrator access is required.", "error");
  const account = state.accounts.find((candidate) => candidate.id === id && candidate.isFake && !candidate.isRootAdmin);
  if (!account) return toast("Only non-root fake accounts can be permanently deleted.", "error");
  const snapshot = JSON.stringify(state);
  const removedGameIds = new Set(account.games.map((game) => game.id));
  state.accounts = state.accounts.filter((candidate) => candidate.id !== id);
  state.favorites = state.favorites.filter((gameId) => !removedGameIds.has(gameId));
  state.recentGames = state.recentGames.filter((gameId) => !removedGameIds.has(gameId));
  state.messages = state.messages.filter((message) => message.senderId !== id && message.recipientId !== id);
  state.moderationReports = state.moderationReports.filter((report) => report.accountId !== id);
  for (const player of state.accounts) {
    player.friends = player.friends.filter((friendId) => friendId !== id);
    player.friendRequests.incoming = player.friendRequests.incoming.filter((friendId) => friendId !== id);
    player.friendRequests.outgoing = player.friendRequests.outgoing.filter((friendId) => friendId !== id);
  }
  commitAdminMutation(snapshot, `Fake account ${account.username} was permanently deleted.`);
}

function startGame(id) {
  const game = allGames().find((item) => item.id === id);
  if (!game) return;
  const snapshot = JSON.stringify(state);
  state.recentGames = [id, ...state.recentGames.filter((item) => item !== id)].slice(0, 12);
  let creatorReward = "";
  if (game.creatorId) {
    const creator = state.accounts.find((account) => account.id === game.creatorId);
    const createdGame = creator?.games.find((item) => item.id === id);
    if (createdGame) {
      createdGame.visits += 1;
      if (createdGame.visits % 5 === 0) {
        const currency = Math.random() < 0.5 ? "cones" : "pix";
        const amount = currency === "cones" ? 5 : 15;
        if (!hasInfiniteBalance(creator, currency)) creator[currency] += amount;
        creatorReward = ` Your game reached ${createdGame.visits} visits; you earned ${amount} ${currency === "cones" ? "Cones" : "Pix"}.`;
      }
    }
  }
  if (!commitOrToast(null)) {
    state = JSON.parse(snapshot);
    return;
  }
  if (creatorReward) toast(creatorReward.trim());
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
  const game = allGames().find((item) => item.id === activeGame.id);
  const rewardCurrency = game?.creatorId ? game.rewardCurrency : "pix";
  const bonus = game?.creatorId ? game.rewardAmount : 10 + Math.min(20, Math.floor(activeGame.score / 2));
  if (!hasInfiniteBalance(account, rewardCurrency)) account[rewardCurrency] += bonus;
  if (rewardCurrency === "pix") activeGame.lastReward += bonus;
  try {
    localStorage.setItem(`${STORAGE_KEY}.best.${account.id}.${activeGame.id}`, String(activeGame.best));
    persist();
  } catch (error) {
    if (!hasInfiniteBalance(account, rewardCurrency)) account[rewardCurrency] -= bonus;
    account.runs = Math.max(0, account.runs - 1);
    toast(error instanceof Error ? error.message : "Your run could not be saved.", "error");
  }
  const playButton = document.getElementById("run-time");
  if (playButton) playButton.textContent = "0";
  const hud = document.querySelector(".game-hud");
  if (hud) hud.innerHTML = `<span>✦ ${activeGame.score} score</span><span>Best ${activeGame.best}</span><span>Finished!</span>`;
  const instruction = document.querySelector(".game-instructions");
  const rewardLabel = rewardCurrency === "cones" ? "Cones" : "Pix";
  if (instruction) instruction.textContent = rewardCurrency === "pix"
    ? `Great run! ${account.username}, you found ${activeGame.lastReward} Pix. Your score: ${activeGame.score}.`
    : `Great run! ${account.username}, you found ${activeGame.lastReward} Pix and earned ${bonus} Cones. Your score: ${activeGame.score}.`;
  toast(rewardCurrency === "pix"
    ? `Run complete! You picked up ${activeGame.lastReward} Pix.`
    : `Run complete! ${bonus} Cones and ${activeGame.lastReward} Pix earned.`);
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
  const newId = row.querySelector(`[data-admin-id="${id}"]`).value.trim();
  const username = row.querySelector(`[data-admin-username="${id}"]`).value.trim();
  const cones = Number(row.querySelector(`[data-admin-cones="${id}"]`).value);
  const pix = Number(row.querySelector(`[data-admin-pix="${id}"]`).value);
  const conesInfinite = row.querySelector(`[data-admin-cones-infinite="${id}"]`).checked;
  const pixInfinite = row.querySelector(`[data-admin-pix-infinite="${id}"]`).checked;
  if (!username || username.length > 40) {
    toast("Enter a display name from 1 to 40 characters.", "error");
    return;
  }
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(newId) ||
      account.isFake && newId !== id && !/^f4k3-[A-Za-z0-9_-]{1,59}$/.test(newId) ||
      state.accounts.some((candidate) => candidate.id === newId && candidate !== account)) {
    toast(account.isFake
      ? "Use a unique ID of up to 64 letters, numbers, underscores, or hyphens. Fake IDs must keep the f4k3- prefix."
      : "Use a unique ID of up to 64 letters, numbers, underscores, or hyphens.", "error");
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
  if (newId !== id) {
    account.id = newId;
    for (const player of state.accounts) {
      player.friends = player.friends.map((friendId) => friendId === id ? newId : friendId);
      player.friendRequests.incoming = player.friendRequests.incoming.map((requestId) => requestId === id ? newId : requestId);
      player.friendRequests.outgoing = player.friendRequests.outgoing.map((requestId) => requestId === id ? newId : requestId);
    }
    state.messages = state.messages.map((message) => ({
      ...message,
      senderId: message.senderId === id ? newId : message.senderId,
      recipientId: message.recipientId === id ? newId : message.recipientId,
    }));
    state.moderationReports = state.moderationReports.map((report) => ({
      ...report,
      accountId: report.accountId === id ? newId : report.accountId,
      adminId: report.adminId === id ? newId : report.adminId,
    }));
    if (state.session === id) state.session = newId;
    if (profileId === id) profileId = newId;
    if (activeChatId === id) activeChatId = newId;
    if (selectedLoginAccountId === id) selectedLoginAccountId = newId;
  }
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
    for (const player of state.accounts) {
      player.friends = player.friends.filter((friendId) => friendId !== id);
      player.friendRequests.incoming = player.friendRequests.incoming.filter((friendId) => friendId !== id);
      player.friendRequests.outgoing = player.friendRequests.outgoing.filter((friendId) => friendId !== id);
    }
    account.friends = [];
    account.friendRequests = { incoming: [], outgoing: [] };
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
  const allowAnyUsername = values.has("allowAnyUsername");
  const cones = Number(values.get("cones"));
  const pix = Number(values.get("pix"));
  if (!username || username.length > 40 || !allowAnyUsername && !/^[A-Za-z0-9_]{3,20}$/.test(username) || ADMIN_USERNAMES.has(username.toLocaleLowerCase()) || (!isFake && password.length < 8)) {
    return toast("Use 3–20 letters, numbers, and underscores, or enable any characters. Administrator names are reserved; real accounts need a password of at least 8 characters.", "error");
  }
  if (!Number.isSafeInteger(cones) || cones < 0 || !Number.isSafeInteger(pix) || pix < 0) {
    return toast("Starting Cones and Pix must be non-negative whole numbers within the safe integer range.", "error");
  }
  const effectivePassword = isFake ? Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, "0")).join("") : password;
  const salt = makeSalt();
  try {
    const passwordHash = await derivePasswordHash(effectivePassword, salt);
    if (!currentAccount()?.isAdmin) return toast("Administrator access is required.", "error");
    const snapshot = JSON.stringify(state);
    const account = cleanAccount({
      id: makeAccountId(isFake), username, salt, passwordHash, isFake, isAdmin: values.has("admin"),
      cones, pix,
      avatar: { skin: "#f3c887", shirt: "#5687e8", pants: "#38435d", face: "smile", equipped: null },
      owned: [], friends: [], games: [], createdAt: new Date().toISOString(), runs: 0,
    });
    state.accounts.push(account);
    commitAdminMutation(snapshot, `${isFake ? "Fake/demo user" : "User"} ${username} created.`);
  } catch (error) {
    toast(error instanceof Error ? error.message : "The account could not be created.", "error");
  }
}

function adminLoginAsFakeAccount(id) {
  if (!currentAccount()?.isAdmin) return toast("Administrator access is required.", "error");
  const account = state.accounts.find((candidate) => candidate.id === id && candidate.isFake && !candidate.banned);
  if (!account) return toast("That fake account is no longer available.", "error");
  setAccount(account.id);
  toast(`Signed in as ${account.username}. Use the account switcher to return to your administrator account.`);
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

function handleContactSubmit(form) {
  const account = currentAccount();
  if (!account || !(form instanceof HTMLFormElement)) return;
  const values = new FormData(form);
  const email = String(values.get("email") || "").trim();
  const phone = String(values.get("phone") || "").trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast("Enter a valid email address or leave it blank.", "error");
  if (phone && !/^\+?[0-9\s().-]{7,24}$/.test(phone)) return toast("Enter a valid phone number or leave it blank.", "error");
  const snapshot = JSON.stringify(state);
  account.email = email;
  account.phone = phone;
  commitAdminMutation(snapshot, "Optional contact details saved on this browser.");
}

function handleStatusSubmit(form) {
  const account = currentAccount();
  if (!account || !(form instanceof HTMLFormElement)) return;
  const values = new FormData(form);
  const status = String(values.get("status") || "");
  const statusText = String(values.get("statusText") || "").trim().slice(0, 60);
  if (!PRESENCE_OPTIONS.some((option) => option.id === status)) return toast("Choose a valid availability status.", "error");
  const snapshot = JSON.stringify(state);
  account.status = status;
  account.statusText = statusText;
  commitAdminMutation(snapshot, "Your status was updated.");
}

function handleCurrencyExchange(form) {
  const account = currentAccount();
  if (!account || !(form instanceof HTMLFormElement)) return;
  const values = new FormData(form);
  const from = values.get("from") === "pix" ? "pix" : "cones";
  const amount = Number(values.get("amount"));
  if (!Number.isSafeInteger(amount) || amount <= 0 || from === "pix" && amount % 10 !== 0) {
    return toast(from === "pix" ? "Pix exchanged for Cones must be a positive multiple of 10." : "Enter a positive whole number of Cones.", "error");
  }
  if (!hasInfiniteBalance(account, from) && account[from] < amount) return toast(`You don't have enough ${from === "cones" ? "Cones" : "Pix"}.`, "error");
  const to = from === "cones" ? "pix" : "cones";
  const converted = from === "cones" ? amount * 10 : amount / 10;
  if (!Number.isSafeInteger(converted)) return toast("That exchange amount is too large.", "error");
  if (!hasInfiniteBalance(account, to) && account[to] > Number.MAX_SAFE_INTEGER - converted) return toast("The resulting balance would exceed the safe limit.", "error");
  const snapshot = JSON.stringify(state);
  if (!hasInfiniteBalance(account, from)) account[from] -= amount;
  if (!hasInfiniteBalance(account, to)) account[to] += converted;
  commitAdminMutation(snapshot, `Exchanged ${amount} ${from === "cones" ? "Cones" : "Pix"} for ${converted} ${to === "cones" ? "Cones" : "Pix"}.`);
}

function handleAdminSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return false;
  if (form.id === "admin-create-form") {
    event.preventDefault();
    createAdminAccount(form);
  } else if (form.id === "settings-contact-form") {
    event.preventDefault();
    handleContactSubmit(form);
  } else if (form.id === "settings-status-form") {
    event.preventDefault();
    handleStatusSubmit(form);
  } else if (form.id === "currency-exchange-form") {
    event.preventDefault();
    handleCurrencyExchange(form);
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
  const account = state.accounts.find((candidate) => candidate.id === id);
  if (!account) {
    toast("That saved account is no longer available.", "error");
    return;
  }
  if (selectedLoginAccountId === id) selectedLoginAccountId = null;
  const wasActive = state.session === id;
  const previousSession = state.session;
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
    state.session = null;
  }
  try {
    const hidden = hiddenAccountIds();
    hidden.add(id);
    localStorage.setItem(HIDDEN_ACCOUNTS_KEY, JSON.stringify([...hidden]));
    if (wasActive) persist();
    renderApp();
    toast(wasActive
      ? `${account.username} was hidden on this device. The account is still saved; log in again to use it.`
      : `${account.username} was hidden from this device's switcher. The account is still saved.`);
  } catch (error) {
    state.session = previousSession;
    applyTheme();
    renderApp();
    toast(error instanceof Error ? error.message : "The account could not be hidden on this device.", "error");
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
  if (target.hasAttribute("data-admin-login-as")) {
    adminLoginAsFakeAccount(target.dataset.adminLoginAs);
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
  if (target.hasAttribute("data-report-action")) {
    reviewModerationReport(target.dataset.reportId, target.dataset.reportAction);
    return;
  }
  if (target.hasAttribute("data-admin-delete-account")) {
    permanentlyDeleteFakeAccount(target.dataset.adminDeleteAccount);
    return;
  }
  if (target.hasAttribute("data-admin-delete-game")) {
    removeAdminGame(target.dataset.adminOwner, target.dataset.adminDeleteGame);
    return;
  }
  if (target.hasAttribute("data-game-edit")) {
    editorGameId = target.dataset.gameEdit;
    creatorIcon = currentAccount()?.games.find((game) => game.id === editorGameId)?.icon || "▲";
    route = "create";
    renderApp();
    return;
  }
  if (target.hasAttribute("data-game-edit-cancel")) {
    editorGameId = null;
    route = "my-games";
    renderApp();
    return;
  }
  if (target.hasAttribute("data-open-exchange")) {
    openModal = { type: "exchange" };
    renderApp();
    return;
  }
  if (target.hasAttribute("data-friend-accept")) {
    respondFriendRequest(target.dataset.friendAccept, "accept");
    return;
  }
  if (target.hasAttribute("data-friend-decline")) {
    respondFriendRequest(target.dataset.friendDecline, "decline");
    return;
  }
  if (target.hasAttribute("data-friend-cancel")) {
    cancelFriendRequest(target.dataset.friendCancel);
    return;
  }
  if (target.hasAttribute("data-route")) {
    if (target.dataset.route === "create") editorGameId = null;
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
      profileId = person.id;
      openModal = null;
      route = "profile";
      renderApp();
    }
    return;
  }
  if (target.hasAttribute("data-chat")) {
    const account = currentAccount();
    const friendId = target.dataset.chat;
    if (account?.friends.includes(friendId)) {
      activeChatId = friendId;
      navigate("chat");
    } else {
      toast("You can only message accepted friends.", "error");
    }
    return;
  }
  if (target.hasAttribute("data-profile-buy-bg")) {
    buyProfileBackground(target.dataset.profileBuyBg);
    return;
  }
  if (target.hasAttribute("data-profile-bg")) {
    setProfileBackground(target.dataset.profileBg);
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
    const palette = GAME_PALETTES.find((option) => option.id === creatorPalette);
    if (!palette) return;
    document.querySelectorAll(".cover-swatch").forEach((button) => {
      const selected = button.dataset.palette === creatorPalette;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    const cover = document.querySelector(".hero-cover");
    if (cover) {
      cover.style.setProperty("--cover-a", palette.sky);
      cover.style.setProperty("--cover-b", palette.ground);
      cover.style.setProperty("--character", palette.char);
    }
    return;
  }
  if (target.hasAttribute("data-game-icon")) {
    creatorIcon = target.dataset.gameIcon;
    document.querySelectorAll(".game-icon-choice").forEach((button) => {
      const selected = button.dataset.gameIcon === creatorIcon;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    const previewIcon = document.querySelector(".hero-cover .cover-character");
    if (previewIcon) previewIcon.textContent = creatorIcon;
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
      const account = currentAccount();
      if (!account) return;
      const theme = input.value === "light" ? "light" : "dark";
      try {
        saveDeviceTheme(account.id, theme);
        applyTheme();
        toast(theme === "light" ? "Daylight mode saved on this device." : "Midnight mode saved on this device.");
      } catch (error) {
        toast(error instanceof Error ? error.message : "This device's theme could not be saved.", "error");
      }
      openModal = { type: "settings" };
      renderApp();
    });
  }
  for (const input of document.querySelectorAll('input[data-avatar-shape]')) {
    input.addEventListener("change", () => changeAvatar(input.dataset.avatarShape, input.value));
  }
  const exchangeSelect = document.querySelector('#currency-exchange-form [name="from"]');
  exchangeSelect?.addEventListener("change", () => {
    exchangeFrom = exchangeSelect.value === "pix" ? "pix" : "cones";
    const amount = document.querySelector('#currency-exchange-form [name="amount"]');
    const label = document.getElementById("exchange-amount-label");
    if (amount instanceof HTMLInputElement) {
      amount.min = exchangeFrom === "cones" ? "1" : "10";
      amount.step = exchangeFrom === "cones" ? "1" : "10";
      amount.value = "";
    }
    if (label) label.textContent = exchangeFrom === "cones" ? "Cones to exchange" : "Pix to exchange (multiple of 10)";
  });
}

app.addEventListener("submit", (event) => {
  if (event.target instanceof HTMLFormElement && event.target.id === "auth-form") handleAuthSubmit(event);
  else if (event.target instanceof HTMLFormElement && event.target.id === "chat-message-form") sendChatMessage(event);
  else handleAdminSubmit(event);
});

app.addEventListener("click", handleClick);

app.addEventListener("input", (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  if (input.id === "admin-account-search") {
    const query = input.value.trim().toLocaleLowerCase();
    let visibleCount = 0;
    for (const row of document.querySelectorAll(".admin-account-directory-row")) {
      const matches = row.dataset.accountSearch.includes(query);
      row.hidden = !matches;
      if (matches) visibleCount += 1;
    }
    const emptyMessage = document.querySelector(".admin-account-directory-empty");
    if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
  }
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

(async () => {
  try {
    state = readState();
    delete state.savedIds;
    applyTheme();
    await loadSharedState();
    if (state.session && !state.accounts.some((account) => account.id === state.session)) state.session = null;
    applyTheme();
    renderApp();
  } catch (error) {
    app.innerHTML = `<main class="auth-screen"><section class="auth-content"><div class="auth-brand"><span class="auth-wordmark">ROᴄONE</span></div><div class="auth-card"><h1 class="auth-heading">A small hiccup.</h1><p class="auth-description" role="alert">${escapeHTML(error instanceof Error ? error.message : "Your saved Rocone data couldn't be loaded.")}</p><p class="auth-footnote">Your saved data hasn't been changed. You can check your browser's local storage and reload.</p></div></section></main>`;
  }
})();
