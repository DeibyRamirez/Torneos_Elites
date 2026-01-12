"use client"

// Mock data - En producción esto vendría de tu backend
const standings = [
  {
    position: 1,
    team: "Tigres FC",
    played: 16,
    won: 12,
    drawn: 3,
    lost: 1,
    goalsFor: 38,
    goalsAgainst: 12,
    goalDifference: 26,
    points: 39,
    form: ["W", "W", "D", "W", "W"],
  },
  {
    position: 2,
    team: "Águilas SC",
    played: 16,
    won: 11,
    drawn: 4,
    lost: 1,
    goalsFor: 35,
    goalsAgainst: 15,
    goalDifference: 20,
    points: 37,
    form: ["W", "D", "W", "W", "D"],
  },
  {
    position: 3,
    team: "Leones United",
    played: 16,
    won: 10,
    drawn: 5,
    lost: 1,
    goalsFor: 32,
    goalsAgainst: 14,
    goalDifference: 18,
    points: 35,
    form: ["W", "W", "D", "W", "D"],
  },
  {
    position: 4,
    team: "Pumas AC",
    played: 16,
    won: 9,
    drawn: 4,
    lost: 3,
    goalsFor: 28,
    goalsAgainst: 18,
    goalDifference: 10,
    points: 31,
    form: ["L", "W", "W", "D", "W"],
  },
  {
    position: 5,
    team: "Halcones FC",
    played: 16,
    won: 8,
    drawn: 5,
    lost: 3,
    goalsFor: 26,
    goalsAgainst: 19,
    goalDifference: 7,
    points: 29,
    form: ["D", "W", "L", "W", "D"],
  },
  {
    position: 6,
    team: "Cóndores SC",
    played: 16,
    won: 7,
    drawn: 6,
    lost: 3,
    goalsFor: 24,
    goalsAgainst: 20,
    goalDifference: 4,
    points: 27,
    form: ["D", "D", "W", "L", "W"],
  },
  {
    position: 7,
    team: "Lobos FC",
    played: 16,
    won: 5,
    drawn: 4,
    lost: 7,
    goalsFor: 20,
    goalsAgainst: 26,
    goalDifference: -6,
    points: 19,
    form: ["L", "L", "W", "D", "L"],
  },
  {
    position: 8,
    team: "Panteras United",
    played: 16,
    won: 2,
    drawn: 5,
    lost: 9,
    goalsFor: 14,
    goalsAgainst: 33,
    goalDifference: -19,
    points: 11,
    form: ["L", "D", "L", "L", "D"],
  },
]

export function ResultsTable() {
  return (
    <div className="bg-card border border-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold">#</th>
              <th className="px-6 py-4 text-left text-sm font-bold">EQUIPO</th>
              <th className="px-6 py-4 text-center text-sm font-bold">PJ</th>
              <th className="px-6 py-4 text-center text-sm font-bold">G</th>
              <th className="px-6 py-4 text-center text-sm font-bold">E</th>
              <th className="px-6 py-4 text-center text-sm font-bold">P</th>
              <th className="px-6 py-4 text-center text-sm font-bold">GF</th>
              <th className="px-6 py-4 text-center text-sm font-bold">GC</th>
              <th className="px-6 py-4 text-center text-sm font-bold">DIF</th>
              <th className="px-6 py-4 text-center text-sm font-bold">FORMA</th>
              <th className="px-6 py-4 text-center text-sm font-bold">PTS</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr
                key={team.position}
                className={`border-t border-border hover:bg-muted/50 transition-colors ${
                  index < 4 ? "border-l-4 border-l-primary" : ""
                }`}
              >
                <td className="px-6 py-4">
                  <span className="font-bold">{team.position}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold">{team.team}</span>
                </td>
                <td className="px-6 py-4 text-center">{team.played}</td>
                <td className="px-6 py-4 text-center">{team.won}</td>
                <td className="px-6 py-4 text-center">{team.drawn}</td>
                <td className="px-6 py-4 text-center">{team.lost}</td>
                <td className="px-6 py-4 text-center">{team.goalsFor}</td>
                <td className="px-6 py-4 text-center">{team.goalsAgainst}</td>
                <td className="px-6 py-4 text-center">
                  <span className={team.goalDifference > 0 ? "text-primary font-bold" : ""}>
                    {team.goalDifference > 0 ? "+" : ""}
                    {team.goalDifference}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 justify-center">
                    {team.form.map((result, i) => (
                      <div
                        key={i}
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          result === "W"
                            ? "bg-primary text-white"
                            : result === "D"
                              ? "bg-muted text-muted-foreground"
                              : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-display text-xl font-bold text-primary">{team.points}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {standings.map((team, index) => (
          <div key={team.position} className={`p-4 ${index < 4 ? "border-l-4 border-l-primary" : ""}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl font-bold text-muted-foreground">{team.position}</span>
                <span className="font-bold text-lg">{team.team}</span>
              </div>
              <span className="font-display text-2xl font-bold text-primary">{team.points}</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-sm mb-3">
              <div>
                <p className="text-muted-foreground">PJ</p>
                <p className="font-bold">{team.played}</p>
              </div>
              <div>
                <p className="text-muted-foreground">G</p>
                <p className="font-bold">{team.won}</p>
              </div>
              <div>
                <p className="text-muted-foreground">E</p>
                <p className="font-bold">{team.drawn}</p>
              </div>
              <div>
                <p className="text-muted-foreground">P</p>
                <p className="font-bold">{team.lost}</p>
              </div>
            </div>

            <div className="flex gap-1">
              {team.form.map((result, i) => (
                <div
                  key={i}
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    result === "W"
                      ? "bg-primary text-white"
                      : result === "D"
                        ? "bg-muted text-muted-foreground"
                        : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {result}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="border-t border-border p-4 bg-muted/30">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-primary" />
            <span className="text-muted-foreground">Clasifican a Semifinales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-primary" />
            <span className="text-muted-foreground">Victoria</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-muted" />
            <span className="text-muted-foreground">Empate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-destructive/20" />
            <span className="text-muted-foreground">Derrota</span>
          </div>
        </div>
      </div>
    </div>
  )
}
