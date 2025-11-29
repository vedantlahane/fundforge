import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Clock, Target } from "lucide-react"
import { useProject } from "@/hooks/use-project"

interface ProjectDetailsProps {
  projectId: string
}

export function ProjectDetails({ projectId }: ProjectDetailsProps) {
  const { project } = useProject(projectId)

  if (!project) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "funded":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Image */}
      <div className="relative aspect-[21/9] rounded-2xl overflow-hidden group">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge className={`absolute top-4 left-4 ${getStatusColor(project.status)} border`}>
          {project.status}
        </Badge>
      </div>

      {/* Title & Meta */}
      <div>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
            {project.title}
          </h1>
          <Badge variant="outline" className="text-sm px-3 py-1">
            {project.category}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-muted">
              <User className="w-3.5 h-3.5" />
            </div>
            <span>by <span className="text-foreground font-medium">{project.creator}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-muted">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <span><span className="text-foreground font-medium">{project.daysLeft}</span> days remaining</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-muted">
              <Target className="w-3.5 h-3.5" />
            </div>
            <span><span className="text-foreground font-medium">{project.targetFunding} ETH</span> goal</span>
          </div>
        </div>
      </div>

      {/* About */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-heading">About This Project</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed text-[15px]">
            {project.description}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
