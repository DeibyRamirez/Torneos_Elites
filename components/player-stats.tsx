export function PlayerStats({ stats }: { stats: any }) {
  return (
    <div className="bg-card border border-border p-6">
      <h2 className="font-display text-2xl font-bold mb-6">ESTADÍSTICAS</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="font-display text-3xl font-bold text-primary">{stats.goals}</p>
            <p className="text-sm text-muted-foreground">Goles</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="font-display text-3xl font-bold text-primary">{stats.assists}</p>
            <p className="text-sm text-muted-foreground">Asistencias</p>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Partidos jugados</span>
            <span className="font-bold">{stats.appearances}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Minutos jugados</span>
            <span className="font-bold">{stats.minutesPlayed}'</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Tiros a puerta</span>
            <span className="font-bold">{stats.shotsOnTarget}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Precisión de pases</span>
            <span className="font-bold">{stats.passAccuracy}%</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Tarjetas amarillas</span>
            <span className="font-bold">{stats.yellowCards}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-muted-foreground">Tarjetas rojas</span>
            <span className="font-bold">{stats.redCards}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
