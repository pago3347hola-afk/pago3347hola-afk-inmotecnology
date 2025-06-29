import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Home as HomeIcon, BatteryCharging, LifeBuoy, Info, Landmark, TrendingUp } from "lucide-react";

const services = [
  {
    icon: <HomeIcon className="w-8 h-8 text-primary" />,
    title: "Empieza a Invertir",
    description: "Invierte en nuestras propiedades exclusivas con retornos seguros",
    link: "/properties",
  },
  {
    icon: <BatteryCharging className="w-8 h-8 text-primary" />,
    title: "Gestionar Cuenta",
    description: "Recarga tu saldo y gestiona tus finanzas de forma segura.",
    link: "/account",
  },
  {
    icon: <LifeBuoy className="w-8 h-8 text-primary" />,
    title: "Soporte Dedicado",
    description: "Nuestro equipo está aquí para ayudarte en cada paso.",
    link: "/support",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full py-24 md:py-32 lg:py-40 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-heading">
            La Nueva Era de la Inversión Inmobiliaria
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            En InmoTecnología, integramos herramientas digitales de vanguardia para que tu inversión inmobiliaria sea más inteligente, segura y rentable.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="font-bold">
              <Link href="/properties">EMPEZAR A INVERTIR <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Propiedad Destacada</h2>
            <p className="mt-4 text-lg text-muted-foreground">Una oportunidad de inversión única que no querrás dejar pasar.</p>
          </div>
          <div className="mt-12 max-w-2xl mx-auto">
             <Card className="relative overflow-hidden rounded-xl border shadow-lg group">
                <Badge className="absolute top-4 right-4 z-10">Propiedad Destacada</Badge>
                <CardHeader className="p-0">
                  <Image
                    src="https://http2.mlstatic.com/D_NQ_NP_2X_815107-MLM81432530034_122024-F-residencia-en-venta-en-lomas-de-juriquilla-diseno-de-autor-materiales-premium.webp"
                    data-ai-hint="luxury residence modern"
                    alt="residencia ejecutiva"
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-6">
                      <CardTitle className="font-headline text-3xl">residencia ejecutiva</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-6">
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
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
           <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Servicios a tu Medida</h2>
            <p className="mt-4 text-lg text-muted-foreground">Todo lo que necesitas para una inversión inmobiliaria exitosa.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    {service.icon}
                  </div>
                </div>
                <h3 className="font-headline text-xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground mt-2">{service.description}</p>
                 <Button asChild variant="link" className="mt-4 text-primary">
                  <Link href={service.link}>
                    {service.title === 'Gestionar Cuenta' ? 'Ver demo' : 'Saber más'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
