import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Info, Banknote } from "lucide-react";

export default function WithdrawPage() {
  const currentBalance = 15230.50;
  const formattedBalance = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(currentBalance);


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
                  El saldo actual es de <span className="font-bold text-foreground">{formattedBalance}</span>. Los retiros pueden tardar de 2 a 3 días hábiles en procesarse.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Cantidad a Retirar (MXN)</Label>
                <Input id="withdraw-amount" type="number" placeholder="Ej: 1000" />
              </div>
              <div className="space-y-4 border p-4 rounded-md">
                 <h4 className="font-semibold flex items-center"><Banknote className="mr-2 h-5 w-5 text-muted-foreground"/> Detalles Bancarios</h4>
                 <div className="space-y-2">
                    <Label htmlFor="beneficiary-name">Nombre del Beneficiario</Label>
                    <Input id="beneficiary-name" placeholder="Nombre completo tal como aparece en la cuenta" />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="clabe">CLABE Interbancaria</Label>
                    <Input id="clabe" placeholder="18 dígitos" maxLength={18} />
                 </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold" size="lg">Solicitar Retiro</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
