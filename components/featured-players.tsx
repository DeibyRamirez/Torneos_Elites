"use client"

import { Equipo } from "@/app/interface/equipo"
import { Jugador } from "@/app/interface/jugador"
import { obtenerJugadoresUsuario, obtenerEquiposUsuario } from "@/app/services/busqueda"
import { Button } from "@/components/ui/button"
import { User } from "firebase/auth"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface JugadoresProps {
  user: User | null;
  torneoId?: string; // ID del torneo para filtrar jugadores
}

export function JugadoresDestacados({ user, torneoId }: JugadoresProps) {
  const [jugadores, setJugadores] = useState<any[]>([]);
  const [equipos, setEquipos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    cargarJugadores();
  }, [user, torneoId]);

  const cargarJugadores = async () => {
    try {
      setLoading(true);

      // Si user es null, pasa null al servicio para obtener datos globales
      // Si user existe, pasa user.uid para obtener solo sus datos
      const userId = user ? user.uid : null;

      // Cargar jugadores (filtrados por torneo si se proporciona torneoId)
      const jugadoresData = await obtenerJugadoresUsuario(userId, torneoId);

      // Cargar equipos para mostrar los nombres
      const equiposData = await obtenerEquiposUsuario(userId, torneoId);

      setJugadores(jugadoresData);
      setEquipos(equiposData);
    } catch (error) {
      console.error("Error al cargar jugadores:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función auxiliar para obtener el nombre de un equipo por su ID
  const obtenerNombreEquipo = (equipoId: string) => {
    const equipo = equipos.find(e => e.id === equipoId);
    return equipo ? equipo.nombre : "Equipo desconocido";
  };

  // Función para obtener la bandera según la nacionalidad
  const obtenerBandera = (nacionalidad: string) => {
    const banderas: { [key: string]: string } = {
      'Colombia': '🇨🇴',
      'México': '🇲🇽',
      'Argentina': '🇦🇷',
      'Brasil': '🇧🇷',
      'España': '🇪🇸',
      'Uruguay': '🇺🇾',
      'Chile': '🇨🇱',
      'Perú': '🇵🇪',
      'Ecuador': '🇪🇨',
      'Venezuela': '🇻🇪',
    };
    return banderas[nacionalidad] || '🌍';
  };

  // Función para formatear la posición
  const formatearPosicion = (posicion: string) => {
    const posiciones: { [key: string]: string } = {
      'portero': 'PORTERO',
      'defensa_central': 'DEFENSA',
      'lateral_derecho': 'LATERAL',
      'lateral_izquierdo': 'LATERAL',
      'carrilero': 'CARRILERO',
      'pivote': 'PIVOTE',
      'mediocentro': 'MEDIOCAMPISTA',
      'mediapunta': 'MEDIAPUNTA',
      'interior': 'INTERIOR',
      'extremo_derecho': 'EXTREMO',
      'extremo_izquierdo': 'EXTREMO',
      'delantero_centro': 'DELANTERO',
      'segundo_delantero': 'DELANTERO',
    };
    return posiciones[posicion] || posicion.toUpperCase();
  };

  // Funciones de navegación para el carrusel
  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, jugadores.length - 4) : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= jugadores.length - 4 ? 0 : prevIndex + 1
    );
  };

  // Obtener jugadores visibles según el índice actual
  const jugadoresVisibles = jugadores.slice(currentIndex, currentIndex + 4);

  if (loading) {
    return (
      <section className="bg-muted/30 py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-10">JUGADORES DESTACADOS</h2>
          <div className="text-center py-12">
            <p className="text-muted-foreground font-medium">Cargando jugadores...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted/30 py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold">JUGADORES DESTACADOS</h2>
          <Link href="/jugadores">
            <Button variant="ghost" className="font-bold">
              VER TODOS →
            </Button>
          </Link>
        </div>

        {jugadores.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border p-8">
            <p className="text-muted-foreground font-medium text-lg mb-4">
              No hay jugadores registrados
            </p>
            {user ? (
              <p className="text-sm text-muted-foreground">
                Registra tu primer jugador desde el panel de administración
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Aún no se han registrado jugadores
              </p>
            )}
          </div>
        ) : (
          <div className="relative">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(jugadores.length > 4 ? jugadoresVisibles : jugadores).map((jugador, index) => (
                <div
                  key={jugador.id}
                  className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300"
                >
                  <div className="relative h-96 overflow-hidden">
                    {/* Imagen del jugador o placeholder */}
                    <img
                      src={jugador.fotoUrl || "/placeholder.svg"}
                      alt={jugador.nombre}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Etiqueta de posición */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-block bg-primary px-3 py-1 text-xs font-bold text-white">
                        {formatearPosicion(jugador.posicion)}
                      </span>
                    </div>

                    {/* Bandera de nacionalidad */}
                    <div className="absolute top-4 left-4">
                      <span className="text-2xl">
                        {obtenerBandera(jugador.nacionalidad)}
                      </span>
                    </div>

                    {/* Información del jugador */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-end justify-between mb-2">
                        <div>
                          <p className="text-sm text-white/80 mb-1">
                            {obtenerNombreEquipo(jugador.equipo)}
                          </p>
                          <h3 className="font-display text-2xl font-bold text-white">
                            {jugador.nombre}
                          </h3>
                        </div>
                        {/* Número de camiseta si lo deseas agregar a la interfaz */}
                        <span className="font-display text-5xl font-bold text-white/30">
                          {jugador.numero || index + 1}
                        </span>
                      </div>
                      <p className="text-sm text-white/90">
                        {jugador.edad} años • {jugador.altura}m • {jugador.peso}kg
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows - Solo mostrar si hay más de 4 jugadores */}
            {jugadores.length > 4 && (
              <div className="hidden lg:block">
                <button
                  onClick={prev}
                  disabled={currentIndex === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={next}
                  disabled={currentIndex >= jugadores.length - 4}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}