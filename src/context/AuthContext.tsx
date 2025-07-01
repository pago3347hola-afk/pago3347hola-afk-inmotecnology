'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { signOutUser as signOut } from '@/lib/auth';

interface UserProfile extends DocumentData {
  uid: string;
  email: string;
  displayName: string;
  balance: number;
}

interface AuthContextType {
  user: User | null;
  userData: UserProfile | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, set up a real-time listener for their profile
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const unsubSnapshot = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setUserData(doc.data() as UserProfile);
          } else {
            console.error("No se encontró el perfil de usuario en Firestore para UID:", firebaseUser.uid);
            setUserData(null);
          }
          setUser(firebaseUser);
          setLoading(false);
        }, (error) => {
          console.error("Error al obtener el perfil del usuario:", error);
          setUser(firebaseUser); // Still set user, but data will be null
          setLoading(false);
        });
        
        // Return the snapshot listener unsubscriber to clean up
        return () => unsubSnapshot();
      } else {
        // User is signed out
        setUser(null);
        setUserData(null);
        setLoading(false);
      }
    });

    // Return the auth state listener unsubscriber to clean up
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut();
    // The onAuthStateChanged listener will handle setting user and userData to null
  };

  const value = { user, userData, loading, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
