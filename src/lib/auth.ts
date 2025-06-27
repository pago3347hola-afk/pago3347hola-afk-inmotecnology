'use client';

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    console.log("Signed in user:", user);
    // Here you can handle the user session, e.g., by redirecting them
    // to their account page or storing user info in your app's state.
    window.location.href = '/account';
  } catch (error: any) {
    // Don't treat closing the popup as a critical error.
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      return;
    }
    
    if (error.code === 'auth/unauthorized-domain') {
      console.error(
        'Authentication Error: This domain is not authorized. ' +
        'Please go to the Firebase Console > Authentication > Settings > Authorized domains, and add "localhost".'
      );
      return;
    }

    // Handle other errors here.
    console.error("Authentication Error:", error.message);
  }
}
