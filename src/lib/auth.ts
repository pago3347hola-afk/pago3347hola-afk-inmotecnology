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
    } else if (error.code === 'auth/unauthorized-domain' || (error.message && error.message.includes('requests-from-referer'))) {
      const currentHostname = window.location.hostname;
      toast({
        variant: "destructive",
        title: "Error: Dominio no Autorizado",
        description: `El dominio ${currentHostname} no está autorizado. Por favor, añádelo a la lista de dominios autorizados en la configuración de Firebase.`,
        duration: 9000,
      });
    } else {
       toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: `Ocurrió un error. Por favor, inténtalo de nuevo. (${error.code || 'Unknown error'})`,
      });
    }
    
    console.error("Error de Autenticación de Firebase:", error);
  }
}
