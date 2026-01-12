import Link from "next/link"
import { Plus, Edit, Calendar, Users, Trophy, BarChart } from "lucide-react"

const actions = [
  {
    title: "Crear Partido",
    description: "Agregar un nuevo partido al calendario",
    icon: Plus,
    href: "/admin/partidos/nuevo",
    color: "bg-primary",
  },
  {
    title: "Actualizar Resultado",
    description: "Modificar marcadores y estadísticas",
    icon: Edit,
    href: "/admin/partidos",
    color: "bg-primary",
  },
  {
    title: "Gestionar Equipos",
    description: "Editar información de equipos",
    icon: Users,
    href: "/admin/equipos",
    color: "bg-primary",
  },
  {
    title: "Gestionar Jugadores",
    description: "Agregar o editar jugadores",
    icon: Trophy,
    href: "/admin/jugadores",
    color: "bg-primary",
  },
  {
    title: "Ver Calendario",
    description: "Administrar fechas y horarios",
    icon: Calendar,
    href: "/admin/calendario",
    color: "bg-primary",
  },
  {
    title: "Estadísticas",
    description: "Ver reportes y análisis",
    icon: BarChart,
    href: "/admin/estadisticas",
    color: "bg-primary",
  },
]

export function AdminQuickActions() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-6">ACCIONES RÁPIDAS</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <div className="bg-card border border-border p-6 hover:border-primary transition-all duration-300 h-full">
              <div className={`inline-flex p-3 rounded-lg ${action.color} mb-4`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
