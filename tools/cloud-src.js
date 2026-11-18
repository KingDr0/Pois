/* Pois cloud layer: Google sign-in, progress sync (Firestore) and the free
   built-in tutor (Gemini Developer API through Firebase AI Logic).
   Bundled with esbuild into site/cloud.js; exposes window.PoisCloud. */
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut as fbSignOut, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

let app = null, auth = null, db = null, ai = null, user = null;
const listeners = [];

function init(config) {
  if (app || !config || !config.apiKey) return !!app;
  app = initializeApp(config);
  auth = getAuth(app);
  setPersistence(auth, browserLocalPersistence).catch(() => {});
  db = getFirestore(app);
  try { ai = getAI(app, { backend: new GoogleAIBackend() }); } catch (e) { ai = null; }
  getRedirectResult(auth).catch(() => {});
  onAuthStateChanged(auth, u => { user = u; listeners.forEach(f => { try { f(u ? publicUser(u) : null); } catch (e) {} }); });
  return true;
}
const publicUser = u => ({ uid: u.uid, name: u.displayName || "", email: u.email || "", photo: u.photoURL || "" });

async function signIn() {
  if (!auth) throw new Error("not_configured");
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  try { await signInWithPopup(auth, provider); }
  catch (e) {
    const code = e && e.code || "";
    if (code === "auth/popup-blocked" || code === "auth/operation-not-supported-in-this-environment") return signInWithRedirect(auth, provider);
    if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return;
    throw e;
  }
}
const signOut = () => auth ? fbSignOut(auth) : Promise.resolve();
const onUser = f => { listeners.push(f); if (auth) f(user ? publicUser(user) : null); };

async function load() {
  if (!db || !user) return null;
  const snap = await getDoc(doc(db, "users", user.uid));
  return snap.exists() ? snap.data() : null;
}
async function save(stateJson, updated) {
  if (!db || !user) return;
  await setDoc(doc(db, "users", user.uid), { state: stateJson, updated });
}

/* messages: [{role:"user"|"assistant", content}] */
async function generate({ system, messages, json, models }) {
  if (!ai) throw { code: "not_configured" };
  let lastErr = null;
  for (const name of models) {
    try {
      const model = getGenerativeModel(ai, {
        model: name,
        systemInstruction: system || undefined,
        generationConfig: json ? { responseMimeType: "application/json" } : undefined
      });
      const contents = messages.map(m => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));
      const r = await model.generateContent({ contents });
      return { text: r.response.text(), model: name };
    } catch (e) {
      lastErr = e;
      const msg = String(e && (e.message || e.code) || "");
      if (/429|quota|RESOURCE_EXHAUSTED/i.test(msg)) throw { code: "rate_limited", message: msg };
      /* model not found / not allowed on this tier: try the next one */
      if (/404|not found|not supported|permission|403|400/i.test(msg)) continue;
      throw { code: "error", message: msg };
    }
  }
  throw { code: "error", message: String(lastErr && lastErr.message || lastErr) };
}

window.PoisCloud = { init, signIn, signOut, onUser, load, save, generate, get ready() { return !!app; }, get aiReady() { return !!ai; } };
window.dispatchEvent(new Event("poiscloud"));
