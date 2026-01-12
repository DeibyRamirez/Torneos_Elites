"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Trash2 } from "lucide-react"

// Mock data
const matches = [
  {
    id: 1,
    date: "2025-04-12",
    time: "16:00",
    home: "Tigres FC",
    away: "Águilas SC",
    homeScore: null,
    awayScore: null,
    status: "PROGRAMADO",
    venue: "Estadio Nacional",
  },
  {
    id: 2,
    date: "2025-03-30",
    time: "19:00",
    home: "Leones United",
    away: "Pumas AC",
    homeScore: 3,
    awayScore: 2,
    status: "FINALIZADO",
    venue: "Arena Deportiva",
  },
]

export function MatchManagementList() {
  const [selectedMatch, setSelectedMatch] = useState<any>(null)
  const [homeScore, setHomeScore] = useState("")
  const [awayScore, setAwayScore] = useState("")

  const handleEditMatch = (match: any) => {
    setSelectedMatch(match)
    setHomeScore(match.homeScore?.toString() || "")
    setAwayScore(match.awayScore?.toString() || "")
  }

  const handleSaveMatch = () => {
    // Aquí conectarías con tu backend
    console.log("Guardando partido:", { id: selectedMatch.id, homeScore, awayScore })
    setSelectedMatch(null)
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <div key={match.id} className="bg-card border border-border p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Badge
                variant={match.status === "PROGRAMADO" ? "default" : "secondary"}
                className={
                  match.status === "PROGRAMADO"
                    ? "bg-primary text-white font-bold"
                    : "bg-muted text-muted-foreground font-bold"
                }
              >
                {match.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {match.date} • {match.time}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">{match.venue}</span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center mb-4">
            <div className="text-right">
              <h3 className="font-bold text-lg">{match.home}</h3>
            </div>

            <div className="flex items-center gap-4">
              {match.homeScore !== null && match.awayScore !== null ? (
                <div className="flex items-center gap-3">
                  <span className="font-display text-4xl font-bold">{match.homeScore}</span>
                  <span className="text-muted-foreground">-</span>
                  <span className="font-display text-4xl font-bold">{match.awayScore}</span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-muted-foreground">VS</span>
              )}
            </div>

            <div className="text-left">
              <h3 className="font-bold text-lg">{match.away}</h3>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-border">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => handleEditMatch(match)} className="font-bold">
                  <Edit className="h-4 w-4 mr-2" />
                  EDITAR
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">EDITAR PARTIDO</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="home-score">{match.home}</Label>
                    <Input
                      id="home-score"
                      type="number"
                      value={homeScore}
                      onChange={(e) => setHomeScore(e.target.value)}
                      placeholder="Goles"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="away-score">{match.away}</Label>
                    <Input
                      id="away-score"
                      type="number"
                      value={awayScore}
                      onChange={(e) => setAwayScore(e.target.value)}
                      placeholder="Goles"
                    />
                  </div>
                  <Button onClick={handleSaveMatch} className="w-full bg-primary hover:bg-primary/90 font-bold">
                    GUARDAR CAMBIOS
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="sm"
              className="font-bold text-destructive hover:text-destructive bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              ELIMINAR
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
