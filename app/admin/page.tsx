import { AdminStats } from "@/components/admin-stats"
import { AdminQuickActions } from "@/components/admin-quick-actions"
import { RecentActivity } from "@/components/recent-activity"

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      {/* Header */}
      <section className="bg-background border-b border-border py-8 px-4">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">PANEL DE ADMINISTRACIÓN</h1>
          <p className="text-muted-foreground">Gestiona equipos, partidos, jugadores y resultados del torneo</p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8 px-4">
        <div className="mx-auto max-w-7xl space-y-8">
          <AdminStats />
          <AdminQuickActions />
          <RecentActivity />
        </div>
      </section>
    </main>
  )
}
