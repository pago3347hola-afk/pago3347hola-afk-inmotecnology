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
    
    let title = "Error de inicio de sesión";
    let description = `Ocurrió un error inesperado. Por favor, inténtalo de nuevo. Código: ${error.code}`;

    if (error.code === 'auth/unauthorized-domain') {
      title = "Dominio no autorizado";
      description = "Este dominio no está autorizado. Asegúrate de que 'localhost' esté en los 'Dominios autorizados' de Firebase y que 'http://localhost:9002' esté en los 'Orígenes de JavaScript autorizados' en Google Cloud.";
    } else if (error.code === 'auth/internal-error') {
       title = "Error Interno de Autenticación";
       description = "Ocurrió un error en el servidor de autenticación. Verifica que la 'API de Identity Toolkit' y la pantalla de consentimiento de OAuth estén configuradas correctamente en Google Cloud.";
    }

    toast({
      variant: "destructive",
      title: title,
      description: description,
    });
    
    console.error("Error de Autenticación de Firebase:", error);
  }
}
