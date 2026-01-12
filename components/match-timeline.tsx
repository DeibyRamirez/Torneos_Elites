import { Trophy, ArrowRightLeft, Circle } from "lucide-react"

interface Event {
  id: number
  time: string
  type: "goal" | "yellow" | "red" | "substitution"
  team: "home" | "away"
  player: string
  description: string
}

export function MatchTimeline({
  events,
  homeTeam,
  awayTeam,
}: {
  events: Event[]
  homeTeam: string
  awayTeam: string
}) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "goal":
        return <Trophy className="h-5 w-5 text-primary" />
      case "yellow":
        return <div className="h-5 w-3 bg-yellow-500 rounded-sm" />
      case "red":
        return <div className="h-5 w-3 bg-red-500 rounded-sm" />
      case "substitution":
        return <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="bg-card border border-border p-6">
      <h3 className="font-display text-xl font-bold mb-6">CRONOLOGÍA DEL PARTIDO</h3>

      <div className="space-y-4">
        {events
          .slice()
          .reverse()
          .map((event) => (
            <div
              key={event.id}
              className={`flex items-start gap-4 p-4 rounded-lg ${event.team === "home" ? "bg-primary/5" : "bg-muted"}`}
            >
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-background border border-border">
                {getEventIcon(event.type)}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display text-lg font-bold">{event.time}</span>
                  <span className="text-sm text-muted-foreground">{event.team === "home" ? homeTeam : awayTeam}</span>
                </div>
                <p className="font-bold">{event.description}</p>
                <p className="text-sm text-muted-foreground">{event.player}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
