import { PlayersGrid } from "@/components/players-grid"
import { PlayerFilters } from "@/components/player-filters"

export default function JugadoresPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-16 px-4 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">JUGADORES</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Conoce a las estrellas del torneo y sus estadísticas
          </p>
        </div>
      </section>

      {/* Players Content */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <PlayerFilters />
          <PlayersGrid />
        </div>
      </section>
    </main>
  )
}
