'use client';

import Link from "next/link";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Banknote, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RechargePage() {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitProof = () => {
    if (!email || !file) {
      toast({
        variant: "destructive",
        title: "Campos Incompletos",
        description: "Por favor, introduce tu email y selecciona un archivo de imagen.",
      });
      return;
    }

    toast({
      title: "Comprobante Enviado",
      description: "Hemos recibido tu comprobante. Lo verificaremos a la brevedad.",
    });

    setEmail('');
    setFile(null);
    const fileInput = document.getElementById('payment-proof') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
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
              <CardTitle className="font-headline text-3xl">Recargar Saldo</CardTitle>
              <CardDescription>Añade fondos a tu cuenta de InmoTecnología.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Cantidad (MXN)</Label>
                <Input id="amount" type="number" placeholder="Ej: 500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-method">Método de Pago</Label>
                 <Select defaultValue="transfer">
                    <SelectTrigger id="payment-method">
                        <SelectValue placeholder="Selecciona un método de pago" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="transfer">Transferencia Bancaria</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <Alert>
                <Banknote className="h-4 w-4" />
                <AlertTitle>Instrucciones de Transferencia</AlertTitle>
                <AlertDescription>
                  <div className="text-sm space-y-1">
                    <p><strong>Banco:</strong> BBVA México</p>
                    <p><strong>Beneficiario:</strong> InmoTecnología S.A. de C.V.</p>
                    <p><strong>CLABE:</strong> 012180012345678901</p>
                    <p><strong>Referencia:</strong> 12345</p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Una vez realizada la transferencia, el saldo puede tardar hasta 24 horas en reflejarse en tu cuenta.
                  </p>
                </AlertDescription>
              </Alert>

              <div className="space-y-4 border-t pt-6">
                <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Comprobar Pago</h3>
                    <p className="text-sm text-muted-foreground">
                    Para acelerar la acreditación de tu saldo, sube tu comprobante de pago.
                    </p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="user-email">Correo electrónico del usuario que envió el pago</Label>
                    <Input id="user-email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subject">Motivo</Label>
                    <Input id="subject" type="text" value="Pago realizado" readOnly className="bg-muted/50 cursor-default" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="payment-proof">Subir imagen del pago</Label>
                    <Input id="payment-proof" type="file" accept="image/*" onChange={handleFileChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                </div>
                <Button className="w-full" onClick={handleSubmitProof}>
                    <Mail className="mr-2 h-4 w-4" />
                    Enviar Comprobante
                </Button>
              </div>

            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold" size="lg">Confirmar Recarga</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
