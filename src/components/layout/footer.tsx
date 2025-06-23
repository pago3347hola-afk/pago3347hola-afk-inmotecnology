import Link from "next/link";
import { Logo } from "@/components/logo";
import { Twitter, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/40 border-t">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Revolucionando el sector inmobiliario con tecnología de punta.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Navegación</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/properties" className="text-muted-foreground hover:text-foreground">Propiedades</Link></li>
              <li><Link href="/account" className="text-muted-foreground hover:text-foreground">Mi Cuenta</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-foreground">Soporte</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Términos de Servicio</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Síguenos</h3>
            <div className="flex items-center gap-4 mt-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InmoTecnología Hub. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
