"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const teams = [
  "Tigres FC",
  "Águilas SC",
  "Leones United",
  "Pumas AC",
  "Halcones FC",
  "Cóndores SC",
  "Lobos FC",
  "Panteras United",
]

const venues = ["Estadio Nacional", "Arena Deportiva", "Complejo Olímpico", "Estadio Central"]

export function NewMatchForm() {
  const [formData, setFormData] = useState({
    homeTeam: "",
    awayTeam: "",
    date: "",
    time: "",
    venue: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí conectarías con tu backend
    console.log("Creando partido:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border p-8 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="home-team">Equipo Local</Label>
          <Select value={formData.homeTeam} onValueChange={(value) => setFormData({ ...formData, homeTeam: value })}>
            <SelectTrigger id="home-team">
              <SelectValue placeholder="Seleccionar equipo" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team} value={team}>
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="away-team">Equipo Visitante</Label>
          <Select value={formData.awayTeam} onValueChange={(value) => setFormData({ ...formData, awayTeam: value })}>
            <SelectTrigger id="away-team">
              <SelectValue placeholder="Seleccionar equipo" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team} value={team}>
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Fecha</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Hora</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="venue">Estadio</Label>
        <Select value={formData.venue} onValueChange={(value) => setFormData({ ...formData, venue: value })}>
          <SelectTrigger id="venue">
            <SelectValue placeholder="Seleccionar estadio" />
          </SelectTrigger>
          <SelectContent>
            {venues.map((venue) => (
              <SelectItem key={venue} value={venue}>
                {venue}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 font-bold">
          CREAR PARTIDO
        </Button>
        <Button type="button" variant="outline" className="flex-1 font-bold bg-transparent">
          CANCELAR
        </Button>
      </div>
    </form>
  )
}
