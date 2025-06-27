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
       title = "Error de Configuración";
       description = "Hay un error de configuración. Verifica en la Consola de Google Cloud que en 'Orígenes de JavaScript autorizados' esté 'http://localhost:9002' y que en 'URI de redireccionamiento autorizados' esté el handler de Firebase.";
    }

    toast({
      variant: "destructive",
      title: title,
      description: description,
    });
    
    console.error("Error de Autenticación de Firebase:", error);
  }
}
