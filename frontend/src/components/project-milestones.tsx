import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Circle, Flag } from "lucide-react"
import { useProject } from "@/hooks/use-project"

interface ProjectMilestonesProps {
  projectId: string
}

export function ProjectMilestones({ projectId }: ProjectMilestonesProps) {
  const { project } = useProject(projectId)

  if (!project?.milestones) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />
      case "active":
        return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      case "active":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <Card className="border-border/50 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-heading">
          <Flag className="w-5 h-5 text-amber-500" />
          Project Milestones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {project.milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="p-0.5">
                  {getStatusIcon(milestone.status)}
                </div>
                {index < project.milestones.length - 1 && (
                  <div className={`w-0.5 flex-1 min-h-[3rem] mt-2 ${milestone.status === "completed" ? "bg-emerald-500/50" : "bg-border"}`} />
                )}
              </div>

              <div className="flex-1 pb-6">
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-border transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="font-semibold">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                    </div>
                    <Badge className={`${getStatusBadge(milestone.status)} border shrink-0`}>
                      {milestone.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 pt-3 border-t border-border/50">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {milestone.fundingRequired} ETH
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Due: {milestone.dueDate}
                    </span>
                  </div>

                  {milestone.status === "active" && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-muted-foreground">Votes for completion</span>
                        <span className="font-medium">
                          {milestone.votes?.for || 0}/{milestone.votes?.total || 0}
                        </span>
                      </div>
                      <Progress
                        value={((milestone.votes?.for || 0) / (milestone.votes?.total || 1)) * 100}
                        className="h-1.5"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
