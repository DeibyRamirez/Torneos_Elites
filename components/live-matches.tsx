"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { LiveMatchDetail } from "@/components/live-match-detail"

// Mock data - En producción esto vendría de tu backend con WebSockets o polling
const liveMatches = [
  {
    id: 1,
    home: "Tigres FC",
    away: "Águilas SC",
    homeScore: 2,
    awayScore: 1,
    time: "78'",
    status: "EN VIVO",
    venue: "Estadio Nacional",
    homeLogo: "/tiger-sports-team-logo-orange-black.jpg",
    awayLogo: "/eagle-sports-team-logo-blue-white.jpg",
  },
  {
    id: 2,
    home: "Leones United",
    away: "Pumas AC",
    homeScore: 1,
    awayScore: 1,
    time: "HT",
    status: "DESCANSO",
    venue: "Arena Deportiva",
    homeLogo: "/lion-sports-team-logo-red-gold.jpg",
    awayLogo: "/puma-sports-team-logo-navy-silver.jpg",
  },
]

const upcomingMatches = [
  {
    id: 3,
    home: "Halcones FC",
    away: "Lobos FC",
    time: "19:00",
    status: "PRÓXIMO",
    venue: "Complejo Olímpico",
  },
]

export function LiveMatches() {
  const [selectedMatch, setSelectedMatch] = useState<number | null>(liveMatches[0]?.id || null)

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Matches List */}
      <div className="lg:col-span-1 space-y-4">
        <h2 className="font-display text-2xl font-bold mb-4">PARTIDOS EN VIVO</h2>

        {liveMatches.map((match) => (
          <button
            key={match.id}
            onClick={() => setSelectedMatch(match.id)}
            className={`w-full text-left bg-card border-2 transition-all duration-300 ${
              selectedMatch === match.id ? "border-primary" : "border-border hover:border-primary/50"
            }`}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-primary text-white font-bold animate-pulse">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-white" />
                    {match.status}
                  </div>
                </Badge>
                <span className="font-display text-xl font-bold">{match.time}</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={match.homeLogo || "/placeholder.svg"}
                        alt={match.home}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="font-bold">{match.home}</span>
                  </div>
                  <span className="font-display text-2xl font-bold">{match.homeScore}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={match.awayLogo || "/placeholder.svg"}
                        alt={match.away}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="font-bold">{match.away}</span>
                  </div>
                  <span className="font-display text-2xl font-bold">{match.awayScore}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-3">{match.venue}</p>
            </div>
          </button>
        ))}

        {upcomingMatches.length > 0 && (
          <>
            <h3 className="font-display text-xl font-bold mt-8 mb-4">PRÓXIMOS</h3>
            {upcomingMatches.map((match) => (
              <div key={match.id} className="bg-card border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="font-bold">
                    {match.status}
                  </Badge>
                  <span className="font-bold">{match.time}</span>
                </div>

                <div className="space-y-2">
                  <p className="font-bold">{match.home}</p>
                  <p className="text-sm text-muted-foreground">vs</p>
                  <p className="font-bold">{match.away}</p>
                </div>

                <p className="text-xs text-muted-foreground mt-3">{match.venue}</p>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Match Detail */}
      <div className="lg:col-span-2">{selectedMatch && <LiveMatchDetail matchId={selectedMatch} />}</div>
    </div>
  )
}
