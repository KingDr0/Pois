/* ================= Pois: free European Portuguese trainer ================= */
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const rand = a => a[Math.floor(Math.random() * a.length)];
const DAY = 864e5;

const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const ICON = {
  learn: svg('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/><path d="M9 7h6"/>'),
  review: svg('<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>'),
  chat: svg('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>'),
  verbs: svg('<path d="M4 7h10M4 12h16M4 17h8"/><circle cx="19" cy="7" r="2"/>'),
  library: svg('<rect x="3" y="4" width="4" height="16" rx="1"/><rect x="9" y="4" width="4" height="16" rx="1"/><path d="m15 5.2 3.9-1 3.6 14.6-3.9 1z"/>'),
  more: svg('<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>'),
  flame: svg('<path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-3 3-5 5-5 8 0 4 3 7 7 7z"/>'),
  bolt: svg('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'),
  ice: svg('<path d="M12 2v20M4 7l16 10M20 7 4 17"/>'),
  speak: svg('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>'),
  slow: svg('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15 12h6"/>'),
  mic: svg('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),
  close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
  send: svg('<path d="M4 12 20 4l-6 16-3-7z"/>'),
  back: svg('<path d="M15 18l-6-6 6-6"/>'),
  play: svg('<path d="M7 4l13 8-13 8z"/>'),
  stop: svg('<rect x="6" y="6" width="12" height="12" rx="1"/>')
};

/* ---------- Items ---------- */
const ITEMS = {};
UNITS.forEach(u => {
  u.words.forEach((w, i) => { const key = `${u.id}:w${i}`; ITEMS[key] = { ...w, key, unit: u.id, kind: "w" }; });
  u.phrases.forEach((p, i) => { const key = `${u.id}:p${i}`; ITEMS[key] = { ...p, key, unit: u.id, kind: "p" }; });
});
WOTD.forEach((w, i) => {
  ITEMS[`wd:${i}`] = { pt: w.pt, en: w.en, alt: w.alt, tip: w.note, key: `wd:${i}`, unit: "wotd", kind: "w" };
  w.ex.forEach((e, j) => { ITEMS[`wd:${i}:e${j}`] = { pt: e[0], en: e[1], form: e[2], key: `wd:${i}:e${j}`, unit: "wotd", kind: "p" }; });
});
const unitById = id => UNITS.find(u => u.id === id) || LADDER_UNITS.find(u => u.id === id);
const unitKeys = id => Object.keys(ITEMS).filter(k => ITEMS[k].unit === id);
const getItem = k => ITEMS[k] || (S.custom[k] ? { ...S.custom[k], key: k, unit: "custom", kind: "p" } : null);

/* ---------- State & persistence ---------- */
const LS_KEY = "pois.ptpt.v1";
function freshState() {
  return { v: 1, updated: 0, xp: 0, days: {}, streak: 0, last: "", freezes: 0, units: {}, cards: {}, mistakes: {}, custom: {}, gen: [], vm: {}, wotdSeen: "", wotdDone: {}, mine: {}, words: {}, badges: {}, libVisit: 0, wpick: null,
    stats: { ans: 0, ok: 0, lessons: 0, chats: 0, verbAns: 0, verbOk: 0 },
    settings: { goal: 30, rate: 1, voice: "", level: "A1", autoplay: true, sfx: true, dir: "mix", vrange: 25, vmode: "order" } };
}
function normalize(s) {
  const f = freshState();
  s = s && typeof s === "object" ? s : {};
  return { ...f, ...s, stats: { ...f.stats, ...(s.stats || {}) }, settings: { ...f.settings, ...(s.settings || {}) },
    units: s.units || {}, cards: s.cards || {}, mistakes: s.mistakes || {}, custom: s.custom || {}, days: s.days || {}, gen: Array.isArray(s.gen) ? s.gen : [], vm: s.vm || {}, wotdDone: s.wotdDone || {}, mine: s.mine || {}, words: s.words || {}, badges: s.badges || {} };
}
let S = freshState();
try { const raw = localStorage.getItem(LS_KEY); if (raw) S = normalize(JSON.parse(raw)); } catch (e) {}

let CLOUD = "local", USER = null, CLOUD_READY = false, pushing = false, pushAgain = false, pushTimer = null;
function save() {
  S.updated = Date.now();
  const keep = Object.keys(S.days).sort().slice(-60); const d = {}; keep.forEach(k => d[k] = S.days[k]); S.days = d;
  try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {}
  if (USER) { clearTimeout(pushTimer); pushTimer = setTimeout(pushCloud, 2500); }
}
async function pushCloud() {
  if (!USER || !window.PoisCloud) return;
  if (pushing) { pushAgain = true; return; }
  pushing = true;
  try { await PoisCloud.save(JSON.stringify(S), S.updated); CLOUD = "cloud"; }
  catch (e) { CLOUD = "error"; }
  pushing = false;
  if (pushAgain) { pushAgain = false; setTimeout(pushCloud, 1500); }
}
const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej({ code: "timeout" }), ms))]);
async function onSignedIn(u) {
  USER = u; CLOUD = "syncing"; refreshAI(); render();
  try {
    const d = await withTimeout(PoisCloud.load(), 10000);
    let remote = null; try { remote = d && d.state ? normalize(JSON.parse(d.state)) : null; } catch (e) {}
    if (remote) {
      /* Same account: newest wins. Progress made before signing in: keep whichever has more XP. */
      const takeRemote = S.uid === u.uid ? (remote.updated || 0) > (S.updated || 0) : (remote.xp || 0) >= (S.xp || 0);
      if (takeRemote) S = remote;
    }
    S.uid = u.uid;
    try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {}
    CLOUD = "cloud"; loadVoices();
    await pushCloud();
  } catch (e) { CLOUD = "error"; }
  refreshAI(); render(); if (W) renderWotd();
}
/* ---------- Splash + sign-in gate: nobody learns until signed in ---------- */
let GATE = null, GATE_PHASE = "loading", GATE_SHOWN_AT = 0;
function showGate(view) {
  GATE = view; const g = $("#gate"); if (!g) return;
  g.hidden = false; document.body.classList.add("gated");
  if (!GATE_SHOWN_AT) GATE_SHOWN_AT = Date.now();
  renderGate();
}
function hideGate() {
  const g = $("#gate"); GATE = null; if (!g || g.hidden) return;
  const wait = Math.max(0, 700 - (Date.now() - GATE_SHOWN_AT));
  setTimeout(() => { if (GATE) return; g.classList.add("leaving"); setTimeout(() => { if (GATE) { g.classList.remove("leaving"); return; } g.hidden = true; g.classList.remove("leaving"); document.body.classList.remove("gated"); maybeWelcome(); }, 260); }, wait);
}
function renderGate() {
  const g = $("#gate"); if (!g || !GATE) return;
  if (GATE === "splash") {
    const ready = GATE_PHASE === "ready";
    g.innerHTML = `<button class="splash" ${ready ? 'data-a="gatecontinue"' : "disabled"} aria-label="${ready ? "Tap to continue" : "Loading"}">
      <span class="splash-mark" aria-hidden="true">P<i></i></span>
      <span class="splash-name">Pois</span>
      <span class="splash-sub">European Portuguese</span>
      <span class="splash-tap">${ready ? "Tap to continue" : "Loading…"}</span>
    </button>`;
    return;
  }
  g.innerHTML = `<div class="signin">
    <span class="splash-mark small" aria-hidden="true">P<i></i></span>
    <h1>Welcome to Pois</h1>
    <p class="lead">Sign in to start learning European Portuguese.</p>
    <ul class="perks">
      <li><b>Your progress is saved:</b> streak, words and levels live in your account.</li>
      <li><b>Any device:</b> pick up on your phone or computer where you left off.</li>
      <li><b>Free AI tutor:</b> chat with Rita, roleplays and instant corrections.</li>
    </ul>
    ${GATE_PHASE === "signing" ? `<button class="btn google wide" disabled>Signing in…</button>` : googleBtn("Continue with Google").replace('class="btn google"', 'class="btn google wide"')}
    <p class="small muted fine">We only store your learning progress. Nothing is shared or sold.</p>
    <p class="small muted fine">This site is protected by reCAPTCHA. The Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Terms of Service</a> apply.</p>
  </div>`;
}

function initCloud() {
  const cfg = window.POIS_CONFIG && POIS_CONFIG.firebase;
  if (!window.PoisCloud || !cfg || !cfg.apiKey) return;
  try { if (!PoisCloud.init(cfg, { appCheckSiteKey: POIS_CONFIG.appCheckSiteKey, appCheckProvider: POIS_CONFIG.appCheckProvider })) return; } catch (e) { return; }
  CLOUD_READY = true;
  showGate("splash");
  const slow = setTimeout(() => { if (GATE_PHASE === "loading") { GATE_PHASE = "ready"; renderGate(); } }, 8000);
  PoisCloud.onUser(u => {
    clearTimeout(slow);
    if (u) { GATE_PHASE = "ready"; hideGate(); if (!USER || USER.uid !== u.uid) onSignedIn(u); }
    else {
      USER = null; CLOUD = "local"; refreshAI(); render();
      closeOverlay(); W = null;
      if (GATE_PHASE === "signing" || GATE === "signin") { GATE_PHASE = "ready"; showGate("signin"); }
      else { GATE_PHASE = "ready"; showGate("splash"); }
    }
  });
}
function doSignIn() {
  if (!CLOUD_READY) { toast("Sign-in isn't set up yet."); return; }
  if (GATE) { GATE_PHASE = "signing"; renderGate(); }
  PoisCloud.signIn().then(() => { if (!USER && GATE) { GATE_PHASE = "ready"; renderGate(); } })
    .catch(e => { if (GATE) { GATE_PHASE = "ready"; renderGate(); } toast(e && e.code === "auth/unauthorized-domain" ? "This web address isn't authorised in Firebase yet." : e && e.code === "auth/network-request-failed" ? "No connection. Connect to the internet to sign in." : "Sign-in didn't work. Try again."); });
}
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && USER) { clearTimeout(pushTimer); pushCloud(); } });
const syncText = () => CLOUD === "cloud" ? `Saved to your Google account${USER && USER.email ? ` (${esc(USER.email)})` : ""}.` : CLOUD === "syncing" ? "Syncing…" : CLOUD === "error" ? "Couldn't reach the server. Progress is saved on this device and will sync when you're back online." : "Saved on this device only.";
const googleBtn = (label = "Sign in with Google") => CLOUD_READY ? `<button class="btn google" data-a="signin"><svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.6 5.4 2.6 13.3l7.8 6C12.3 13.3 17.6 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.5z"/><path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.8-6z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.4 0-11.7-3.8-13.6-9.8l-7.8 6C6.6 42.6 14.6 48 24 48z"/></svg>${label}</button>` : "";

/* ---------- Dates, XP, streak ---------- */
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const dayDiff = (a, b) => Math.round((new Date(b + "T12:00") - new Date(a + "T12:00")) / DAY);
function currentStreak() {
  if (!S.last) return 0;
  const g = dayDiff(S.last, today());
  if (g <= 1) return S.streak;
  if (g === 2 && S.freezes > 0) return S.streak;
  return 0;
}
function addXP(n) {
  const t = today();
  if (S.last !== t) {
    const gap = S.last ? dayDiff(S.last, t) : null;
    if (gap === 1) S.streak++;
    else if (gap === 2 && S.freezes > 0) { S.freezes--; S.streak++; toast("A streak freeze saved your streak"); }
    else S.streak = 1;
    S.last = t;
    if (S.streak > 0 && S.streak % 7 === 0 && S.freezes < 2) { S.freezes++; toast("7-day streak! You earned a streak freeze"); }
  }
  S.xp += n; S.days[t] = (S.days[t] || 0) + n;
  save();
}

/* ---------- Spaced repetition (SM-2 style) ---------- */
function newCard() { return { ivl: 0, ease: 2.5, reps: 0, lapses: 0, due: Date.now() }; }
function applyGrade(c, q, now = Date.now()) {
  c = { ...c };
  if (q === 0) { c.reps = 0; c.ivl = 0; c.lapses++; c.ease = Math.max(1.3, c.ease - 0.2); c.due = now + 10 * 60e3; return c; }
  if (q === 1) { c.ivl = Math.max(1, Math.round((c.ivl || 1) * 1.2)); c.ease = Math.max(1.3, c.ease - 0.15); }
  else if (q === 2) { c.ivl = c.reps === 0 ? 1 : c.reps === 1 ? 3 : Math.round(c.ivl * c.ease); }
  else { c.ivl = c.reps === 0 ? 3 : Math.round(Math.max(1, c.ivl) * c.ease * 1.3); c.ease += 0.15; }
  c.reps++; c.due = now + c.ivl * DAY; return c;
}
function grade(key, q) { S.cards[key] = applyGrade(S.cards[key] || newCard(), q); }
const ivlLabel = c => c.ivl === 0 ? "10 min" : c.ivl === 1 ? "1 day" : c.ivl < 30 ? `${c.ivl} days` : `${Math.round(c.ivl / 30)} mo`;
const dueKeys = () => Object.keys(S.cards).filter(k => getItem(k) && S.cards[k].due <= Date.now());
function recordAnswer(key, ok) {
  S.stats.ans++;
  if (ok) {
    S.stats.ok++;
    if (LEMMA_KEY[key] != null) creditWord(LEMMA_KEY[key]);
    if (!S.cards[key] || S.cards[key].due <= Date.now()) grade(key, 2);
    if (S.mistakes[key]) { S.mistakes[key]--; if (S.mistakes[key] <= 0) delete S.mistakes[key]; }
  } else { grade(key, 0); S.mistakes[key] = 2; }
}
function personalKeys() {
  return Object.keys(S.cards).filter(getItem).sort((a, b) => {
    const A = S.cards[a], B = S.cards[b];
    return (B.lapses - A.lapses) || (A.ease - B.ease) || (A.due - B.due);
  }).slice(0, 12);
}

/* ---------- Answer checking ---------- */
const norm = s => String(s).toLowerCase().replace(/[.,!?¿¡;:"“”«»()…]/g, "").replace(/[’']/g, "'").replace(/\s+/g, " ").trim();
const strip = s => norm(s).normalize("NFD").replace(/[̀-ͯ]/g, "");
const noArt = s => s.replace(/^(o|a|os|as|um|uma|uns|umas) /, "");
function lev(a, b) {
  const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
  return prev[n];
}
function checkPT(input, accepted) {
  const inN = norm(input), inS = strip(input);
  if (!inN) return { ok: false };
  for (const a of accepted) {
    const aN = norm(a), aS = strip(a);
    if (inN === aN || noArt(inN) === noArt(aN)) return { ok: true, shown: a };
    if (inS === aS || noArt(inS) === noArt(aS)) return { ok: true, shown: a, note: `Watch the accents: <b>${esc(a)}</b>` };
  }
  for (const a of accepted) {
    const aS = strip(a);
    if (aS.length > 5 && (lev(inS, aS) === 1 || lev(noArt(inS), noArt(aS)) === 1)) return { ok: true, shown: a, note: `Small typo. It's <b>${esc(a)}</b>` };
  }
  return { ok: false };
}
const similarity = (a, b) => { a = strip(a); b = strip(b); const L = Math.max(a.length, b.length) || 1; return 1 - lev(a, b) / L; };


/* ---------- Sound effects (synthesised with Web Audio, no files) ---------- */
let ACTX = null;
function actx() {
  if (!ACTX) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; try { ACTX = new C(); } catch (e) { return null; } }
  if (ACTX.state === "suspended") ACTX.resume().catch(() => {});
  return ACTX;
}
function tone(c, f, t, dur, { type = "sine", vol = 0.16, slideTo } = {}) {
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + 0.03);
}
const SFX = {
  right: (c, t) => { tone(c, 880, t, 0.14); tone(c, 1318.5, t + 0.085, 0.34); tone(c, 2637, t + 0.085, 0.22, { vol: 0.025 }); },
  wrong: (c, t) => { tone(c, 233, t, 0.2, { type: "triangle", vol: 0.24, slideTo: 196 }); tone(c, 175, t + 0.13, 0.28, { type: "triangle", vol: 0.2, slideTo: 147 }); },
  pair: (c, t) => { tone(c, 1046.5, t, 0.12, { vol: 0.11 }); tone(c, 1568, t + 0.05, 0.14, { vol: 0.07 }); },
  done: (c, t) => [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(c, f, t + i * 0.1, i === 3 ? 0.55 : 0.16, { vol: 0.14 })),
  badge: (c, t) => { [392, 523.25, 659.25, 783.99].forEach((f, i) => tone(c, f, t + i * 0.12, 0.18, { type: "triangle", vol: 0.14 })); [523.25, 659.25, 783.99, 1046.5].forEach(f => tone(c, f, t + 0.52, 1.1, { vol: 0.09 })); },
  book: (c, t) => { tone(c, 1760 + Math.random() * 400, t, 0.07, { type: "triangle", vol: 0.05 }); tone(c, 140, t, 0.06, { vol: 0.08 }); }
};
const SFX_LEN = { right: 380, wrong: 420, pair: 0, done: 700, badge: 0, book: 0 };
function sfx(name) {
  if (S.settings.sfx === false) return 0;
  const c = actx(); if (!c) return 0;
  try { SFX[name](c, c.currentTime + 0.01); } catch (e) { return 0; }
  return SFX_LEN[name] || 0;
}
/* browsers only allow audio after a tap: wake the audio engine on the first one */
["pointerdown", "keydown"].forEach(ev => document.addEventListener(ev, () => actx(), { once: true, capture: true }));

