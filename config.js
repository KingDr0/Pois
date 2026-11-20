/* Pois settings.
   firebase: paste the config from Firebase console › Project settings › Your apps › Web app.
   It identifies your project and is meant to be public; security comes from firestore.rules.
   Leave it as null to run without accounts or the built-in tutor (people can still use their own AI key). */
window.POIS_CONFIG = {
  firebase: {
    apiKey: "AIzaSyDSkx8tW0hTGAAh0szbhnVs2y1P3r9cWl8",
    authDomain: "pois-40d02.firebaseapp.com",
    projectId: "pois-40d02",
    storageBucket: "pois-40d02.firebasestorage.app",
    messagingSenderId: "625804227389",
    appId: "1:625804227389:web:3a61d48297669658a10b54"
  },

  /* App Check key (reCAPTCHA Enterprise, created on the Fraud Defense page in Google Cloud console). Required when App Check is enforced for Firebase AI Logic,
     so only this site can use the free tutor. The key is public by design; register the same key in Firebase › App Check. */
  appCheckSiteKey: "6Ld16ikuAAAAAHfjKBUorBb5UY01Hd4Q1ZGx75ax",          /* reCAPTCHA Enterprise key from Google Cloud › Fraud Defense */
  appCheckProvider: "enterprise",

  /* Gemini models the built-in tutor tries, in order, until one is available on the free tier. */
  geminiModels: ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-2.5-flash", "gemini-3.5-flash"],

  /* Free tutor messages per person per day. */
  builtinDailyLimit: 80
};
