"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MatchTimeline } from "@/components/match-timeline"
import { LiveStats } from "@/components/live-stats"
import { MatchLineups } from "@/components/match-lineups"

// Mock data
const matchData: Record<number, any> = {
  1: {
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
    events: [
      {
        id: 1,
        time: "12'",
        type: "goal",
        team: "home",
        player: "Carlos Martínez",
        description: "Gol de Carlos Martínez",
      },
      {
        id: 2,
        time: "34'",
        type: "yellow",
        team: "away",
        player: "Diego Silva",
        description: "Tarjeta amarilla para Diego Silva",
      },
      {
        id: 3,
        time: "45'",
        type: "goal",
        team: "home",
        player: "Luis Hernández",
        description: "Gol de Luis Hernández",
      },
      { id: 4, time: "67'", type: "goal", team: "away", player: "Roberto Gómez", description: "Gol de Roberto Gómez" },
      {
        id: 5,
        time: "72'",
        type: "substitution",
        team: "home",
        player: "Juan Pérez → Miguel Torres",
        description: "Cambio",
      },
    ],
    stats: {
      possession: { home: 58, away: 42 },
      shots: { home: 14, away: 9 },
      shotsOnTarget: { home: 7, away: 4 },
      corners: { home: 6, away: 3 },
      fouls: { home: 8, away: 12 },
      yellowCards: { home: 1, away: 2 },
      redCards: { home: 0, away: 0 },
    },
  },
  2: {
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
    events: [
      { id: 1, time: "23'", type: "goal", team: "home", player: "Fernando Ruiz", description: "Gol de Fernando Ruiz" },
      { id: 2, time: "41'", type: "goal", team: "away", player: "Andrés López", description: "Gol de Andrés López" },
    ],
    stats: {
      possession: { home: 52, away: 48 },
      shots: { home: 8, away: 7 },
      shotsOnTarget: { home: 4, away: 3 },
      corners: { home: 4, away: 4 },
      fouls: { home: 6, away: 5 },
      yellowCards: { home: 0, away: 1 },
      redCards: { home: 0, away: 0 },
    },
  },
}

export function LiveMatchDetail({ matchId }: { matchId: number }) {
  const match = matchData[matchId]
  const [currentTime, setCurrentTime] = useState(match.time)

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    if (match.status === "EN VIVO") {
      const interval = setInterval(() => {
        // En producción, esto vendría de tu backend
        setCurrentTime((prev) => prev)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [match.status])

  if (!match) return null

  return (
    <div className="space-y-6">
      {/* Match Header */}
      <div className="bg-card border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <Badge className="bg-primary text-white font-bold animate-pulse">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white" />
              {match.status}
            </div>
          </Badge>
          <span className="text-sm text-muted-foreground">{match.venue}</span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
          {/* Home Team */}
          <div className="text-center">
            <div className="h-20 w-20 mx-auto mb-3 rounded-lg overflow-hidden">
              <img src={match.homeLogo || "/placeholder.svg"} alt={match.home} className="h-full w-full object-cover" />
            </div>
            <h3 className="font-display text-xl font-bold">{match.home}</h3>
          </div>

          {/* Score and Time */}
          <div className="text-center min-w-[120px]">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="font-display text-5xl font-bold">{match.homeScore}</span>
              <span className="text-2xl text-muted-foreground">-</span>
              <span className="font-display text-5xl font-bold">{match.awayScore}</span>
            </div>
            <span className="font-display text-2xl font-bold text-primary">{currentTime}</span>
          </div>

          {/* Away Team */}
          <div className="text-center">
            <div className="h-20 w-20 mx-auto mb-3 rounded-lg overflow-hidden">
              <img src={match.awayLogo || "/placeholder.svg"} alt={match.away} className="h-full w-full object-cover" />
            </div>
            <h3 className="font-display text-xl font-bold">{match.away}</h3>
          </div>
        </div>
      </div>

      {/* Match Details Tabs */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline" className="font-bold">
            CRONOLOGÍA
          </TabsTrigger>
          <TabsTrigger value="stats" className="font-bold">
            ESTADÍSTICAS
          </TabsTrigger>
          <TabsTrigger value="lineups" className="font-bold">
            ALINEACIONES
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <MatchTimeline events={match.events} homeTeam={match.home} awayTeam={match.away} />
        </TabsContent>

        <TabsContent value="stats">
          <LiveStats stats={match.stats} homeTeam={match.home} awayTeam={match.away} />
        </TabsContent>

        <TabsContent value="lineups">
          <MatchLineups matchId={matchId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
