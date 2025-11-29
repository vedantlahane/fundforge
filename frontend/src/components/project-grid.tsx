import { ProjectCard } from "@/components/project-card"
import { useProjects } from "@/hooks/use-projects"
import { Folder } from "lucide-react"

export function ProjectGrid() {
  const { projects, loading } = useProjects()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[380px] bg-muted/50 animate-pulse rounded-xl" />
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <Folder className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-1">No projects found</h3>
        <p className="text-muted-foreground text-sm">Try adjusting your filters or check back later</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
