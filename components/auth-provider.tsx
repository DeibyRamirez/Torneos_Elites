"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { SiteHeader } from "@/components/site-header"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) return null // O un spinner de carga

  return (
    <>
      {/* QUITAMOS EL {user && ...} para que el Header gestione su estado interno */}
      <SiteHeader user={user} />
      
      <div className="pt-[73px]">{children}</div>
    </>
  )
}