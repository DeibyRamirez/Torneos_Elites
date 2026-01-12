import { TeamHeader } from "@/components/team-header"
import { TeamStats } from "@/components/team-stats"
import { TeamRoster } from "@/components/team-roster"
import { TeamMatches } from "@/components/team-matches"
import { notFound } from "next/navigation"

// Mock data - En producción esto vendría de tu backend
const teamsData: Record<string, any> = {
  "tigres-fc": {
    id: "tigres-fc",
    name: "Tigres FC",
    founded: 2010,
    stadium: "Estadio Nacional",
    capacity: 45000,
    coach: "Roberto Martínez",
    image: "/tiger-sports-team-logo-orange-black.jpg",
    coverImage: "/tiger-team-stadium-action.jpg",
    colors: ["#FF6B00", "#000000"],
    stats: {
      position: 1,
      points: 39,
      played: 16,
      won: 12,
      drawn: 3,
      lost: 1,
      goalsFor: 38,
      goalsAgainst: 12,
      cleanSheets: 9,
    },
  },
  "aguilas-sc": {
    id: "aguilas-sc",
    name: "Águilas SC",
    founded: 2008,
    stadium: "Arena Deportiva",
    capacity: 38000,
    coach: "Diego Silva",
    image: "/eagle-sports-team-logo-blue-white.jpg",
    coverImage: "/eagle-team-celebration.jpg",
    colors: ["#0066CC", "#FFFFFF"],
    stats: {
      position: 2,
      points: 37,
      played: 16,
      won: 11,
      drawn: 4,
      lost: 1,
      goalsFor: 35,
      goalsAgainst: 15,
      cleanSheets: 7,
    },
  },
}

export default function TeamPage({ params }: { params: { teamId: string } }) {
  const team = teamsData[params.teamId]

  if (!team) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <TeamHeader team={team} />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <TeamMatches teamId={team.id} />
          </div>
          <div className="space-y-8">
            <TeamStats stats={team.stats} />
            <TeamRoster teamId={team.id} />
          </div>
        </div>
      </div>
    </main>
  )
}
