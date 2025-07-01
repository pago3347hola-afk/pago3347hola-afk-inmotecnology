'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Info, Banknote, Mail, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { requestWithdrawal } from "@/ai/flows/request-withdrawal-flow";
import { Skeleton } from "@/components/ui/skeleton";

export default function WithdrawPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  
  const [amount, setAmount] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [clabe, setClabe] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);


  if (loading || !userData) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)] bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-xl mx-auto">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-64 mt-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                <Skeleton className="h-16 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-4 border p-4 rounded-md">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-12 w-full" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const formattedBalance = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(userData.balance);

  const handleSubmit = async () => {
    const withdrawalAmount = parseFloat(amount);

    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
        toast({ variant: "destructive", title: "Monto inválido", description: "Por favor, introduce una cantidad válida para retirar." });
        return;
    }
    if (withdrawalAmount > userData.balance) {
        toast({ variant: "destructive", title: "Saldo insuficiente", description: "No puedes retirar más de tu saldo actual." });
        return;
    }
    if (!beneficiaryName || (!clabe && !cardNumber)) {
        toast({ variant: "destructive", title: "Campos incompletos", description: "Por favor, completa el nombre del beneficiario y CLABE o número de tarjeta." });
        return;
    }
    if (clabe && clabe.length !== 18) {
      toast({ variant: "destructive", title: "CLABE inválida", description: "La CLABE debe tener 18 dígitos." });
      return;
    }


    setIsLoading(true);
    try {
        const result = await requestWithdrawal({
            amount: withdrawalAmount,
            beneficiaryName,
            clabe,
            cardNumber,
            userEmail: userData.email,
        });

        if (result.success) {
            const userDocRef = doc(db, 'users', user!.uid);
            const newBalance = userData.balance - withdrawalAmount;
            await updateDoc(userDocRef, { balance: newBalance });

            toast({ title: "¡Solicitud Enviada!", description: result.message });
            // Reset form
            setAmount('');
            setBeneficiaryName('');
            setClabe('');
            setCardNumber('');
        } else {
            toast({ variant: "destructive", title: "Error en la Solicitud", description: result.message });
        }
    } catch (error) {
        toast({ variant: "destructive", title: "Error Inesperado", description: "Ocurrió un error al procesar tu solicitud." });
        console.error(error);
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)] bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-xl mx-auto">
          <div className="mb-4">
             <Button variant="ghost" asChild>
              <Link href="/account"><ArrowLeft className="mr-2 h-4 w-4" /> Volver a la cuenta</Link>
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Retirar Fondos</CardTitle>
              <CardDescription>Transfiere fondos de tu cuenta de InmoTecnología a tu banco.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Información Importante</AlertTitle>
                <AlertDescription>
                  Tu saldo actual es de <span className="font-bold text-foreground">{formattedBalance}</span>. Los retiros pueden tardar de 2 a 3 días hábiles en procesarse.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Cantidad a Retirar (MXN)</Label>
                <Input id="withdraw-amount" type="number" placeholder="Ej: 1000" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div className="space-y-4 border p-4 rounded-md">
                 <h4 className="font-semibold flex items-center"><Banknote className="mr-2 h-5 w-5 text-muted-foreground"/> Detalles Bancarios</h4>
                 <div className="space-y-2">
                    <Label htmlFor="beneficiary-name">Nombre del Beneficiario</Label>
                    <Input id="beneficiary-name" placeholder="Nombre completo tal como aparece en la cuenta" value={beneficiaryName} onChange={(e) => setBeneficiaryName(e.target.value)} />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="clabe">CLABE Interbancaria (18 dígitos)</Label>
                    <Input id="clabe" placeholder="Opcional si proporcionas tarjeta" value={clabe} onChange={(e) => setClabe(e.target.value)} maxLength={18} />
                 </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Número de Tarjeta (16 dígitos)</Label>
                    <Input id="card-number" placeholder="Opcional si proporcionas CLABE" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength={16} />
                 </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold" size="lg" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    "Solicitar Retiro"
                  )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
