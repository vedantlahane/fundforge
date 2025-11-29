import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import { useProject } from "@/hooks/use-project"

interface ProjectDetailsProps {
  projectId: string
}

export function ProjectDetails({ projectId }: ProjectDetailsProps) {
  const { project } = useProject(projectId)

  if (!project) return null

  return (
    <div className="space-y-6">
      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="object-cover w-full h-full"
        />
        <Badge
          className="absolute top-4 left-4"
          variant={project.status === "active" ? "default" : project.status === "funded" ? "secondary" : "destructive"}
        >
          {project.status}
        </Badge>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <Badge variant="outline">{project.category}</Badge>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Created by {project.creator}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{project.daysLeft} days remaining</span>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About This Project</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{project.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}
