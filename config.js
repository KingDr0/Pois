/* Pois settings.
   firebase: paste the config from Firebase console › Project settings › Your apps › Web app.
   It identifies your project and is meant to be public; security comes from firestore.rules.
   Leave it as null to run without accounts or the built-in tutor (people can still use their own AI key). */
window.POIS_CONFIG = {
  firebase: null,

  /* Gemini models the built-in tutor tries, in order, until one is available on the free tier. */
  geminiModels: ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-2.5-flash"],

  /* Free tutor messages per person per day. */
  builtinDailyLimit: 80
};
