"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data - En producción esto vendría de tu backend
const fixtures = {
  jornada1: [
    {
      id: 1,
      home: "Tigres FC",
      away: "Leones United",
      homeScore: 2,
      awayScore: 1,
      date: "2025-03-01",
      time: "16:00",
      venue: "Estadio Nacional",
      status: "FINALIZADO",
    },
    {
      id: 2,
      home: "Águilas SC",
      away: "Pumas AC",
      homeScore: 1,
      awayScore: 1,
      date: "2025-03-01",
      time: "19:00",
      venue: "Arena Deportiva",
      status: "FINALIZADO",
    },
    {
      id: 3,
      home: "Halcones FC",
      away: "Lobos FC",
      homeScore: 3,
      awayScore: 0,
      date: "2025-03-02",
      time: "15:00",
      venue: "Complejo Olímpico",
      status: "FINALIZADO",
    },
    {
      id: 4,
      home: "Cóndores SC",
      away: "Panteras United",
      homeScore: 2,
      awayScore: 2,
      date: "2025-03-02",
      time: "18:00",
      venue: "Estadio Central",
      status: "FINALIZADO",
    },
  ],
  jornada2: [
    {
      id: 5,
      home: "Leones United",
      away: "Águilas SC",
      homeScore: 1,
      awayScore: 0,
      date: "2025-03-08",
      time: "16:30",
      venue: "Estadio Nacional",
      status: "FINALIZADO",
    },
    {
      id: 6,
      home: "Pumas AC",
      away: "Halcones FC",
      homeScore: 2,
      awayScore: 3,
      date: "2025-03-08",
      time: "19:30",
      venue: "Arena Deportiva",
      status: "FINALIZADO",
    },
    {
      id: 7,
      home: "Lobos FC",
      away: "Tigres FC",
      homeScore: 0,
      awayScore: 4,
      date: "2025-03-09",
      time: "15:00",
      venue: "Complejo Olímpico",
      status: "FINALIZADO",
    },
    {
      id: 8,
      home: "Panteras United",
      away: "Cóndores SC",
      homeScore: 1,
      awayScore: 1,
      date: "2025-03-09",
      time: "18:00",
      venue: "Estadio Central",
      status: "FINALIZADO",
    },
  ],
  jornada8: [
    {
      id: 29,
      home: "Tigres FC",
      away: "Águilas SC",
      homeScore: null,
      awayScore: null,
      date: "2025-04-12",
      time: "16:00",
      venue: "Estadio Nacional",
      status: "PROGRAMADO",
    },
    {
      id: 30,
      home: "Leones United",
      away: "Pumas AC",
      homeScore: null,
      awayScore: null,
      date: "2025-04-12",
      time: "19:00",
      venue: "Estadio Nacional",
      status: "PROGRAMADO",
    },
    {
      id: 31,
      home: "Halcones FC",
      away: "Lobos FC",
      homeScore: null,
      awayScore: null,
      date: "2025-04-13",
      time: "15:00",
      venue: "Arena Deportiva",
      status: "PROGRAMADO",
    },
    {
      id: 32,
      home: "Cóndores SC",
      away: "Panteras United",
      homeScore: null,
      awayScore: null,
      date: "2025-04-13",
      time: "18:00",
      venue: "Arena Deportiva",
      status: "PROGRAMADO",
    },
  ],
}

export function FixtureList() {
  const [selectedJornada, setSelectedJornada] = useState("jornada8")

  const jornadas = [
    { key: "jornada1", label: "Jornada 1" },
    { key: "jornada2", label: "Jornada 2" },
    { key: "jornada8", label: "Jornada 8" },
  ]

  return (
    <div>
      {/* Jornada Selector */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {jornadas.map((jornada) => (
            <Button
              key={jornada.key}
              variant={selectedJornada === jornada.key ? "default" : "outline"}
              onClick={() => setSelectedJornada(jornada.key)}
              className="font-bold"
            >
              {jornada.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {fixtures[selectedJornada as keyof typeof fixtures].map((match) => (
          <div
            key={match.id}
            className="bg-card border border-border hover:border-primary transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <Badge
                    variant={match.status === "FINALIZADO" ? "secondary" : "default"}
                    className={
                      match.status === "FINALIZADO"
                        ? "bg-muted text-muted-foreground font-bold"
                        : "bg-primary text-white font-bold"
                    }
                  >
                    {match.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {match.date} • {match.time}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{match.venue}</span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
                {/* Home Team */}
                <div className="text-right">
                  <h3 className="font-bold text-lg md:text-xl">{match.home}</h3>
                </div>

                {/* Score or VS */}
                <div className="flex items-center gap-4">
                  {match.homeScore !== null && match.awayScore !== null ? (
                    <div className="flex items-center gap-3">
                      <span className="font-display text-4xl font-bold">{match.homeScore}</span>
                      <span className="text-muted-foreground">-</span>
                      <span className="font-display text-4xl font-bold">{match.awayScore}</span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-muted-foreground">VS</span>
                  )}
                </div>

                {/* Away Team */}
                <div className="text-left">
                  <h3 className="font-bold text-lg md:text-xl">{match.away}</h3>
                </div>
              </div>

              {match.status === "FINALIZADO" && (
                <div className="mt-4 pt-4 border-t border-border">
                  <Button variant="ghost" size="sm" className="font-bold text-primary">
                    Ver estadísticas del partido →
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
