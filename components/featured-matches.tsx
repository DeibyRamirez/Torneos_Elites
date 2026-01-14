"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const matches = [
  {
    id: 1,
    status: "EN VIVO",
    homeTeam: "Tigres FC",
    awayTeam: "Leones United",
    homeScore: 2,
    awayScore: 1,
    time: "78'",
    venue: "Estadio Nacional",
  },
  {
    id: 2,
    status: "PRÓXIMO",
    homeTeam: "Águilas SC",
    awayTeam: "Halcones FC",
    homeScore: null,
    awayScore: null,
    time: "19:00",
    venue: "Arena Deportiva",
  },
  {
    id: 3,
    status: "FINALIZADO",
    homeTeam: "Pumas AC",
    awayTeam: "Lobos FC",
    homeScore: 3,
    awayScore: 3,
    time: "FT",
    venue: "Estadio Central",
  },
]

export function PartidosDestacados() {
  return (
    <section className="bg-background py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold">PARTIDOS DESTACADOS</h2>
          <Link href="/resultados">
            <Button variant="ghost" className="font-bold">
              VER TODOS →
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <div
              key={match.id}
              className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    variant={match.status === "EN VIVO" ? "default" : "secondary"}
                    className={
                      match.status === "EN VIVO"
                        ? "bg-primary text-white font-bold"
                        : "bg-muted text-muted-foreground font-bold"
                    }
                  >
                    {match.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground font-medium">{match.time}</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">{match.homeTeam}</span>
                    {match.homeScore !== null && (
                      <span className="font-display text-3xl font-bold">{match.homeScore}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">{match.awayTeam}</span>
                    {match.awayScore !== null && (
                      <span className="font-display text-3xl font-bold">{match.awayScore}</span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">{match.venue}</p>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
