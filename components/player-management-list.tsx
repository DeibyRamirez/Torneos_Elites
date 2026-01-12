import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"

const players = [
  { id: "1", name: "Carlos Martínez", team: "Tigres FC", position: "Delantero", number: 10, goals: 15, assists: 8 },
  { id: "2", name: "Diego Silva", team: "Águilas SC", position: "Mediocampista", number: 8, goals: 12, assists: 10 },
  { id: "3", name: "Roberto Gómez", team: "Leones United", position: "Defensa", number: 4, goals: 3, assists: 2 },
  { id: "4", name: "Miguel Torres", team: "Pumas AC", position: "Portero", number: 1, goals: 0, assists: 0 },
]

export function PlayerManagementList() {
  return (
    <div className="bg-card border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold">#</th>
              <th className="px-6 py-4 text-left text-sm font-bold">JUGADOR</th>
              <th className="px-6 py-4 text-left text-sm font-bold">EQUIPO</th>
              <th className="px-6 py-4 text-left text-sm font-bold">POSICIÓN</th>
              <th className="px-6 py-4 text-center text-sm font-bold">GOLES</th>
              <th className="px-6 py-4 text-center text-sm font-bold">ASIST.</th>
              <th className="px-6 py-4 text-right text-sm font-bold">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-display text-xl font-bold">{player.number}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold">{player.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-muted-foreground">{player.team}</span>
                </td>
                <td className="px-6 py-4">
                  <span>{player.position}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-bold">{player.goals}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-bold">{player.assists}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/jugadores/${player.id}`}>
                      <Button variant="outline" size="sm" className="font-bold bg-transparent">
                        <Edit className="h-4 w-4 mr-2" />
                        EDITAR
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-bold text-destructive hover:text-destructive bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
