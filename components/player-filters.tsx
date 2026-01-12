"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

const positions = ["Todos", "Portero", "Defensa", "Mediocampista", "Delantero"]

export function PlayerFilters() {
  const [selectedPosition, setSelectedPosition] = useState("Todos")

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {positions.map((position) => (
          <Button
            key={position}
            variant={selectedPosition === position ? "default" : "outline"}
            onClick={() => setSelectedPosition(position)}
            className="font-bold"
          >
            {position}
          </Button>
        ))}
      </div>
    </div>
  )
}
