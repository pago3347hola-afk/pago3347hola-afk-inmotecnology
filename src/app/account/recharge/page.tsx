import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CreditCard } from "lucide-react";

export default function RechargePage() {
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
              <CardDescription>Añade fondos a tu cuenta de InmoTecnología Hub.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Cantidad (€)</Label>
                <Input id="amount" type="number" placeholder="Ej: 500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-method">Método de Pago</Label>
                 <Select>
                    <SelectTrigger id="payment-method">
                        <SelectValue placeholder="Selecciona un método de pago" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="credit-card">Tarjeta de Crédito / Débito</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="transfer">Transferencia Bancaria</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-4 border p-4 rounded-md">
                 <h4 className="font-semibold flex items-center"><CreditCard className="mr-2 h-5 w-5 text-muted-foreground"/> Detalles de la Tarjeta</h4>
                 <div className="space-y-2">
                    <Label htmlFor="card-number">Número de Tarjeta</Label>
                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="expiry-date">Fecha de Caducidad</Label>
                        <Input id="expiry-date" placeholder="MM/AA" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                    </div>
                 </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold" size="lg">Pagar de forma segura</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
