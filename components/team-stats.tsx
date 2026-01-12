export function TeamStats({ stats }: { stats: any }) {
  return (
    <div className="bg-card border border-border p-6">
      <h2 className="font-display text-2xl font-bold mb-6">ESTADÍSTICAS</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <span className="text-muted-foreground">Posición</span>
          <span className="font-display text-3xl font-bold text-primary">#{stats.position}</span>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-border">
          <span className="text-muted-foreground">Puntos</span>
          <span className="font-display text-3xl font-bold text-primary">{stats.points}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-primary">{stats.won}</p>
            <p className="text-xs text-muted-foreground">Victorias</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold">{stats.drawn}</p>
            <p className="text-xs text-muted-foreground">Empates</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold">{stats.lost}</p>
            <p className="text-xs text-muted-foreground">Derrotas</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Goles a favor</p>
            <p className="font-display text-2xl font-bold">{stats.goalsFor}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Goles en contra</p>
            <p className="font-display text-2xl font-bold">{stats.goalsAgainst}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-1">Vallas invictas</p>
          <p className="font-display text-2xl font-bold">{stats.cleanSheets}</p>
        </div>
      </div>
    </div>
  )
}
