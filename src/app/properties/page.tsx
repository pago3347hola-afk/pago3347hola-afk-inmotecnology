import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BedDouble, Bath, Square, Search } from "lucide-react";

const properties = [
  { id: 1, title: "Villa de Lujo con Vistas al Mar", location: "Marbella, Málaga", price: "2,500,000", beds: 5, baths: 6, sqft: 750, image: "https://placehold.co/600x400.png", aiHint: "luxury villa sea" },
  { id: 2, title: "Ático Moderno en el Centro", location: "Madrid, Madrid", price: "1,200,000", beds: 3, baths: 3, sqft: 220, image: "https://placehold.co/600x400.png", aiHint: "modern penthouse" },
  { id: 3, title: "Finca Rústica con Piscina", location: "Ibiza, Baleares", price: "3,100,000", beds: 6, baths: 5, sqft: 1200, image: "https://placehold.co/600x400.png", aiHint: "rustic farmhouse pool" },
  { id: 4, title: "Apartamento en Primera Línea de Playa", location: "Valencia, Valencia", price: "750,000", beds: 2, baths: 2, sqft: 120, image: "https://placehold.co/600x400.png", aiHint: "beachfront apartment" },
  { id: 5, title: "Chalet en la Montaña", location: "Pirineos, Huesca", price: "890,000", beds: 4, baths: 3, sqft: 400, image: "https://placehold.co/600x400.png", aiHint: "mountain chalet" },
  { id: 6, title: "Piso Histórico Reformado", location: "Barcelona, Barcelona", price: "980,000", beds: 3, baths: 2, sqft: 180, image: "https://placehold.co/600x400.png", aiHint: "historic apartment" },
];

export default function PropertiesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Descubre tu Próximo Hogar</h1>
        <p className="mt-4 text-lg text-muted-foreground">Explora nuestra selección exclusiva de propiedades.</p>
      </div>

      <Card className="p-4 md:p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Buscar por ubicación o palabra clave..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de Propiedad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="atico">Ático</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="chalet">Chalet</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Rango de Precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Menos de 1,000,000 €</SelectItem>
              <SelectItem value="2">1,000,000 € - 2,000,000 €</SelectItem>
              <SelectItem value="3">Más de 2,000,000 €</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full font-bold">Buscar</Button>
        </div>
      </Card>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((prop) => (
          <Card key={prop.id} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-0">
              <Image src={prop.image} alt={prop.title} width={600} height={400} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={prop.aiHint} />
              <div className="p-6">
                <Badge variant="secondary" className="mb-2">{prop.location}</Badge>
                <h3 className="font-headline text-2xl font-bold text-gray-800 h-16">{prop.title}</h3>
                <p className="text-2xl font-bold text-primary mt-2">{prop.price} €</p>
                <div className="flex justify-between text-muted-foreground mt-4 border-t pt-4">
                  <div className="flex items-center gap-2"><BedDouble className="w-5 h-5" /> {prop.beds}</div>
                  <div className="flex items-center gap-2"><Bath className="w-5 h-5" /> {prop.baths}</div>
                  <div className="flex items-center gap-2"><Square className="w-5 h-5" /> {prop.sqft} m²</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
