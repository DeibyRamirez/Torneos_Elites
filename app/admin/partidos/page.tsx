import { MatchManagementList } from "@/components/match-management-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function AdminPartidosPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <section className="bg-background border-b border-border py-8 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">GESTIÓN DE PARTIDOS</h1>
              <p className="text-muted-foreground">Administra resultados, horarios y detalles de los partidos</p>
            </div>
            <Link href="/admin/partidos/nuevo">
              <Button className="bg-primary hover:bg-primary/90 font-bold">
                <Plus className="h-4 w-4 mr-2" />
                NUEVO PARTIDO
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="mx-auto max-w-7xl">
          <MatchManagementList />
        </div>
      </section>
    </main>
  )
}
