import Link from "next/link"
import { Button } from "@/components/ui/button"

const teams = [
  {
    id: 1,
    name: "Tigres FC",
    wins: 12,
    draws: 3,
    losses: 1,
    points: 39,
    image: "/tiger-sports-team-logo-orange-black.jpg",
  },
  {
    id: 2,
    name: "Águilas SC",
    wins: 11,
    draws: 4,
    losses: 1,
    points: 37,
    image: "/eagle-sports-team-logo-blue-white.jpg",
  },
  {
    id: 3,
    name: "Leones United",
    wins: 10,
    draws: 5,
    losses: 1,
    points: 35,
    image: "/lion-sports-team-logo-red-gold.jpg",
  },
  {
    id: 4,
    name: "Pumas AC",
    wins: 9,
    draws: 4,
    losses: 3,
    points: 31,
    image: "/puma-sports-team-logo-navy-silver.jpg",
  },
]

export function TopTeams() {
  return (
    <section className="bg-background py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold">TABLA DE POSICIONES</h2>
          <Link href="/equipos">
            <Button variant="ghost" className="font-bold">
              VER TABLA COMPLETA →
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teams.map((team, index) => (
            <div
              key={team.id}
              className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={team.image || "/placeholder.svg"}
                  alt={team.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                <div className="absolute top-4 left-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <span className="font-display text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-bold mb-4">{team.name}</h3>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{team.wins}</p>
                    <p className="text-xs text-muted-foreground">G</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{team.draws}</p>
                    <p className="text-xs text-muted-foreground">E</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{team.losses}</p>
                    <p className="text-xs text-muted-foreground">P</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{team.points}</p>
                    <p className="text-xs text-muted-foreground">PTS</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
