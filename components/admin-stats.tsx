import { Users, Calendar, Trophy, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Total Equipos",
    value: "8",
    icon: Users,
    change: "+0%",
    changeType: "neutral",
  },
  {
    label: "Partidos Jugados",
    value: "32",
    icon: Calendar,
    change: "+8 esta semana",
    changeType: "positive",
  },
  {
    label: "Jugadores Activos",
    value: "176",
    icon: Trophy,
    change: "+4 nuevos",
    changeType: "positive",
  },
  {
    label: "Partidos Pendientes",
    value: "12",
    icon: TrendingUp,
    change: "Próxima jornada",
    changeType: "neutral",
  },
]

export function AdminStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <stat.icon className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
          <p className="font-display text-4xl font-bold mb-2">{stat.value}</p>
          <p
            className={`text-sm ${
              stat.changeType === "positive"
                ? "text-primary"
                : stat.changeType === "negative"
                  ? "text-destructive"
                  : "text-muted-foreground"
            }`}
          >
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  )
}
