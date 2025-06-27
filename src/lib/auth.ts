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

      title = "Error Crítico: Dominio no Autorizado";
      description = `Tu aplicación se está ejecutando desde una URL que no está autorizada para usar los servicios de Firebase.
      
Causa: El dominio '${currentHostname}' no está en la lista de sitios web permitidos en la configuración de tu Clave de API de Google Cloud.

SOLUCIÓN - PASO A PASO:

1. Ve a la Consola de Google Cloud > Credenciales.

2. Edita la Clave de API:
Busca la clave llamada "Browser key (auto created by Firebase)" y haz clic en su nombre.

3. Añade tu Dominio:
- En "Restricciones de aplicaciones", selecciona "Sitios web".
- Haz clic en "AÑADIR".
- Pega la siguiente URL exacta: ${currentOrigin}

4. Guarda los Cambios.

Tras guardar, espera un minuto y vuelve a intentarlo.`;
    }

    toast({
      variant: "destructive",
      title: title,
      description: description,
      duration: 30000,
    });
  }
}