/* ---------- Word ladder & library ---------- */
const LW = LADDER_WORDS.map(([pt, pos, en, xpt, xen, rank, alt], i) => ({ i, pt, pos, en, xpt, xen, rank, alt: alt ? alt.split(",").map(x => x.trim()) : [] }));
const LS_ = LADDER_LESSON_SIZE, SHELF = 50;
const LAD_N = Math.ceil(LW.length / LS_);
const POS_LABEL = { noun: "noun", verb: "verb", adj: "adjective", adv: "adverb", pron: "pronoun", prep: "preposition", conj: "conjunction", num: "number", art: "article" };
const LEMMA_KEY = {}, LEMMA_IDX = {}, LADDER_UNITS = [];
LW.forEach(w => [w.pt, ...w.alt].forEach(f => { const n = norm(f); if (!(n in LEMMA_IDX)) LEMMA_IDX[n] = w.i; }));
function clozeForm(sentence, w) {
  const toks = sentence.replace(/[.,!?¿¡;:"«»…]/g, " ").split(/[\s]+/).filter(Boolean);
  const forms = [w.pt, ...w.alt].map(strip);
  let t = toks.find(x => forms.includes(strip(x)));
  if (!t) for (const part of toks) { if (part.includes("-") && part.split("-").some(y => forms.includes(strip(y)))) { t = part.split("-").find(y => forms.includes(strip(y))); break; } }
  if (!t && w.pt.length >= 4) { const stem = strip(w.pos === "verb" ? w.pt.slice(0, -2) : w.pt.slice(0, -1)).slice(0, 4); if (stem.length >= 3) t = toks.flatMap(x => x.split("-")).find(x => strip(x).startsWith(stem)); }
  return t || "";
}
for (let k = 0; k < LAD_N; k++) {
  const id = `lad${k}`, ws = LW.slice(k * LS_, (k + 1) * LS_);
  ws.forEach(w => {
    const key = `lw:${w.i}`, tip = `${POS_LABEL[w.pos] || w.pos} · #${w.rank} most common word in Portugal`;
    ITEMS[key] = { pt: w.pt, en: w.en, alt: w.alt.length ? w.alt : undefined, tip, key, unit: id, kind: "w", lw: w.i };
    ITEMS[key + ":e"] = { pt: w.xpt, en: w.xen, form: clozeForm(w.xpt, w), key: key + ":e", unit: id, kind: "p", lw: w.i };
    LEMMA_KEY[key] = LEMMA_KEY[key + ":e"] = w.i;
  });
  LADDER_UNITS.push({ id, ladder: k, en: `Lesson ${k + 1}`, pt: ws.slice(0, 4).map(w => w.pt).join(", ") + "…", words: ws, phrases: [],
    note: `<p>Words <b>${k * LS_ + 1}–${k * LS_ + ws.length}</b> of the most common words in European Portuguese, each with a sentence that only uses words you've already met.</p><p>A word becomes a <b>book in your library</b> once you get it right on two different days.</p>` });
}
/* the same word learned in a topic pack (or an old word of the day) also counts */
Object.values(ITEMS).forEach(it => { if (it.lw == null && it.kind === "w") { const n = noArt(norm(it.pt)); if (n in LEMMA_IDX) LEMMA_KEY[it.key] = LEMMA_IDX[n]; } });

const wordRec = i => S.words[LW[i].pt];
const isLearned = i => { const r = wordRec(i); return !!(r && r[1]); };
const isMastered = i => { const c = S.cards[`lw:${i}`]; return !!(c && c.ivl >= 21); };
const learnedCount = () => LW.reduce((n, w) => n + (S.words[w.pt] && S.words[w.pt][1] ? 1 : 0), 0);
function creditWord(i) {
  const w = LW[i]; if (!w) return;
  const r = S.words[w.pt] || (S.words[w.pt] = [0, 0]);
  if (r[1]) return;
  const t = today();
  if (!r[0]) r[0] = t;
  else if (r[0] !== t) { r[1] = Date.now(); checkMilestones(); }
}
function checkMilestones() {
  const n = learnedCount();
  LADDER_TIERS.forEach(t => { if (n >= t.n && !S.badges[t.n]) { S.badges[t.n] = today(); S.pendingBadge = t.n; } });
}
const currentTier = () => LADDER_TIERS.find(t => !S.badges[t.n]) || LADDER_TIERS[LADDER_TIERS.length - 1];
const ladLevel = k => unitLevel(`lad${k}`);
const ladLearned = k => LADDER_UNITS[k].words.filter(w => isLearned(w.i)).length;
function nextLadder() {
  for (let k = 0; k < LAD_N; k++) if (ladLevel(k) < 1) return k;
  for (let k = 0; k < LAD_N; k++) if (ladLearned(k) < LADDER_UNITS[k].words.length) return k;
  let best = 0; for (let k = 1; k < LAD_N; k++) if (ladLevel(k) < ladLevel(best)) best = k; return best;
}
function ladderKeys(k) {
  const ws = LADDER_UNITS[k].words, lv = ladLevel(k);
  const need = ws.filter(w => !isLearned(w.i)).sort((a, b) => (wordRec(b.i) ? 1 : 0) - (wordRec(a.i) ? 1 : 0));
  const order = [...shuffle(need.filter(w => wordRec(w.i))), ...need.filter(w => !wordRec(w.i)), ...shuffle(ws.filter(w => isLearned(w.i)))];
  const pick = order.slice(0, lv === 0 ? 8 : 6), keys = [];
  pick.forEach((w, j) => { keys.push(`lw:${w.i}`); if (lv > 0 || j < 4) keys.push(`lw:${w.i}:e`); });
  return keys;
}

/* ---------- Speech output: European Portuguese voices only ---------- */
let VOICES = [], VOICE = null, VOICES_CHECKED = false, warnedVoice = false, ALL_VOICES = [], PT_SEEN = [];
const HAS_TTS = "speechSynthesis" in window;
const isBR = v => /br|bra/i.test((v.lang || "").split(/[-_]/).slice(1).join("")) || /brasil|brazil|luciana|felipe|francisca|antonio \(br|thalita/i.test(v.name || "");
const isPT = v => { const l = (v.lang || "").toLowerCase(); if (isBR(v)) return false;
  return /^pt[-_]pt/.test(l) || /^por[-_]prt/.test(l) || /portugal|joana|catarina|duarte/i.test(v.name || ""); };
function loadVoices() {
  if (!HAS_TTS) return;
  let all = []; try { all = speechSynthesis.getVoices() || []; } catch (e) {}
  ALL_VOICES = all;
  PT_SEEN = all.filter(v => /^(pt|por)/i.test(v.lang || "") || /portugu/i.test(v.name || ""));
  VOICES = all.filter(isPT);
  VOICE = VOICES.find(v => v.voiceURI === S.settings.voice) || VOICES.find(v => /joana|catarina|duarte/i.test(v.name)) || VOICES[0] || null;
}
if (HAS_TTS) {
  loadVoices();
  try { speechSynthesis.onvoiceschanged = () => { const had = hasVoice(); loadVoices(); if (had !== hasVoice()) render(); }; } catch (e) {}
  /* Some in-app browsers load voices late and never fire voiceschanged: keep checking for a while. */
  let tries = 0; const poll = setInterval(() => { const had = hasVoice(), n = ALL_VOICES.length; loadVoices(); tries++;
    if (had !== hasVoice() || n !== ALL_VOICES.length) render(); if (tries > 12 || VOICE) clearInterval(poll); }, 1000);
}
setTimeout(() => { loadVoices(); VOICES_CHECKED = true; render(); }, 1800);
/* System mode: the app can't list voices, so we only ask the device for "pt-PT" and let it pick its Portugal voice. Opt-in after the learner hears a test. */
const sysMode = () => HAS_TTS && !VOICE && !!S.settings.sysVoice;
const hasVoice = () => !!VOICE || sysMode();
function speak(text, o = {}) {
  if (!hasVoice()) { if (!warnedVoice && VOICES_CHECKED) { warnedVoice = true; toast("Audio is off until a Portugal voice is set up. See the yellow box on the Learn tab."); } return Promise.resolve(); }
  return rawSpeak(text, o);
}
/* Speech engines read a lone "e" or "o" as the letter name ("é", "ó"). In Portugal the word "e" (and) sounds like "ee" and "o" (the) like "oo". */
const SAY_FIX = { e: "i", o: "u", os: "us" };
const sayFix = text => { const k = String(text).trim().toLowerCase().replace(/[.!?,;:]/g, ""); return SAY_FIX[k] || text; };
function rawSpeak(text, o = {}) {
  return new Promise(res => {
    try {
      if (!o.queue) speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(sayFix(text));
      const v = o.voice || VOICE;
      if (v) u.voice = v;
      u.lang = v && v.lang ? v.lang : "pt-PT";
      u.rate = (S.settings.rate || 1) * (o.slow ? 0.62 : 0.95);
      if (o.pitch) u.pitch = o.pitch;
      let done = false; const fin = () => { if (!done) { done = true; res(); } };
      u.onend = fin; u.onerror = fin;
      speechSynthesis.speak(u);
      setTimeout(fin, 4000 + text.length * 160);
    } catch (e) { res(); }
  });
}
const speakBtn = (text, slow) => `<button class="icon-btn" data-a="say" data-t="${esc(text)}"${slow ? ' data-slow="1"' : ""} aria-label="${slow ? "Play slowly" : "Play audio"}">${slow ? ICON.slow : ICON.speak}</button>`;

/* ---------- Speech input ---------- */
let DICT_LANG = "pt-PT", DICT = null, MICREC = null, MIC_CB = null, micFinal = "", micState = "idle";
const SRClass = window.SpeechRecognition || window.webkitSpeechRecognition;
const canMic = () => !!DICT || !!SRClass;
function setupDictation(d) {
  DICT = d;
  d.onPartial(({ text }) => MIC_CB && MIC_CB((micFinal + " " + text).trim()));
  d.onFinal(({ text }) => { micFinal = (micFinal + text).replace(/\s+/g, " ").trim(); MIC_CB && MIC_CB(micFinal); });
  d.onState(({ state }) => { micState = state; paintMic(); });
}
function paintMic() { document.querySelectorAll("[data-a=mic]").forEach(b => { b.setAttribute("aria-pressed", micState === "listening"); b.style.background = micState === "listening" ? "var(--bad)" : ""; }); }
function toggleMic(cb) {
  if (micState === "listening") { if (DICT) DICT.stop().catch(() => {}); if (MICREC) try { MICREC.stop(); } catch (e) {} return; }
  MIC_CB = cb; micFinal = "";
  if (DICT) {
    DICT.start({ language: DICT_LANG }).catch(e => {
      micState = "idle"; paintMic();
      const c = e && e.code;
      if (c === "not_granted") { DICT = null; render(); toast("Microphone is off. Use your keyboard's mic instead."); }
      else if (c === "unavailable" && DICT_LANG === "pt-PT") { DICT_LANG = "pt"; toast("Tap the mic again to dictate in Portuguese."); }
      else if (c === "unavailable") { DICT = null; render(); toast("Portuguese dictation isn't offered here. Use your keyboard's mic with a Português (Portugal) keyboard."); }
      else if (c === "rate_limited") toast("Dictation is busy. Try again in a moment.");
    });
    return;
  }
  if (SRClass) {
    try {
      const r = new SRClass(); r.lang = "pt-PT"; r.interimResults = true; r.continuous = false;
      r.onresult = e => { let t = ""; for (const x of e.results) t += x[0].transcript; MIC_CB && MIC_CB(t); };
      r.onerror = () => { micState = "idle"; paintMic(); toast("The microphone isn't available here. Use your keyboard's mic instead."); };
      r.onend = () => { micState = "idle"; paintMic(); };
      r.start(); MICREC = r; micState = "listening"; paintMic();
    } catch (e) { toast("The microphone isn't available here. Use your keyboard's mic instead."); }
  }
}

/* ---------- Hands-free speaking ----------
   Listens once in pt-PT, stops by itself when you stop talking, then hands back what was heard.
   Nothing goes into an editable box, so the result is what you actually said. */
let LISTEN = null;
const canListen = () => !!SRClass;
const EN_LANG = /^en\b/i.test(navigator.language || "") ? navigator.language : "en-GB";
function listenOnce({ onInterim, onDone, onError, lang = "pt-PT" }) {
  if (LISTEN) { try { LISTEN.abort(); } catch (e) {} LISTEN = null; }
  let r; try { r = new SRClass(); } catch (e) { onError("unsupported"); return; }
  r.lang = lang; r.interimResults = true; r.continuous = false; r.maxAlternatives = 5;
  let finalPrefix = "", lastAlts = null, interim = "", err = null, ended = false;
  r.onresult = e => {
    let prefix = "", inter = ""; lastAlts = null;
    for (let i = 0; i < e.results.length; i++) {
      const res = e.results[i];
      if (res.isFinal) {
        if (i === e.results.length - 1) { lastAlts = []; for (let k = 0; k < res.length; k++) lastAlts.push(res[k].transcript); finalPrefix = prefix; }
        prefix += res[0].transcript + " ";
      } else inter += res[0].transcript;
    }
    interim = (prefix + inter).trim();
    if (onInterim) onInterim(interim);
  };
  r.onerror = e => { err = e.error || "error"; };
  const finish = () => {
    if (ended) return; ended = true; LISTEN = null; clearTimeout(cap);
    const alts = lastAlts ? lastAlts.map(a => (finalPrefix + a).replace(/\s+/g, " ").trim()).filter(Boolean) : (interim ? [interim] : []);
    if (alts.length) onDone([...new Set(alts)]); else onError(err || "no-speech");
  };
  r.onend = finish;
  const cap = setTimeout(() => { try { r.stop(); } catch (e) {} }, 15000);
  try { r.start(); LISTEN = r; } catch (e) { ended = true; clearTimeout(cap); onError("unsupported"); }
}
const stopListening = () => { if (LISTEN) { try { LISTEN.stop(); } catch (e) {} } };
const micErr = c => c === "not-allowed" || c === "service-not-allowed" ? "Microphone access is blocked. Allow the microphone for this site in your browser settings, then try again."
  : c === "no-speech" ? "I didn't hear anything. Tap the mic and try again."
  : c === "audio-capture" ? "No microphone was found on this device."
  : c === "network" ? "Speech recognition needs an internet connection."
  : c === "unsupported" ? "This browser can't do speech recognition. Try Chrome or Safari."
  : c === "aborted" ? "" : "Speech recognition stopped. Tap the mic to try again.";

/* Word-by-word comparison of what you meant to say with what was heard. */
const wordsOf = t => strip(String(t).replace(/-/g, " ")).split(" ").filter(Boolean);
const wsim = (a, b) => 1 - lev(a, b) / (Math.max(a.length, b.length) || 1);
function alignWords(target, heard) {
  const T = wordsOf(target), H = wordsOf(heard), n = T.length, m = H.length;
  const D = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) D[i][0] = i;
  for (let j = 1; j <= m; j++) D[0][j] = j * 0.7;
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++)
    D[i][j] = Math.min(D[i - 1][j] + 1, D[i][j - 1] + 0.7, D[i - 1][j - 1] + (1 - wsim(T[i - 1], H[j - 1])));
  const ops = []; let i = n, j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && Math.abs(D[i][j] - (D[i - 1][j - 1] + (1 - wsim(T[i - 1], H[j - 1])))) < 1e-9) {
      const sim = wsim(T[i - 1], H[j - 1]);
      ops.unshift({ ti: i - 1, h: H[j - 1], sim, type: sim > 0.999 ? "ok" : sim >= 0.5 ? "close" : "wrong" }); i--; j--;
    } else if (i > 0 && (j === 0 || Math.abs(D[i][j] - (D[i - 1][j] + 1)) < 1e-9)) { ops.unshift({ ti: i - 1, h: null, sim: 0, type: "missed" }); i--; }
    else { ops.unshift({ ti: -1, h: H[j - 1], sim: 0, type: "extra" }); j--; }
  }
  const tw = ops.filter(o => o.ti >= 0);
  const score = n ? tw.reduce((a, o) => a + (o.type === "ok" ? 1 : o.type === "close" ? o.sim * 0.85 : 0), 0) / n : 0;
  return { ops, score };
}
function analyseSpeech(targets, alts) {
  let best = null;
  for (const t of targets) for (const h of alts) {
    const a = alignWords(t, h);
    if (!best || a.score > best.score) best = { ...a, target: t, heard: h };
  }
  best.ok = best.score >= 0.8;
  best.perfect = best.score > 0.999;
  return best;
}
function speechResultHTML(a) {
  const shown = a.target.replace(/-/g, " ").split(/\s+/).filter(w => strip(w));
  const words = shown.length === wordsOf(a.target).length ? shown : wordsOf(a.target);
  const byIdx = {}; a.ops.forEach(o => { if (o.ti >= 0) byIdx[o.ti] = o; });
  const chips = words.map((w, i) => { const o = byIdx[i] || { type: "missed" };
    const title = o.type === "ok" ? "Clear" : o.type === "missed" ? "Not heard" : `Heard: ${o.h}`;
    return `<span class="wchip ${o.type}" title="${esc(title)}" lang="pt-PT">${esc(w)}</span>`; }).join(" ");
  const issues = a.ops.filter(o => o.ti >= 0 && o.type !== "ok").map(o => {
    const w = (words[o.ti] || "").replace(/[.,!?¿¡;:]/g, "");
    return `<div class="issue"><span>${o.type === "missed" ? `<b lang="pt-PT">${esc(w)}</b> wasn't heard` : `You said <i>“${esc(o.h)}”</i>, the word is <b lang="pt-PT">${esc(w)}</b>`}</span>
      <span class="row" style="gap:6px">${speakBtn(w)}${speakBtn(w, true)}</span></div>`; }).join("");
  return `<div class="wchips">${chips}</div>
    <div class="small muted">I heard: <i lang="pt-PT">“${esc(a.heard)}”</i> · ${Math.round(a.score * 100)}% match</div>
    ${issues ? `<div class="issues">${issues}</div>` : ""}`;
}
async function pronunciationTip(target, a) {
  const words = a.ops.filter(o => o.ti >= 0 && o.type !== "ok").map(o => `${wordsOf(target)[o.ti]} → heard "${o.h || "(nothing)"}"`).join("; ");
  const prompt = `You are a friendly European Portuguese pronunciation coach.
A learner tried to say: "${target}"
Speech recognition heard: "${a.heard}"
Words that didn't come through clearly: ${words || "none"}.
In 1 to 3 short sentences in English, say which sound was probably the problem in each of those words and give one concrete tip for saying it the European Portuguese way (for example nasal vowels like ão and im, unstressed final -o sounding like "u", s before a consonant or at the end sounding like "sh", swallowed unstressed e, the lh and nh sounds, the throaty r). Be encouraging and practical. Plain text, no lists, no headings. Don't mention other countries.`;
  return (await aiText(prompt)).trim();
}

/* ---------- AI tutor ---------- */
let AI = null;
const PT_RULES = `The learner is an English speaker learning Portuguese. Every bit of Portuguese you write must be European Portuguese as spoken in Portugal (pt-PT), never Brazilian Portuguese. This rule is about which Portuguese to use, not the language of your reply: whenever the task asks for an explanation, feedback, a tip or a translation, write it in English (quoting Portuguese words as examples only). For Portuguese:
- Portugal vocabulary: comboio, autocarro, elétrico, pequeno-almoço, telemóvel, casa de banho, frigorífico, sumo, ementa, fixe, rapariga, miúdo, talho, paragem, fatura, ecrã, rato (computer mouse).
- Progressive aspect with "estar a + infinitivo" (estou a fazer), never the gerund (estou fazendo).
- Clitic pronouns after the verb in plain affirmative sentences (chamo-me, diz-me, dá-me), before it after negation, question words and certain adverbs (não me lembro, como te chamas).
- "tu" with second-person verb forms for informal address, "o senhor / a senhora" for polite address. Do not address the learner as "você".
- Definite article before possessives (o meu, a tua).
- Portugal spelling under the 1990 agreement (facto, contacto, receção, ótimo, fatura) and Portugal accents (falámos for the past tense, António, económico, género, bebé).
- Don't mention Brazil or other varieties of Portuguese to the learner unless they ask.`;
const LEVELS = {
  A1: "The learner is a beginner (A1). Use very short, simple sentences (under 10 words), mostly the present tense and very common words.",
  A2: "The learner is elementary (A2). Use short sentences, the present tense and the pretérito perfeito, everyday vocabulary.",
  B1: "The learner is intermediate (B1). Use natural sentences with varied tenses and some common Portuguese expressions."
};
/* Providers: the built-in free tutor (Gemini through Firebase, needs sign-in) or the learner's own key, kept on this device only. */
const AI_LS = "pois.ai.v1";
const PROVIDERS = {
  builtin: { label: "Built-in free tutor", sub: "Gemini, free with a daily limit. Needs Google sign-in." },
  gemini: { label: "My Gemini key", sub: "Free key from Google AI Studio.", model: "gemini-3.5-flash-lite", url: "https://aistudio.google.com/apikey", co: "Google" },
  claude: { label: "My Claude key", sub: "Anthropic API key, paid per use.", model: "claude-haiku-5-5", url: "https://console.anthropic.com/settings/keys", co: "Anthropic" },
  openai: { label: "My OpenAI key", sub: "OpenAI API key, paid per use.", model: "gpt-5-mini", url: "https://platform.openai.com/api-keys", co: "OpenAI" },
  grok: { label: "My Grok key", sub: "xAI API key, paid per use.", model: "grok-4.3", url: "https://console.x.ai", co: "xAI" }
};
let AIC = { provider: "builtin", keys: {}, models: {} };
try { AIC = { ...AIC, ...JSON.parse(localStorage.getItem(AI_LS) || "{}") }; } catch (e) {}
const saveAIC = () => { try { localStorage.setItem(AI_LS, JSON.stringify(AIC)); } catch (e) {} };
const CFG = window.POIS_CONFIG || {};
const GEMINI_MODELS = CFG.geminiModels || ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3.5-flash"];
const DAILY_LIMIT = CFG.builtinDailyLimit || 80;
function aiState() {
  if (AIC.provider === "builtin") {
    if (!CLOUD_READY || !window.PoisCloud || !PoisCloud.aiReady) return "unconfigured";
    return USER ? "ok" : "signin";
  }
  return (AIC.keys[AIC.provider] || "").trim() ? "ok" : "nokey";
}
const toMessages = input => typeof input === "string" ? [{ role: "user", content: input }] : input;
function parseJSON(t) {
  t = String(t || "").trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
  try { return JSON.parse(t); } catch (e) {}
  const m = t.match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch (e) {} }
  throw { code: "bad_output" };
}
async function httpJSON(url, opts) {
  let r; try { r = await fetch(url, opts); } catch (e) { throw { code: "network" }; }
  const body = await r.json().catch(() => ({}));
  if (r.ok) return body;
  const msg = (body.error && (body.error.message || body.error.type)) || r.statusText || "";
  if (r.status === 401 || r.status === 403) throw { code: "bad_key", message: msg };
  if (r.status === 429) throw { code: "rate_limited", message: msg };
  if (r.status === 404 || /model/i.test(msg)) throw { code: "bad_model", message: msg };
  throw { code: "error", message: msg };
}
async function aiText(input, opts = {}) {
  const messages = toMessages(input), json = !!opts.json, p = AIC.provider, key = (AIC.keys[p] || "").trim();
  const model = (AIC.models[p] || "").trim() || (PROVIDERS[p] && PROVIDERS[p].model);
  if (p === "builtin") {
    if (aiState() !== "ok") throw { code: "signin" };
    const t = today(); if (!S.aiDay || S.aiDay.d !== t) S.aiDay = { d: t, n: 0 };
    if (S.aiDay.n >= DAILY_LIMIT) throw { code: "daily_limit" };
    const r = await PoisCloud.generate({ messages, json, models: GEMINI_MODELS });
    S.aiDay.n++; save(); return r.text;
  }
  if (!key) throw { code: "bad_key" };
  if (p === "gemini") {
    const chain = [model, ...GEMINI_MODELS.filter(m => m !== model)]; let last;
    for (const m of chain) {
      try {
        const b = await httpJSON(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(m)}:generateContent?key=${encodeURIComponent(key)}`, { method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ contents: messages.map(x => ({ role: x.role === "assistant" ? "model" : "user", parts: [{ text: x.content }] })), generationConfig: json ? { responseMimeType: "application/json" } : undefined }) });
        const c = (b.candidates || [])[0];
        return ((c && c.content && c.content.parts) || []).map(x => x.text || "").join("");
      } catch (e) { last = e; if (e.code !== "bad_model") throw e; }
    }
    throw last;
  }
  if (p === "claude") {
    const b = await httpJSON("https://api.anthropic.com/v1/messages", { method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
      body: JSON.stringify({ model, max_tokens: 1200, messages }) });
    return (b.content || []).map(x => x.text || "").join("");
  }
  const base = p === "grok" ? "https://api.x.ai/v1" : "https://api.openai.com/v1";
  const b = await httpJSON(base + "/chat/completions", { method: "POST", headers: { "content-type": "application/json", authorization: "Bearer " + key },
    body: JSON.stringify({ model, messages, ...(json ? { response_format: { type: "json_object" } } : {}) }) });
  const ch = (b.choices || [])[0];
  return (ch && ch.message && ch.message.content) || "";
}
async function aiCall(input, opts = {}) { const text = await aiText(input, opts); if (opts.onText) opts.onText({ text }); return { text }; }
function refreshAI() { AI = aiState() === "ok" ? aiCall : null; }
async function askJSON(input, opts = {}) { return parseJSON(await aiText(input, { ...opts, json: true })); }
const aiErr = e => {
  const c = e && e.code;
  if (c === "rate_limited") return "The AI tutor is busy or out of free requests right now. Try again in a minute.";
  if (c === "daily_limit") return "You've used today's free tutor messages. Add your own key in More › Settings, or come back tomorrow.";
  if (c === "bad_key") return "Your API key was rejected. Check it in More › Settings › AI tutor.";
  if (c === "bad_model") return "That model name wasn't found. Check it in More › Settings › AI tutor.";
  if (c === "signin") return "Sign in with Google to use the free tutor.";
  if (c === "network") return "No connection. The AI tutor needs the internet.";
  if (c === "app_check") return "The free tutor is blocked by Firebase App Check. It needs the reCAPTCHA site key set up (see README).";
  if (c === "bad_output") return "The tutor's reply came back garbled. Try again.";
  return "Couldn't reach the AI tutor. Try again.";
};
function aiOffMessage() {
  const st = aiState();
  if (st === "signin") return `<p>Sign in with Google to use the free AI tutor, or add your own key in More › Settings.</p>${googleBtn()}`;
  if (st === "nokey") return `<p>Add your key for ${esc(PROVIDERS[AIC.provider].co)} in More › Settings › AI tutor, or switch back to the built-in free tutor.</p><button class="btn" data-a="more" data-m="settings" data-tabgo="1">Open settings</button>`;
  return `<p>The built-in tutor isn't set up on this copy of Pois. You can use your own Gemini, Claude, OpenAI or Grok key in More › Settings › AI tutor.</p><button class="btn" data-a="more" data-m="settings" data-tabgo="1">Open settings</button>`;
}
const richText = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");

/* ---------- UI helpers ---------- */
let TAB = ["learn", "review", "chat", "verbs", "library", "more"].includes(location.hash.slice(1)) ? location.hash.slice(1) : "learn";
function toast(msg) { const t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 3200); }
const ACCENTS = ["á", "à", "â", "ã", "ç", "é", "ê", "í", "ó", "ô", "õ", "ú"];
const accentBar = target => `<div class="seg" aria-label="Accented letters">${ACCENTS.map(c => `<button type="button" data-a="acc" data-c="${c}" data-target="${target}">${c}</button>`).join("")}</div>`;
function insertAtCursor(el, txt) { const s = el.selectionStart ?? el.value.length, e = el.selectionEnd ?? el.value.length; el.value = el.value.slice(0, s) + txt + el.value.slice(e); el.focus(); el.selectionStart = el.selectionEnd = s + txt.length; el.dispatchEvent(new Event("input", { bubbles: true })); }
const unitLevel = id => (S.units[id] && S.units[id].level) || 0;
const dots = n => `<span class="dots" aria-label="Level ${n} of 3">${[1, 2, 3].map(i => `<i class="${i <= n ? "on" : ""}"></i>`).join("")}</span>`;

/* ================= Screens ================= */
function renderTop() {
  const st = currentStreak();
  $("#top").innerHTML = `<div class="brand">Pois<small>EUROPEAN PORTUGUESE</small></div><div class="sp"></div>
    <span class="chip" title="Day streak">${ICON.flame}<span class="num">${st}</span></span>
    ${S.freezes ? `<span class="chip" title="Streak freezes">${ICON.ice}<span class="num">${S.freezes}</span></span>` : ""}
    <span class="chip sun" title="Total XP">${ICON.bolt}<span class="num">${S.xp}</span></span>
    ${USER ? `<div class="acct-wrap">
      <button class="acct-bubble" data-a="acct" aria-haspopup="menu" aria-expanded="${MENU_OPEN}" aria-label="Account: ${esc(USER.name || USER.email)}" style="--hue:${hueOf(USER.uid)}">${esc(initials(USER))}</button>
      ${MENU_OPEN ? `<div class="acct-menu" role="menu">
        <div class="acct-head"><span class="acct-bubble big" style="--hue:${hueOf(USER.uid)}" aria-hidden="true">${esc(initials(USER))}</span>
          <div style="min-width:0"><b>${esc(USER.name || "Signed in")}</b><div class="small muted ellipsis">${esc(USER.email)}</div></div></div>
        <div class="small muted acct-sync">${CLOUD === "cloud" ? "✓ Progress saved to your account" : CLOUD === "syncing" ? "Syncing…" : CLOUD === "error" ? "Offline: will sync when you're back online" : "Saved on this device"}</div>
        <button role="menuitem" data-a="acctsettings">Settings</button>
        <button role="menuitem" data-a="signout" class="danger">Sign out</button>
      </div>` : ""}
    </div>` : ""}`;
}
let MENU_OPEN = false;
function initials(u) {
  const n = (u.name || "").trim();
  if (n) { const p = n.split(/\s+/); return ((p[0][0] || "") + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase(); }
  return (u.email || "?")[0].toUpperCase();
}
function hueOf(id) { let h = 0; for (const c of String(id)) h = (h * 31 + c.charCodeAt(0)) % 360; return h; }
function closeMenu() { if (MENU_OPEN) { MENU_OPEN = false; renderTop(); } }
function renderNav() {
  const due = dueKeys().length;
  const tabs = [["learn", "Learn"], ["library", "Library"], ["review", "Review"], ["chat", "Chat"], ["verbs", "Verbs"], ["more", "More"]];
  $("#nav").innerHTML = tabs.map(([id, label]) => `<button data-a="tab" data-tab="${id}" ${TAB === id ? 'aria-current="page"' : ""}>${ICON[id]}<span>${label}${id === "review" && due ? `<span class="badge">${due}</span>` : ""}</span></button>`).join("");
}
const INSTALL_HELP = `<details><summary>How to add a Portugal voice (free)</summary>
  <p><b>iPhone / iPad:</b> Settings › Accessibility › Spoken Content › Voices › Portuguese. Pick one marked <b>Portugal</b> (Joana or Catarina) and download it.</p>
  <p><b>Android:</b> Settings › search "Text-to-speech" › Speech Services by Google › settings › Install voice data › <b>Português (Portugal)</b>.</p></details>`;
function voiceBanner() {
  if (!VOICES_CHECKED || hasVoice()) return "";
  if (!HAS_TTS) return `<div class="banner"><b>This browser can't speak.</b> Open Pois in Chrome or Safari for audio.</div>`;
  const brOnly = PT_SEEN.length && !VOICES.length;
  return `<div class="banner stack" style="gap:8px">
    ${ALL_VOICES.length === 0
      ? `<div><b>Your browser isn't listing its voices</b>, so Pois can't confirm the voice is from Portugal. Your installed voice may still work.</div>`
      : brOnly ? `<div><b>The Portuguese voice on this device isn't a Portugal voice</b> (${PT_SEEN.map(v => esc(v.name)).join(", ")}). Add a Portugal one below.</div>`
      : `<div><b>No Portuguese voice is visible to this page.</b></div>`}
    <div class="row wrap"><button class="btn ghost" data-a="systest">1. Play a test sentence</button><button class="btn" data-a="sysok">2. It sounds like Portugal: use it</button></div>
    <div class="small">Listen for the Portugal sound: "obrigado" ends in a soft <i>u</i>, and "noite" sounds like <i>noyt</i>. If it doesn't sound like that, don't press 2: add the Portugal voice instead, or try Chrome or Safari.</div>
    ${INSTALL_HELP}</div>`;
}
function screenLearn() {
  const t = today(), xpToday = S.days[t] || 0, goal = S.settings.goal, pct = Math.min(1, xpToday / goal), C = 2 * Math.PI * 32;
  const due = dueKeys().length, mist = Object.keys(S.mistakes).filter(getItem).length, st = currentStreak();
  const nk = nextLadder(), next = LADDER_UNITS[nk], nLearned = learnedCount(), tier = currentTier(), prevN = [0, ...LADDER_TIERS.map(t => t.n)][LADDER_TIERS.indexOf(tier)];
  return `
  ${wotdCard()}
  <section class="card goal">
    <svg class="ring" viewBox="0 0 76 76" role="img" aria-label="${xpToday} of ${goal} XP today"><circle class="bg" cx="38" cy="38" r="32"/><circle class="fg" cx="38" cy="38" r="32" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"/>
    <text x="38" y="43" text-anchor="middle" font-family="var(--display)" font-weight="800" font-size="16" fill="currentColor">${xpToday}</text></svg>
    <div class="stack" style="flex:1;gap:6px">
      <h2>${pct >= 1 ? "Daily goal reached!" : xpToday ? "Keep going!" : "Welcome back!"}</h2>
      <div class="muted small">${xpToday} / ${goal} XP today · ${st} day streak</div>
      ${(() => { const sv = savedLesson(); return sv
        ? `<button class="btn sun" data-a="resume">Continue: ${esc(savedLessonLabel(sv))} · ${sv.i + 1} of ${sv.ex.length}</button>`
        : `<button class="btn sun" data-a="practice" data-u="${next.id}">Continue: ${esc(next.en)}</button>`; })()}
    </div>
  </section>
  ${voiceBanner()}
  <section class="quick">
    <button data-a="flash" ${due ? "" : "disabled"}><b class="num">${due}</b>Reviews due</button>
    <button data-a="mistakes" ${mist ? "" : "disabled"}><b class="num">${mist}</b>Mistakes</button>
    <button data-a="personal"><b>${ICON.bolt.replace("<svg", '<svg width="26" height="26"')}</b>Personalised</button>
  </section>
  <button class="card ladder-card" data-a="tab" data-tab="library">
    <div class="row" style="justify-content:space-between"><span class="kind">Word ladder · ${esc(tier.name)}</span><span class="small num"><b>${nLearned}</b> / ${tier.n} words</span></div>
    <div class="bar" style="margin:8px 0 6px"><i style="width:${Math.min(100, 100 * (nLearned - prevN) / (tier.n - prevN))}%"></i></div>
    <div class="row small muted" style="justify-content:space-between"><span>${S.badges[tier.n] ? "All tiers complete!" : `${tier.n - nLearned} to go for the ${esc(tier.name)} badge`}</span><span class="row" style="gap:4px">${ICON.library.replace("<svg", '<svg width="18" height="18"')} Open library</span></div>
  </button>
  <section class="stack" style="gap:12px">
    <h2>Word ladder: the ${LW.length} most common words</h2>
    ${LADDER_UNITS.map((u, k) => { const lv = ladLevel(k), got = ladLearned(k); return `
    <article class="card unit ${k === nk ? "current" : ""}">
      <div class="tileno ${lv >= 3 ? "done" : ""}">${k + 1}</div>
      <div>
        <div class="row" style="justify-content:space-between"><h3>${esc(u.en)}</h3>${dots(lv)}</div>
        <div class="muted small"><span lang="pt-PT">${esc(u.pt)}</span> · ${got}/${u.words.length} in your library</div>
        <div class="acts">
          <button class="btn ghost" data-a="study" data-u="${u.id}">Study</button>
          <button class="btn" data-a="practice" data-u="${u.id}">${lv === 0 ? "Start" : lv >= 3 ? "Practise" : `Level ${lv + 1}`}</button>
        </div>
      </div>
    </article>`; }).join("")}
    <p class="muted small">Words ${LW.length + 1}–3,000 arrive in coming updates.</p>
  </section>
  <details class="packs"><summary><h2 style="display:inline">Topic packs (optional)</h2><div class="small muted">Greetings, food, travel and more. Words you learn here fill books in your library too.</div></summary>
  <section class="stack" style="gap:12px;margin-top:12px">
    ${UNITS.map((u, i) => { const lv = unitLevel(u.id); return `
    <article class="card unit">
      <div class="tileno ${lv >= 3 ? "done" : ""}">${i + 1}</div>
      <div>
        <div class="row" style="justify-content:space-between"><h3>${esc(u.en)}</h3>${dots(lv)}</div>
        <div class="muted small"><span lang="pt-PT">${esc(u.pt)}</span> · ${u.words.length + u.phrases.length} words &amp; phrases</div>
        <div class="acts">
          <button class="btn ghost" data-a="study" data-u="${u.id}">Study</button>
          <button class="btn" data-a="practice" data-u="${u.id}">${lv === 0 ? "Start" : lv >= 3 ? "Practise" : `Level ${lv + 1}`}</button>
        </div>
      </div>
    </article>`; }).join("")}
  </section></details>
  <p class="muted small">Everything is open: no locks, no hearts, no ads. Levels get harder: recognise › build › write and speak.</p>`;
}

function screenReview() {
  const keys = Object.keys(S.cards).filter(getItem), due = dueKeys(), mist = Object.keys(S.mistakes).filter(getItem);
  const newC = keys.filter(k => S.cards[k].reps === 0).length, mature = keys.filter(k => S.cards[k].ivl >= 21).length, learning = keys.length - newC - mature;
  const nextDue = keys.map(k => S.cards[k].due).filter(d => d > Date.now()).sort((a, b) => a - b)[0];
  const custom = Object.entries(S.custom);
  return `
  <section class="card stack">
    <h2>Smart review</h2>
    <p class="muted small" style="margin:0">Spaced repetition: each word comes back just before you'd forget it.</p>
    <div class="grid2">
      <button class="btn" data-a="flash" ${due.length ? "" : "disabled"}>Flashcards (${due.length})</button>
      <button class="btn ghost" data-a="quizdue" ${due.length ? "" : "disabled"}>Quiz review</button>
      <button class="btn ghost" data-a="mistakes" ${mist.length ? "" : "disabled"}>Fix mistakes (${mist.length})</button>
      <button class="btn ghost" data-a="personal">Personalised</button>
    </div>
    ${!due.length ? `<div class="banner info">${keys.length ? `Nothing due right now.${nextDue ? ` Next review ${fmtWhen(nextDue)}.` : ""}` : "Do a lesson and the words you meet will appear here."}</div>` : ""}
  </section>
  <section class="card">
    <h3>Your words</h3>
    <div class="quick" style="margin-top:10px">
      <div class="card" style="text-align:center;padding:10px"><b class="num" style="font-family:var(--display);font-size:1.4rem">${learning + newC}</b><div class="small muted">Learning</div></div>
      <div class="card" style="text-align:center;padding:10px"><b class="num" style="font-family:var(--display);font-size:1.4rem">${mature}</b><div class="small muted">Mastered</div></div>
      <div class="card" style="text-align:center;padding:10px"><b class="num" style="font-family:var(--display);font-size:1.4rem">${keys.length}</b><div class="small muted">Total</div></div>
    </div>
  </section>
  <section class="card stack">
    <h3>Saved phrases</h3>
    <p class="muted small" style="margin:0">Add anything from the translator in Chat, or type your own.</p>
    <div class="grid2"><input type="text" id="cpt" placeholder="Portuguese" lang="pt-PT"><input type="text" id="cen" placeholder="English"></div>
    <button class="btn ghost" data-a="addcustom">Add to review</button>
    ${custom.length ? `<table class="tbl">${custom.map(([k, c]) => `<tr><td lang="pt-PT" class="pt">${esc(c.pt)}</td><td>${esc(c.en)}</td><td style="width:40px"><button class="icon-btn" data-a="delcustom" data-k="${esc(k)}" aria-label="Delete">${ICON.close}</button></td></tr>`).join("")}</table>` : ""}
  </section>`;
}
function fmtWhen(t) { const m = Math.round((t - Date.now()) / 60e3); if (m < 60) return `in ${m} min`; const h = Math.round(m / 60); if (h < 24) return `in ${h} h`; return `in ${Math.round(h / 24)} days`; }

/* ---------- Chat (AI) ---------- */
const CH = { mode: "free", scenario: null, msgs: [], busy: false, started: false, showSugg: false, trans: { dir: "en", out: null, busy: false, listening: false, interim: "", spoken: false, speech: null, tip: "" }, asks: [], askBusy: false };
function screenChat() {
  if (!AI) return `<section class="card stack"><h2>Chat</h2><p class="muted" style="margin:0">Chat with Rita, roleplays, the translator and grammar help use an AI tutor.</p>${aiOffMessage()}</section>`;
  const modes = [["free", "Free chat"], ["role", "Roleplay"], ["trans", "Translator"], ["ask", "Grammar"]];
  let body = "";
  if (CH.mode === "trans") body = chatTranslator();
  else if (CH.mode === "ask") body = chatAsk();
  else if (!CH.started) body = chatStart();
  else body = chatThread();
  return `<div class="seg" role="group" aria-label="Mode">${modes.map(([id, l]) => `<button data-a="chmode" data-m="${id}" aria-pressed="${CH.mode === id}">${l}</button>`).join("")}</div>${body}`;
}
function levelSeg() { return `<div class="seg" role="group" aria-label="Level">${["A1", "A2", "B1"].map(l => `<button data-a="level" data-l="${l}" aria-pressed="${S.settings.level === l}">${l}</button>`).join("")}</div>`; }
function chatStart() {
  if (CH.mode === "free") return `<section class="card stack"><h2>Chat with Rita</h2><p style="margin:0">Rita is from Lisbon. Chat about anything; she corrects your Portuguese as you go and only uses Portugal Portuguese.</p>${levelSeg()}<button class="btn sun" data-a="chstart">Start chatting</button></section>`;
  return `<section class="stack"><div class="row" style="justify-content:space-between"><h2>Roleplay</h2>${levelSeg()}</div>
  ${SCENARIOS.map(s => `<button class="card" style="text-align:left" data-a="chstart" data-s="${s.id}"><h3>${esc(s.t)}</h3><div class="muted small">${esc(s.where)}</div><div class="small" style="margin-top:4px"><b>Goal:</b> ${esc(s.goal)}</div></button>`).join("")}</section>`;
}
function chatThread() {
  const sc = CH.scenario && SCENARIOS.find(s => s.id === CH.scenario);
  const last = [...CH.msgs].reverse().find(m => m.role === "ai");
  return `<section class="stack">
    <div class="row" style="justify-content:space-between"><div><h3>${sc ? esc(sc.t) : "Chat with Rita"}</h3>${sc ? `<div class="small muted">Goal: ${esc(sc.goal)}</div>` : ""}</div><button class="btn ghost" data-a="chreset">New</button></div>
    <div class="chat" aria-live="polite">${CH.msgs.map((m, i) => m.role === "ai" ? `
      <div class="msg ai"><div lang="pt-PT">${esc(m.text)}</div>${m.showTr ? `<div class="tr">${esc(m.tr)}</div>` : ""}
      <div class="tools"><button data-a="say" data-t="${esc(m.text)}">Listen</button><button data-a="say" data-slow="1" data-t="${esc(m.text)}">Slow</button><button data-a="chtr" data-i="${i}">${m.showTr ? "Hide" : "English"}</button><button data-a="chsave" data-i="${i}">Save</button></div></div>
      ${m.done ? `<div class="banner info">Goal reached. Well done! Start a new roleplay or keep chatting.</div>` : ""}` :
      `<div class="msg me" lang="pt-PT">${m.spoken ? `<span class="spoken" title="Spoken">${ICON.mic}</span>` : ""}${esc(m.text)}</div>${m.fix ? `<div class="fix"><b lang="pt-PT">${esc(m.fix.corrected)}</b><br>${esc(m.fix.explanation)}
        <div class="tools"><button data-a="say" data-t="${esc(m.fix.corrected)}">Listen</button><button data-a="say" data-slow="1" data-t="${esc(m.fix.corrected)}">Slow</button></div></div>` : ""}`).join("")}
      ${CH.busy ? `<div class="msg ai typing">Rita is typing…</div>` : ""}
    </div>
    ${last && last.sugg && last.sugg.length && !CH.busy ? (CH.showSugg ? `<div class="sugg">${last.sugg.map(s => `<button data-a="chsugg" data-t="${esc(s)}" lang="pt-PT">${esc(s)}</button>`).join("")}</div>` : `<button class="btn ghost" data-a="chhelp">Help me reply</button>`) : ""}
    <div class="composer">
      <textarea id="chin" rows="1" lang="pt-PT" placeholder="Write in Portuguese…" aria-label="Your message"></textarea>
      ${canListen() ? `<button class="icon-btn ${CH.listening ? "rec" : ""}" data-a="chmic" aria-label="${CH.listening ? "Stop listening" : "Speak your reply"}">${ICON.mic}</button>` : ""}
      <button class="icon-btn" style="background:var(--tile);color:var(--card);border:0" data-a="chsend" aria-label="Send" ${CH.busy ? "disabled" : ""}>${ICON.send}</button>
    </div>
    ${CH.listening ? `<div class="msg me listening" lang="pt-PT"><span id="chinterim">${esc(CH.interim || "Listening…")}</span></div>` : ""}
    <p class="muted small" style="margin:0">${canListen() ? "Tap the mic and just talk. Rita gets exactly what she heard, so unclear words show up in her corrections." : "Type your reply in Portuguese."}</p>
  </section>`;
}
function chatSystem() {
  const sc = CH.scenario && SCENARIOS.find(s => s.id === CH.scenario);
  const who = sc
    ? `Roleplay. You are ${sc.role}. Setting: ${sc.where}. The learner's goal: ${sc.goal} Stay in character and keep it realistic for Portugal. When the learner has achieved the goal, set goal_done to true and wrap up warmly.`
    : `You are Rita, a friendly 30-year-old from Lisbon, chatting with a learner as a conversation partner. Talk naturally about everyday life in Portugal and ask one question at a time.`;
  return `${who}
${PT_RULES}
${LEVELS[S.settings.level] || LEVELS.A1}
Messages starting with [spoken, transcribed by speech recognition] were said out loud. If a word in one looks like a mis-recognition of a Portuguese word (for example "sing" for "sim", or an English-looking word), assume they were trying to say that Portuguese word: reply to what they meant, put the intended sentence in correction.corrected, and in correction.explanation name the word that didn't come through and give one short tip on pronouncing it the European Portuguese way.
If the learner writes in English or gets stuck, stay in Portuguese and show them in "correction" how to say what they meant.
Reply with ONLY a JSON object and no other text:
{"reply": "your next line in European Portuguese, 1 to 3 sentences", "translation": "English translation of reply", "correction": null if the learner's last message was correct, natural European Portuguese (or there is none yet), otherwise {"corrected": "their message rewritten in natural European Portuguese", "explanation": "one or two short English sentences on what changed; if they used a word or form not used in Portugal, give the Portugal one without mentioning other countries"}, "suggestions": ["three short possible replies the learner could give next, in European Portuguese, at their level"], "goal_done": false}`;
}
function chatInput() {
  const arr = [{ role: "user", content: chatSystem() + "\n\nStart the conversation now with your first line." }];
  CH.msgs.forEach(m => arr.push(m.role === "ai" ? { role: "assistant", content: JSON.stringify({ reply: m.text, translation: m.tr }) } : { role: "user", content: m.spoken ? `[spoken, transcribed by speech recognition] ${m.text}` : m.text }));
  return arr;
}
async function chatTurn() {
  CH.busy = true; CH.showSugg = false; render();
  try {
    const r = await askJSON(chatInput(), { modelTier: "default", cache: false });
    const lastMe = [...CH.msgs].reverse().find(m => m.role === "me");
    if (lastMe && r.correction && r.correction.corrected && norm(r.correction.corrected) !== norm(lastMe.text)) lastMe.fix = r.correction;
    CH.msgs.push({ role: "ai", text: String(r.reply || ""), tr: String(r.translation || ""), sugg: Array.isArray(r.suggestions) ? r.suggestions.slice(0, 3).map(String) : [], done: !!r.goal_done });
    if (lastMe) { S.stats.chats++; addXP(2); }
    CH.busy = false; render();
    if (S.settings.autoplay) speak(String(r.reply || ""));
  } catch (e) { CH.busy = false; render(); toast(aiErr(e)); }
}
function chatTranslator() {
  const T = CH.trans, o = T.out, en = T.dir === "en";
  const mic = canListen() ? `<button class="btn ghost mic-inline ${T.listening ? "rec" : ""}" data-a="trmic" ${T.busy ? "disabled" : ""}>${ICON.mic}<span>${T.listening ? "Listening… tap to stop" : en ? "Speak English" : "Say it in Portuguese"}</span></button>` : "";
  const words = list => Array.isArray(list) && list.length ? `<div class="stack" style="gap:4px"><div class="kind">Word by word</div><div class="wordlist">${list.map(w => `<div class="wl"><span class="row" style="gap:4px">${speakBtn(String(w.pt || ""))}<b lang="pt-PT">${esc(String(w.pt || ""))}</b></span><span class="muted">${esc(String(w.en || ""))}</span></div>`).join("")}</div></div>` : "";
  let out = "";
  if (o && en && o.pt) out = `<div class="stack">
      <div class="row"><div class="prompt" lang="pt-PT" style="flex:1">${esc(o.pt)}</div>${speakBtn(o.pt)}${speakBtn(o.pt, true)}</div>
      ${o.informal ? `<div class="small"><span class="flag">TU</span> <span lang="pt-PT">${esc(o.informal)}</span> ${speakBtn(o.informal)}</div>` : ""}
      ${words(o.words)}
      ${!Array.isArray(o.words) && o.literal ? `<div class="small muted">Word by word: ${esc(o.literal)}</div>` : ""}
      ${o.notes ? `<div class="tip">${esc(o.notes)}</div>` : ""}
      <button class="btn ghost" data-a="trsave">Save to review</button></div>`;
  else if (o && !en) {
    const said = String(o.intended || T.src || "");
    out = `<div class="stack">
      ${T.spoken ? `<div class="stack" style="gap:6px"><div class="kind">Your pronunciation</div>${T.speech ? speechResultHTML(T.speech) : `<div class="small muted">I heard: <i lang="pt-PT">“${esc(T.src)}”</i></div>`}
        ${T.speech && T.speech.perfect ? `<div class="small"><span class="flag">CLEAR</span> Every word came through clearly.</div>` : ""}
        ${T.tip ? `<div class="tip">${esc(T.tip)}</div>` : T.speech && !T.speech.perfect ? `<div class="small typing">Getting a pronunciation tip…</div>` : ""}</div>` : ""}
      <div class="stack" style="gap:4px"><div class="kind">It means</div><div class="row"><div class="prompt" style="flex:1">${esc(o.en || "")}</div></div>
        <div class="row small" style="gap:6px">${speakBtn(said)}${speakBtn(said, true)}<span class="muted">Hear it: <span lang="pt-PT">${esc(said)}</span></span></div></div>
      ${words(o.words)}
      ${o.natural && norm(o.natural) !== norm(said) ? `<div class="banner info"><b>More natural:</b> <span lang="pt-PT">${esc(o.natural)}</span> ${speakBtn(o.natural)}</div>` : `<div class="small"><span class="flag">NATURAL</span> That sounds natural.</div>`}
      ${o.notes ? `<div class="tip">${esc(o.notes)}</div>` : ""}
      <button class="btn ghost" data-a="trsave">Save to review</button></div>`;
  }
  return `<section class="card stack"><h2>Translator</h2>
    <div class="seg" role="group"><button data-a="trdir" data-d="en" aria-pressed="${en}">English › Portugal PT</button><button data-a="trdir" data-d="pt" aria-pressed="${!en}">Check my Portuguese</button></div>
    <p class="small muted" style="margin:0">${en ? "Type or say something in English and hear how to say it in Portugal." : "Type or say something in Portuguese, for example a phrase you just heard. You'll get what it means, word by word, and feedback on your pronunciation when you speak it."}</p>
    <textarea id="trin" rows="3" ${en ? "" : 'lang="pt-PT"'} placeholder="${en ? "e.g. Where can I catch the bus to Belém?" : "e.g. Podes falar mais devagar?"}"></textarea>
    ${T.listening ? `<div class="interim" id="trinterim" ${en ? "" : 'lang="pt-PT"'}>${esc(T.interim || "Listening…")}</div>` : ""}
    <div class="row" style="gap:8px;flex-wrap:wrap">${mic}<button class="btn" data-a="trgo" ${T.busy || T.listening ? "disabled" : ""}>${T.busy ? (en ? "Translating…" : "Checking…") : en ? "Translate" : "Check"}</button></div>
    ${out}
  </section>`;
}

async function translateNow(t, spoken) {
  const T = CH.trans, en = T.dir === "en";
  T.busy = true; T.src = t; T.spoken = spoken; T.out = null; T.speech = null; T.tip = ""; render();
  const ti0 = $("#trin"); if (ti0) ti0.value = t;
  const prompt = en
    ? `${PT_RULES}\nTranslate the ${spoken ? "spoken English (transcribed by speech recognition, so ignore small recognition slips)" : "English text"} below into natural European Portuguese for a learner. Return ONLY a JSON object: {"pt": "the Portugal Portuguese translation (polite or neutral register if unclear)", "informal": "the informal tu version, or null if identical", "words": [{"pt": "each word or short chunk of the translation, in order", "en": "what it means here, in English"}], "notes": "one or two short English sentences on grammar or usage worth knowing"}\nText: """${t}"""`
    : `${PT_RULES}\nThe learner ${spoken ? "said the Portuguese below out loud; it was transcribed by speech recognition, so some words may be mis-recognised, for example a Portuguese word they heard someone say and repeated" : "typed the Portuguese below, perhaps something they heard someone say"}. Work out what it means. Return ONLY a JSON object: {"intended": "the Portuguese they most likely meant${spoken ? ", replacing words that look like recognition mistakes with the Portuguese word they were most likely trying to say" : ""}, with spelling, accents and punctuation fixed", "en": "natural English meaning of it", "words": [{"pt": "each word or short chunk of the intended text, in order", "en": "what it means here, in English"}], "natural": "how a person from Portugal would naturally say it (identical to intended if it is already natural)", "notes": "one or two short English sentences on anything worth knowing, such as slang, an idiom or a contraction; do not mention other countries"}\nText: """${t}"""`;
  try { T.out = await askJSON(prompt, { modelTier: "default" }); } catch (e) { toast(aiErr(e)); }
  T.busy = false;
  const o = T.out;
  if (o && !en && spoken && o.intended) T.speech = analyseSpeech([String(o.intended)], [t]);
  if (o) { S.stats.chats++; save(); }
  render(); const ti = $("#trin"); if (ti) ti.value = t;
  if (o && en && o.pt && (spoken || S.settings.autoplay)) speak(String(o.pt));
  if (T.speech && !T.speech.perfect) {
    try { T.tip = await pronunciationTip(T.speech.target, T.speech); } catch (e) { T.tip = ""; }
    if (T.out === o) render();
  }
}
function chatAsk() {
  return `<section class="card stack"><h2>Ask a grammar question</h2>
    <p class="muted small" style="margin:0">Ask anything: "When do I use ser vs estar?", "Why chamo-me and not me chamo?"</p>
    <textarea id="askin" rows="2" placeholder="Your question"></textarea>
    <button class="btn" data-a="askgo" ${CH.askBusy ? "disabled" : ""}>${CH.askBusy ? "Thinking…" : "Ask"}</button></section>
    ${CH.asks.map(a => `<section class="card stack"><b>${esc(a.q)}</b><div id="${a.id}">${a.a ? richText(a.a) : '<span class="typing">…</span>'}</div></section>`).join("")}`;
}

/* ---------- Verbs ---------- */
const VB = { view: "table", verb: "ser", filter: "", sort: "rank", tenses: { pres: true, perf: true, imp: false }, set: "all", q: null, fb: null, run: 0 };
const VSOURCE = `Ranked by how often each verb appears in a 16-million-word corpus of European Portuguese (newspapers, 186 works of Portuguese literature, books and speech) from the Centro de Linguística da Universidade de Lisboa.`;
const vMastered = v => (S.vm[v] || 0) >= 3;
const rankLabel = v => VERB_RANK[v] ? `#${VERB_RANK[v]}` : "everyday";
function screenVerbs() {
  const seg = `<div class="seg" role="group"><button data-a="vview" data-v="table" aria-pressed="${VB.view === "table"}">Conjugation tables</button><button data-a="vview" data-v="drill" aria-pressed="${VB.view === "drill"}">Drill</button></div>`;
  return seg + (VB.view === "table" ? verbTable() : verbDrill());
}
function verbTable() {
  const f = VB.filter.trim().toLowerCase();
  let list = VERB_LIST.filter(v => !f || strip(v).includes(strip(f)) || (VERB_EN[v] || "").includes(f));
  if (VB.sort === "az") list = list.slice().sort((a, b) => a.localeCompare(b, "pt"));
  const c = conjugate(VB.verb), r = VERB_RANK[VB.verb];
  return `<section class="card stack">
    <input type="text" id="vfilter" placeholder="Find a verb (Portuguese or English)" value="${esc(VB.filter)}" aria-label="Find a verb">
    <div class="row" style="justify-content:space-between"><div class="seg" role="group" aria-label="Sort"><button data-a="vsort" data-s="rank" aria-pressed="${VB.sort === "rank"}">Most used</button><button data-a="vsort" data-s="az" aria-pressed="${VB.sort === "az"}">A–Z</button></div><span class="small muted">${list.length} verbs</span></div>
    <div class="seg scroll">${list.map(v => `<button data-a="verb" data-v="${esc(v)}" aria-pressed="${VB.verb === v}"><span class="small muted num">${VERB_RANK[v] || "·"}</span> <span lang="pt-PT">${esc(v)}</span>${vMastered(v) ? " ✓" : ""}</button>`).join("")}</div></section>
  <section class="card stack">
    <div class="row"><h2 lang="pt-PT" style="flex:1">${esc(VB.verb)}</h2>${speakBtn(VB.verb)}</div>
    <div class="muted">${esc(c.en)} · ${verbKind(VB.verb)}</div>
    <div class="small">${r ? `<span class="chip sun num">#${r} most used</span> <span class="muted num">${VERB_COUNT[VB.verb].toLocaleString("en-GB")} times in the corpus</span>` : `<span class="chip">Everyday verb</span> <span class="muted">outside the top ${VERB_FREQ.length}</span>`}</div>
    <div class="scrollx"><table class="tbl"><tr><th></th>${Object.values(TENSES).map(t => `<th>${t}</th>`).join("")}</tr>
    ${PERSONS.map((p, i) => `<tr><td class="muted">${p}</td>${Object.keys(TENSES).map(t => `<td><span class="verb-cell"><span lang="pt-PT" class="pt">${esc(c[t][i])}</span><button data-a="say" data-t="${esc(p.split(" ")[0] + " " + c[t][i])}" aria-label="Play">${ICON.speak}</button></span></td>`).join("")}</tr>`).join("")}
    </table></div>
    <p class="small muted" style="margin:0">"ele / ela" also covers <b>você</b>, "eles / elas" covers <b>vocês</b>. The past tense has <b>-ámos</b> (falámos), the present <b>-amos</b> (falamos).${VB.verb === "haver" ? " Haver is mostly used as <b>há</b> = there is / there are." : ""}</p>
    <button class="btn ghost" data-a="vdrillthis">Drill this verb</button>
  </section>
  <p class="small muted">${VSOURCE}</p>`;
}
function verbPool() {
  const range = S.settings.vrange || 25;
  return VERB_FREQ.slice(0, range === "all" ? VERB_FREQ.length : range).map(v => v[0])
    .filter(v => VB.set === "all" || (VB.set === "irr" ? verbKind(v) !== "regular" : verbKind(v) === "regular"));
}
function newVerbQ() {
  let pool = VB.only ? [VB.only] : verbPool();
  if (!pool.length) pool = ["ser"];
  if (!VB.only && (S.settings.vmode || "order") === "order") { const todo = pool.filter(v => !vMastered(v)); pool = (todo.length ? todo : pool).slice(0, 5); }
  const ts = Object.keys(VB.tenses).filter(t => VB.tenses[t]); if (!ts.length) { VB.tenses.pres = true; ts.push("pres"); }
  const v = rand(pool), t = rand(ts), p = Math.floor(Math.random() * 5);
  VB.q = { v, t, p, ans: conjugate(v)[t][p] }; VB.fb = null;
}
function verbDrill() {
  if (!VB.q) newVerbQ();
  const q = VB.q, pool = verbPool(), done = pool.filter(vMastered).length, range = S.settings.vrange || 25, mode = S.settings.vmode || "order";
  return `<section class="card stack">
    ${VB.only ? `<div class="row" style="justify-content:space-between"><span>Drilling only <b lang="pt-PT">${esc(VB.only)}</b></span><button class="btn ghost" data-a="vonlyoff">All verbs</button></div>` : `
    <b class="small">Which verbs</b>
    <div class="seg" role="group" aria-label="Range">${[[10, "Top 10"], [25, "Top 25"], [50, "Top 50"], [100, "Top 100"], ["all", `All ${VERB_FREQ.length}`]].map(([k, l]) => `<button data-a="vrange" data-r="${k}" aria-pressed="${range === k}">${l}</button>`).join("")}</div>
    <div class="seg" role="group" aria-label="Order">${[["order", "Most used first"], ["random", "Random"]].map(([k, l]) => `<button data-a="vmode" data-m="${k}" aria-pressed="${mode === k}">${l}</button>`).join("")}</div>
    <div class="seg" role="group" aria-label="Type">${[["all", "All types"], ["irr", "Irregular"], ["reg", "Regular"]].map(([k, l]) => `<button data-a="vset" data-s="${k}" aria-pressed="${VB.set === k}">${l}</button>`).join("")}</div>
    <div><div class="bar" style="height:10px"><i style="width:${pool.length ? 100 * done / pool.length : 0}%"></i></div><div class="small muted" style="margin-top:4px">${done} of ${pool.length} mastered (3 right in a row). ${mode === "order" ? "New verbs come in as you master the ones above them." : ""}</div></div>`}
    <b class="small">Tenses</b>
    <div class="seg" role="group" aria-label="Tenses">${Object.entries(TENSES).map(([k, l]) => `<button data-a="vtense" data-t="${k}" aria-pressed="${!!VB.tenses[k]}">${l}</button>`).join("")}</div>
  </section>
  <section class="card stack">
    <div class="row" style="justify-content:space-between"><span class="kind">${TENSES[q.t]}</span><span class="chip sun num">${VB.run} in a row</span></div>
    <div class="prompt"><span class="muted">${PERSONS[q.p]}</span> · <span lang="pt-PT">${esc(q.v)}</span></div>
    <div class="muted small">${esc(VERB_EN[q.v] || "")} · <span class="num">${rankLabel(q.v)}</span>${VERB_RANK[q.v] ? " most used" : ""}</div>
    <input type="text" id="vin" lang="pt-PT" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type the form" aria-label="Your answer" ${VB.fb ? "disabled" : ""}>
    ${VB.fb ? "" : accentBar("vin")}
    ${VB.fb ? `<div class="banner" style="${VB.fb.ok ? "background:var(--ok-soft)" : "background:var(--bad-soft)"};color:var(--ink)"><b>${VB.fb.ok ? "Correct!" : "Not quite."}</b> <span lang="pt-PT">${PERSONS[q.p].split(" ")[0]} <b>${esc(q.ans)}</b></span>${VB.fb.note ? `<br>${VB.fb.note}` : ""}${VB.fb.ok && vMastered(q.v) && VB.fb.newly ? `<br><b lang="pt-PT">${esc(q.v)}</b> mastered!` : ""}</div>
      <button class="btn wide" data-a="vnext">Next</button>` : `<button class="btn wide" data-a="vcheck">Check</button>`}
    <div class="small muted">Accuracy: ${S.stats.verbAns ? Math.round(100 * S.stats.verbOk / S.stats.verbAns) : 0}% of ${S.stats.verbAns}</div>
  </section>`;
}

/* ---------- Mais ---------- */
let MORE = "menu", DLG = null;
function screenMore() {
  if (MORE === "listen") return listenScreen();
  if (MORE === "dialogue") return dialogueScreen();
  if (MORE === "sounds") return soundsScreen();
  if (MORE === "progress") return progressScreen();
  if (MORE === "settings") return settingsScreen();
  if (MORE === "about") return aboutScreen();
  const items = [["listen", "Dialogues", "Real situations in Portugal with transcripts and translations"], ["sounds", "Pronunciation", "The sounds that make Portugal Portuguese different"], ["progress", "Progress", "Streak, XP history, accuracy"], ["settings", "Settings", "AI tutor, voice, speed, daily goal"], ["about", "What's included", "The premium features from other apps, here for free"]];
  const acct = !CLOUD_READY ? "" : USER
    ? `<section class="card row">${USER.photo ? `<img src="${esc(USER.photo)}" alt="" width="44" height="44" style="border-radius:50%" referrerpolicy="no-referrer">` : ""}<div style="flex:1;min-width:0"><b>${esc(USER.name || "Signed in")}</b><div class="small muted" style="overflow:hidden;text-overflow:ellipsis">${esc(USER.email)}</div></div><button class="btn ghost" data-a="signout">Sign out</button></section>`
    : `<section class="card stack"><b>Your account</b><div class="small muted">${syncText()}</div>${googleBtn()}</section>`;
  return `${acct}<section class="stack">${items.map(([id, t, d]) => `<button class="card" style="text-align:left" data-a="more" data-m="${id}"><h3>${t}</h3><div class="muted small">${d}</div></button>`).join("")}</section>`;
}
const backBtn = () => `<button class="btn ghost" data-a="more" data-m="menu" style="align-self:flex-start">${ICON.back.replace("<svg", '<svg width="16" height="16" style="vertical-align:-3px"')} More</button>`;
function allDialogues() { return [...DIALOGUES, ...S.gen]; }
function listenScreen() {
  return `${backBtn()}<h2>Dialogues</h2>
  ${allDialogues().map(d => `<button class="card" style="text-align:left" data-a="dlg" data-id="${esc(d.id)}"><h3>${esc(d.en)}</h3><div class="muted small"><span lang="pt-PT">${esc(d.title)}</span> · ${d.lines.length} lines${d.gen ? " · made by the tutor" : ""}</div></button>`).join("")}
  ${AI ? `<section class="card stack"><h3>Make a new dialogue</h3><input type="text" id="gtopic" placeholder="Topic, e.g. at the hairdresser, at the beach in Algarve"><div class="row" style="justify-content:space-between">${levelSeg()}<button class="btn" data-a="gendlg" ${GEN_BUSY ? "disabled" : ""}>${GEN_BUSY ? "Writing…" : "Create"}</button></div></section>` : ""}`;
}
let GEN_BUSY = false, PLAYING = false;
function dialogueScreen() {
  const d = DLG.d;
  return `<button class="btn ghost" data-a="more" data-m="listen" style="align-self:flex-start">${ICON.back.replace("<svg", '<svg width="16" height="16" style="vertical-align:-3px"')} Dialogues</button>
  <section class="card stack"><div class="row"><div style="flex:1"><h2 lang="pt-PT">${esc(d.title)}</h2><div class="muted small">${esc(d.en)}</div></div>
    <button class="icon-btn big" data-a="playall" aria-label="${PLAYING ? "Stop" : "Play all"}">${PLAYING ? ICON.stop : ICON.play}</button></div>
    <div class="seg"><button data-a="dlgtr" aria-pressed="${DLG.tr}">Show English</button><button data-a="dlghide" aria-pressed="${DLG.hide}">Hide Portuguese (listening test)</button></div>
    ${d.lines.map((l, i) => `<div class="row" style="align-items:flex-start;${DLG.cur === i ? "background:var(--tile-soft);border-radius:10px;" : ""}padding:6px">
      <button class="icon-btn" data-a="sayline" data-i="${i}" aria-label="Play line">${ICON.speak}</button>
      <div><div class="small muted">${esc(l[0])}</div><div lang="pt-PT" class="pt">${DLG.hide ? "• • •" : esc(l[1])}</div>${DLG.tr ? `<div class="small muted">${esc(l[2])}</div>` : ""}</div></div>`).join("")}
  </section>
  <section class="card stack"><h3>Did you understand?</h3>
    ${d.q.map((q, qi) => `<div class="stack" style="gap:6px"><b>${esc(q.q)}</b><div class="opts">${q.o.map((o, oi) => { const pick = DLG.ans[qi]; const cls = pick == null ? "" : oi === q.a ? "right" : pick === oi ? "miss" : ""; return `<button class="opt ${cls}" data-a="dlgq" data-q="${qi}" data-o="${oi}" ${pick != null ? "disabled" : ""}>${esc(o)}</button>`; }).join("")}</div></div>`).join("")}
  </section>`;
}
function voicesForDialogue(d) {
  const names = [...new Set(d.lines.map(l => l[0]))];
  const map = {};
  names.forEach((n, i) => { map[n] = { voice: VOICES.length > 1 ? VOICES[i % VOICES.length] : VOICE, pitch: VOICES.length > 1 ? 1 : (i % 2 ? 0.8 : 1.15) }; });
  return map;
}
async function playAll() {
  if (PLAYING) { PLAYING = false; speechSynthesis.cancel(); DLG.cur = -1; render(); return; }
  if (!hasVoice()) { speak(""); return; }
  PLAYING = true; speechSynthesis.cancel(); render();
  const vm = voicesForDialogue(DLG.d);
  for (let i = 0; i < DLG.d.lines.length && PLAYING; i++) {
    DLG.cur = i; render();
    const l = DLG.d.lines[i];
    await speak(l[1], { queue: true, voice: vm[l[0]].voice, pitch: vm[l[0]].pitch });
    await new Promise(r => setTimeout(r, 350));
  }
  PLAYING = false; DLG.cur = -1; render();
}
function soundsScreen() {
  return `${backBtn()}<h2>Pronunciation</h2>${voiceBanner()}
  ${SOUNDS.map(s => `<section class="card stack"><h3>${esc(s.t)}</h3><p style="margin:0">${esc(s.d)}</p><div class="small muted">${esc(s.hint)}</div>
  <div class="row wrap">${s.ex.map(w => `<button class="btn ghost" data-a="say" data-t="${esc(w)}" lang="pt-PT">${esc(w)}</button><button class="icon-btn" data-a="say" data-slow="1" data-t="${esc(w)}" aria-label="Play ${esc(w)} slowly">${ICON.slow}</button>`).join("")}</div></section>`).join("")}`;
}
function progressScreen() {
  const days = []; for (let i = 13; i >= 0; i--) { const d = new Date(Date.now() - i * DAY); days.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`); }
  const vals = days.map(d => S.days[d] || 0), max = Math.max(S.settings.goal, ...vals);
  const keys = Object.keys(S.cards).filter(getItem);
  const stat = (n, l) => `<div class="card" style="padding:12px"><b class="num" style="font-family:var(--display);font-size:1.5rem">${n}</b><div class="small muted">${l}</div></div>`;
  return `${backBtn()}<h2>Progress</h2>
  <div class="grid2">${stat(currentStreak(), "day streak")}${stat(S.xp, "total XP")}${stat(keys.length, "words & phrases met")}${stat(S.stats.ans ? Math.round(100 * S.stats.ok / S.stats.ans) + "%" : "–", "lesson accuracy")}${stat(S.stats.lessons, "lessons finished")}${stat(S.stats.chats, "messages to the tutor")}</div>
  <section class="card stack"><h3>XP, last 14 days</h3>
    <div class="bars" role="img" aria-label="XP per day for the last 14 days">${vals.map((v, i) => `<div class="${i === 13 ? "today" : ""}" style="height:${Math.round(100 * v / max)}%" title="${days[i]}: ${v} XP"></div>`).join("")}</div>
    <div class="bars-l">${days.map(d => `<span>${d.slice(8)}</span>`).join("")}</div>
    <div class="small muted">Daily goal: ${S.settings.goal} XP · busiest day: ${Math.max(...vals)} XP</div></section>
  <section class="card"><h3>Units</h3><table class="tbl">${UNITS.map((u, i) => `<tr><td>${i + 1}. <span lang="pt-PT">${esc(u.pt)}</span></td><td style="text-align:right">${dots(unitLevel(u.id))}</td></tr>`).join("")}</table></section>`;
}
let RESET_ARMED = false;
function settingsScreen() {
  return `${backBtn()}<h2>Settings</h2>
  <section class="card stack"><h3>Voice (Portugal only)</h3>
    ${VOICES.length ? `<select id="voicesel" aria-label="Voice">${VOICES.map(v => `<option value="${esc(v.voiceURI)}" ${VOICE && v.voiceURI === VOICE.voiceURI ? "selected" : ""}>${esc(v.name)} (${esc(v.lang)})</option>`).join("")}</select>
      <button class="btn ghost" data-a="say" data-t="Olá! Bom dia. Queria um pastel de nata e uma bica, por favor.">Test voice</button>` : voiceBanner() || `<p class="muted">Looking for voices…</p>`}
    <div class="small muted">Only Portugal voices are used.</div>
    ${sysMode() ? `<div class="small">Using your device's own Portugal voice (the app can't list it). <button class="btn ghost" data-a="sysoff">Turn off</button></div>` : ""}
    <details><summary class="small">What voices can this page see?</summary><div class="small muted">${ALL_VOICES.length} voices in total.${PT_SEEN.length ? " Portuguese: " + PT_SEEN.map(v => esc(v.name) + " (" + esc(v.lang) + ")" + (isPT(v) ? " ✓ Portugal" : " ✗ not Portugal")).join(", ") : " No Portuguese voices."}</div></details>
    <b class="small">Speed</b><div class="seg">${[[0.75, "Slow"], [0.9, "Relaxed"], [1, "Normal"], [1.15, "Fast"]].map(([r, l]) => `<button data-a="rate" data-r="${r}" aria-pressed="${S.settings.rate === r}">${l}</button>`).join("")}</div>
    <label class="row small"><input type="checkbox" id="autoplay" ${S.settings.autoplay ? "checked" : ""}> Play audio automatically</label>
    <label class="row small"><input type="checkbox" id="sfxon" ${S.settings.sfx !== false ? "checked" : ""}> Sound effects for right and wrong answers</label></section>
  <section class="card stack"><h3>AI tutor</h3>
    <div class="small muted">Powers Chat, the translator, grammar help, "explain my answer" and sentence checks.</div>
    <div class="stack" style="gap:8px">${Object.entries(PROVIDERS).map(([k, p]) => `<label class="row small" style="align-items:flex-start"><input type="radio" name="aiprov" value="${k}" ${AIC.provider === k ? "checked" : ""} style="margin-top:4px"><span><b>${p.label}</b><br><span class="muted">${p.sub}</span></span></label>`).join("")}
      <div class="row small muted" style="align-items:flex-start"><input type="radio" disabled style="margin-top:4px"><span><b>Sign in with ChatGPT</b><br>Coming once OpenAI approves the app.</span></div></div>
    ${AIC.provider === "builtin" ? `<div class="small">${aiState() === "ok" ? `Today: ${(S.aiDay && S.aiDay.d === today() ? S.aiDay.n : 0)} of ${DAILY_LIMIT} free messages used.` : aiState() === "signin" ? "Sign in with Google to use it." : "Not set up on this copy of Pois."}</div>${aiState() === "signin" ? googleBtn() : ""}`
      : `<label class="field">API key<input type="password" id="aikey" autocomplete="off" value="${esc(AIC.keys[AIC.provider] || "")}" placeholder="Paste your key"></label>
      <label class="field">Model<input type="text" id="aimodel" autocomplete="off" value="${esc(AIC.models[AIC.provider] || "")}" placeholder="${esc(PROVIDERS[AIC.provider].model)}"></label>
      <div class="small muted">Your key is stored only on this device and sent only to ${PROVIDERS[AIC.provider].co}. Get one at <a href="${PROVIDERS[AIC.provider].url}" target="_blank" rel="noopener">${PROVIDERS[AIC.provider].url.replace("https://", "")}</a>.</div>`}
    <button class="btn ghost" data-a="aitest" ${AI ? "" : "disabled"}>Test the tutor</button>
  </section>
  <section class="card stack"><h3>Daily goal</h3><div class="seg">${[[10, "Casual"], [20, "Regular"], [30, "Serious"], [50, "Intense"]].map(([g, l]) => `<button data-a="goal" data-g="${g}" aria-pressed="${S.settings.goal === g}">${l} · ${g} XP</button>`).join("")}</div></section>
  <section class="card stack"><h3>Flashcards show first</h3><div class="seg">${[["mix", "Mixed"], ["pt", "Portuguese"], ["en", "English"]].map(([k, l]) => `<button data-a="dir" data-d="${k}" aria-pressed="${S.settings.dir === k}">${l}</button>`).join("")}</div></section>
  <section class="card stack"><h3>Your progress</h3>
    <div class="small">${syncText()}</div>${USER ? `<button class="btn ghost" data-a="signout">Sign out</button>` : googleBtn()}
    <div class="grid2"><button class="btn ghost" data-a="export">Copy backup</button><button class="btn ghost" data-a="importshow">Restore backup</button></div>
    <div id="importbox" hidden><textarea id="importtxt" rows="3" placeholder="Paste your backup here"></textarea><button class="btn" data-a="import">Restore</button></div>
    <div class="row small" style="justify-content:space-between"><span class="muted">App version <span id="appver" class="num">${esc((APP_VERSION || "").replace("pois-", "") || "…")}</span></span><button class="btn ghost" data-a="checkupdate">Check for updates</button></div>
    <button class="btn ${RESET_ARMED ? "bad" : "ghost"}" data-a="reset">${RESET_ARMED ? "Tap again to erase all progress" : "Reset progress"}</button></section>`;
}
function aboutScreen() {
  const rows = [
    ["Unlimited lessons, no hearts, no ads", "Duolingo Super, Memrise Pro", "Every unit open from day one"],
    ["Mistakes review & personalised practice", "Duolingo Super, Busuu Premium Plus (Mistake Repair)", "Review › Fix mistakes / Personalised"],
    ["Explain my answer", "Duolingo Max (now free there too)", "Button after any wrong answer"],
    ["AI conversation partner", "Duolingo Max (Video Call), Busuu Premium Plus, Memrise Pro", "Chat › Free chat"],
    ["Roleplay scenarios with feedback", "Duolingo Max, Memrise Role Play Buddy", "Chat › Roleplay, 8 Portugal scenarios"],
    ["Spaced-repetition review", "Babbel Review Manager, Practice Portuguese Smart Review", "Review › Flashcards & quiz"],
    ["Speaking practice", "Babbel, Busuu, Memrise", "Hands-free speaking with word-by-word pronunciation feedback"],
    ["Verb conjugation trainer", "Practice Portuguese Verbs, Memrise Conjugation Buddy", `Verbs: ${VERB_LIST.length} verbs, 3 tenses`],
    ["Translator that saves to review", "Practice Portuguese, Memrise Translator Buddy", "Chat › Translator"],
    ["Dialogues with transcripts & translations", "Practice Portuguese Premium", "More › Dialogues, plus unlimited new ones"],
    ["Grammar tips & cultural notes", "Babbel, Busuu", "Study cards in every unit"],
    ["Streak freezes", "Duolingo Super", "Earned every 7 days, hold up to 2"],
    ["Accounts & sync across devices", "All paid apps", "Sign in with Google"]
  ];
  return `${backBtn()}<h2>What's included</h2>
  <section class="card scrollx"><table class="tbl"><tr><th>Feature</th><th>Paid in</th><th>Here</th></tr>${rows.map(r => `<tr><td class="pt">${r[0]}</td><td class="small muted">${r[1]}</td><td class="small">${r[2]}</td></tr>`).join("")}</table></section>
  <section class="card stack"><h3>What it can't match</h3>
  <p style="margin:0" class="small">Recordings and videos of real native speakers (Practice Portuguese, Memrise, Pimsleur): audio here comes from your device's Portugal voice. Live human tutors and official certificates (Babbel Live, Busuu). The AI tutor needs a connection; lessons, review and verbs work offline.</p>
  <p style="margin:0" class="small">Good free companions with real Portugal audio: the free episodes on practiceportuguese.com and RTP Play (Portuguese TV).</p></section>`;
}

