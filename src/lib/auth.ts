'use client';

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
    window.location.href = '/account';
  } catch (error) {
    // Re-throw the error so the UI component can handle it and show a toast.
    throw error;
  }
}
