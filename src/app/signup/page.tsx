'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, Loader2 } from "lucide-react";
import { Logo } from "@/components/logo";
import { signInWithGoogle, signUpWithEmailAndPassword } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";


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
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/account');
    }
  }, [user, loading, router]);
  
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signInWithGoogle();
    setIsLoading(false);
  };
  
  const handleSubmit = async () => {
    if (!fullname || !email || !password || !confirmPassword) {
      toast({ variant: 'destructive', title: 'Campos incompletos', description: 'Por favor, rellena todos los campos.' });
      return;
    }
    if (password !== confirmPassword) {
      toast({ variant: 'destructive', title: 'Las contraseñas no coinciden', description: 'Por favor, verifica tu contraseña.' });
      return;
    }
    if (password.length < 6) {
      toast({ variant: 'destructive', title: 'Contraseña débil', description: 'La contraseña debe tener al menos 6 caracteres.' });
      return;
    }
    if (!terms) {
      toast({ variant: 'destructive', title: 'Términos y condiciones', description: 'Debes aceptar los términos y condiciones para continuar.' });
      return;
    }

    setIsLoading(true);
    try {
      await signUpWithEmailAndPassword(email, password, fullname);
      // On success, the auth function handles redirection
    } catch (error) {
      // On failure, the auth function shows a toast
      console.error("Sign up failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || user) {
    return (
       <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-secondary/20 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center space-y-4">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-6 w-64 mx-auto" />
              <Skeleton className="h-5 w-48 mx-auto" />
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
               <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

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
              <Input id="fullname" placeholder="Tu nombre y apellidos" required value={fullname} onChange={(e) => setFullname(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
              <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isLoading} />
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={terms} onCheckedChange={(checked) => setTerms(Boolean(checked))} disabled={isLoading} />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                    Acepto los{" "}
                    <Link href="#" className="underline text-primary">términos y condiciones</Link>.
                </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full font-bold" size="lg" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Crear mi Cuenta
                  </>
                )}
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
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
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
