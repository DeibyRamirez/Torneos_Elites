import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data
const recentMatches = [
  {
    id: 1,
    date: "2025-03-30",
    time: "19:00",
    home: "Tigres FC",
    away: "Águilas SC",
    homeScore: 3,
    awayScore: 2,
    venue: "Estadio Nacional",
    highlights: true,
  },
  {
    id: 2,
    date: "2025-03-30",
    time: "16:00",
    home: "Leones United",
    away: "Pumas AC",
    homeScore: 1,
    awayScore: 1,
    venue: "Arena Deportiva",
    highlights: true,
  },
  {
    id: 3,
    date: "2025-03-29",
    time: "18:00",
    home: "Halcones FC",
    away: "Cóndores SC",
    homeScore: 2,
    awayScore: 0,
    venue: "Complejo Olímpico",
    highlights: false,
  },
  {
    id: 4,
    date: "2025-03-29",
    time: "15:00",
    home: "Lobos FC",
    away: "Panteras United",
    homeScore: 3,
    awayScore: 3,
    venue: "Estadio Central",
    highlights: false,
  },
  {
    id: 5,
    date: "2025-03-23",
    time: "19:30",
    home: "Águilas SC",
    away: "Leones United",
    homeScore: 2,
    awayScore: 1,
    venue: "Estadio Nacional",
    highlights: true,
  },
  {
    id: 6,
    date: "2025-03-23",
    time: "16:30",
    home: "Pumas AC",
    away: "Tigres FC",
    homeScore: 0,
    awayScore: 2,
    venue: "Arena Deportiva",
    highlights: true,
  },
]

export function RecentMatches() {
  return (
    <div className="space-y-4">
      {recentMatches.map((match) => (
        <div key={match.id} className="bg-card border border-border hover:border-primary transition-all duration-300">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-muted text-muted-foreground font-bold">
                  FINALIZADO
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {match.date} • {match.time}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{match.venue}</span>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center mb-4">
              {/* Home Team */}
              <div className="text-right">
                <h3 className="font-bold text-lg md:text-xl">{match.home}</h3>
              </div>

              {/* Score */}
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl font-bold">{match.homeScore}</span>
                <span className="text-muted-foreground">-</span>
                <span className="font-display text-4xl font-bold">{match.awayScore}</span>
              </div>

              {/* Away Team */}
              <div className="text-left">
                <h3 className="font-bold text-lg md:text-xl">{match.away}</h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
              <Button variant="ghost" size="sm" className="font-bold text-primary">
                Ver estadísticas →
              </Button>
              {match.highlights && (
                <Button variant="ghost" size="sm" className="font-bold">
                  Ver highlights →
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
