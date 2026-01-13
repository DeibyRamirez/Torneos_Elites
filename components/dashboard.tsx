"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, LayoutDashboard, Plus, CupSoda, Trophy } from "lucide-react"
import { Cuprum } from "next/font/google"
import { User } from "firebase/auth"

// Definimos la interface correctamente
interface DashboardProps {
    user: User;
}
export function Dashboard({ user }: DashboardProps) {
    const [view, setView] = useState<"overview" | "torneo" | "equipo" | "jugador">("overview")

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-4">
            <div className="mx-auto max-w-7xl">
                {/* Header del Dashboard */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
                            Panel de {user.displayName || "Usuario"}
                        </h2>
                        <p className="text-muted-foreground mt-2 font-medium">Gestiona tu torneo, equipos y jugadores.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={view === "torneo" ? "default" : "outline"}
                            className="font-bold border-2"
                            onClick={() => setView("torneo")}
                        >
                            <Trophy className="mr-2 h-4 w-4" /> + TORNEO
                        </Button>
                        <Button
                            variant={view === "equipo" ? "default" : "outline"}
                            className="font-bold border-2"
                            onClick={() => setView("equipo")}
                        >
                            <Users className="mr-2 h-4 w-4" /> + EQUIPO
                        </Button>
                        <Button
                            variant={view === "jugador" ? "default" : "outline"}
                            className="font-bold border-2"
                            onClick={() => setView("jugador")}
                        >
                            <UserPlus className="mr-2 h-4 w-4" /> + JUGADOR
                        </Button>
                    </div>
                </div>

                {/* Contenido Principal */}
                <div className="grid gap-8">
                    {view === "overview" && (
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Card de ejemplo con tu estilo */}
                            <div
                                className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 p-8 cursor-pointer"
                                onClick={() => setView("torneo")}
                            >
                                <Badge className="bg-primary text-white font-bold mb-4">MÓDULO</Badge>
                                <h3 className="text-2xl font-bold mb-2 uppercase">Planilla de Torneos</h3>
                                <p className="text-muted-foreground font-medium">Crea tu torneo y disfruta del deporte.</p>
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </div>

                            <div
                                className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 p-8 cursor-pointer"
                                onClick={() => setView("equipo")}
                            >
                                <Badge className="bg-muted text-muted-foreground font-bold mb-4">MÓDULO</Badge>
                                <h3 className="text-2xl font-bold mb-2 uppercase">Planilla de Equipos</h3>
                                <p className="text-muted-foreground font-medium">Crea y edita los clubes que participan en el torneo.</p>
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </div>

                            <div
                                className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 p-8 cursor-pointer"
                                onClick={() => setView("jugador")}
                            >
                                <Badge className="bg-muted text-muted-foreground font-bold mb-4">MÓDULO</Badge>
                                <h3 className="text-2xl font-bold mb-2 uppercase">Registro de Jugadores</h3>
                                <p className="text-muted-foreground font-medium">Inscribe a los deportistas reales con sus datos técnicos.</p>
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </div>
                        </div>
                    )}

                    {(view === "equipo" || view === "jugador" || view === "torneo") && (
                        <div className="bg-card border border-border p-6 md:p-10 relative overflow-hidden">
                            <Button
                                variant="ghost"
                                className="mb-6 font-bold p-0 hover:bg-transparent hover:text-primary"
                                onClick={() => setView("overview")}
                            >
                                ← VOLVER AL RESUMEN
                            </Button>

                            {view === "torneo" && <TorneoForm />}
                            {view === "equipo" && <EquipoForm />}
                            {view === "jugador" && <JugadorForm />}
                            <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function TorneoForm() {
    return (
        <form className="space-y-6">
            <h3 className="text-3xl font-bold uppercase">Nueva Planilla de Torneo</h3>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Nombre del Torneo</label>
                    <input className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors" placeholder="EJ: TIGRES FC" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Representante</label>
                    <input className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors" placeholder="NOMBRE COMPLETO" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Fecha</label>
                    <input
                        type="date"
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Ubicación</label>
                    <input
                        type="text"
                        placeholder="Buscar ubicación..."
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                        onFocus={() => {
                            // Abre el mapa o autocompletado de Google Maps
                        }}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                    />
                </div>
            </div>
            <Button className="w-full md:w-auto px-10 h-12 font-bold text-lg bg-primary hover:bg-primary/90">
                CREAR TORNEO
            </Button>
        </form>
    )
}

function EquipoForm() {
    return (
        <form className="space-y-6">
            <h3 className="text-3xl font-bold uppercase">Nueva Planilla de Equipo</h3>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Nombre del Equipo</label>
                    <input className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors" placeholder="EJ: TIGRES FC" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Representante</label>
                    <input className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors" placeholder="NOMBRE COMPLETO" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Seleccionar Torneo</label>
                    <select className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors">
                        <option value="">SELECCIONAR TORNEO</option>
                        <option value="torneo1">Torneo 1</option>
                        <option value="torneo2">Torneo 2</option>
                        <option value="torneo3">Torneo 3</option>
                    </select>
                </div>
            </div>
            <Button className="w-full md:w-auto px-10 h-12 font-bold text-lg bg-primary hover:bg-primary/90">
                GUARDAR EQUIPO
            </Button>
        </form>
    )
}

function JugadorForm() {
    return (
        <form className="space-y-6">
            <h3 className="text-3xl font-bold uppercase">Registro de Jugador</h3>
            <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Nombre Completo</label>
                    <input className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors" placeholder="JUAN PÉREZ" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">DNI / ID</label>
                    <input className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors" placeholder="00000000" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">EDAD</label>
                    <input className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors" placeholder="20" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">ALTURA</label>
                    <input className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors" placeholder="1.8mts" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">PESO</label>
                    <input className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors" placeholder="62kg" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">NACIONALIDAD</label>
                    <input className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors" placeholder="Colombia" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Equipo Asignado</label>
                    <select className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors">
                        <option value="">SELECCIONAR EQUIPO</option>
                        <option value="equipo1">Equipo 1</option>
                        <option value="equipo2">Equipo 2</option>
                        <option value="equipo3">Equipo 3</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">POSICIÓN</label>
                    <select className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors">
                        <option value="">SELECCIONAR POSICIÓN</option>

                        {/* Portería */}
                        <option value="portero">PORTERO</option>

                        {/* Defensas */}
                        <option value="defensa_central">DEFENSA CENTRAL</option>
                        <option value="lateral_derecho">LATERAL DERECHO</option>
                        <option value="lateral_izquierdo">LATERAL IZQUIERDO</option>
                        <option value="carrilero">CARRILERO</option>

                        {/* Mediocampistas */}
                        <option value="pivote">PIVOTE (MCD)</option>
                        <option value="mediocentro">MEDIOCENTRO (MC)</option>
                        <option value="mediapunta">MEDIAPUNTA (CAM)</option>
                        <option value="interior">INTERIOR</option>

                        {/* Delanteros */}
                        <option value="extremo_derecho">EXTREMO DERECHO</option>
                        <option value="extremo_izquierdo">EXTREMO IZQUIERDO</option>
                        <option value="delantero_centro">DELANTERO CENTRO</option>
                        <option value="segundo_delantero">SEGUNDO DELANTERO</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">Foto</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="flex h-12 w-full border-2 border-border bg-background px-3 py-2 text-sm font-bold focus:border-primary outline-none transition-colors"
                    />
                </div>
            </div>
            <Button className="w-full md:w-auto px-10 h-12 font-bold text-lg bg-primary hover:bg-primary/90">
                INSCRIBIR JUGADOR
            </Button>
        </form>
    )
}

