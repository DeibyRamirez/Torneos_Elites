import { Button } from "@/components/ui/button"
import Link from "next/link"

const events = [
  {
    id: 1,
    title: "JORNADA 8",
    date: "ABR 12-14",
    venue: "ESTADIO NACIONAL",
    image: "/modern-sports-stadium-golden-hour.jpg",
    status: "PRÓXIMO EVENTO",
  },
  {
    id: 2,
    title: "JORNADA 9",
    date: "ABR 19-21",
    venue: "ARENA DEPORTIVA",
    image: "/sports-arena-night-lights.jpg",
    status: "PRÓXIMO EVENTO",
  },
  {
    id: 3,
    title: "SEMIFINALES",
    date: "MAY 3-5",
    venue: "COMPLEJO OLÍMPICO",
    image: "/olympic-sports-complex-aerial-view.jpg",
    status: "PRÓXIMO EVENTO",
  },
]

export function UpcomingEvents() {
  return (
    <section className="bg-muted/30 py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold">PRÓXIMOS EVENTOS</h2>
          <Link href="/eventos">
            <Button variant="ghost" className="font-bold">
              VER CALENDARIO →
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-primary px-3 py-1 text-xs font-bold text-white">{event.status}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm text-white/80 mb-1">{event.date}</p>
                  <h3 className="font-display text-3xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-sm text-white/90 font-medium">{event.venue}</p>
                </div>
              </div>

              <div className="p-4 flex gap-2">
                <Button className="flex-1 bg-primary hover:bg-primary/90 font-bold rounded-none">VER RESULTADOS</Button>
                <Button variant="outline" className="flex-1 font-bold rounded-none border-2 bg-transparent">
                  VER DETALLES
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
