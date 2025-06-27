
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Info, Landmark, TrendingUp } from "lucide-react";

export default function PropertiesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 bg-secondary/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card className="overflow-hidden rounded-xl border-0 shadow-none">
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

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="investment-info-1" className="border-b-0">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <span className="font-semibold text-base flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Información de Inversión
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="bg-muted/30 p-3 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Ingresos Diarios</p>
                        <p className="font-bold text-base text-foreground">$30 MXN</p>
                    </div>
                     <div className="bg-muted/30 p-3 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Ingresos Semanales</p>
                        <p className="font-bold text-base text-foreground">$210 MXN</p>
                    </div>
                     <div className="bg-muted/30 p-3 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Ingresos Mensuales</p>
                        <p className="font-bold text-base text-foreground">$900 MXN</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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

        <Card className="overflow-hidden rounded-xl border-0 shadow-none">
          <CardHeader className="p-0">
             <Image
              src="https://http2.mlstatic.com/D_NQ_NP_2X_815107-MLM81432530034_122024-F-residencia-en-venta-en-lomas-de-juriquilla-diseno-de-autor-materiales-premium.webp"
              data-ai-hint="luxury residence modern"
              alt="casa executive"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="p-6">
                <CardTitle className="font-headline text-3xl">casa executive</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Costo de Inversión</p>
                        <p className="font-bold text-lg">$500.00 MXN</p>
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

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="investment-info-2" className="border-b-0">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <span className="font-semibold text-base flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Información de Inversión
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="bg-muted/30 p-3 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Ingresos Diarios</p>
                        <p className="font-bold text-base text-foreground">$50 MXN</p>
                    </div>
                     <div className="bg-muted/30 p-3 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Ingresos Semanales</p>
                        <p className="font-bold text-base text-foreground">$350 MXN</p>
                    </div>
                     <div className="bg-muted/30 p-3 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Ingresos Mensuales</p>
                        <p className="font-bold text-base text-foreground">$1500 MXN</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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

        <Card className="overflow-hidden rounded-xl border-0 shadow-none">
          <CardHeader className="p-0">
             <Image
              src="https://i0.wp.com/epmqro.com/wp-content/uploads/2020/08/2.1.jpeg?fit=800%2C600&ssl=1"
              data-ai-hint="modern house exterior"
              alt="casa executive"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="p-6">
                <CardTitle className="font-headline text-3xl">casa executive</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Costo de Inversión</p>
                        <p className="font-bold text-lg">$500.00 MXN</p>
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

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="investment-info-3" className="border-b-0">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <span className="font-semibold text-base flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Información de Inversión
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="bg-muted/30 p-3 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Ingresos Diarios</p>
                        <p className="font-bold text-base text-foreground">$50 MXN</p>
                    </div>
                     <div className="bg-muted/30 p-3 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Ingresos Semanales</p>
                        <p className="font-bold text-base text-foreground">$350 MXN</p>
                    </div>
                     <div className="bg-muted/30 p-3 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Ingresos Mensuales</p>
                        <p className="font-bold text-base text-foreground">$1500 MXN</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
