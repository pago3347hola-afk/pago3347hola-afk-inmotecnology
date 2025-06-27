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
    console.error("Error de Autenticación de Firebase:", error);

    let title = "Error de inicio de sesión";
    let description = "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.";

    if (error.code) {
        switch (error.code) {
            case 'auth/popup-closed-by-user':
            case 'auth/cancelled-popup-request':
                // No mostramos una notificación para esto, es una acción normal del usuario.
                return;
            case 'auth/popup-blocked':
                title = "Ventana emergente bloqueada";
                description = "Tu navegador ha bloqueado la ventana de inicio de sesión. Por favor, permite las ventanas emergentes para este sitio.";
                break;
            case 'auth/unauthorized-domain':
                title = "Dominio no Autorizado";
                description = "Este dominio no está autorizado para realizar operaciones de autenticación. Revisa la configuración de tu proyecto en Firebase.";
                break;
            default:
                if (error.message && error.message.includes('requests-from-referer')) {
                  title = "Dominio no Autorizado";
                  description = "La URL desde la que se ejecuta la aplicación no está permitida. Asegúrate de añadirla en las 'Restricciones de clave de API' de Google Cloud.";
                } else {
                  description = `Ocurrió un error: ${error.code}. Revisa la consola para más detalles.`;
                }
                break;
        }
    }

    toast({
      variant: "destructive",
      title: title,
      description: description,
      duration: 9000,
    });
  }
}
