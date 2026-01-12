import { NewMatchForm } from "@/components/new-match-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NuevoPartidoPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <section className="bg-background border-b border-border py-8 px-4">
        <div className="mx-auto max-w-7xl">
          <Link href="/admin/partidos">
            <Button variant="ghost" className="mb-4 font-bold">
              <ArrowLeft className="h-4 w-4 mr-2" />
              VOLVER
            </Button>
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">CREAR NUEVO PARTIDO</h1>
          <p className="text-muted-foreground">Completa la información del partido</p>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="mx-auto max-w-3xl">
          <NewMatchForm />
        </div>
      </section>
    </main>
  )
}
