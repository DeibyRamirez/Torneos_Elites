import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { obtenerEquiposUsuario, obtenerEventosUsuario } from "@/app/services/busqueda";
import { User } from "firebase/auth";

interface TopEquiposProps {
  user: User | null;
  torneoId?: string; // ID del torneo para filtrar equipos
}

interface EquipoConEstadisticas {
  id: string;
  nombre: string;
  representante: string;
  logoUrl: string;
  torneo: string;
  partidosGanados: number;
  partidosEmpatados: number;
  partidosPerdidos: number;
  puntos: number;
}

export function TopEquipos({ user, torneoId }: TopEquiposProps) {
  const [equipos, setEquipos] = useState<EquipoConEstadisticas[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEquipos();
  }, [user, torneoId]);

  const cargarEquipos = async () => {
    try {
      setLoading(true);

      const userId = user ? user.uid : null;
      const equiposData = await obtenerEquiposUsuario(userId, torneoId);
      
      // Cargar eventos para calcular estadísticas
      const eventosData = await obtenerEventosUsuario(userId, torneoId);

      // Calcular estadísticas para cada equipo
      const equiposConEstadisticas = equiposData.map(equipo => {
        // Usar estadísticas de la BD si existen, sino calcular o usar valores por defecto
        return {
          ...equipo,
          partidosGanados: equipo.partidosGanados || 0,
          partidosEmpatados: equipo.partidosEmpatados || 0,
          partidosPerdidos: equipo.partidosPerdidos || 0,
          puntos: equipo.puntos || 0,
        };
      });

      // Ordenar por puntos (mayor a menor)
      equiposConEstadisticas.sort((a, b) => b.puntos - a.puntos);

      setEquipos(equiposConEstadisticas);
    } catch (error) {
      console.error("Error al cargar equipos:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="bg-background py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-10">TABLA DE POSICIONES</h2>
          <div className="text-center py-12">
            <p className="text-muted-foreground font-medium">Cargando equipos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold">TABLA DE POSICIONES</h2>
          <Link href="/equipos">
            <Button variant="ghost" className="font-bold">
              VER TABLA COMPLETA →
            </Button>
          </Link>
        </div>

        {equipos.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border p-8">
            <p className="text-muted-foreground font-medium text-lg mb-4">
              No hay equipos registrados
            </p>
            {user ? (
              <p className="text-sm text-muted-foreground">
                Crea tu primer equipo desde el panel de administración
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Aún no se han registrado equipos
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {equipos.slice(0, 4).map((equipo, index) => (
              <div
                key={equipo.id}
                className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={equipo.logoUrl || "/placeholder.svg"}
                    alt={equipo.nombre}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                      <span className="font-display text-2xl font-bold text-white">{index + 1}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold mb-2">{equipo.nombre}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {equipo.representante}
                  </p>

                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {equipo.partidosGanados}
                      </p>
                      <p className="text-xs text-muted-foreground">G</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {equipo.partidosEmpatados}
                      </p>
                      <p className="text-xs text-muted-foreground">E</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {equipo.partidosPerdidos}
                      </p>
                      <p className="text-xs text-muted-foreground">P</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {equipo.puntos}
                      </p>
                      <p className="text-xs text-muted-foreground">PTS</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}