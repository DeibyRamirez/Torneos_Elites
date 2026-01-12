import { EventsCalendar } from "@/components/events-calendar"
import { FixtureList } from "@/components/fixture-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EventosPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-16 px-4 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">CALENDARIO Y FIXTURE</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Consulta todos los partidos, horarios y resultados del torneo
          </p>
        </div>
      </section>

      {/* Calendar and Fixture */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <Tabs defaultValue="calendario" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="calendario" className="font-bold">
                CALENDARIO
              </TabsTrigger>
              <TabsTrigger value="fixture" className="font-bold">
                FIXTURE COMPLETO
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calendario">
              <EventsCalendar />
            </TabsContent>

            <TabsContent value="fixture">
              <FixtureList />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}
