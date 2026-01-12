"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const players = [
  {
    id: 1,
    name: "Carlos Martínez",
    team: "Tigres FC",
    position: "DELANTERO",
    number: 10,
    stats: "15 Goles • 8 Asistencias",
    image: "/professional-soccer-player-action-shot.jpg",
    flag: "🇲🇽",
  },
  {
    id: 2,
    name: "Diego Silva",
    team: "Águilas SC",
    position: "MEDIOCAMPISTA",
    number: 8,
    stats: "12 Goles • 10 Asistencias",
    image: "/soccer-midfielder-running-with-ball.jpg",
    flag: "🇦🇷",
  },
  {
    id: 3,
    name: "Roberto Gómez",
    team: "Leones United",
    position: "DEFENSA",
    number: 4,
    stats: "3 Goles • 95% Pases",
    image: "/soccer-defender-heading-ball.jpg",
    flag: "🇧🇷",
  },
  {
    id: 4,
    name: "Miguel Ángel Torres",
    team: "Pumas AC",
    position: "PORTERO",
    number: 1,
    stats: "8 Vallas Invictas",
    image: "/soccer-goalkeeper-diving-save.jpg",
    flag: "🇨🇴",
  },
]

export function FeaturedPlayers() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % players.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + players.length) % players.length)
  }

  return (
    <section className="bg-muted/30 py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold">JUGADORES DESTACADOS</h2>
          <Link href="/jugadores">
            <Button variant="ghost" className="font-bold">
              VER TODOS →
            </Button>
          </Link>
        </div>

        <div className="relative">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {players.map((player) => (
              <div
                key={player.id}
                className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300"
              >
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={player.image || "/placeholder.svg"}
                    alt={player.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  <div className="absolute top-4 right-4">
                    <span className="inline-block bg-primary px-3 py-1 text-xs font-bold text-white">
                      {player.position}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between mb-2">
                      <div>
                        <p className="text-sm text-white/80 mb-1">{player.team}</p>
                        <h3 className="font-display text-2xl font-bold text-white">{player.name}</h3>
                      </div>
                      <span className="font-display text-5xl font-bold text-white/30">{player.number}</span>
                    </div>
                    <p className="text-sm text-white/90">{player.stats}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block">
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
