"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"

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

// Mock data - En producción esto vendría de tu backend
const events = [
  {
    date: "2025-04-12",
    title: "Jornada 8 - Día 1",
    matches: [
      { home: "Tigres FC", away: "Águilas SC", time: "16:00", venue: "Estadio Nacional" },
      { home: "Leones United", away: "Pumas AC", time: "19:00", venue: "Estadio Nacional" },
    ],
  },
  {
    date: "2025-04-13",
    title: "Jornada 8 - Día 2",
    matches: [
      { home: "Halcones FC", away: "Lobos FC", time: "15:00", venue: "Arena Deportiva" },
      { home: "Cóndores SC", away: "Panteras United", time: "18:00", venue: "Arena Deportiva" },
    ],
  },
  {
    date: "2025-04-19",
    title: "Jornada 9 - Día 1",
    matches: [
      { home: "Águilas SC", away: "Leones United", time: "16:30", venue: "Complejo Olímpico" },
      { home: "Pumas AC", away: "Tigres FC", time: "19:30", venue: "Complejo Olímpico" },
    ],
  },
  {
    date: "2025-05-03",
    title: "Semifinales - Ida",
    matches: [
      { home: "TBD", away: "TBD", time: "17:00", venue: "Estadio Nacional" },
      { home: "TBD", away: "TBD", time: "20:00", venue: "Estadio Nacional" },
    ],
  },
]

export function EventsCalendar() {
  const [currentMonth, setCurrentMonth] = useState(3) // Abril (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

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
    return events.some((event) => event.date === dateStr)
  }

  const getEventForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.find((event) => event.date === dateStr)
  }

  const selectedEvent = selectedDate ? events.find((event) => event.date === selectedDate) : null

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
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                    hasEventDay ? "bg-primary text-white hover:bg-primary/90" : "hover:bg-muted"
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
                <h3 className="font-display text-2xl font-bold">{selectedEvent.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-6">{selectedEvent.date}</p>

              <div className="space-y-4">
                {selectedEvent.matches.map((match, index) => (
                  <div key={index} className="border border-border p-4 hover:border-primary transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-primary">{match.time}</span>
                      <Badge variant="secondary" className="text-xs">
                        PROGRAMADO
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{match.home}</span>
                        <span className="text-muted-foreground">vs</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{match.away}</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mt-3">{match.venue}</p>
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
