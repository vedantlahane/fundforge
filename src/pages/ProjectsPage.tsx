import { ProjectGrid } from "@/components/project-grid"
import { ProjectFilters } from "@/components/project-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Discover Projects</h1>
          <p className="text-muted-foreground mt-2">Support innovative projects on the blockchain</p>
        </div>
        <Link to="/create-project">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Project
          </Button>
        </Link>
      </div>

      <ProjectFilters />
      <ProjectGrid />
    </div>
  )
}
