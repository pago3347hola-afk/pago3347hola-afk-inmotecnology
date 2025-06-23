import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus } from "lucide-react";
import { Logo } from "@/components/logo";

export default function SignupPage() {
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
