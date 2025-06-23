import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare, Send } from "lucide-react";

const faqs = [
  {
    question: "¿Cómo puedo recargar mi saldo?",
    answer: "Puedes recargar tu saldo desde la sección 'Mi Cuenta' > 'Recargar'. Aceptamos tarjetas de crédito, PayPal y transferencia bancaria."
  },
  {
    question: "¿Cuánto tiempo tarda un retiro?",
    answer: "Los retiros suelen procesarse en un plazo de 2 a 3 días hábiles. Recibirás una notificación por correo electrónico una vez que se complete la transacción."
  },
  {
    question: "¿Son seguras mis inversiones?",
    answer: "La seguridad es nuestra máxima prioridad. Utilizamos encriptación de extremo a extremo y trabajamos con socios financieros de confianza para proteger tus fondos e información."
  },
  {
    question: "¿Cómo puedo contactar con un agente inmobiliario?",
    answer: "En la página de cada propiedad, encontrarás un formulario de contacto para comunicarte directamente con el agente responsable. También puedes solicitar una llamada desde nuestro equipo de soporte."
  }
]

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Centro de Soporte</h1>
        <p className="mt-4 text-lg text-muted-foreground">¿Necesitas ayuda? Estamos aquí para ti.</p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-headline text-3xl font-bold mb-6">Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="font-semibold text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Envíanos un Mensaje</CardTitle>
              <CardDescription>Nuestro equipo te responderá lo antes posible.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input id="subject" placeholder="Asunto de tu consulta" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" placeholder="Describe tu consulta aquí..." rows={5} />
              </div>
              <Button className="w-full font-bold">
                <Send className="mr-2 h-4 w-4" /> Enviar Mensaje
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col md:flex-row items-center justify-between p-6 bg-secondary/50">
            <div>
              <h3 className="font-headline text-xl font-bold">¿Prefieres hablar en tiempo real?</h3>
              <p className="text-muted-foreground">Inicia un chat con uno de nuestros especialistas.</p>
            </div>
            <Button className="mt-4 md:mt-0 font-bold">
              <MessageSquare className="mr-2 h-4 w-4" /> Iniciar Chat en Vivo
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
