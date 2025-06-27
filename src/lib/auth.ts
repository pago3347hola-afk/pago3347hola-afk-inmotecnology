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
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      console.log("Inicio de sesión cancelado por el usuario.");
      return;
    }

    if (error.code === 'auth/popup-blocked') {
       toast({
        variant: "destructive",
        title: "Ventana emergente bloqueada",
        description: "Tu navegador ha bloqueado la ventana de inicio de sesión. Por favor, permite las ventanas emergentes para este sitio y vuelve a intentarlo.",
        duration: 9000,
      });
    } else if (error.code === 'auth/unauthorized-domain') {
       toast({
        variant: "destructive",
        title: "Error: Dominio no Autorizado",
        description: "Revisa las 'Restricciones de clave de API' en la consola de Google Cloud para asegurar que http://localhost:9002 está permitido.",
        duration: 9000,
      });
    } else {
       toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: `Ocurrió un error. Por favor, inténtalo de nuevo. (${error.code})`,
      });
    }
    
    console.error("Error de Autenticación de Firebase:", error);
  }
}
