import { Hero } from "@/components/hero"
import { FeaturedProjects } from "@/components/featured-projects"
import { Stats } from "@/components/stats"
import { HowItWorks } from "@/components/how-it-works"

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <FeaturedProjects />
      <HowItWorks />
    </div>
  )
}
