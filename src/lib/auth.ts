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
    // Handle Errors here.
    console.error("Authentication Error:", error.message);
  }
}
