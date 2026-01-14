import { Equipo } from "@/app/interface/equipo";
import { Evento } from "@/app/interface/evento";
import { obtenerEventosUsuario, obtenerEquiposUsuario } from "@/app/services/busqueda";
import { Button } from "@/components/ui/button"
import { User } from "firebase/auth";
import Link from "next/link"
import { useState, useEffect } from "react";

interface EventosProps {
    user: User | null;
    torneoId?: string; // ID del torneo para filtrar eventos
}

export function ProximosEventos({ user, torneoId }: EventosProps) {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [equipos, setEquipos] = useState<Equipo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarEventos();
    }, [user, torneoId]);

    const cargarEventos = async () => {
        try {
            setLoading(true);
            
            // Si user es null, pasa null al servicio para obtener datos globales
            // Si user existe, pasa user.uid para obtener solo sus datos
            const userId = user ? user.uid : null;
            
            // Cargar eventos (filtrados por torneo si se proporciona torneoId)
            const eventosData = await obtenerEventosUsuario(userId, torneoId);
            
            // Cargar equipos para poder mostrar sus nombres
            const equiposData = await obtenerEquiposUsuario(userId, torneoId);
            
            setEventos(eventosData);
            setEquipos(equiposData);
        } catch (error) {
            console.error("Error al cargar eventos:", error);
        } finally {
            setLoading(false);
        }
    };

    // Función auxiliar para obtener el nombre de un equipo por su ID
    const obtenerNombreEquipo = (equipoId: string) => {
        const equipo = equipos.find(e => e.id === equipoId);
        return equipo ? equipo.nombre : "Equipo desconocido";
    };

    // Función para formatear la fecha
    const formatearFecha = (fecha: string) => {
        const date = new Date(fecha);
        const opciones: Intl.DateTimeFormatOptions = { 
            month: 'short', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('es-ES', opciones).toUpperCase();
    };

    if (loading) {
        return (
            <section className="bg-muted/30 py-16 px-4">
                <div className="mx-auto max-w-7xl">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-10">PRÓXIMOS EVENTOS</h2>
                    <div className="text-center py-12">
                        <p className="text-muted-foreground font-medium">Cargando eventos...</p>
                    </div>
                </div>
            </section>
        );
    }

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

                {eventos.length === 0 ? (
                    <div className="text-center py-12 bg-card border border-border p-8">
                        <p className="text-muted-foreground font-medium text-lg mb-4">
                            No hay eventos programados
                        </p>
                        {user ? (
                            <p className="text-sm text-muted-foreground">
                                Crea tu primer evento desde el panel de administración
                            </p>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Aún no se han creado eventos públicos
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {eventos.map((evento) => (
                            <div
                                key={evento.id}
                                className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    {/* Imagen de placeholder o imagen del evento si existe */}
                                    <img
                                        src={evento.imagenUrl || "/placeholder.svg"}
                                        alt={evento.nombre}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                    <div className="absolute top-4 left-4">
                                        <span className="inline-block bg-primary px-3 py-1 text-xs font-bold text-white">
                                            PRÓXIMO EVENTO
                                        </span>
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-sm text-white/80 mb-1">
                                            {formatearFecha(evento.fecha)} - {evento.hora}
                                        </p>
                                        <h3 className="font-display text-3xl font-bold text-white mb-2">
                                            {evento.nombre}
                                        </h3>
                                        <p className="text-sm text-white/90 font-medium mb-2">
                                            {evento.ubicacion}
                                        </p>
                                        <p className="text-xs text-white/70 font-medium">
                                            {obtenerNombreEquipo(evento.equipoLocal)} vs {obtenerNombreEquipo(evento.equipoVisitante)}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 flex gap-2">
                                    <Button className="flex-1 bg-primary hover:bg-primary/90 font-bold rounded-none">
                                        VER DETALLES
                                    </Button>
                                    <Button variant="outline" className="flex-1 font-bold rounded-none border-2 bg-transparent">
                                        COMPARTIR
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}