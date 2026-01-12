import { PlayerHeader } from "@/components/player-header"
import { PlayerStats } from "@/components/player-stats"
import { PlayerMatches } from "@/components/player-matches"
import { notFound } from "next/navigation"

// Mock data
const playersData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Carlos Martínez",
    team: "Tigres FC",
    teamId: "tigres-fc",
    position: "Delantero",
    number: 10,
    age: 28,
    nationality: "México",
    height: "1.82m",
    weight: "78kg",
    image: "/professional-soccer-player-action-shot.jpg",
    coverImage: "/soccer-player-hero-shot.jpg",
    stats: {
      appearances: 16,
      goals: 15,
      assists: 8,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 1380,
      shotsOnTarget: 42,
      passAccuracy: 84,
    },
  },
}

export default function PlayerPage({ params }: { params: { playerId: string } }) {
  const player = playersData[params.playerId]

  if (!player) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <PlayerHeader player={player} />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <PlayerMatches playerId={player.id} />
          </div>
          <div className="space-y-8">
            <PlayerStats stats={player.stats} />
          </div>
        </div>
      </div>
    </main>
  )
}
