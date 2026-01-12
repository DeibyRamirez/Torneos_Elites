import Link from "next/link"

const footerLinks = {
  torneo: [
    { name: "Acerca de", href: "/acerca" },
    { name: "Reglamento", href: "/reglamento" },
    { name: "Contacto", href: "/contacto" },
    { name: "Prensa", href: "/prensa" },
  ],
  recursos: [
    { name: "Calendario", href: "/eventos" },
    { name: "Resultados", href: "/resultados" },
    { name: "Estadísticas", href: "/estadisticas" },
    { name: "Archivo", href: "/archivo" },
  ],
  legal: [
    { name: "Privacidad", href: "/privacidad" },
    { name: "Términos", href: "/terminos" },
    { name: "Cookies", href: "/cookies" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-xl font-bold text-white">T</span>
              </div>
              <span className="font-display text-xl font-bold">TORNEO ÉLITE</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La competencia deportiva más emocionante del año. Sigue todos los partidos en vivo.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-3 lg:grid-cols-3">
            <div>
              <h3 className="font-bold mb-4">Torneo</h3>
              <ul className="space-y-3">
                {footerLinks.torneo.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Recursos</h3>
              <ul className="space-y-3">
                {footerLinks.recursos.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Torneo Élite. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
