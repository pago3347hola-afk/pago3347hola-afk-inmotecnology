'use client';

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BatteryCharging, Banknote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !userData) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-12">
          <Skeleton className="h-12 w-1/2 mb-4" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <Skeleton className="h-6 w-1/3 mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-1/2" />
            </CardContent>
          </Card>
          <Card className="md:col-span-2 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Skeleton className="h-8 w-32 mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-9 w-36" />
              </div>
              <div>
                <Skeleton className="h-8 w-32 mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-9 w-40" />
              </div>
            </div>
          </Card>
        </div>
         <div className="mt-12">
          <Skeleton className="h-8 w-1/3 mb-6" />
          <Card>
              <CardContent className="p-6">
                   <Skeleton className="h-20 w-full" />
              </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formattedBalance = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(userData.balance);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Bienvenido, {userData.displayName}</h1>
        <p className="mt-4 text-lg text-muted-foreground">Gestiona tus finanzas y transacciones.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Saldo Actual</CardTitle>
            <CardDescription>Tu balance disponible en la plataforma.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{formattedBalance}</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 grid md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
          <div className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <BatteryCharging className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Recargar Saldo</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Añade fondos a tu cuenta de forma rápida y segura.</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/account/recharge">Recargar ahora <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </div>
          <div className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Banknote className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Retirar Fondos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Transfiere tu saldo a tu cuenta bancaria.</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/account/withdraw">Solicitar retiro <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </div>
        </Card>
      </div>
      
       <div className="mt-12">
        <h2 className="font-headline text-3xl font-bold mb-6">Historial de Transacciones</h2>
        <Card>
            <CardContent className="p-6">
                <p className="text-muted-foreground text-center py-8">No hay transacciones recientes.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
