import { TeamGrid } from "@/components/team-grid"

export default function EquiposPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-16 px-4 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">EQUIPOS</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">Conoce a todos los equipos participantes del torneo</p>
        </div>
      </section>

      {/* Teams Grid */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <TeamGrid />
        </div>
      </section>
    </main>
  )
}
