const activities = [
  {
    id: 1,
    type: "match_update",
    description: "Resultado actualizado: Tigres FC 2-1 Águilas SC",
    time: "Hace 5 minutos",
  },
  {
    id: 2,
    type: "player_added",
    description: "Nuevo jugador agregado: Carlos Martínez (Tigres FC)",
    time: "Hace 1 hora",
  },
  {
    id: 3,
    type: "match_created",
    description: "Partido creado: Leones United vs Pumas AC - 12 Abr 2025",
    time: "Hace 2 horas",
  },
  {
    id: 4,
    type: "team_updated",
    description: "Información actualizada: Águilas SC",
    time: "Hace 3 horas",
  },
  {
    id: 5,
    type: "stats_updated",
    description: "Estadísticas actualizadas para Jornada 7",
    time: "Hace 5 horas",
  },
]

export function RecentActivity() {
  return (
    <div className="bg-card border border-border p-6">
      <h2 className="font-display text-2xl font-bold mb-6">ACTIVIDAD RECIENTE</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{activity.description}</p>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
