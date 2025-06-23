import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Home as HomeIcon, BatteryCharging, LifeBuoy } from "lucide-react";

const services = [
  {
    icon: <HomeIcon className="w-8 h-8 text-secondary" />,
    title: "Empieza a Invertir",
    description: "Invierte en nuestras propiedades exclusivas con retornos seguros",
    link: "/properties",
  },
  {
    icon: <BatteryCharging className="w-8 h-8 text-secondary" />,
    title: "Gestionar Cuenta",
    description: "Recarga tu saldo y gestiona tus finanzas de forma segura.",
    link: "/account",
  },
  {
    icon: <LifeBuoy className="w-8 h-8 text-secondary" />,
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
              <Link href="/properties">EMPIEZA A INVERTIR <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
           <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Servicios a tu Medida</h2>
            <p className="mt-4 text-lg text-muted-foreground">Todo lo que necesitas para una gestión inmobiliaria exitosa.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary p-4 rounded-full">
                    {service.icon}
                  </div>
                </div>
                <h3 className="font-headline text-xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground mt-2">{service.description}</p>
                 <Button asChild variant="link" className="mt-4 text-primary">
                  <Link href={service.link}>
                    {service.title === 'Gestionar Cuenta' ? 'demo' : 'Haz click aquí'}
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
