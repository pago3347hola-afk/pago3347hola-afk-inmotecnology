import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Calendar, Landmark, TrendingUp } from "lucide-react";

export default function PropertiesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 bg-secondary/20">
      <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden shadow-lg rounded-xl">
          <CardHeader className="p-0">
             <Image
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
              data-ai-hint="country house pool"
              alt="Casa de campo humilde con alberca"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="p-6">
                <CardTitle className="font-headline text-3xl">Casa de Campo con Alberca</CardTitle>
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

            <div className="space-y-4">
              <Label className="font-semibold text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Selecciona el Plazo de Retorno
              </Label>
              <RadioGroup defaultValue="7d" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: "1d", label: "1 Día" },
                  { value: "7d", label: "7 Días" },
                  { value: "14d", label: "14 Días" },
                  { value: "30d", label: "30 Días" },
                ].map((option) => (
                  <div key={option.value}>
                    <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                    <Label
                      htmlFor={option.value}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
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
