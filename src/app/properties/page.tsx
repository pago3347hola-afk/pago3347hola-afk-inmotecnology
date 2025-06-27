import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Info, Landmark, TrendingUp } from "lucide-react";

export default function PropertiesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 bg-secondary/20">
      <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden shadow-lg rounded-xl">
          <CardHeader className="p-0">
             <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu1o0NyUqFdZF6kxB1JvRge3lrCkSlHlRwMvAGPQeZ5WLiCKazKrGJiKAF&s=10"
              data-ai-hint="modern house pool"
              alt="casa esmeralda"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="p-6">
                <CardTitle className="font-headline text-3xl">casa esmeralda</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Costo de Inversión</p>
                        <p className="font-bold text-lg">$300.00 MXN</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                     <div>
                        <p className="text-muted-foreground">Retorno Diario</p>
                        <p className="font-bold text-lg">10%</p>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Información de Inversión
              </h3>
              <p className="text-sm text-muted-foreground">
                Tu inversión genera un retorno diario. Puedes retirar tus ganancias al finalizar el plazo de inversión. Ofrecemos plazos flexibles de <strong>1, 7, 14 y 30 días</strong>.
              </p>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/20 p-6">
            <Button asChild className="w-full font-bold" size="lg">
              <Link href="/account/recharge">
                Invierte Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
