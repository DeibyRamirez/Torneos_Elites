export function TeamHeader({ team }: { team: any }) {
  return (
    <section className="relative h-[400px] overflow-hidden">
      <div className="absolute inset-0">
        <img src={team.coverImage || "/placeholder.svg"} alt={team.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>

      <div className="relative z-10 h-full flex items-end">
        <div className="mx-auto max-w-7xl w-full px-4 pb-12">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="h-32 w-32 rounded-lg overflow-hidden border-4 border-white shadow-2xl flex-shrink-0">
              <img src={team.image || "/placeholder.svg"} alt={team.name} className="h-full w-full object-cover" />
            </div>

            <div className="flex-1">
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">{team.name}</h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div>
                  <p className="text-sm text-white/70">Fundado</p>
                  <p className="font-bold">{team.founded}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Estadio</p>
                  <p className="font-bold">{team.stadium}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Capacidad</p>
                  <p className="font-bold">{team.capacity.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Entrenador</p>
                  <p className="font-bold">{team.coach}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
