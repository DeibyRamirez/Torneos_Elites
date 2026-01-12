import { LiveMatches } from "@/components/live-matches"

export default function EnVivoPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-16 px-4 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
            <h1 className="font-display text-5xl md:text-7xl font-bold">EN VIVO</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Sigue todos los partidos en tiempo real con actualizaciones instantáneas
          </p>
        </div>
      </section>

      {/* Live Content */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <LiveMatches />
        </div>
      </section>
    </main>
  )
}
