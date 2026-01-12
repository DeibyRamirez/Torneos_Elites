"use client"

import Link from "next/link"
import { Menu, X, User } from "lucide-react" // Añadimos User para un toque visual
import { useState } from "react"

const navigation = [
  { name: "EVENTOS", href: "/eventos" },
  { name: "EQUIPOS", href: "/equipos" },
  { name: "JUGADORES", href: "/jugadores" },
  { name: "RESULTADOS", href: "/resultados" },
  { name: "EN VIVO", href: "/en-vivo" },
  { name: "NOTICIAS", href: "/noticias" },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        
        {/* 1. Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <span className="text-xl font-bold text-white">T</span>
            </div>
            <span className="font-display text-2xl font-bold tracking-tight">TORNEOS ÉLITES</span>
          </Link>
        </div>

        {/* 2. Botón Menú Móvil */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* 3. Navegación Desktop */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-bold tracking-wide text-foreground/80 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* 4. Botones Login y Registro Desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          <Link
            href="/login"
            className="text-sm font-bold leading-6 text-foreground/80 hover:text-primary transition-colors"
          >
            INICIAR SESIÓN
          </Link>
          <Link
            href="/registro"
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary/90 transition-all"
          >
            REGISTRARSE
          </Link>
        </div>
      </nav>

      {/* 5. Menú Móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-bold text-foreground/80 hover:bg-muted hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Separador y Botones en Móvil */}
            <div className="mt-4 border-t border-border pt-4 flex flex-col gap-2">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 rounded-md px-3 py-3 text-base font-bold text-foreground/80 border border-border hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-4 w-4" /> INICIAR SESIÓN
              </Link>
              <Link
                href="/registro"
                className="flex items-center justify-center rounded-md bg-primary px-3 py-3 text-base font-bold text-white hover:bg-primary/90"
                onClick={() => setMobileMenuOpen(false)}
              >
                REGISTRARSE
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}