import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

const featuredProjects = [
  {
    id: "1",
    title: "DeFi Trading Platform",
    description: "Revolutionary decentralized trading platform with advanced analytics and automated strategies.",
    category: "DeFi",
    targetFunding: 50,
    currentFunding: 32.5,
    backers: 127,
    daysLeft: 15,
    status: "active" as const,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60",
    creator: "0x123...abc",
    milestones: [],
  },
  {
    id: "2",
    title: "NFT Art Marketplace",
    description: "Community-driven NFT marketplace focusing on emerging digital artists and collectors.",
    category: "NFT",
    targetFunding: 25,
    currentFunding: 18.7,
    backers: 89,
    daysLeft: 22,
    status: "active" as const,
    image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&auto=format&fit=crop&q=60",
    creator: "0x456...def",
    milestones: [],
  },
  {
    id: "3",
    title: "GameFi RPG Adventure",
    description: "Play-to-earn RPG game with blockchain-based character ownership and token rewards.",
    category: "Gaming",
    targetFunding: 100,
    currentFunding: 75.2,
    backers: 234,
    daysLeft: 8,
    status: "active" as const,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0e?w=800&auto=format&fit=crop&q=60",
    creator: "0x789...ghi",
    milestones: [],
  },
]

export function FeaturedProjects() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-indigo-500 mb-3">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Featured</span>
            </div>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight mb-2">
              Trending Projects
            </h2>
            <p className="text-muted-foreground">
              Discover innovative projects making waves in web3
            </p>
          </div>
          <Link to="/projects">
            <Button variant="outline" className="gap-2 group">
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
