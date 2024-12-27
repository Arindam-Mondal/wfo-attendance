export const environment = {
  production: false,
  apiKey: import.meta.env["NG_APP_FB_API_KEY"],
  authDomain: import.meta.env["NG_APP_FB_AUTH_DOMAIN"],
  projectId: import.meta.env["NG_APP_FB_PROJECT_ID"],
  storageBucket: import.meta.env["NG_APP_FB_STORAGE_BUCKET"],
  messagingSenderId: import.meta.env["NG_APP_FB_MESSAGING_SENDER_ID"],
  appId: import.meta.env["NG_APP_FB_APP_ID"]
};
