"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { use, useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

type CalendarEvent = {
  fecha: string
  titulo: string
  matches: {
    equipo_local: string
    equipo_visitante: string
    hora: string
    ubicacion: string
  }[]
}

type EquipoEvent = {
  id: string
  nombre: string
}


export function EventsCalendar() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [equipos, setEquipos] = useState<EquipoEvent[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);


  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)

  const hasEvent = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.some((event) => event.fecha === dateStr)
  }

  const getEventForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.find((event) => event.fecha === dateStr)
  }

  const selectedEvent = selectedDate ? events.find((event) => event.fecha === selectedDate) : null


  // Cunsultos los equipos
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "equipos"),
      (snapshot) => {
        const equiposData: EquipoEvent[] = snapshot.docs.map(doc => ({
          id: doc.id,
          nombre: doc.data().nombre,
        }))

        setEquipos(equiposData)
      }
    )

    return () => unsubscribe()
  }, [])


  // Mapeo de acuerdo a id los equipos de los eventos.
  const equiposMap = Object.fromEntries(equipos.map(e => [e.id, e.nombre]));


  // Relaciono los equipos de los eventos en el calendario y les doy el formato.
  useEffect(() => {
    if (equipos.length === 0) return

    const unsubscribe = onSnapshot(
      collection(db, "eventos"),
      (snapshot) => {
        const eventosFormateados: CalendarEvent[] = snapshot.docs.map((doc) => {
          const data = doc.data()

          return {
            fecha: data.fecha,
            titulo: data.nombre,
            matches: [
              {
                equipo_local: equiposMap[data.equipoLocal] ?? "Equipo desconocido",
                equipo_visitante: equiposMap[data.equipoVisitante] ?? "Equipo desconocido",
                hora: data.hora,
                ubicacion: data.ubicacion,
              },
            ],
          }
        })

        setEvents(eventosFormateados)
      }
    )
    return () => unsubscribe()
  }, [equipos])


  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Calendar */}
      <div className="lg:col-span-2">
        <div className="bg-card border border-border p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-3xl font-bold">
              {months[currentMonth]} {currentYear}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={previousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
              <div key={day} className="text-center text-sm font-bold text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDay }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {/* Calendar Days */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const hasEventDay = hasEvent(day)
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
              const isSelected = selectedDate === dateStr

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all ${hasEventDay ? "bg-primary text-white hover:bg-primary/90" : "hover:bg-muted"
                    } ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}`}
                >
                  {day}
                </button>
              )
            })}
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-primary" />
              <span>Día con eventos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="lg:col-span-1">
        <div className="bg-card border border-border p-6 sticky top-24">
          {selectedEvent ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <h3 className="font-display text-2xl font-bold">{selectedEvent.titulo}</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-6">{selectedEvent.fecha}</p>

              <div className="space-y-4">
                {selectedEvent.matches.map((match, index) => (
                  <div key={index} className="border border-border p-4 hover:border-primary transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-primary">{match.hora}</span>
                      <Badge variant="secondary" className="text-xs">
                        PROGRAMADO
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{match.equipo_local}</span>
                        <span className="text-muted-foreground">vs</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{match.equipo_visitante}</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mt-3">{match.ubicacion}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Selecciona una fecha con eventos para ver los detalles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
