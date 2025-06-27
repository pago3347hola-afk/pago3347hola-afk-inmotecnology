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
    let title = "Error de inicio de sesión";
    let description = `Ocurrió un error inesperado. Por favor, inténtalo de nuevo. (${error.code || 'Unknown error'})`;
    
    console.error("Error de Autenticación de Firebase:", error);

    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      console.log("Inicio de sesión cancelado por el usuario.");
      return;
    }

    if (error.code === 'auth/popup-blocked') {
      title = "Ventana emergente bloqueada";
      description = "Tu navegador ha bloqueado la ventana de inicio de sesión. Por favor, busca un ícono en la barra de direcciones para permitir las ventanas emergentes y vuelve a intentarlo.";
    } else if (error.code === 'auth/unauthorized-domain' || (error.message && error.message.includes('requests-from-referer'))) {
      const currentHostname = window.location.hostname;
      const currentOrigin = window.location.origin;

      title = "Error: Dominio no Autorizado";
      description = `El dominio desde el que operas no está en la lista de permitidos. Por favor, verifica estos dos puntos: (1) En Firebase > Authentication > Settings > Authorized domains, asegúrate de que '${currentHostname}' esté en la lista. (2) En Google Cloud > APIs & Services > Credentials, edita tu clave de API web y en "Website restrictions", añade '${currentOrigin}'.`;
    }

    toast({
      variant: "destructive",
      title: title,
      description: description,
      duration: 20000,
    });
  }
}
