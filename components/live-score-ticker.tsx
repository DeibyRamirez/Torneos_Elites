"use client"

import { useState } from "react"
import Link from "next/link"

// Mock data - En producción esto vendría de tu backend
const liveScores = [
  { id: 1, home: "Tigres FC", away: "Águilas SC", homeScore: 2, awayScore: 1, time: "78'" },
  { id: 2, home: "Leones United", away: "Pumas AC", homeScore: 1, awayScore: 1, time: "HT" },
]

export function LiveScoreTicker() {
  const [isVisible, setIsVisible] = useState(true)

  if (!liveScores.length || !isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary text-white border-t-2 border-primary">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <span className="font-bold text-sm">EN VIVO</span>
          </div>

          <div className="flex-1 flex items-center gap-6 overflow-x-auto">
            {liveScores.map((match) => (
              <Link
                key={match.id}
                href="/en-vivo"
                className="flex items-center gap-3 whitespace-nowrap hover:opacity-80 transition-opacity"
              >
                <span className="text-sm">{match.home}</span>
                <span className="font-display text-lg font-bold">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className="text-sm">{match.away}</span>
                <span className="text-xs opacity-75">{match.time}</span>
              </Link>
            ))}
          </div>

          <button onClick={() => setIsVisible(false)} className="text-white/80 hover:text-white text-sm">
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
