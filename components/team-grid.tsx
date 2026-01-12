import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Mock data
const teams = [
  {
    id: "tigres-fc",
    name: "Tigres FC",
    position: 1,
    points: 39,
    played: 16,
    won: 12,
    image: "/tiger-sports-team-logo-orange-black.jpg",
    colors: ["#FF6B00", "#000000"],
  },
  {
    id: "aguilas-sc",
    name: "Águilas SC",
    position: 2,
    points: 37,
    played: 16,
    won: 11,
    image: "/eagle-sports-team-logo-blue-white.jpg",
    colors: ["#0066CC", "#FFFFFF"],
  },
  {
    id: "leones-united",
    name: "Leones United",
    position: 3,
    points: 35,
    played: 16,
    won: 10,
    image: "/lion-sports-team-logo-red-gold.jpg",
    colors: ["#CC0000", "#FFD700"],
  },
  {
    id: "pumas-ac",
    name: "Pumas AC",
    position: 4,
    points: 31,
    played: 16,
    won: 9,
    image: "/puma-sports-team-logo-navy-silver.jpg",
    colors: ["#001F3F", "#C0C0C0"],
  },
  {
    id: "halcones-fc",
    name: "Halcones FC",
    position: 5,
    points: 29,
    played: 16,
    won: 8,
    image: "/hawk-sports-team-logo-green-white.jpg",
    colors: ["#00AA44", "#FFFFFF"],
  },
  {
    id: "condores-sc",
    name: "Cóndores SC",
    position: 6,
    points: 27,
    played: 16,
    won: 7,
    image: "/condor-sports-team-logo-purple-gold.jpg",
    colors: ["#6600CC", "#FFD700"],
  },
  {
    id: "lobos-fc",
    name: "Lobos FC",
    position: 7,
    points: 19,
    played: 16,
    won: 5,
    image: "/wolf-sports-team-logo-gray-black.jpg",
    colors: ["#666666", "#000000"],
  },
  {
    id: "panteras-united",
    name: "Panteras United",
    position: 8,
    points: 11,
    played: 16,
    won: 2,
    image: "/panther-sports-team-logo-black-yellow.jpg",
    colors: ["#000000", "#FFCC00"],
  },
]

export function TeamGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {teams.map((team) => (
        <Link key={team.id} href={`/equipos/${team.id}`} className="group">
          <div className="relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
              <img
                src={team.image || "/placeholder.svg"}
                alt={team.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-white font-bold">#{team.position}</Badge>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-display text-2xl font-bold text-white mb-2">{team.name}</h3>
                <div className="flex items-center gap-4 text-white/90 text-sm">
                  <span>{team.points} PTS</span>
                  <span>•</span>
                  <span>{team.won} Victorias</span>
                </div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <span className="text-sm font-bold text-muted-foreground">Ver perfil completo</span>
              <span className="text-primary">→</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
