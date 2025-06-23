"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, BatteryCharging, Banknote, LifeBuoy, LogIn, UserPlus } from "lucide-react";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "/", label: "Stephen", icon: <Home className="w-4 h-4" /> },
  { href: "/properties", label: "Propiedades", icon: <Home className="w-4 h-4" /> },
  { href: "/account", label: "Recargar", icon: <BatteryCharging className="w-4 h-4" /> },
  { href: "/account/withdraw", label: "Retiro", icon: <Banknote className="w-4 h-4" /> },
  { href: "/support", label: "Soporte", icon: <LifeBuoy className="w-4 h-4" /> },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar Sesión
            </Link>
          </Button>
          <Button asChild>
            <Link href="/signup">
              <UserPlus className="mr-2 h-4 w-4" />
              Crear Cuenta
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col p-6">
                <Link href="/" className="mb-6" onClick={() => setIsOpen(false)}>
                  <Logo />
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-foreground">
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-6 border-t pt-6 flex flex-col gap-2">
                   <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Iniciar Sesión
                    </Link>
                  </Button>
                  <Button asChild onClick={() => setIsOpen(false)}>
                    <Link href="/signup">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Crear Cuenta
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
