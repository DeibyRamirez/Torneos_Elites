import { Button } from "@/components/ui/button"
import { Edit, Trash2, Users } from "lucide-react"
import Link from "next/link"

const teams = [
  { id: "tigres-fc", name: "Tigres FC", players: 22, position: 1, points: 39 },
  { id: "aguilas-sc", name: "Águilas SC", players: 22, position: 2, points: 37 },
  { id: "leones-united", name: "Leones United", players: 22, position: 3, points: 35 },
  { id: "pumas-ac", name: "Pumas AC", players: 22, position: 4, points: 31 },
]

export function TeamManagementList() {
  return (
    <div className="bg-card border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold">EQUIPO</th>
              <th className="px-6 py-4 text-center text-sm font-bold">POSICIÓN</th>
              <th className="px-6 py-4 text-center text-sm font-bold">PUNTOS</th>
              <th className="px-6 py-4 text-center text-sm font-bold">JUGADORES</th>
              <th className="px-6 py-4 text-right text-sm font-bold">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-bold">{team.name}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-display text-xl font-bold text-primary">#{team.position}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-bold">{team.points}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{team.players}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/equipos/${team.id}`}>
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
