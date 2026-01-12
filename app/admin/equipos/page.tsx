import { TeamManagementList } from "@/components/team-management-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function AdminEquiposPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <section className="bg-background border-b border-border py-8 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">GESTIÓN DE EQUIPOS</h1>
              <p className="text-muted-foreground">Administra la información de los equipos del torneo</p>
            </div>
            <Link href="/admin/equipos/nuevo">
              <Button className="bg-primary hover:bg-primary/90 font-bold">
                <Plus className="h-4 w-4 mr-2" />
                NUEVO EQUIPO
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="mx-auto max-w-7xl">
          <TeamManagementList />
        </div>
      </section>
    </main>
  )
}
