import Link from "next/link"

// Mock data
const roster = [
  { id: "1", name: "Carlos Martínez", position: "Delantero", number: 10 },
  { id: "2", name: "Juan Pérez", position: "Mediocampista", number: 8 },
  { id: "3", name: "Roberto Gómez", position: "Defensa", number: 4 },
  { id: "4", name: "Miguel Torres", position: "Portero", number: 1 },
  { id: "5", name: "Luis Hernández", position: "Delantero", number: 9 },
]

export function TeamRoster({ teamId }: { teamId: string }) {
  return (
    <div className="bg-card border border-border p-6">
      <h2 className="font-display text-2xl font-bold mb-6">PLANTILLA</h2>

      <div className="space-y-3">
        {roster.map((player) => (
          <Link
            key={player.id}
            href={`/jugadores/${player.id}`}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold flex-shrink-0">
              {player.number}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate">{player.name}</p>
              <p className="text-sm text-muted-foreground">{player.position}</p>
            </div>
            <span className="text-primary">→</span>
          </Link>
        ))}
      </div>

      <Link
        href={`/equipos/${teamId}/plantilla`}
        className="block mt-4 pt-4 border-t border-border text-center text-sm font-bold text-primary hover:underline"
      >
        Ver plantilla completa →
      </Link>
    </div>
  )
}
