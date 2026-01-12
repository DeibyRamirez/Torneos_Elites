// Mock data
const lineups: Record<number, any> = {
  1: {
    home: {
      formation: "4-3-3",
      players: [
        { number: 1, name: "Miguel Torres", position: "Portero" },
        { number: 2, name: "Juan Pérez", position: "Defensa" },
        { number: 3, name: "Roberto Gómez", position: "Defensa" },
        { number: 4, name: "Luis Hernández", position: "Defensa" },
        { number: 5, name: "Fernando Ruiz", position: "Defensa" },
        { number: 6, name: "Andrés López", position: "Mediocampista" },
        { number: 8, name: "Gabriel Morales", position: "Mediocampista" },
        { number: 10, name: "Carlos Martínez", position: "Mediocampista" },
        { number: 7, name: "Diego Silva", position: "Delantero" },
        { number: 9, name: "Ricardo Sánchez", position: "Delantero" },
        { number: 11, name: "Pablo Ramírez", position: "Delantero" },
      ],
    },
    away: {
      formation: "4-4-2",
      players: [
        { number: 1, name: "José García", position: "Portero" },
        { number: 2, name: "Mario López", position: "Defensa" },
        { number: 3, name: "Sergio Díaz", position: "Defensa" },
        { number: 4, name: "Alberto Ruiz", position: "Defensa" },
        { number: 5, name: "Javier Moreno", position: "Defensa" },
        { number: 6, name: "Pedro Castro", position: "Mediocampista" },
        { number: 7, name: "Antonio Vega", position: "Mediocampista" },
        { number: 8, name: "Manuel Ortiz", position: "Mediocampista" },
        { number: 10, name: "Francisco Ramos", position: "Mediocampista" },
        { number: 9, name: "Raúl Jiménez", position: "Delantero" },
        { number: 11, name: "Héctor Vargas", position: "Delantero" },
      ],
    },
  },
}

export function MatchLineups({ matchId }: { matchId: number }) {
  const lineup = lineups[matchId]

  if (!lineup) {
    return (
      <div className="bg-card border border-border p-6">
        <p className="text-center text-muted-foreground">Alineaciones no disponibles</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Home Team */}
      <div className="bg-card border border-border p-6">
        <div className="mb-6">
          <h3 className="font-display text-xl font-bold mb-2">LOCAL</h3>
          <p className="text-sm text-muted-foreground">Formación: {lineup.home.formation}</p>
        </div>

        <div className="space-y-2">
          {lineup.home.players.map((player: any) => (
            <div
              key={player.number}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-sm flex-shrink-0">
                {player.number}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold truncate">{player.name}</p>
                <p className="text-xs text-muted-foreground">{player.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Away Team */}
      <div className="bg-card border border-border p-6">
        <div className="mb-6">
          <h3 className="font-display text-xl font-bold mb-2">VISITANTE</h3>
          <p className="text-sm text-muted-foreground">Formación: {lineup.away.formation}</p>
        </div>

        <div className="space-y-2">
          {lineup.away.players.map((player: any) => (
            <div
              key={player.number}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted-foreground text-white font-bold text-sm flex-shrink-0">
                {player.number}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold truncate">{player.name}</p>
                <p className="text-xs text-muted-foreground">{player.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