/* ================= Overlays: lesson, study, flashcards ================= */
let L = null, ST = null, FL = null;
function closeOverlay() { L = ST = FL = W = null; if (HAS_TTS) speechSynthesis.cancel(); $("#ov").hidden = true; $("#ov").innerHTML = ""; render(); if (S.pendingBadge) showMilestone(); }
function showMilestone() {
  const n = S.pendingBadge; delete S.pendingBadge; save();
  const t = LADDER_TIERS.find(x => x.n === n); if (!t) return;
  const nextT = LADDER_TIERS.find(x => x.n > n);
  const ov = $("#ov"); ov.hidden = false; sfx("badge");
  ov.innerHTML = `<div class="obody milestone" style="justify-content:center;align-items:center;text-align:center">
    <div class="confetti" aria-hidden="true">${Array.from({ length: 28 }, (_, i) => `<i style="--i:${i};left:${Math.random() * 100}%;animation-delay:${(-Math.random() * 2.6).toFixed(2)}s;animation-duration:${(2.2 + Math.random() * 1.6).toFixed(2)}s"></i>`).join("")}</div>
    <div class="medal" aria-hidden="true">${t.badge}</div>
    <div class="kind">Milestone · ${n.toLocaleString("en-GB")} words</div>
    <h1 style="font-size:2rem">${esc(t.name)} achieved!</h1>
    <p style="max-width:340px">${esc(t.blurb)}</p>
    ${nextT ? `<p class="small muted" style="max-width:340px">Your library has grown: ${(nextT.n - n) / SHELF} new bookshelves are waiting for the next ${(nextT.n - n).toLocaleString("en-GB")} words, on the way to <b>${esc(nextT.name)}</b>.</p>` : `<p class="small muted">You've filled the whole library. Parabéns!</p>`}
  </div>
  <div class="ofoot"><button class="btn sun wide" data-a="libgo">Open my library</button></div>`;
}

function chooseType(it, level) {
  const words = it.pt.split(/\s+/).length;
  const isPhrase = it.kind === "p" && words >= 2;
  let pool;
  if (level <= 0) pool = isPhrase ? ["pt2en", "en2pt", "build", "listen"] : ["pt2en", "en2pt", "listen"];
  else if (level === 1) pool = isPhrase ? ["build", "build", "listenType", "pt2en"] : ["en2pt", "listen", "type", "pt2en"];
  else pool = isPhrase ? ["build", "type", "listenType", "speak"] : ["type", "listenType", "speak", "en2pt"];
  if (!hasVoice()) pool = pool.map(t => t === "listen" ? "pt2en" : t === "listenType" ? "type" : t);
  return { type: rand(pool), item: it };
}
function makeLesson(keys, level, n = 12) {
  const items = shuffle(keys.map(getItem).filter(Boolean)).slice(0, n);
  const ex = items.map(it => chooseType(it, level));
  const forMatch = items.filter(i => i.pt.length <= 28);
  if (forMatch.length >= 5) ex.splice(Math.min(3, ex.length), 0, { type: "match", items: shuffle(forMatch).slice(0, 5) });
  return ex;
}

/* ---------- In-progress lesson: saved on this device so closing or refreshing doesn't lose it ---------- */
const LKEY = "pois.lesson.v1";
function saveLessonProgress() {
  if (!L || L.state === "end") return;
  const i = L.state === "fb" ? L.i + 1 : L.i;
  if (i >= L.ex.length) return;
  try {
    localStorage.setItem(LKEY, JSON.stringify({ t: Date.now(), uid: S.uid || "", i, opts: L.opts, first: L.first, firstOk: L.firstOk, lc0: L.lc0,
      ex: L.ex.map(e => ({ type: e.type, key: e.item ? e.item.key : null, keys: e.items ? e.items.map(x => x.key) : null, retry: !!e.retry, opts: e.opts || null })) }));
  } catch (e) {}
}
function clearLessonProgress() { try { localStorage.removeItem(LKEY); } catch (e) {} }
function savedLesson() {
  try {
    const d = JSON.parse(localStorage.getItem(LKEY) || "null");
    if (!d || Date.now() - d.t > 7 * DAY || (d.uid && S.uid && d.uid !== S.uid)) return null;
    const ex = d.ex.map(e => e.type === "match" ? (e.keys && e.keys.every(getItem) ? { type: "match", items: e.keys.map(getItem) } : null)
      : getItem(e.key) ? { type: e.type, item: getItem(e.key), retry: e.retry || undefined, opts: e.opts || undefined } : null);
    if (ex.some(x => !x) || d.i >= ex.length) return null;
    return { ...d, ex };
  } catch (e) { return null; }
}
function resumeLesson() {
  const d = savedLesson(); if (!d) { clearLessonProgress(); return false; }
  ST = null;
  L = { ex: d.ex, i: d.i, opts: d.opts, first: d.first, firstOk: d.firstOk, state: "ask", lc0: d.lc0 ?? learnedCount() };
  prepEx(); renderLesson(true); return true;
}
const savedLessonLabel = d => { const u = d.opts.unit && unitById(d.opts.unit); return d.opts.wotd ? "Word of the Day" : d.opts.kind ? d.opts.kind : u ? (u.ladder != null ? u.en : u.pt) : "Lesson"; };

function startLesson(keys, opts = {}) {
  const level = opts.level ?? 0;
  const ex = makeLesson(keys, level, opts.n || 12);
  if (!ex.length) { toast("Nothing to practise yet. Start a unit first."); return; }
  L = { ex, i: 0, opts: { ...opts, level }, first: 0, firstOk: 0, state: "ask", lc0: learnedCount() };
  prepEx(); renderLesson(true); saveLessonProgress();
}
function distractors(it, field, n = 3) {
  const all = Object.values(ITEMS);
  const bad = new Set([norm(it[field]), ...(it.alt || []).map(norm)]);
  const pool = shuffle(all.filter(x => x.unit === it.unit && x.key !== it.key)).concat(shuffle(all.filter(x => x.unit !== it.unit && x.kind === it.kind)));
  const out = [];
  const me = norm(it[field]);
  for (const x of pool) { if (out.length >= n) break; const v = x[field], nv = norm(v); if (bad.has(nv) || nv.includes(me) || me.includes(nv) || out.some(o => norm(o) === nv)) continue; out.push(v); }
  return out;
}
function prepEx() {
  const e = L.ex[L.i]; L.state = "ask"; L.sel = null; L.fb = null; L.text = ""; L.sp = null; stopListening();
  if (e.type === "cloze") e.opts = e.opts || shuffle([e.item.form, ...shuffle([...new Set(Object.values(ITEMS).filter(x => x.form && strip(x.form) !== strip(e.item.form)).map(x => x.form))]).slice(0, 3)]);
  if (e.type === "pt2en") e.opts = e.opts || shuffle([e.item.en, ...distractors(e.item, "en")]);
  if (e.type === "en2pt" || e.type === "listen") e.opts = e.opts || shuffle([e.item.pt, ...distractors(e.item, "pt")]);
  if (e.type === "build") {
    const toks = e.item.pt.replace(/[.,!?]/g, "").split(/\s+/);
    const extra = shuffle([...new Set(Object.values(ITEMS).filter(x => x.kind === "p" && x.key !== e.item.key).flatMap(x => x.pt.replace(/[.,!?]/g, "").split(/\s+/)))].filter(w => !toks.some(t => norm(t) === norm(w)))).slice(0, 3);
    e.bank = shuffle([...toks, ...extra]).map((t, i) => ({ t, i })); L.built = [];
  }
  if (e.type === "match") { L.m = { left: shuffle(e.items), right: shuffle(e.items), done: new Set(), l: null, r: null, errs: 0, flash: null }; }
}
function exBody(e) {
  const it = e.item;
  const opts = (list, lang) => `<div class="opts">${list.map((o, i) => {
    let cls = ""; if (L.state === "fb") { const right = e.type === "pt2en" ? o === it.en : e.type === "cloze" ? o === it.form : o === it.pt; if (right) cls = "right"; else if (L.sel === i) cls = "miss"; }
    return `<button class="opt ${cls}" data-a="opt" data-i="${i}" aria-pressed="${L.sel === i}" ${lang ? 'lang="pt-PT"' : ""} ${L.state === "fb" ? "disabled" : ""}>${esc(o)}</button>`; }).join("")}</div>`;
  const input = (ph) => `<textarea id="ans" rows="2" lang="pt-PT" autocapitalize="off" spellcheck="false" placeholder="${ph}" aria-label="Your answer" ${L.state === "fb" ? "disabled" : ""}>${esc(L.text)}</textarea>${L.state === "fb" ? "" : accentBar("ans")}`;
  switch (e.type) {
    case "cloze": { const k = it.pt.indexOf(it.form); return `<div class="kind">Fill the gap</div><div class="prompt" lang="pt-PT">${esc(it.pt.slice(0, k))}<span class="gap">${L.state === "fb" ? esc(it.form) : "&nbsp;"}</span>${esc(it.pt.slice(k + it.form.length))}</div><div class="muted">${esc(it.en)}</div>${opts(e.opts, true)}`; }
    case "pt2en": return `<div class="kind">Translate</div><div class="hear">${speakBtn(it.pt)}<div class="prompt" lang="pt-PT">${esc(it.pt)}</div></div>${opts(e.opts)}`;
    case "en2pt": return `<div class="kind">How do you say…</div><div class="prompt">${esc(it.en)}</div>${opts(e.opts, true)}`;
    case "listen": return `<div class="kind">Listen and choose</div><div class="hear"><button class="icon-btn big" data-a="say" data-t="${esc(it.pt)}" aria-label="Play">${ICON.speak}</button>${speakBtn(it.pt, true)}</div>${opts(e.opts, true)}`;
    case "listenType": return `<div class="kind">Type what you hear</div><div class="hear"><button class="icon-btn big" data-a="say" data-t="${esc(it.pt)}" aria-label="Play">${ICON.speak}</button>${speakBtn(it.pt, true)}</div>${input("Write in Portuguese")}`;
    case "type": return `<div class="kind">Write in Portuguese (Portugal)</div><div class="prompt">${esc(it.en)}</div>${input("Write in Portuguese")}`;
    case "build": return `<div class="kind">Build the sentence</div><div class="prompt">${esc(it.en)}</div>
      <div class="bank answer-line" aria-label="Your sentence">${L.built.map(bi => `<button class="tok" data-a="unbuild" data-i="${bi}" lang="pt-PT" ${L.state === "fb" ? "disabled" : ""}>${esc(e.bank[bi].t)}</button>`).join("")}</div>
      <div class="bank">${e.bank.map((b, i) => `<button class="tok ${L.built.includes(i) ? "used" : ""}" data-a="build" data-i="${i}" lang="pt-PT" ${L.state === "fb" ? "disabled" : ""}>${esc(b.t)}</button>`).join("")}</div>`;
    case "speak": {
      const sp = L.sp || (L.sp = { phase: "idle", interim: "", tries: 0 });
      const head = `<div class="kind">Say it out loud</div><div class="hear">${speakBtn(it.pt)}${speakBtn(it.pt, true)}<div><div class="prompt" lang="pt-PT">${esc(it.pt)}</div><div class="muted">${esc(it.en)}</div></div></div>`;
      if (!canListen()) return head + `<div class="banner info small">Hands-free speaking needs Chrome or Safari. For now, tap your keyboard's mic and say it.</div>
        <textarea id="ans" rows="2" lang="pt-PT" placeholder="Say it with your keyboard's mic" aria-label="What you said" ${L.state === "fb" ? "disabled" : ""}>${esc(L.text)}</textarea>
        ${L.state === "fb" ? "" : `<button class="btn ghost" data-a="skipspeak">Can't speak now</button>`}`;
      const on = sp.phase === "listening";
      return head + `<div class="mic-zone">
        <button class="mic-big ${on ? "on" : ""}" data-a="spk" aria-label="${on ? "Listening. Tap to stop" : "Tap and speak"}">${ICON.mic}</button>
        <div class="mic-hint">${on ? "Listening… say the sentence. It stops when you finish." : sp.phase === "processing" ? "Checking…" : L.state === "fb" ? "Tap the mic to try again" : "Tap the mic and say the sentence"}</div>
        <div class="interim" id="interim" lang="pt-PT">${esc(sp.interim || "")}</div>
      </div>
      ${L.state === "fb" || on ? "" : `<button class="btn ghost" data-a="skipspeak">Can't speak now</button>`}`;
    }
    case "match": { const m = L.m; const btn = (it2, side) => { const sel = side === "l" ? m.l : m.r; const gone = m.done.has(it2.key); const fl = m.flash && m.flash.includes(side + it2.key); return `<button class="opt ${gone ? "gone" : ""} ${fl ? "miss" : ""}" data-a="match" data-side="${side}" data-k="${esc(it2.key)}" aria-pressed="${sel === it2.key}" ${side === "l" ? 'lang="pt-PT"' : ""}>${esc(side === "l" ? it2.pt : it2.en)}</button>`; };
      return `<div class="kind">Match the pairs</div><div class="pairs"><div class="col">${m.left.map(x => btn(x, "l")).join("")}</div><div class="col">${m.right.map(x => btn(x, "r")).join("")}</div></div>`; }
  }
  return "";
}
function canCheck(e) {
  if (["pt2en", "en2pt", "listen", "cloze"].includes(e.type)) return L.sel != null;
  if (e.type === "build") return L.built.length > 0;
  if (e.type === "match") return false;
  return L.text.trim().length > 0;
}
const PRAISE = [["Muito bem!", "Well done"], ["Excelente!", "Excellent"], ["Isso mesmo!", "That's it"], ["Boa!", "Nice"], ["Perfeito!", "Perfect"]];
const praise = () => { const [pt, en] = rand(PRAISE); return `<span lang="pt-PT">${pt}</span> <span class="praise-en">${en}</span>`; };
function renderLesson(autoplay) {
  const ov = $("#ov"); ov.hidden = false;
  if (L.state === "end") {
    const r = L.result;
    ov.innerHTML = `<div class="obody" style="justify-content:center;text-align:center;align-items:center">
      <h1 style="font-size:2rem">Lesson complete!</h1>
      <div class="grid2" style="width:100%;max-width:360px"><div class="card"><b class="num" style="font-family:var(--display);font-size:1.8rem;color:var(--sun)">+${r.xp}</b><div class="small muted">XP</div></div><div class="card"><b class="num" style="font-family:var(--display);font-size:1.8rem">${Math.round(r.acc * 100)}%</b><div class="small muted">first-try accuracy</div></div></div>
      ${r.up ? `<div class="banner">Level up! ${esc(r.up)}</div>` : ""}
      ${r.books > 0 ? `<div class="card newbooks">${ICON.library}<div><b>${r.books} new book${r.books > 1 ? "s" : ""}</b> for your library</div></div>` : ""}
      ${r.note ? `<p class="small muted" style="max-width:340px">${esc(r.note)}</p>` : ""}
      <p class="muted">${r.acc === 1 ? "Perfect lesson. Bonus +5 XP." : "Every mistake goes into your review queue."}</p></div>
      <div class="ofoot"><button class="btn sun wide" data-a="close">Continue</button></div>`;
    return;
  }
  const e = L.ex[L.i];
  const fb = L.fb;
  ov.innerHTML = `<div class="ohead"><button class="icon-btn" data-a="close" aria-label="Quit lesson">${ICON.close}</button><div class="bar" role="progressbar" aria-valuenow="${L.i}" aria-valuemax="${L.ex.length}"><i style="width:${100 * L.i / L.ex.length}%"></i></div></div>
  <div class="obody">${exBody(e)}</div>
  <div class="ofoot ${fb ? (fb.ok ? "good" : "wrong") : ""}">
    ${fb && fb.speech ? `<h3>${fb.speech.perfect ? praise() : fb.ok ? `Nearly perfect <span class="praise-en">${Math.round(fb.speech.score * 100)}%</span>` : "Not quite. Listen and try again"}</h3>
      ${speechResultHTML(fb.speech)}
      ${fb.tip ? `<div class="tip">${richText(fb.tip)}</div>` : fb.tipBusy ? `<div class="small muted">Getting a pronunciation tip…</div>` : ""}
      ${fb.firstTryMissed && fb.ok ? `<div class="small muted">Got it on try ${L.sp.tries}. It still goes into your review queue.</div>` : ""}
      <div class="grid2"><button class="btn ghost" data-a="spk">Try again</button><button class="btn ${fb.ok ? "ok" : "bad"}" data-a="next">Continue</button></div>`
    : fb ? `<h3>${fb.ok ? praise() : fb.skip ? "Skipped" : "Correct answer:"}</h3>
      ${!fb.ok || fb.shown ? `<div class="row"><div><div class="pt" lang="pt-PT">${esc(e.item ? e.item.pt : "")}</div><div class="small">${esc(e.item ? e.item.en : "")}</div></div>${e.item ? speakBtn(e.item.pt) : ""}</div>` : ""}
      ${fb.note ? `<div class="small">${fb.note}</div>` : ""}
      ${e.item && e.item.tip ? `<div class="tip">${esc(e.item.tip)}</div>` : ""}
      ${!fb.ok && !fb.skip && AI ? `<div id="explain">${L.explain ? `<div class="small">${richText(L.explain)}</div>` : `<button class="btn ghost" data-a="explain">Explain my answer</button>`}</div>` : ""}
      <button class="btn ${fb.ok || fb.skip ? "ok" : "bad"} wide" data-a="next">Continue</button>`
      : e.type === "match" ? `<div class="small muted">Tap a Portuguese word, then its meaning.</div>` : e.type === "speak" && canListen() ? `<div class="small muted">Speak the sentence. Pois listens, stops when you finish and checks every word.</div>` : `<button class="btn wide" data-a="check" ${canCheck(e) ? "" : "disabled"}>Check</button>`}
  </div>`;
  const ta = $("#ans"); if (ta && L.state !== "fb") { ta.addEventListener("input", () => { L.text = ta.value; const c = $("[data-a=check]"); if (c) c.disabled = !canCheck(e); }); }
  if (autoplay && S.settings.autoplay && L.state === "ask" && e.item && ["pt2en", "listen", "listenType"].includes(e.type)) speak(e.item.pt);
}
function evaluate(e) {
  const it = e.item, acc = [it.pt, ...(it.alt || [])];
  if (e.type === "pt2en") return { ok: e.opts[L.sel] === it.en };
  if (e.type === "cloze") return { ok: e.opts[L.sel] === it.form };
  if (e.type === "en2pt" || e.type === "listen") { const ok = acc.some(a => norm(a) === norm(e.opts[L.sel])); return { ok }; }
  if (e.type === "build") { const s = L.built.map(i => e.bank[i].t).join(" "); return checkPT(s, acc); }
  if (e.type === "speak") { const best = Math.max(...acc.map(a => similarity(L.text, a))); return best >= 0.75 ? { ok: true, note: best < 0.95 ? `Close! I heard: <i>${esc(L.text)}</i>` : "" } : { ok: false, note: `I heard: <i>${esc(L.text)}</i>` }; }
  if ((it.nf || []).some(f => noArt(strip(L.text)) === noArt(strip(f)))) return { ok: false, note: `In Portugal it's <b>${esc(it.pt)}</b>.` };
  const r = checkPT(L.text, acc);
  if (r.ok && r.shown && norm(r.shown) !== norm(it.pt) && !r.note) r.note = `Also correct: <b>${esc(it.pt)}</b>`;
  return r;
}
function doCheck() {
  const e = L.ex[L.i];
  const r = evaluate(e);
  L.fb = r; L.state = "fb"; L.explain = null;
  if (!e.retry) { L.first++; if (r.ok) L.firstOk++; }
  recordAnswer(e.item.key, r.ok);
  if (!r.ok && !e.retry) L.ex.push({ ...e, retry: true, opts: e.opts ? shuffle(e.opts) : undefined });
  save(); saveLessonProgress(); renderLesson();
  const d = sfx(r.ok ? "right" : "wrong");
  if (S.settings.autoplay) setTimeout(() => { if (L && L.ex[L.i] === e) speak(e.item.pt); }, d);
}
function lessonNext() {
  L.i++;
  if (L.i >= L.ex.length) return finishLesson();
  prepEx(); renderLesson(true); saveLessonProgress();
}
function finishLesson() {
  const acc = L.first ? L.firstOk / L.first : 1;
  const xp = 10 + L.firstOk + (acc === 1 ? 5 : 0);
  let up = "";
  if (L.opts.unit) {
    const u = S.units[L.opts.unit] || (S.units[L.opts.unit] = { level: 0 });
    if (acc >= 0.8 && L.opts.level >= Math.min(u.level, 2) && u.level < 3) { u.level++; { const uu = unitById(L.opts.unit); up = `${uu.ladder != null ? uu.en : uu.pt} is now level ${u.level}.`; } }
    else if (acc < 0.8) up = "";
  }
  let note = "";
  if (L.opts.wotd) { S.wotdDone[today()] = true; const ks = Object.keys(S.wotdDone).sort().slice(-60); const d = {}; ks.forEach(k => d[k] = true); S.wotdDone = d; note = "Today's word is in your review deck. Get it right again on another day and its book joins your library."; }
  S.stats.lessons++; addXP(xp);
  const books = learnedCount() - (L.lc0 ?? learnedCount());
  clearLessonProgress();
  L.state = "end"; L.result = { xp, acc, up, note, books }; renderLesson(); sfx("done");
}
async function explainAnswer() {
  const e = L.ex[L.i], it = e.item;
  const given = e.type === "build" ? L.built.map(i => e.bank[i].t).join(" ") : ["pt2en", "en2pt", "listen", "cloze"].includes(e.type) ? e.opts[L.sel] : L.text;
  const shown = e.type === "pt2en" ? it.pt : e.type === "listen" || e.type === "listenType" ? "(audio of) " + it.pt : it.en;
  const box = $("#explain"); if (box) box.innerHTML = `<div class="small typing">Thinking…</div>`;
  try {
    const prompt = `You are a patient teacher of European Portuguese.
${PT_RULES}
A learner did an exercise. Prompt shown: "${shown}". Expected answer: "${e.type === "pt2en" ? it.en : it.pt}". Learner answered: "${given}".
In 2 to 4 short sentences written in English (the learner doesn't understand Portuguese explanations yet), explain what was wrong and the rule behind the right answer. Quote Portuguese words only as examples, with their English meaning. If they used a word or form not used in Portugal, just give the Portugal one; do not mention other countries. Plain text, no headings.`;
    const r = await AI(prompt, { modelTier: "quick", onText: ({ text }) => { const b = $("#explain"); if (b) b.innerHTML = `<div class="small">${richText(text)}</div>`; } });
    L.explain = r.text; const b = $("#explain"); if (b) b.innerHTML = `<div class="small">${richText(r.text)}</div>`;
  } catch (err) { const b = $("#explain"); if (b) b.innerHTML = `<div class="small">${esc(aiErr(err))}</div>`; }
}

