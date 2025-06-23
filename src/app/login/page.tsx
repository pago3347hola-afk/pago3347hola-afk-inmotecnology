import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { Logo } from "@/components/logo";

export default function LoginPage() {
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
