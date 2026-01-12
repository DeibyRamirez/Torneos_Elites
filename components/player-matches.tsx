import { Badge } from "@/components/ui/badge"

// Mock data
const matches = [
  {
    id: 1,
    date: "2025-03-30",
    opponent: "Leones United",
    result: "3-1",
    goals: 2,
    assists: 1,
    rating: 9.2,
  },
  {
    id: 2,
    date: "2025-03-23",
    opponent: "Pumas AC",
    result: "2-0",
    goals: 1,
    assists: 0,
    rating: 8.5,
  },
  {
    id: 3,
    date: "2025-03-16",
    opponent: "Águilas SC",
    result: "2-2",
    goals: 1,
    assists: 1,
    rating: 8.8,
  },
]

export function PlayerMatches({ playerId }: { playerId: string }) {
  return (
    <div className="bg-card border border-border p-6">
      <h2 className="font-display text-2xl font-bold mb-6">ÚLTIMOS PARTIDOS</h2>

      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="border border-border p-4 hover:border-primary transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{match.date}</span>
              <Badge className="bg-primary text-white font-bold">Calificación: {match.rating}</Badge>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="font-bold">vs {match.opponent}</span>
              <span className="font-display text-2xl font-bold">{match.result}</span>
            </div>

            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Goles: </span>
                <span className="font-bold">{match.goals}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Asistencias: </span>
                <span className="font-bold">{match.assists}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