/* ---------- Word of the Day ---------- */
let W = null;
function wotdIndex() {
  const t = today();
  if (S.wpick && S.wpick.d === t && LW[S.wpick.i]) return S.wpick.i;
  const max = Math.min(currentTier().n, LW.length);
  const pool = LW.slice(0, max).filter(w => !isLearned(w.i));
  const frontier = (nextLadder() + 1) * LS_;
  const ahead = pool.filter(w => w.i >= frontier);
  const src = ahead.length ? ahead : pool.length ? pool : LW;
  let h = 7; for (const c of t + (USER ? USER.uid : "")) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const i = src[h % src.length].i; S.wpick = { d: t, i }; return i;
}
function wotdCard() {
  const i = wotdIndex(), w = LW[i], done = S.wotdDone[today()];
  return `<button class="card wotd-card" data-a="wotd" style="text-align:left">
    <div class="row" style="justify-content:space-between"><span class="kind">Word of the day</span>${done ? `<span class="flag">PRACTISED</span>` : `<span class="chip sun small">+XP</span>`}</div>
    <div class="row" style="gap:8px;margin-top:4px"><h2 lang="pt-PT">${esc(w.pt)}</h2></div><div class="muted">${esc(w.en)}</div></button>`;
}
let RESUMED = false; /* after a refresh, reopen a lesson you were in the middle of (once) */
function maybeWelcome() {
  if (GATE || (CLOUD_READY && !USER)) return;
  if (L || ST || FL || W) return;
  if (S.wotdSeen === today()) { const sv = savedLesson(); if (sv && Date.now() - sv.t < 30 * 60 * 1000 && !RESUMED) { RESUMED = true; resumeLesson(); } return; }
  S.wotdSeen = today(); save();
  openWotd(true);
}
function openWotd(welcome) { W = { i: wotdIndex(), welcome: !!welcome, mine: "", fb: null, busy: false, more: [], moreBusy: false }; renderWotd(); }
const greeting = () => { const h = new Date().getHours(); const [pt, en] = h < 12 ? ["Bom dia!", "Good morning"] : h < 20 ? ["Boa tarde!", "Good afternoon"] : ["Boa noite!", "Good evening"]; return `<span lang="pt-PT">${pt}</span> <span class="praise-en">${en}</span>`; };
function renderWotd() {
  const ov = $("#ov"); ov.hidden = false;
  const w = LW[W.i], done = S.wotdDone[today()], st = currentStreak(), xpToday = S.days[today()] || 0;
  const shelfNo = Math.floor(W.i / SHELF) + 1, learned = isLearned(W.i);
  const exRow = (pt, en, form) => { const k = form ? pt.indexOf(form) : -1;
    const shown = k >= 0 ? `${esc(pt.slice(0, k))}<b class="hl">${esc(form)}</b>${esc(pt.slice(k + form.length))}` : esc(pt);
    return `<div class="row" style="align-items:flex-start">${speakBtn(pt)}<div style="flex:1"><div lang="pt-PT">${shown}</div><div class="small muted">${esc(en)}</div></div><button class="icon-btn" data-a="say" data-slow="1" data-t="${esc(pt)}" aria-label="Play slowly">${ICON.slow}</button></div>`; };
  ov.innerHTML = `<div class="ohead"><button class="icon-btn" data-a="close" aria-label="Close">${ICON.close}</button><div style="flex:1"></div>${W.welcome ? `<span class="chip">${ICON.flame}<span class="num">${st}</span></span><span class="chip sun">${ICON.bolt}<span class="num">${xpToday}</span></span>` : ""}</div>
  <div class="obody">
    ${W.welcome ? `<div><h1 style="font-size:1.9rem">${greeting()}</h1><div class="small muted">${syncText()} ${st ? `${st}-day streak, keep it going.` : "Start a streak today."}</div></div>` : ""}
    <section class="card stack wotd-hero">
      <div class="kind">Word of the day · ${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</div>
      <div class="row"><div class="big-word" lang="pt-PT" style="flex:1">${esc(w.pt)}</div>${speakBtn(w.pt)}${speakBtn(w.pt, true)}</div>
      <div style="font-size:1.1rem">${esc(w.en)}</div>
      ${w.alt.length ? `<div class="small muted">Also: <span lang="pt-PT">${w.alt.map(esc).join(", ")}</span></div>` : ""}
      <div class="tip">${esc(POS_LABEL[w.pos] || w.pos)} · #${w.rank} most common word in Portugal</div>
      <div class="small muted">${learned ? `Already a book on shelf ${shelfNo} of your library.` : `Book #${W.i + 1}, on shelf ${shelfNo} of your library. Practise it today and get it right again on another day to add it.`}</div>
    </section>
    <section class="card stack"><h3>In a sentence</h3>${exRow(w.xpt, w.xen, ITEMS[`lw:${W.i}:e`].form)}
      ${W.more.map(e => exRow(e[0], e[1])).join("")}
      ${AI ? `<button class="btn ghost" data-a="wmore" ${W.moreBusy ? "disabled" : ""}>${W.moreBusy ? "Writing…" : "More examples"}</button>` : ""}</section>
    <button class="btn sun wide" data-a="wpractise">${done ? "Practise again" : "Practise this word · 6 exercises"}</button>
    ${AI ? `<section class="card stack"><h3>Use it yourself</h3><p class="small muted" style="margin:0">Write your own sentence with <b lang="pt-PT">${esc(w.pt)}</b>. The tutor checks it's natural Portugal Portuguese.</p>
      <div class="composer" style="position:static"><textarea id="wmine" rows="2" lang="pt-PT" placeholder="Write a sentence…" aria-label="Your sentence"></textarea>${canListen() ? `<button class="icon-btn ${W.listening ? "rec" : ""}" data-a="wmic" aria-label="${W.listening ? "Stop listening" : "Say your sentence"}">${ICON.mic}</button>` : ""}</div>
      <button class="btn" data-a="wcheck" ${W.busy ? "disabled" : ""}>${W.busy ? "Checking…" : "Check my sentence"}</button>
      ${W.fb ? `<div class="banner" style="background:${W.fb.ok ? "var(--ok-soft)" : "var(--bad-soft)"};color:var(--ink)"><b>${W.fb.ok ? "Well done!" : "Almost."}</b> ${W.fb.ok ? "" : `Better: <b lang="pt-PT">${esc(W.fb.corrected)}</b>`}<div class="small">${esc(W.fb.explanation || "")}</div>${W.fb.translation ? `<div class="small muted">${esc(W.fb.translation)}</div>` : ""}
        <div class="tools" style="display:flex;gap:8px;margin-top:6px"><button class="btn ghost" data-a="say" data-t="${esc(W.fb.ok ? W.fb.sentence : W.fb.corrected)}">Listen</button><button class="btn ghost" data-a="say" data-slow="1" data-t="${esc(W.fb.ok ? W.fb.sentence : W.fb.corrected)}">Slow</button></div></div>` : ""}
    </section>` : ""}
    ${W.welcome && CLOUD_READY && !USER ? `<section class="card stack"><b>Keep your progress safe</b><div class="small muted">Sign in to save your streak and words to your Google account and use Pois on any device. It also unlocks the free AI tutor.</div>${googleBtn()}</section>` : ""}
    ${W.welcome ? `<button class="btn ghost wide" data-a="close">Go to my lessons</button>` : ""}
  </div>`;
  const t = $("#wmine"); if (t) { t.value = W.mine; t.oninput = () => { W.mine = t.value; }; }
}
function startWotdPractice() {
  const i = W.i, w = ITEMS[`lw:${i}`], e = ITEMS[`lw:${i}:e`];
  const ex = [
    { type: hasVoice() ? "listen" : "pt2en", item: w },
    { type: "pt2en", item: e },
    { type: e.form ? "cloze" : hasVoice() ? "listenType" : "type", item: e.form ? e : w },
    { type: "build", item: e },
    { type: "en2pt", item: w },
    { type: canListen() ? "speak" : "type", item: canListen() ? e : w }
  ];
  W = null;
  L = { ex, i: 0, opts: { level: 1, wotd: true }, first: 0, firstOk: 0, state: "ask" };
  prepEx(); renderLesson(true);
}

/* Study cards */
function startStudy(uid) { ST = { u: unitById(uid), i: 0 }; renderStudy(); }
function renderStudy() {
  const u = ST.u, keys = unitKeys(u.id), total = keys.length + 1, ov = $("#ov"); ov.hidden = false;
  let body;
  if (ST.i === 0) body = `<div class="kind">Unit notes</div><h1>${esc(u.en)}</h1><div class="muted" lang="pt-PT">${esc(u.pt)}</div><div class="card note">${u.note}</div>`;
  else { const it = ITEMS[keys[ST.i - 1]]; body = `<div class="kind">${it.kind === "w" ? "Word" : "Phrase"} ${ST.i} of ${keys.length}</div>
    <div class="card flash"><div class="big" lang="pt-PT">${esc(it.pt)}</div><div class="row">${speakBtn(it.pt)}${speakBtn(it.pt, true)}</div><div style="font-size:1.1rem">${esc(it.en)}</div>${it.alt ? `<div class="small muted">Also: <span lang="pt-PT">${it.alt.map(esc).join(", ")}</span></div>` : ""}${it.tip ? `<div class="tip" style="text-align:left">${esc(it.tip)}</div>` : ""}</div>`;
    if (S.settings.autoplay) speak(it.pt); }
  ov.innerHTML = `<div class="ohead"><button class="icon-btn" data-a="close" aria-label="Close">${ICON.close}</button><div class="bar"><i style="width:${100 * ST.i / (total - 1)}%"></i></div></div>
  <div class="obody">${body}</div>
  <div class="ofoot"><div class="grid2"><button class="btn ghost" data-a="stprev" ${ST.i === 0 ? "disabled" : ""}>Back</button>${ST.i < total - 1 ? `<button class="btn" data-a="stnext">Next</button>` : `<button class="btn sun" data-a="practice" data-u="${u.id}">Practise now</button>`}</div></div>`;
}

/* Flashcards */
function startFlash(keys) {
  keys = shuffle(keys).slice(0, 30);
  if (!keys.length) { toast("No cards due. Nice work."); return; }
  FL = { keys, i: 0, show: false, n: 0 }; renderFlash();
}
function renderFlash() {
  const ov = $("#ov"); ov.hidden = false;
  if (FL.i >= FL.keys.length) {
    ov.innerHTML = `<div class="obody" style="justify-content:center;align-items:center;text-align:center"><h1>Review done!</h1><p class="muted">${FL.n} cards reviewed. +${FL.n} XP</p></div><div class="ofoot"><button class="btn sun wide" data-a="close">Continue</button></div>`; return;
  }
  const k = FL.keys[FL.i], it = getItem(k), c = S.cards[k] || newCard();
  if (FL.front == null) FL.front = S.settings.dir === "mix" ? (Math.random() < 0.5 ? "pt" : "en") : S.settings.dir;
  const ptFirst = FL.front === "pt";
  ov.innerHTML = `<div class="ohead"><button class="icon-btn" data-a="close" aria-label="Close">${ICON.close}</button><div class="bar"><i style="width:${100 * FL.i / FL.keys.length}%"></i></div><span class="small muted num">${FL.i + 1}/${FL.keys.length}</span></div>
  <div class="obody"><div class="card flash">
    <div class="big" ${ptFirst ? 'lang="pt-PT"' : ""}>${esc(ptFirst ? it.pt : it.en)}</div>${ptFirst ? `<div class="row">${speakBtn(it.pt)}</div>` : ""}
    ${FL.show ? `<hr style="width:60%;border:0;border-top:1px solid var(--line)"><div style="font-size:1.25rem" ${!ptFirst ? 'lang="pt-PT" class="pt"' : ""}>${esc(ptFirst ? it.en : it.pt)}</div>${!ptFirst ? `<div class="row">${speakBtn(it.pt)}</div>` : ""}${it.tip ? `<div class="tip">${esc(it.tip)}</div>` : ""}` : ""}
  </div></div>
  <div class="ofoot">${FL.show ? `<div class="grades">${[["Again", "bad", 0], ["Hard", "ghost", 1], ["Good", "", 2], ["Easy", "ok", 3]].map(([l, cls, q]) => `<button class="btn ${cls}" data-a="fgrade" data-q="${q}">${l}<small>${ivlLabel(applyGrade(c, q))}</small></button>`).join("")}</div>` : `<button class="btn wide" data-a="fshow">Show answer</button>`}</div>`;
  if (!FL.show && ptFirst && S.settings.autoplay) speak(it.pt);
  if (FL.show && !ptFirst && S.settings.autoplay) speak(it.pt);
}


/* ---------- Library ---------- */
const LIB = { c: null, sel: null, fly: [] };
function openLibrary() {
  LIB.c = null; LIB.sel = null;
  const since = S.libVisit || 0;
  LIB.fly = LW.filter(w => { const r = S.words[w.pt]; return r && r[1] && r[1] > since; }).sort((a, b) => S.words[a.pt][1] - S.words[b.pt][1]).map(w => w.i);
  LIB.firstVisit = !S.libVisit;
  S.libVisit = Date.now(); save();
  if (S.pendingBadge) setTimeout(() => { if (!L && !ST && !FL && !W) showMilestone(); }, LIB.fly.length ? Math.min(4000, 900 + LIB.fly.length * 90) : 300);
}
const SPINE_HUE = { noun: 212, verb: 4, adj: 140, adv: 268, pron: 182, prep: 328, conj: 328, art: 328, num: 45 };
const SPINE_KEY = [["noun", "Nouns"], ["verb", "Verbs"], ["adj", "Adjectives"], ["adv", "Adverbs"], ["pron", "Pronouns"], ["prep", "Little words"], ["num", "Numbers"]];
const spineH = i => 74 + ((LW[i].rank * 37) % 22);
function bookHTML(i, zoom) {
  const w = LW[i];
  if (!w) return `<i class="bk none"></i>`;
  const got = isLearned(i), gold = got && isMastered(i), fly = LIB.fly.includes(i);
  const st = `--h:${SPINE_HUE[w.pos] ?? 212};--ht:${spineH(i)}%`;
  if (!zoom) return `<i class="bk ${got ? "on" : "empty"} ${gold ? "gold" : ""} ${fly ? "fly" : ""}" data-b="${i}" style="${st}"></i>`;
  return `<button class="bk ${got ? "on" : "empty"} ${gold ? "gold" : ""} ${LIB.sel === i ? "sel" : ""}" data-a="book" data-b="${i}" style="${st}" aria-label="${got ? esc(w.pt) : `Book ${i + 1}, not learned yet`}">${got ? `<span lang="pt-PT">${esc(w.pt)}</span>` : `<span class="num">${i + 1}</span>`}</button>`;
}
function shelvesShown() { const reached = LADDER_TIERS.filter(t => S.badges[t.n]).length; return Math.min(LADDER_TIERS[LADDER_TIERS.length - 1].n / SHELF, LADDER_TIERS[Math.min(reached, LADDER_TIERS.length - 1)].n / SHELF); }
function screenLibrary() {
  const n = learnedCount(), tier = currentTier(), prevN = [0, ...LADDER_TIERS.map(t => t.n)][LADDER_TIERS.indexOf(tier)];
  const badges = `<div class="badges">${LADDER_TIERS.map(t => `<div class="badge-t ${S.badges[t.n] ? "on" : ""}" title="${esc(t.name)}"><span aria-hidden="true">${t.badge}</span><b>${esc(t.name)}</b><small>${S.badges[t.n] ? "Achieved" : `${t.n.toLocaleString("en-GB")} words`}</small></div>`).join("")}</div>`;
  if (LIB.c != null) return caseView(LIB.c);
  const cases = shelvesShown();
  const newWords = LIB.fly.map(i => LW[i].pt);
  return `<section class="stack" style="gap:6px">
    <div class="row" style="justify-content:space-between;align-items:flex-end"><h1>Library</h1><span class="num"><b style="font-size:1.4rem">${n}</b> <span class="muted">/ ${tier.n} books</span></span></div>
    <div class="bar"><i style="width:${Math.min(100, 100 * (n - prevN) / (tier.n - prevN))}%"></i></div>
    <div class="small muted">${S.badges[tier.n] ? "Every shelf is full!" : `${tier.n - n} more books to reach <b>${esc(tier.name)}</b>.`} A word becomes a book when you get it right on two different days. Gold books are words you know solidly.</div>
  </section>
  ${newWords.length ? `<div class="card newbooks">${ICON.library}<div><b>${newWords.length} new book${newWords.length > 1 ? "s" : ""}</b> since your last visit<div class="small muted" lang="pt-PT">${newWords.slice(0, 24).map(esc).join(", ")}${newWords.length > 24 ? "…" : ""}</div></div></div>`
    : LIB.firstVisit && !n ? `<div class="card newbooks">${ICON.library}<div><b>Your shelves are empty, for now.</b><div class="small muted">Do a ladder lesson today and again tomorrow, and watch the books fly in.</div></div></div>` : ""}
  ${badges}
  <section class="cases">${Array.from({ length: cases }, (_, c) => {
    const start = c * SHELF, have = LW.slice(start, start + SHELF), got = have.filter(w => isLearned(w.i)).length, ready = have.length > 0;
    if (!ready) return `<div class="case locked"><div class="case-head"><b>Shelf ${c + 1}</b><span>Coming soon</span></div><div class="planks">${Array.from({ length: 5 }, () => `<div class="plank"></div>`).join("")}</div></div>`;
    return `<button class="case ${got === SHELF ? "full" : ""}" data-a="case" data-c="${c}" aria-label="Shelf ${c + 1}: ${got} of ${SHELF} books">
      <div class="case-head"><b>Shelf ${c + 1}</b><span class="num">${got}/${SHELF}</span></div>
      <div class="planks">${Array.from({ length: 5 }, (_, p) => `<div class="plank">${Array.from({ length: 10 }, (_, b) => bookHTML(start + p * 10 + b)).join("")}</div>`).join("")}</div>
    </button>`; }).join("")}</section>
  ${cases * SHELF > LW.length ? `<p class="small muted">Shelves ${LW.length / SHELF + 1}–${cases} fill with words ${LW.length + 1}–${(cases * SHELF).toLocaleString("en-GB")}, coming in the next update.</p>` : ""}`;
}
function caseView(c) {
  const start = c * SHELF, ws = LW.slice(start, start + SHELF), got = ws.filter(w => isLearned(w.i)).length;
  const sel = LIB.sel != null ? LW[LIB.sel] : null;
  let info = "";
  if (sel) {
    const lesson = Math.floor(sel.i / LS_) + 1;
    info = isLearned(sel.i)
      ? `<section class="card stack" id="bookinfo"><div class="row"><div class="big-word" lang="pt-PT" style="flex:1;font-size:1.8rem">${esc(sel.pt)}</div>${speakBtn(sel.pt)}${speakBtn(sel.pt, true)}</div>
          <div>${esc(sel.en)}</div>${sel.alt.length ? `<div class="small muted">Also: <span lang="pt-PT">${sel.alt.map(esc).join(", ")}</span></div>` : ""}
          <div class="row" style="align-items:flex-start">${speakBtn(sel.xpt)}<div><div lang="pt-PT">${esc(sel.xpt)}</div><div class="small muted">${esc(sel.xen)}</div></div></div>
          <div class="small muted">${esc(POS_LABEL[sel.pos] || sel.pos)} · #${sel.rank} most common · learned ${new Date(S.words[sel.pt][1]).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}${isMastered(sel.i) ? " · <b>known solidly</b>" : ""}</div></section>`
      : `<section class="card stack" id="bookinfo"><div class="big-word num" style="font-size:1.8rem">#${sel.i + 1}</div><div class="muted">${wordRec(sel.i) ? "Half-way there: you got this word right once. Get it right again on another day." : `Not learned yet. This word is in <b>Lesson ${lesson}</b>.`}</div>
          <button class="btn" data-a="practice" data-u="lad${lesson - 1}">Practise Lesson ${lesson}</button></section>`;
  }
  return `<div class="row"><button class="icon-btn" data-a="caseback" aria-label="Back to library">${ICON.back}</button><h1 style="flex:1">Shelf ${c + 1}</h1><span class="num muted">${got}/${SHELF}</span></div>
  <div class="small muted">Words ${start + 1}–${start + ws.length}. Tap a book.</div>
  <div class="spine-key">${SPINE_KEY.map(([p, l]) => `<span><i style="--h:${SPINE_HUE[p]}"></i>${l}</span>`).join("")}<span><i class="g"></i>Known solidly</span></div>
  <section class="case zoom">${Array.from({ length: 5 }, (_, p) => `<div class="plank">${Array.from({ length: 10 }, (_, b) => bookHTML(start + p * 10 + b, true)).join("")}</div>`).join("")}</section>
  ${info}
  <div class="row" style="justify-content:space-between">${c > 0 ? `<button class="btn ghost" data-a="case" data-c="${c - 1}">‹ Shelf ${c}</button>` : "<span></span>"}${(c + 1) * SHELF < LW.length ? `<button class="btn ghost" data-a="case" data-c="${c + 1}">Shelf ${c + 2} ›</button>` : ""}</div>`;
}
function runFly() {
  if (TAB !== "library" || LIB.c != null || !LIB.fly.length) return;
  const books = LIB.fly.map(i => document.querySelector(`.bk.fly[data-b="${i}"]`)).filter(Boolean).slice(0, 80);
  LIB.fly = [];
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !books[0] || !books[0].animate) { books.forEach(b => b.classList.remove("fly")); return; }
  const sx = innerWidth / 2, sy = innerHeight * 0.85;
  books.forEach((b, j) => {
    const r = b.getBoundingClientRect(), dx = sx - (r.left + r.width / 2), dy = sy - (r.top + r.height / 2);
    const a = b.animate([
      { transform: `translate(${dx}px,${dy}px) scale(3) rotate(${j % 2 ? 25 : -25}deg)`, opacity: 0 },
      { opacity: 1, offset: 0.25 },
      { transform: `translate(${dx * 0.3}px,${dy * 0.3 - 30}px) scale(1.6) rotate(${j % 2 ? -8 : 8}deg)`, offset: 0.7 },
      { transform: "none", opacity: 1 }
    ], { duration: 900, delay: 250 + j * 110, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
    a.onfinish = () => { b.classList.remove("fly"); b.classList.add("land"); if (j < 40) sfx("book"); };
  });
}

/* ================= Render & actions ================= */
const SCREENS = { learn: screenLearn, library: screenLibrary, review: screenReview, chat: screenChat, verbs: screenVerbs, more: screenMore };
function render() {
  renderTop(); renderNav();
  const m = $("main"), keepScroll = m.dataset.tab === TAB ? m.scrollTop : 0;
  const active = document.activeElement && document.activeElement.id;
  const vals = {}; ["chin", "trin", "askin", "gtopic", "cpt", "cen"].forEach(id => { const el = $("#" + id); if (el) vals[id] = el.value; });
  m.innerHTML = SCREENS[TAB]();
  m.dataset.tab = TAB; m.scrollTop = keepScroll;
  Object.entries(vals).forEach(([id, v]) => { const el = $("#" + id); if (el && !el.disabled) el.value = v; });
  if (active && $("#" + active) && ["vfilter", "chin", "trin", "askin", "vin"].includes(active)) { const el = $("#" + active); el.focus(); try { el.selectionStart = el.selectionEnd = el.value.length; } catch (e) {} }
  const vf = $("#vfilter"); if (vf) vf.oninput = () => { VB.filter = vf.value; render(); };
  const vs = $("#voicesel"); if (vs) vs.onchange = () => { S.settings.voice = vs.value; loadVoices(); save(); speak("Olá! Eu falo português de Portugal."); };
  document.querySelectorAll("input[name=aiprov]").forEach(r => r.onchange = () => { AIC.provider = r.value; saveAIC(); refreshAI(); render(); });
  const ak = $("#aikey"); if (ak) ak.onchange = () => { AIC.keys[AIC.provider] = ak.value.trim(); saveAIC(); refreshAI(); render(); };
  const am = $("#aimodel"); if (am) am.onchange = () => { AIC.models[AIC.provider] = am.value.trim(); saveAIC(); };
  const ap = $("#autoplay"); if (ap) ap.onchange = () => { S.settings.autoplay = ap.checked; save(); };
  const sx = $("#sfxon"); if (sx) sx.onchange = () => { S.settings.sfx = sx.checked; save(); if (sx.checked) sfx("right"); };
  const vin = $("#vin"); if (vin) vin.onkeydown = ev => { if (ev.key === "Enter") { ev.preventDefault(); ACT.vcheck(); } };
  const chin = $("#chin"); if (chin) chin.onkeydown = ev => { if (ev.key === "Enter" && !ev.shiftKey) { ev.preventDefault(); ACT.chsend(); } };
  if (TAB === "chat" && CH.started) { const c = $(".chat"); if (c) c.lastElementChild && c.lastElementChild.scrollIntoView({ block: "end" }); }
  if (TAB === "library" && LIB.fly.length) requestAnimationFrame(runFly);
}

const ACT = {
  tab: b => { TAB = b.dataset.tab; if (TAB === "more") MORE = "menu"; if (TAB === "library") openLibrary(); location.hash = TAB; render(); $("main").scrollTop = 0; },
  libgo: () => { closeOverlay(); TAB = "library"; openLibrary(); location.hash = TAB; render(); $("main").scrollTop = 0; },
  case: b => { LIB.c = +b.dataset.c; LIB.sel = null; LIB.fly = []; render(); $("main").scrollTop = 0; },
  caseback: () => { LIB.c = null; LIB.sel = null; render(); },
  book: b => { LIB.sel = +b.dataset.b; render(); const d = $("#bookinfo"); if (d) d.scrollIntoView({ block: "nearest", behavior: "smooth" }); },
  say: b => speak(b.dataset.t, { slow: !!b.dataset.slow }),
  acc: b => { const t = $("#" + b.dataset.target); if (t) insertAtCursor(t, b.dataset.c); },
  close: () => { const mid = L && L.state !== "end" && savedLesson(); closeOverlay(); if (mid) toast("Lesson saved. Tap Continue to pick up where you left off."); },
  resume: () => { if (!resumeLesson()) { toast("That lesson has expired. Starting fresh."); render(); } },
  study: b => startStudy(b.dataset.u),
  stnext: () => { ST.i++; renderStudy(); },
  stprev: () => { ST.i = Math.max(0, ST.i - 1); renderStudy(); },
  practice: b => { const id = b.dataset.u; ST = null; const sv = savedLesson(); if (sv && sv.opts.unit === id && resumeLesson()) return; const lad = /^lad\d+$/.test(id); startLesson(lad ? ladderKeys(+id.slice(3)) : unitKeys(id), { unit: id, level: Math.min(unitLevel(id), 2) }); },
  flash: () => startFlash(dueKeys()),
  quizdue: () => startLesson(dueKeys(), { level: 1, kind: "Due review" }),
  mistakes: () => startLesson(Object.keys(S.mistakes).filter(getItem), { level: 1, kind: "Mistakes review" }),
  personal: () => { const k = personalKeys(); if (k.length < 4) { toast("Finish a lesson or two first, then this targets your weak spots."); return; } startLesson(k, { level: 2, kind: "Personal practice" }); },
  opt: b => { L.sel = +b.dataset.i; const e = L.ex[L.i]; if (e.type === "en2pt") speak(e.opts[L.sel]); renderLesson(); },
  build: b => { const e = L.ex[L.i], i = +b.dataset.i; if (!L.built.includes(i)) { L.built.push(i); speak(e.bank[i].t); } renderLesson(); },
  unbuild: b => { const i = +b.dataset.i; L.built = L.built.filter(x => x !== i); renderLesson(); },
  check: () => doCheck(),
  next: () => lessonNext(),
  explain: () => explainAnswer(),
  spk: () => {
    const e = L && L.ex[L.i]; if (!e || e.type !== "speak") return;
    const sp = L.sp || (L.sp = { phase: "idle", interim: "", tries: 0 });
    if (sp.phase === "listening") { stopListening(); return; }
    if (HAS_TTS) speechSynthesis.cancel();
    sp.phase = "listening"; sp.interim = ""; L.state = "ask"; const prevFb = L.fb; L.fb = null; renderLesson();
    listenOnce({
      onInterim: t => { sp.interim = t; const el = $("#interim"); if (el) el.textContent = t; },
      onError: c => { sp.phase = "idle"; L.fb = prevFb; if (prevFb) L.state = "fb"; renderLesson(); const m = micErr(c); if (m) toast(m); },
      onDone: alts => {
        if (!L || L.ex[L.i] !== e) return;
        const a = analyseSpeech([e.item.pt, ...(e.item.alt || [])], [alts[0]]); /* score the recogniser's main guess only: no benefit of the doubt */
        sp.tries++; sp.phase = "done"; sp.interim = a.heard;
        if (sp.tries === 1) {
          if (!e.retry) { L.first++; if (a.ok) L.firstOk++; }
          recordAnswer(e.item.key, a.ok); sp.firstOk = a.ok; save();
        }
        L.fb = { ok: a.ok, speech: a, firstTryMissed: !sp.firstOk };
        L.state = "fb"; saveLessonProgress(); renderLesson(); sfx(a.ok ? "right" : "wrong");
        if (!a.perfect && AI) {
          const fb = L.fb; fb.tipBusy = true; renderLesson();
          pronunciationTip(e.item.pt, a).then(t => { fb.tip = t; }).catch(() => {}).finally(() => { fb.tipBusy = false; if (L && L.fb === fb) renderLesson(); });
        }
      }
    });
  },
  skipspeak: () => { L.fb = { ok: false, skip: true }; L.state = "fb"; renderLesson(); },
  match: b => {
    const m = L.m, side = b.dataset.side, k = b.dataset.k;
    if (side === "l") { m.l = k; speak(getItem(k).pt); } else m.r = k;
    if (m.l && m.r) {
      if (m.l === m.r) { m.done.add(m.l); recordAnswer(m.l, true); sfx(m.done.size === m.left.length ? "right" : "pair"); }
      else { m.errs++; sfx("wrong"); m.flash = ["l" + m.l, "r" + m.r]; recordAnswer(m.l, false); setTimeout(() => { if (L && L.m === m) { m.flash = null; renderLesson(); } }, 600); }
      m.l = m.r = null;
    }
    if (m.done.size === L.ex[L.i].items.length) {
      L.first++; if (!m.errs) L.firstOk++;
      L.fb = { ok: true, note: m.errs ? `${m.errs} mismatch${m.errs > 1 ? "es" : ""}. Those words go to review.` : "" }; L.state = "fb"; save();
      L.ex[L.i].item = null;
    }
    renderLesson();
  },
  mic: b => toggleMic(text => { const t = $("#" + b.dataset.target); if (t) { t.value = text; t.dispatchEvent(new Event("input", { bubbles: true })); } if (W && b.dataset.target === "wmine") W.mine = text; if (L && b.dataset.target === "ans") { L.text = text; const c = $("[data-a=check]"); if (c) c.disabled = !text.trim(); } }),
  fshow: () => { FL.show = true; renderFlash(); },
  fgrade: b => { const k = FL.keys[FL.i]; grade(k, +b.dataset.q); if (+b.dataset.q >= 2 && LEMMA_KEY[k] != null) creditWord(LEMMA_KEY[k]); if (+b.dataset.q === 0) S.mistakes[k] = 2; FL.n++; FL.i++; FL.show = false; FL.front = null; addXP(1); renderFlash(); },
  addcustom: () => { const p = $("#cpt").value.trim(), e = $("#cen").value.trim(); if (!p || !e) { toast("Fill in both the Portuguese and the English."); return; } const k = "c:" + Date.now(); S.custom[k] = { pt: p, en: e }; S.cards[k] = newCard(); save(); $("#cpt").value = $("#cen").value = ""; render(); toast("Added to your review queue"); },
  delcustom: b => { const k = b.dataset.k; delete S.custom[k]; delete S.cards[k]; delete S.mistakes[k]; save(); render(); },
  chmode: b => { CH.mode = b.dataset.m; if (CH.mode === "free" || CH.mode === "role") { if ((CH.mode === "role") !== !!CH.scenario) { CH.started = false; CH.msgs = []; CH.scenario = null; } } render(); },
  level: b => { S.settings.level = b.dataset.l; save(); render(); },
  chstart: b => { CH.scenario = b.dataset.s || null; CH.msgs = []; CH.started = true; chatTurn(); },
  chreset: () => { CH.started = false; CH.msgs = []; CH.scenario = null; render(); },
  chmic: () => {
    if (CH.listening) { stopListening(); return; }
    if (CH.busy) return;
    if (HAS_TTS) speechSynthesis.cancel();
    CH.listening = true; CH.interim = ""; render();
    listenOnce({
      onInterim: t => { CH.interim = t; const el = $("#chinterim"); if (el) el.textContent = t; },
      onError: c => { CH.listening = false; render(); const m = micErr(c); if (m) toast(m); },
      onDone: alts => { CH.listening = false; CH.interim = ""; CH.msgs.push({ role: "me", text: alts[0], spoken: true }); chatTurn(); }
    });
  },
  chsend: () => { const t = $("#chin"); const v = t && t.value.trim(); if (!v || CH.busy) return; CH.msgs.push({ role: "me", text: v }); t.value = ""; chatTurn(); },
  chsugg: b => { const t = $("#chin"); if (t) { t.value = b.dataset.t; t.focus(); } },
  chhelp: () => { CH.showSugg = true; render(); },
  chtr: b => { const m = CH.msgs[+b.dataset.i]; m.showTr = !m.showTr; render(); },
  chsave: b => { const m = CH.msgs[+b.dataset.i]; const k = "c:" + Date.now(); S.custom[k] = { pt: m.text, en: m.tr }; S.cards[k] = newCard(); save(); toast("Saved to your review queue"); },
  trdir: b => { CH.trans.dir = b.dataset.d; CH.trans.out = null; render(); },
  trgo: () => { const t = $("#trin").value.trim(); if (t && !CH.trans.busy) translateNow(t, false); },
  trmic: () => {
    const T = CH.trans;
    if (T.listening) { stopListening(); return; }
    if (!canListen()) { toast(micErr("unsupported")); return; }
    T.listening = true; T.interim = ""; render();
    listenOnce({ lang: T.dir === "en" ? EN_LANG : "pt-PT",
      onInterim: t => { T.interim = t; const el = $("#trinterim"); if (el) el.textContent = t; },
      onError: c => { T.listening = false; render(); const m = micErr(c); if (m) toast(m); },
      onDone: alts => { T.listening = false; T.interim = ""; translateNow(alts[0], true); } });
  },
  trsave: () => { const o = CH.trans.out; if (!o) return;
    const pt = o.pt ? String(o.pt) : String(o.natural || o.intended || CH.trans.src), en = o.pt ? CH.trans.src : String(o.en || "");
    if (!pt || !en) return; const k = "c:" + Date.now(); S.custom[k] = { pt, en, tip: o.notes ? String(o.notes) : undefined }; S.cards[k] = newCard(); save(); toast("Saved to your review queue"); },
  askgo: async () => {
    const q = $("#askin").value.trim(); if (!q || CH.askBusy) return;
    const a = { id: "ask" + Date.now(), q, a: "" }; CH.asks.unshift(a); CH.askBusy = true; render(); $("#askin").value = "";
    const prompt = `You are an expert teacher of European Portuguese (Portugal).\n${PT_RULES}\nAnswer the learner's question in English, clearly and briefly (under 180 words), with 2 to 4 example sentences in European Portuguese, each followed by its English translation. Do not bring up other countries or varieties unless the learner asks. Plain text with line breaks; you may use **bold**; no tables or headings.\nQuestion: ${q}`;
    try { const r = await AI(prompt, { modelTier: "default", onText: ({ text }) => { a.a = text; const el = $("#" + a.id); if (el) el.innerHTML = richText(text); } }); a.a = r.text; S.stats.chats++; save(); }
    catch (e) { a.a = aiErr(e); }
    CH.askBusy = false; render();
  },
  vview: b => { VB.view = b.dataset.v; render(); },
  verb: b => { VB.verb = b.dataset.v; render(); speak(VB.verb); },
  vtense: b => { const t = b.dataset.t; VB.tenses[t] = !VB.tenses[t]; newVerbQ(); render(); },
  vset: b => { VB.set = b.dataset.s; newVerbQ(); render(); },
  vsort: b => { VB.sort = b.dataset.s; render(); },
  vrange: b => { const r = b.dataset.r; S.settings.vrange = r === "all" ? "all" : +r; save(); newVerbQ(); render(); },
  vmode: b => { S.settings.vmode = b.dataset.m; save(); newVerbQ(); render(); },
  vdrillthis: () => { VB.only = VB.verb; VB.view = "drill"; newVerbQ(); render(); $("main").scrollTop = 0; },
  vonlyoff: () => { VB.only = null; newVerbQ(); render(); },
  vcheck: () => {
    if (VB.fb) return ACT.vnext();
    const v = $("#vin").value; if (!v.trim()) return;
    const r = checkPT(v, [VB.q.ans]);
    VB.fb = r; S.stats.verbAns++; const was = vMastered(VB.q.v);
    if (r.ok) { S.stats.verbOk++; VB.run++; S.vm[VB.q.v] = (S.vm[VB.q.v] || 0) + 1; VB.fb.newly = !was && vMastered(VB.q.v); addXP(1); } else { VB.run = 0; S.vm[VB.q.v] = 0; save(); }
    render(); const d = sfx(r.ok ? "right" : "wrong"); const say = PERSONS[VB.q.p].split(" ")[0] + " " + VB.q.ans; setTimeout(() => speak(say), d);
    const n = $("[data-a=vnext]"); if (n) n.focus();
  },
  vnext: () => { newVerbQ(); render(); const i = $("#vin"); if (i) i.focus(); },
  more: b => { if (b.dataset.tabgo) { TAB = "more"; location.hash = "more"; } MORE = b.dataset.m; RESET_ARMED = false; render(); $("main").scrollTop = 0; },
  dlg: b => { const d = allDialogues().find(x => x.id === b.dataset.id); DLG = { d, tr: false, hide: false, ans: {}, cur: -1 }; MORE = "dialogue"; render(); $("main").scrollTop = 0; },
  dlgtr: () => { DLG.tr = !DLG.tr; render(); },
  dlghide: () => { DLG.hide = !DLG.hide; render(); },
  sayline: b => { const l = DLG.d.lines[+b.dataset.i], vm = voicesForDialogue(DLG.d); speak(l[1], { voice: vm[l[0]].voice, pitch: vm[l[0]].pitch }); },
  playall: () => playAll(),
  dlgq: b => { const qi = +b.dataset.q, oi = +b.dataset.o; DLG.ans[qi] = oi; if (oi === DLG.d.q[qi].a) addXP(2); else save(); render(); },
  gendlg: async () => {
    const topic = ($("#gtopic").value || "").trim() || "an everyday situation in Portugal";
    GEN_BUSY = true; render();
    const prompt = `${PT_RULES}\n${LEVELS[S.settings.level] || LEVELS.A1}\nWrite a short, realistic dialogue set in Portugal about: ${topic}. 6 to 10 lines, two speakers with Portuguese names or roles. Then write 2 multiple-choice comprehension questions in English with 3 options each.\nReturn ONLY a JSON object: {"title": "short Portuguese title", "en": "short English title", "lines": [["Speaker", "line in European Portuguese", "English translation"]], "q": [{"q": "question", "o": ["option", "option", "option"], "a": index of the correct option}]}`;
    try {
      const r = await askJSON(prompt, { modelTier: "default" });
      if (!r || !Array.isArray(r.lines) || !r.lines.length) throw { code: "bad" };
      const d = { id: "g" + Date.now(), gen: true, title: String(r.title || topic), en: String(r.en || topic), lines: r.lines.filter(l => Array.isArray(l) && l.length >= 3).map(l => l.slice(0, 3).map(String)), q: (Array.isArray(r.q) ? r.q : []).filter(q => q && Array.isArray(q.o) && Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length).map(q => ({ q: String(q.q), o: q.o.map(String), a: q.a })) };
      S.gen = [d, ...S.gen].slice(0, 10); save();
      DLG = { d, tr: false, hide: false, ans: {}, cur: -1 }; MORE = "dialogue";
    } catch (e) { toast(aiErr(e)); }
    GEN_BUSY = false; render();
  },
  systest: () => rawSpeak("Olá! Obrigado. Boa noite. Queria um pastel de nata, por favor."),
  sysok: () => { S.settings.sysVoice = true; save(); render(); toast("Audio on with your device's Portugal voice"); },
  sysoff: () => { S.settings.sysVoice = false; save(); render(); },
  wotd: () => openWotd(false),
  wpractise: () => startWotdPractice(),
  wmore: async () => {
    const w = LW[W.i]; W.moreBusy = true; renderWotd();
    const prompt = `${PT_RULES}\n${LEVELS[S.settings.level] || LEVELS.A1}\nWrite 3 new, varied, everyday example sentences using the word "${w.pt}" (${w.en}), set in Portugal. Return ONLY JSON: {"examples": [["sentence in European Portuguese", "English translation"]]}`;
    try { const r = await askJSON(prompt, { modelTier: "quick" }); if (W) W.more = W.more.concat((r.examples || []).filter(x => Array.isArray(x) && x.length >= 2).map(x => [String(x[0]), String(x[1])])).slice(-9); }
    catch (e) { toast(aiErr(e)); }
    if (W) { W.moreBusy = false; renderWotd(); }
  },
  wmic: () => {
    if (W.listening) { stopListening(); return; }
    if (HAS_TTS) speechSynthesis.cancel();
    W.listening = true; renderWotd();
    listenOnce({
      onInterim: t => { const el = $("#wmine"); if (el) el.value = t; },
      onError: c => { W.listening = false; renderWotd(); const m = micErr(c); if (m) toast(m); },
      onDone: alts => { W.listening = false; W.mine = alts[0]; W.spoken = true; ACT.wcheck(); }
    });
  },
  wcheck: async () => {
    const spoken = !!W.spoken; W.spoken = false;
    const w = LW[W.i], t = (W.mine || "").trim(); if (!t) { toast("Write a sentence first."); return; }
    W.busy = true; renderWotd();
    const prompt = `${PT_RULES}\nA learner (${S.settings.level}) wrote a sentence to practise the word "${w.pt}" (${w.en}). ${spoken ? "The sentence was spoken and transcribed by speech recognition, so if a word looks like a mis-recognition of a Portuguese word, assume they meant that word and mention in explanation which word didn't come through clearly, with a short pronunciation tip. " : ""}Check it. Return ONLY JSON: {"ok": true if it is correct, natural European Portuguese and uses the word (any form), else false, "corrected": "the sentence rewritten as natural European Portuguese using the word", "explanation": "one or two short, encouraging English sentences; if they used a word or form not used in Portugal, give the Portugal one without mentioning other countries", "translation": "English translation of the corrected sentence"}\nSentence: """${t}"""`;
    try { const r = await askJSON(prompt, { modelTier: "default" }); if (W) { W.fb = { ok: !!r.ok, corrected: String(r.corrected || t), explanation: String(r.explanation || ""), translation: String(r.translation || ""), sentence: t }; if (r.ok) { S.mine[today()] = t; addXP(3); } sfx(r.ok ? "right" : "wrong"); S.stats.chats++; save(); } }
    catch (e) { toast(aiErr(e)); }
    if (W) { W.busy = false; renderWotd(); const say = W.fb && (W.fb.ok ? W.fb.sentence : W.fb.corrected); if (say && S.settings.autoplay) speak(say); }
  },
  signin: () => doSignIn(),
  restart: () => location.reload(),
  checkupdate: async b => {
    b.disabled = true; b.textContent = "Checking…";
    await checkForUpdate();
    setTimeout(() => { if (!UPDATE_READY) { b.disabled = false; b.textContent = "Check for updates"; toast("You're on the latest version."); } }, 4000);
  },
  acct: () => { MENU_OPEN = !MENU_OPEN; renderTop(); const f = MENU_OPEN && document.querySelector(".acct-menu [role=menuitem]"); if (f) f.focus(); },
  acctsettings: () => { MENU_OPEN = false; closeOverlay(); TAB = "more"; MORE = "settings"; location.hash = "more"; render(); $("main").scrollTop = 0; },
  gatecontinue: () => { if (USER) { hideGate(); return; } showGate("signin"); },
  signout: () => { MENU_OPEN = false; if (window.PoisCloud) { GATE_PHASE = "ready"; GATE = "signin"; PoisCloud.signOut(); } },
  aitest: async b => {
    b.disabled = true; b.textContent = "Testing…";
    try { const r = await aiText(`${PT_RULES}\nSay hello to a learner in one short European Portuguese sentence.`); toast("Tutor says: " + String(r).trim().slice(0, 120)); speak(String(r).trim()); }
    catch (e) { toast(aiErr(e)); }
    render();
  },
  rate: b => { S.settings.rate = +b.dataset.r; save(); render(); speak("Vamos praticar português."); },
  goal: b => { S.settings.goal = +b.dataset.g; save(); render(); },
  dir: b => { S.settings.dir = b.dataset.d; save(); render(); },
  export: async () => { try { await navigator.clipboard.writeText(JSON.stringify(S)); toast("Backup copied. Paste it somewhere safe."); } catch (e) { toast("Couldn't copy here. Your progress is still saved."); } },
  importshow: () => { const b = $("#importbox"); if (b) b.hidden = !b.hidden; },
  import: () => { try { const s = normalize(JSON.parse($("#importtxt").value)); S = s; save(); loadVoices(); render(); toast("Progress restored"); } catch (e) { toast("That doesn't look like a Pois backup."); } },
  reset: () => { if (!RESET_ARMED) { RESET_ARMED = true; render(); return; } S = freshState(); save(); RESET_ARMED = false; render(); toast("Progress reset"); }
};
document.addEventListener("click", e => {
  if (MENU_OPEN && !e.target.closest(".acct-wrap")) closeMenu();
  const b = e.target.closest("[data-a]");
  if (!b || b.disabled) return;
  const f = ACT[b.dataset.a];
  if (f) { e.preventDefault(); f(b, e); }
});
document.addEventListener("keydown", e => { if (e.key === "Escape" && MENU_OPEN) { closeMenu(); const b = document.querySelector(".acct-bubble"); if (b) b.focus(); } });
window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if (SCREENS[h] && h !== TAB) { TAB = h; render(); } });

