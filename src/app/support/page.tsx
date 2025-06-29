'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendSupportMessage } from "@/ai/flows/send-support-message-flow";

const faqs = [
  {
    question: "¿Cuál es el monto mínimo para invertir?",
    answer: `Actualmente puedes comenzar a invertir desde $300 pesos. Dependiendo del proyecto, las oportunidades van desde $300 hasta $15,000 pesos por inversión. Esta flexibilidad te permite empezar con poco e ir creciendo tu portafolio según tus posibilidades.
Empieza hoy mismo desde $300 y da tu primer paso en el mundo de la inversión Inmobiliaria.`
  },
  {
    question: "¿Qué rendimiento puedo esperar y cada cuánto recibo ganancias?",
    answer: `Nuestros proyectos ofrecen un rendimiento desde el 10% diario, dependiendo del tipo de inversión y el plazo. Las ganancias se comienzan a reflejar de forma diaria, y puedes consultarlas en tiempo real desde la app.

Recuerda que cada proyecto tiene condiciones específicas, por lo que te recomendamos revisar los detalles antes de invertir.
Invierte y empieza a ver resultados desde el primer día.`
  },
  {
    question: "¿Puedo retirar mi inversión en cualquier momento?",
    answer: `Sí, puedes retirar tus ganancias en cualquier momento, siempre y cuando el monto mínimo a retirar sea de $100 pesos.

Una vez que inicies un retiro, deberás esperar a que se procese completamente antes de poder hacer uno nuevo.
Tú decides cuándo retirar: sin plazos forzosos ni complicaciones.`
  },
  {
    question: "¿Cómo seleccionan las propiedades en las que se invierte?",
    answer: `Nuestro equipo analiza cada propiedad cuidadosamente antes de ponerla disponible en la app. Tomamos en cuenta factores como ubicación estratégica, potencial de rentabilidad, plusvalía y demanda del mercado.

Solo se eligen proyectos que ofrecen una buena relación entre riesgo y beneficio, para que tu inversión tenga mayores posibilidades de crecer.
Invertimos tiempo en seleccionar bien, para que tú inviertas con más seguridad.`
  },
  {
    question: "¿Está regulada la plataforma o respaldada legalmente?",
    answer: `Sí. Operamos bajo un marco legal que cumple con las leyes mexicanas, y trabajamos constantemente para garantizar transparencia y seguridad en cada inversión.

Todas las propiedades cuentan con documentación legal en regla, y los procesos están diseñados para proteger tanto tu dinero como tus derechos como inversionista.
Queremos que inviertas con confianza, sabiendo que todo está bien respaldado.`
  },
  {
    question: "¿Mi inversión está segura?",
    answer: `Tu inversión está protegida por un proceso sólido: cada proyecto pasa por una revisión legal y financiera antes de ser publicado en la app. Además, trabajamos con propiedades reales y verificadas, lo que le da respaldo tangible a tu dinero.

Usamos medidas de seguridad digital y protección de datos, y tú siempre tienes control sobre tu inversión y tus retiros.
Tu dinero trabaja en proyectos reales, bien seleccionados y con total transparencia.`
  },
  {
    question: "¿Cómo puedo recargar mi saldo?",
    answer: "Puedes recargar tu saldo desde la sección 'Mi Cuenta' > 'Recargar'. Aceptamos transferencias y depósitos bancarios."
  },
  {
    question: "¿Cómo puedo contactar con soporte?",
    answer: "A través de nuestras redes sociales o correo electrónico, un ejecutivo de parte de nuestro equipo estará listo para ayudarte."
  }
]

export default function SupportPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      toast({
        variant: 'destructive',
        title: 'Campos Incompletos',
        description: 'Por favor, rellena todos los campos del formulario.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await sendSupportMessage({ name, email, subject, message });
      if (result.success) {
        toast({
          title: '¡Mensaje Enviado!',
          description: result.message,
        });
        // Clear form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        toast({
          variant: 'destructive',
          title: 'Error al Enviar',
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error Inesperado',
        description: 'Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo.',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
                <AccordionContent className="text-muted-foreground whitespace-pre-line">
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
                  <Input id="name" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input id="subject" placeholder="Asunto de tu consulta" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" placeholder="Describe tu consulta aquí..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <Button className="w-full font-bold" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> 
                    Enviar Mensaje
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
