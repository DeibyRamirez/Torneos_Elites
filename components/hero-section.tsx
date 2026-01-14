"use client"

import { Button } from "@/components/ui/button"
import { Play, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
  const [isMuted, setIsMuted] = useState(true)

  const currentYear = new Date().getFullYear();

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black">
        <img src="/intense-sports-action-celebration-victory-athlete.jpg" alt="Hero background" className="h-full w-full object-cover" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="max-w-5xl space-y-6 animate-slide-in-up">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white drop-shadow-2xl">
            TORNEOS ÉLITES {currentYear}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto">
            La competencias más emocionantes del año
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6 rounded-none"
            >
              VER RESULTADOS EN VIVO
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-6 rounded-none bg-transparent"
            >
              CALENDARIO COMPLETO
            </Button>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 left-8 z-20 flex gap-3">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
          aria-label="Pause"
        >
          <Play className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}
