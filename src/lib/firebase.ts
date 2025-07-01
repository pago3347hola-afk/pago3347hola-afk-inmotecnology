import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVfF4LlvpIsap-vfuplbhBMBXvz_dT47g",
  authDomain: "inmotecnologa-hub.firebaseapp.com",
  projectId: "inmotecnologa-hub",
  storageBucket: "inmotecnologa-hub.firebasestorage.app",
  messagingSenderId: "755441536028",
  appId: "1:755441536028:web:1c336f159254098e5be3d9"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
