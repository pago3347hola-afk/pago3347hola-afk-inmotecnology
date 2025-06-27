'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus } from "lucide-react";
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

export default function SignupPage() {
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        // User cancelled the login, do nothing.
        return;
      }
      
      let title = "Error al crear cuenta";
      let description = `Ocurrió un error inesperado. Por favor, inténtalo de nuevo. (${error.message})`;

      if (error.code === 'auth/unauthorized-domain') {
        title = "Dominio no autorizado";
        description = "Este dominio no está autorizado. Revisa que 'localhost' esté en los 'Dominios autorizados' de Firebase y que 'http://localhost:9002' esté en los 'Orígenes de JavaScript autorizados' en Google Cloud. Los cambios pueden tardar unos minutos en aplicarse.";
      }
      
      toast({
        variant: "destructive",
        title: title,
        description: description,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-secondary/20 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <CardTitle className="font-headline text-3xl">Crear Cuenta</CardTitle>
            <CardDescription>Únete a la revolución inmobiliaria.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Nombre Completo</Label>
              <Input id="fullname" placeholder="Tu nombre y apellidos" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
              <Input id="confirm-password" type="password" required />
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                    Acepto los{" "}
                    <Link href="#" className="underline text-primary">términos y condiciones</Link>.
                </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full font-bold" size="lg">
                <UserPlus className="mr-2 h-4 w-4" />
                Crear mi Cuenta
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
              Crear cuenta con Google
            </Button>
             <p className="text-sm text-muted-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                Inicia sesión
                </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}