import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function PlayerHeader({ player }: { player: any }) {
  return (
    <section className="relative h-[400px] overflow-hidden">
      <div className="absolute inset-0">
        <img src={player.coverImage || "/placeholder.svg"} alt={player.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>

      <div className="relative z-10 h-full flex items-end">
        <div className="mx-auto max-w-7xl w-full px-4 pb-12">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="h-32 w-32 rounded-lg overflow-hidden border-4 border-white shadow-2xl flex-shrink-0">
              <img src={player.image || "/placeholder.svg"} alt={player.name} className="h-full w-full object-cover" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-primary text-white font-bold">{player.position}</Badge>
                <span className="font-display text-4xl font-bold text-white/50">#{player.number}</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">{player.name}</h1>
              <Link href={`/equipos/${player.teamId}`} className="text-xl text-white/90 hover:text-white font-bold">
                {player.team} →
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-white/90 mt-6">
            <div>
              <p className="text-sm text-white/70">Edad</p>
              <p className="font-bold">{player.age} años</p>
            </div>
            <div>
              <p className="text-sm text-white/70">Nacionalidad</p>
              <p className="font-bold">{player.nationality}</p>
            </div>
            <div>
              <p className="text-sm text-white/70">Altura</p>
              <p className="font-bold">{player.height}</p>
            </div>
            <div>
              <p className="text-sm text-white/70">Peso</p>
              <p className="font-bold">{player.weight}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
