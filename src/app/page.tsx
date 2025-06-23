import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BedDouble, Bath, Square, Home as HomeIcon, BatteryCharging, Banknote, LifeBuoy } from "lucide-react";

const featuredProperties = [
  {
    id: 1,
    title: "Villa de Lujo con Vistas al Mar",
    location: "Marbella, Málaga",
    price: "2,500,000",
    beds: 5,
    baths: 6,
    sqft: 750,
    image: "https://placehold.co/600x400.png",
    aiHint: "luxury villa"
  },
  {
    id: 2,
    title: "Ático Moderno en el Centro",
    location: "Madrid, Madrid",
    price: "1,200,000",
    beds: 3,
    baths: 3,
    sqft: 220,
    image: "https://placehold.co/600x400.png",
    aiHint: "modern apartment"
  },
  {
    id: 3,
    title: "Finca Rústica con Piscina",
    location: "Ibiza, Baleares",
    price: "3,100,000",
    beds: 6,
    baths: 5,
    sqft: 1200,
    image: "https://placehold.co/600x400.png",
    aiHint: "rustic farmhouse"
  },
];

const services = [
  {
    icon: <HomeIcon className="w-8 h-8 text-secondary" />,
    title: "Explorar Propiedades",
    description: "Busca en nuestro extenso catálogo de propiedades de lujo.",
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
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-secondary-foreground">
            La Nueva Era de la Inversión Inmobiliaria
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            InmoTecnología combina la última tecnología con oportunidades de inversión exclusivas.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="font-bold">
              <Link href="/properties">empieza a invertir <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Propiedades Destacadas</h2>
            <p className="mt-4 text-lg text-muted-foreground">Una selección curada de nuestras mejores propiedades.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((prop) => (
              <Card key={prop.id} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <Image src={prop.image} alt={prop.title} width={600} height={400} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={prop.aiHint} />
                </CardHeader>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">{prop.location}</Badge>
                  <h3 className="font-headline text-2xl font-bold text-gray-800">{prop.title}</h3>
                  <p className="text-2xl font-bold text-primary mt-2">{prop.price} €</p>
                  <div className="flex justify-between text-muted-foreground mt-4 border-t pt-4">
                    <div className="flex items-center gap-2"><BedDouble className="w-5 h-5" /> {prop.beds}</div>
                    <div className="flex items-center gap-2"><Bath className="w-5 h-5" /> {prop.baths}</div>
                    <div className="flex items-center gap-2"><Square className="w-5 h-5" /> {prop.sqft} m²</div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                  <Link href={service.link}>Saber más <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Lo que Dicen Nuestros Clientes</h2>
            <p className="mt-4 text-lg text-muted-foreground">La confianza es nuestro mayor activo.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" />
                    <AvatarFallback>JC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">Juan Carlos</p>
                    <p className="text-sm text-muted-foreground">Inversor</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"La plataforma es increíblemente intuitiva y el equipo de soporte es de primera. ¡Totalmente recomendado!"</p>
              </CardContent>
            </Card>
             <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">Maria Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Agente Inmobiliario</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"Facilita enormemente la gestión de propiedades y clientes. Un antes y un después en mi carrera."</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" />
                    <AvatarFallback>LP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">Laura Pérez</p>
                    <p className="text-sm text-muted-foreground">Compradora de vivienda</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"Encontré la casa de mis sueños en una semana. El proceso fue transparente y muy sencillo."</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
