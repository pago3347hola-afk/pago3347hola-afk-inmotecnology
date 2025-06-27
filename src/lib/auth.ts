'use client';

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "@/hooks/use-toast";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
    window.location.href = '/account';
  } catch (error: any) {
    // Si el usuario cierra la ventana emergente, no mostramos un error.
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      console.log("Inicio de sesión cancelado por el usuario.");
      return;
    }
    
    // Para todos los demás errores, mostramos una notificación genérica.
    toast({
      variant: "destructive",
      title: "Error de inicio de sesión",
      description: `Ocurrió un error. Por favor, inténtalo de nuevo. (${error.code})`,
    });
    
    console.error("Error de Autenticación de Firebase:", error);
  }
}
