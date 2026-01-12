interface Stats {
  possession: { home: number; away: number }
  shots: { home: number; away: number }
  shotsOnTarget: { home: number; away: number }
  corners: { home: number; away: number }
  fouls: { home: number; away: number }
  yellowCards: { home: number; away: number }
  redCards: { home: number; away: number }
}

export function LiveStats({ stats, homeTeam, awayTeam }: { stats: Stats; homeTeam: string; awayTeam: string }) {
  const StatBar = ({ label, home, away }: { label: string; home: number; away: number }) => {
    const total = home + away
    const homePercentage = total > 0 ? (home / total) * 100 : 50
    const awayPercentage = total > 0 ? (away / total) * 100 : 50

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold">{home}</span>
          <span className="text-muted-foreground">{label}</span>
          <span className="font-bold">{away}</span>
        </div>
        <div className="flex h-2 rounded-full overflow-hidden bg-muted">
          <div className="bg-primary transition-all duration-500" style={{ width: `${homePercentage}%` }} />
          <div className="bg-muted-foreground transition-all duration-500" style={{ width: `${awayPercentage}%` }} />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border p-6">
      <h3 className="font-display text-xl font-bold mb-6">ESTADÍSTICAS EN VIVO</h3>

      <div className="space-y-6">
        {/* Possession */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold">{stats.possession.home}%</span>
            <span className="text-muted-foreground">Posesión</span>
            <span className="font-bold">{stats.possession.away}%</span>
          </div>
          <div className="flex h-3 rounded-full overflow-hidden bg-muted">
            <div className="bg-primary transition-all duration-500" style={{ width: `${stats.possession.home}%` }} />
            <div
              className="bg-muted-foreground transition-all duration-500"
              style={{ width: `${stats.possession.away}%` }}
            />
          </div>
        </div>

        <StatBar label="Tiros" home={stats.shots.home} away={stats.shots.away} />
        <StatBar label="Tiros a puerta" home={stats.shotsOnTarget.home} away={stats.shotsOnTarget.away} />
        <StatBar label="Corners" home={stats.corners.home} away={stats.corners.away} />
        <StatBar label="Faltas" home={stats.fouls.home} away={stats.fouls.away} />

        {/* Cards */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Tarjetas</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="h-6 w-4 bg-yellow-500 rounded-sm" />
                  <span className="font-bold">{stats.yellowCards.home}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-6 w-4 bg-red-500 rounded-sm" />
                  <span className="font-bold">{stats.redCards.home}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-2">Tarjetas</p>
              <div className="flex items-center justify-end gap-3">
                <div className="flex items-center gap-1">
                  <span className="font-bold">{stats.yellowCards.away}</span>
                  <div className="h-6 w-4 bg-yellow-500 rounded-sm" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold">{stats.redCards.away}</span>
                  <div className="h-6 w-4 bg-red-500 rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
