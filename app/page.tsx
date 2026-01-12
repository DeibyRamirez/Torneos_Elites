import { HeroSection } from "@/components/hero-section"
import { FeaturedMatches } from "@/components/featured-matches"
import { TopTeams } from "@/components/top-teams"
import { UpcomingEvents } from "@/components/upcoming-events"
import { FeaturedPlayers } from "@/components/featured-players"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedMatches />
      <UpcomingEvents />
      <TopTeams />
      <FeaturedPlayers />
    </main>
  )
}
