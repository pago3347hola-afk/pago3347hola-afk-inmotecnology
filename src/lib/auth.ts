'use client';

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "@/hooks/use-toast";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
    window.location.href = '/account';
  } catch (error: any)
  {
    console.error("Firebase Auth Error:", error);

    let title = "Error de inicio de sesión";
    let description = "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.";

    if (error.code) {
      if (error.message.includes('requests-from-referer')) {
        title = "CONFIGURACIÓN FINAL REQUERIDA";
        description = `¡Casi listo! Este es el último paso. Tu dominio actual no está autorizado en Google Cloud.

LISTA DE VERIFICACIÓN:
---------------------------------
1.  **URL a autorizar (Cópiala):**
    ${window.location.origin}

2.  **Ve a Google Cloud -> Credenciales.**
    (Puedes usar el enlace de la consola)

3.  **Edita la Clave de API:**
    - Busca la clave llamada "Browser key (auto created by Firebase)".
    - Haz clic en su nombre para editar.

4.  **Añade la URL:**
    - En "Restricciones de sitios web", haz clic en "AÑADIR".
    - Pega la URL del paso 1.

5.  **Guarda y espera 1 minuto antes de reintentar.**
`;
      } else {
        switch (error.code) {
            case 'auth/popup-closed-by-user':
            case 'auth/cancelled-popup-request':
                return; // No mostrar error si el usuario cancela.
            case 'auth/popup-blocked':
                title = "Ventana emergente bloqueada";
                description = "Tu navegador ha bloqueado la ventana de inicio de sesión. Busca un ícono en la barra de direcciones para permitir ventanas emergentes y vuelve a intentarlo.";
                break;
            case 'auth/unauthorized-domain':
                title = "Dominio no autorizado en Firebase";
                description = `El dominio desde el que intentas iniciar sesión no está en la lista de dominios autorizados de Firebase.

Solución:
1. Ve a Firebase Console > Authentication > Settings > Authorized domains.
2. Añade el dominio: ${new URL(window.location.href).hostname}`;
                break;
            default:
                title = `Error Inesperado: ${error.code}`;
                description = "Ocurrió un error no identificado. Revisa la consola del navegador para más detalles.";
                break;
        }
      }
    }

    toast({
      variant: "destructive",
      title: title,
      description: description,
      duration: 30000,
    });
  }
}
