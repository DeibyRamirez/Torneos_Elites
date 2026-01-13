import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteFooter } from "@/components/site-footer"
import { LiveScoreTicker } from "@/components/live-score-ticker"
import { AuthProvider } from "@/components/auth-provider" // Importa lo que creamos

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Torneos Élites 2026 - Competencia Deportiva",
  description: "Sitio oficial del Torneo Élite 2026. Resultados en vivo, calendario, equipos y jugadores.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
        <SiteFooter />
        <LiveScoreTicker />
      </body>
    </html>
  )
}