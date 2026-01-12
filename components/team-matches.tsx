import { Badge } from "@/components/ui/badge"

// Mock data
const matches = [
  {
    id: 1,
    date: "2025-04-12",
    time: "16:00",
    opponent: "Águilas SC",
    isHome: true,
    score: null,
    status: "PRÓXIMO",
  },
  {
    id: 2,
    date: "2025-03-30",
    time: "19:00",
    opponent: "Leones United",
    isHome: true,
    score: { home: 3, away: 1 },
    status: "FINALIZADO",
  },
  {
    id: 3,
    date: "2025-03-23",
    time: "16:30",
    opponent: "Pumas AC",
    isHome: false,
    score: { home: 0, away: 2 },
    status: "FINALIZADO",
  },
]

export function TeamMatches({ teamId }: { teamId: string }) {
  return (
    <div className="bg-card border border-border p-6">
      <h2 className="font-display text-2xl font-bold mb-6">PARTIDOS</h2>

      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="border border-border p-4 hover:border-primary transition-colors">
            <div className="flex items-center justify-between mb-3">
              <Badge
                variant={match.status === "PRÓXIMO" ? "default" : "secondary"}
                className={
                  match.status === "PRÓXIMO"
                    ? "bg-primary text-white font-bold"
                    : "bg-muted text-muted-foreground font-bold"
                }
              >
                {match.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {match.date} • {match.time}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-bold">{match.isHome ? "Tigres FC" : match.opponent}</p>
                <p className="text-sm text-muted-foreground">{match.isHome ? "Local" : "Visitante"}</p>
              </div>

              {match.score ? (
                <div className="flex items-center gap-3 px-6">
                  <span className="font-display text-3xl font-bold">
                    {match.isHome ? match.score.home : match.score.away}
                  </span>
                  <span className="text-muted-foreground">-</span>
                  <span className="font-display text-3xl font-bold">
                    {match.isHome ? match.score.away : match.score.home}
                  </span>
                </div>
              ) : (
                <div className="px-6">
                  <span className="text-2xl font-bold text-muted-foreground">VS</span>
                </div>
              )}

              <div className="flex-1 text-right">
                <p className="font-bold">{match.isHome ? match.opponent : "Tigres FC"}</p>
                <p className="text-sm text-muted-foreground">{match.isHome ? "Visitante" : "Local"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
