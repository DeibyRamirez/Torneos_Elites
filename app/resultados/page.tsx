import { ResultsTable } from "@/components/results-table"
import { RecentMatches } from "@/components/recent-matches"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResultadosPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-16 px-4 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">RESULTADOS</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Tabla de posiciones, estadísticas y resultados de todos los partidos
          </p>
        </div>
      </section>

      {/* Results Content */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <Tabs defaultValue="tabla" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="tabla" className="font-bold">
                TABLA DE POSICIONES
              </TabsTrigger>
              <TabsTrigger value="partidos" className="font-bold">
                PARTIDOS RECIENTES
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tabla">
              <ResultsTable />
            </TabsContent>

            <TabsContent value="partidos">
              <RecentMatches />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}
