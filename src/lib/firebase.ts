import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUÍ",
  authDomain: "TU_AUTH_DOMAIN_AQUÍ",
  projectId: "TU_PROJECT_ID_AQUÍ",
  storageBucket: "TU_STORAGE_BUCKET_AQUÍ",
  messagingSenderId: "TU_MESSAGING_SENDER_ID_AQUÍ",
  appId: "TU_APP_ID_AQUÍ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