if (TAB === "library") openLibrary();
initCloud();
refreshAI();
render();
if (!CLOUD_READY) setTimeout(maybeWelcome, 700);
/* ---------- Self-updating ----------
   On launch and whenever the app comes back to the foreground, ask for a fresh sw.js.
   A new version installs in the background, takes over, and the app restarts itself:
   straight away while it's starting up, or via a "Restart" bar if you're in the middle of something. */
const BOOT_AT = Date.now();
let SW_REG = null, APP_VERSION = "", UPDATE_READY = false;
function showUpdateBar() {
  if ($("#updbar")) return;
  const d = document.createElement("div"); d.id = "updbar"; d.className = "updbar"; d.setAttribute("role", "status");
  d.innerHTML = `<span>A new version of Pois is ready.</span><button class="btn sun" data-a="restart">Restart</button>`;
  document.body.appendChild(d);
}
async function checkForUpdate() { if (SW_REG) { try { await SW_REG.update(); } catch (e) {} } }
function setupUpdates() {
  if (!("serviceWorker" in navigator) || (location.protocol !== "https:" && location.hostname !== "localhost")) return;
  const hadController = !!navigator.serviceWorker.controller;
  let reloading = false;
  navigator.serviceWorker.addEventListener("message", e => { if (e.data && e.data.type === "version") { APP_VERSION = e.data.version; const v = $("#appver"); if (v) v.textContent = APP_VERSION.replace("pois-", ""); } });
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || reloading) return; /* first install: already the newest */
    const busy = !!(L || ST || FL || CH.busy || CH.listening || CH.trans.listening || (W && W.listening));
    if (Date.now() - BOOT_AT < 20000 || GATE || !busy) { reloading = true; location.reload(); }
    else { UPDATE_READY = true; showUpdateBar(); }
  });
  navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).then(reg => {
    SW_REG = reg; checkForUpdate();
    if (navigator.serviceWorker.controller) navigator.serviceWorker.controller.postMessage("version");
  }).catch(() => {});
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") checkForUpdate(); });
  setInterval(checkForUpdate, 60 * 60 * 1000);
}
setupUpdates();
