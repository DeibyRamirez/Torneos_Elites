"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase" // Asegúrate de que esta ruta sea correcta

import { HeroSection } from "@/components/hero-section"
import { PartidosDestacados } from "@/components/featured-matches"
import { TopEquipos } from "@/components/top-teams"
import { ProximosEventos } from "@/components/upcoming-events"
import { JugadoresDestacados } from "@/components/featured-players"
import { Dashboard } from "@/components/dashboard"

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Escucha si hay un usuario logueado en Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Mientras Firebase verifica la sesión, no mostramos nada o un spinner
  if (loading) return null 

  return (
    <main className="min-h-screen">
      <HeroSection />
      
      {/* LÓGICA CLAVE: Solo si user existe, se renderiza el Dashboard */}
      {user && <Dashboard user={user} />}
      
      <PartidosDestacados/>
      <ProximosEventos user={user} />
      <TopEquipos  user={user} />
      <JugadoresDestacados user={user} />
    </main>
  )
}