# Pois · European Portuguese

A free app for learning **European Portuguese (Portugal)**. It includes lessons, spaced-repetition review, a mistakes queue, a verb trainer ranked by real usage, dialogues, a Word of the Day, and an AI conversation tutor.

It installs to your phone's home screen from the browser, works offline for everything except the AI tutor, and uses Google sign-in to save progress.

## How it's built

| Part | What it uses | Cost |
|---|---|---|
| Hosting | GitHub Pages (this repo) | Free |
| Sign-in | Firebase Authentication (Google) | Free tier |
| Saved progress | Cloud Firestore, one document per user | Free tier |
| Built-in AI tutor | Gemini Developer API through Firebase AI Logic (no API key in the code) | Free tier, daily limit per user |
| Own-key AI tutor | The learner's own Gemini, Claude, OpenAI or Grok key, stored only on their device | Paid by the learner (Gemini keys are free) |
| Audio and mic | The device's own Portugal Portuguese voice and speech recognition | Free |

No secrets live in this repo. `config.js` holds the Firebase web config, which is designed to be public. Access is controlled by `firestore.rules`.

## One-time setup

### 1. Firebase
1. Go to [console.firebase.google.com](https://console.firebase.google.com) › **Add project** › name it `pois`. Google Analytics is optional.
2. **Project overview › </> (Web)** › register an app called Pois. Copy the `firebaseConfig` object.
3. Paste it into `config.js` in place of `firebase: null`, for example:
   ```js
   firebase: { apiKey: "…", authDomain: "pois-xxxx.firebaseapp.com", projectId: "pois-xxxx", storageBucket: "…", messagingSenderId: "…", appId: "…" },
   ```
4. **Build › Authentication › Get started › Sign-in method › Google › Enable.**
   Then **Settings › Authorized domains › Add domain**: `YOUR-USERNAME.github.io`
5. **Build › Firestore Database › Create database** › a location in Europe › **production mode**.
   Open the **Rules** tab, replace everything with the contents of `firestore.rules`, then **Publish**.
6. **Build › AI Logic › Get started** › choose **Gemini Developer API**.
   Don't link a billing account: staying on the free Spark plan keeps the tutor free.

### 1b. App Check (protects the free tutor)
App Check lets only your site use the built-in tutor.
1. Create a reCAPTCHA v3 key at [google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create): type **Score based (v3)**, domain `YOUR-USERNAME.github.io`. Copy the **site key** and the **secret key**.
2. Firebase console › **Security › App Check › Apps** › your web app › **reCAPTCHA** › paste the **secret key** › Save.
3. Put the **site key** in `config.js` as `appCheckSiteKey`.
4. In **App Check › APIs**, make sure **Firebase AI Logic** is enforced. You can also enforce Cloud Firestore once sign-in and sync work.

### 2. GitHub Pages
**Repo › Settings › Pages › Build and deployment** › Source: *Deploy from a branch* › Branch: `main`, folder `/ (root)` › Save.
After a minute the app is live at `https://YOUR-USERNAME.github.io/pois/`.

### 3. Lock the Firebase key to your site (recommended)
In [Google Cloud console › APIs & Services › Credentials](https://console.cloud.google.com/apis/credentials), select your project and open the **Browser key (auto created by Firebase)**. Under *Application restrictions* choose **Websites** and add:
- `https://YOUR-USERNAME.github.io/*`
- `https://pois-xxxx.firebaseapp.com/*` (your project's auth domain, needed for sign-in)

## Install on your phone
- **iPhone (Safari):** Share › Add to Home Screen.
- **Android (Chrome):** menu › Install app (or Add to Home screen).

For audio, the phone needs a **Portugal** Portuguese voice:
- **iPhone:** Settings › Accessibility › Spoken Content › Voices › Portuguese › Joana or Catarina.
- **Android:** Text-to-speech settings › Speech Services by Google › Português (Portugal).

## AI tutor options (Mais › Settings › AI tutor)
1. **Built-in free tutor:** needs Google sign-in. Daily limit set by `builtinDailyLimit` in `config.js`.
2. **Your own key:** Gemini (free from aistudio.google.com), Claude, OpenAI or Grok. The key stays in that browser only. The model name can be changed if a provider renames its models.
3. **Sign in with ChatGPT:** planned. OpenAI requires apps to join a waitlist first.

Whichever model is used, the tutor is instructed to use European Portuguese only.

## Updating
- **Content, lessons, words:** `content.js`
- **App behaviour:** `app.js`, `style.css`
- **After changing files**, bump `VERSION` in `sw.js` so installed copies pick up the update.
- **Rebuilding the Firebase bundle** (only needed to upgrade Firebase):
  ```bash
  cd tools && npm install && npm run build
  ```

## Credits
Verb frequency ranking: CLUL, *Multifunctional Computational Lexicon of Contemporary Portuguese* (16.2-million-word European Portuguese corpus).
