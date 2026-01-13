"use client"

import Link from "next/link"
import { Menu, X, User2, LogOut } from "lucide-react"
import { useState } from "react"
import { User, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

const navigation = [
  { name: "EVENTOS", href: "/eventos" },
  { name: "EQUIPOS", href: "/equipos" },
  { name: "JUGADORES", href: "/jugadores" },
  { name: "RESULTADOS", href: "/resultados" },
  { name: "EN VIVO", href: "/en-vivo" },
  { name: "NOTICIAS", href: "/noticias" },
]

// CAMBIO AQUÍ: Ahora aceptamos User o null
interface HeaderProps {
  user: User | null;
}

export function SiteHeader({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = () => {
    signOut(auth);
  }

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

        {/* 4. LÓGICA DE USUARIO / LOGIN */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          {user ? (
            // Si hay usuario, mostramos su nombre y un botón de salir
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full border border-border">
                <User2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold uppercase">{user.displayName || user.email?.split('@')[0]}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="relative text-xs font-bold text-muted-foreground hover:text-primary transition-colors group"
              >
                CERRAR SESIÓN
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </button>
            </div>
          ) : (
            // Si no hay usuario, mostramos el botón de iniciar sesión
            <Link
              href="/login"
              className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary/90 transition-all"
            >
              INICIAR SESIÓN
            </Link>
          )}
        </div>
      </nav>

      {/* 5. Menú Móvil (Simplificado) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background p-4">
          <div className="flex flex-col gap-4">
            {user ? (
              <div className="flex flex-col gap-2">
                <span className="text-center font-bold text-primary">{user.displayName}</span>
                <button onClick={handleSignOut} className="text-sm text-muted-foreground">Cerrar Sesión</button>
              </div>
            ) : (
              <Link href="/login" className="bg-primary text-white text-center py-3 rounded-md font-bold">
                INICIAR SESIÓN
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}