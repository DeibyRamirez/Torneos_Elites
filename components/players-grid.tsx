import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Mock data
const players = [
  {
    id: "1",
    name: "Carlos Martínez",
    team: "Tigres FC",
    position: "Delantero",
    number: 10,
    goals: 15,
    assists: 8,
    image: "/professional-soccer-player-action-shot.jpg",
  },
  {
    id: "2",
    name: "Diego Silva",
    team: "Águilas SC",
    position: "Mediocampista",
    number: 8,
    goals: 12,
    assists: 10,
    image: "/soccer-midfielder-running-with-ball.jpg",
  },
  {
    id: "3",
    name: "Roberto Gómez",
    team: "Leones United",
    position: "Defensa",
    number: 4,
    goals: 3,
    assists: 2,
    image: "/soccer-defender-heading-ball.jpg",
  },
  {
    id: "4",
    name: "Miguel Torres",
    team: "Pumas AC",
    position: "Portero",
    number: 1,
    goals: 0,
    assists: 0,
    image: "/soccer-goalkeeper-diving-save.jpg",
  },
  {
    id: "5",
    name: "Luis Hernández",
    team: "Halcones FC",
    position: "Delantero",
    number: 9,
    goals: 14,
    assists: 5,
    image: "/soccer-striker-celebrating-goal.jpg",
  },
  {
    id: "6",
    name: "Fernando Ruiz",
    team: "Cóndores SC",
    position: "Mediocampista",
    number: 6,
    goals: 8,
    assists: 12,
    image: "/soccer-player-dribbling-ball.jpg",
  },
  {
    id: "7",
    name: "Andrés López",
    team: "Lobos FC",
    position: "Defensa",
    number: 3,
    goals: 2,
    assists: 1,
    image: "/soccer-defender-tackling.jpg",
  },
  {
    id: "8",
    name: "Gabriel Morales",
    team: "Panteras United",
    position: "Delantero",
    number: 11,
    goals: 7,
    assists: 4,
    image: "/soccer-forward-shooting.jpg",
  },
]

export function PlayersGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {players.map((player) => (
        <Link key={player.id} href={`/jugadores/${player.id}`} className="group">
          <div className="relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300">
            <div className="relative h-96 overflow-hidden">
              <img
                src={player.image || "/placeholder.svg"}
                alt={player.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-white font-bold">{player.position}</Badge>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <p className="text-sm text-white/80 mb-1">{player.team}</p>
                    <h3 className="font-display text-2xl font-bold text-white">{player.name}</h3>
                  </div>
                  <span className="font-display text-5xl font-bold text-white/30">{player.number}</span>
                </div>
                <div className="flex items-center gap-4 text-white/90 text-sm">
                  <span>{player.goals} Goles</span>
                  <span>•</span>
                  <span>{player.assists} Asistencias</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
