'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { Logo } from "@/components/logo";
import { signInWithGoogle } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" {...props} fill="currentColor">
      <path
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.37 1.62-4.38 1.62-3.82 0-6.94-3.1-6.94-6.94s3.12-6.94 6.94-6.94c2.2 0 3.59.88 4.48 1.72l2.4-2.4C18.68 3.24 16.08 2 12.48 2c-5.74 0-10.44 4.6-10.44 10.44s4.7 10.44 10.44 10.44c2.8 0 5.05-.96 6.7-2.62 1.74-1.74 2.33-4.14 2.33-6.5-.02-.82-.1-1.48-.22-2.18h-8.82z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        // User cancelled the login, do nothing.
        return;
      }
      
      let description = "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.";
      if (error.code === 'auth/unauthorized-domain') {
        description = "Este dominio no está autorizado. Por favor, añade 'localhost' a los dominios autorizados en tu consola de Firebase.";
      }
      
      toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: description,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <CardTitle className="font-headline text-3xl">Iniciar Sesión</CardTitle>
            <CardDescription>Accede a tu cuenta para continuar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link href="#" className="text-sm text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                </Link>
               </div>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full font-bold" size="lg">
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar Sesión
            </Button>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  O continúa con
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              <GoogleIcon className="mr-2 h-4 w-4" />
              Iniciar sesión con Google
            </Button>
             <p className="text-sm text-muted-foreground">
                ¿No tienes una cuenta?{" "}
                <Link href="/signup" className="font-semibold text-primary hover:underline">
                Crea una aquí
                </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
