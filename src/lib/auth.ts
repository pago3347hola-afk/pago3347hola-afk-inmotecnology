'use client';

import { GoogleAuthProvider, signInWithPopup, User, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { toast } from "@/hooks/use-toast";

// Function to create a user profile in Firestore if it doesn't exist
async function createUserProfile(user: User) {
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    // User is new, create a document for them
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      createdAt: new Date(),
      balance: 0, // Set initial balance to 0
    });
    console.log("Nuevo perfil de usuario creado en Firestore.");
  } else {
    console.log("El usuario ya existe en Firestore.");
  }
}

export async function signUpWithEmailAndPassword(email: string, password: string, displayName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update Firebase Auth profile
    await updateProfile(user, { displayName: displayName });

    // The user object from createUserWithEmailAndPassword doesn't immediately have the displayName.
    // We need to pass it to our createUserProfile function manually to ensure it's written to Firestore.
    // Let's create a temporary user object with all the required info.
    const userWithProfile = {
      ...user,
      displayName: displayName,
    };
    
    await createUserProfile(userWithProfile);

    window.location.href = '/account';
  } catch (error: any) {
    console.error("Error de registro de Firebase:", error);
    let title = "Error de Registro";
    let description = "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.";

    switch(error.code) {
        case 'auth/email-already-in-use':
            title = "Correo ya registrado";
            description = "El correo electrónico que ingresaste ya está en uso. Por favor, inicia sesión o usa un correo diferente.";
            break;
        case 'auth/weak-password':
            title = "Contraseña débil";
            description = "La contraseña debe tener al menos 6 caracteres.";
            break;
        case 'auth/invalid-email':
            title = "Correo inválido";
            description = "El formato del correo electrónico no es válido.";
            break;
        default:
            title = `Error Inesperado: ${error.code}`;
            description = "Ocurrió un error no identificado. Revisa la consola para más detalles.";
            break;
    }

    toast({
        variant: "destructive",
        title: title,
        description: description,
    });
    // Re-throw the error so the component can handle its loading state
    throw error;
  }
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Create user profile in Firestore after successful sign-in
    await createUserProfile(user);

    window.location.href = '/account';
  } catch (error: any)
  {
    console.error("Error de autenticación de Firebase:", error);

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

export async function signOutUser() {
  try {
    await signOut(auth);
    window.location.href = '/';
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    toast({
      variant: "destructive",
      title: "Error",
      description: "No se pudo cerrar la sesión. Por favor, inténtalo de nuevo.",
    });
  }
}
