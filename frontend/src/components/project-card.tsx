import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Clock, Users, ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import type { Project } from "@/types/project"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const fundingPercentage = Math.min((project.currentFunding / project.targetFunding) * 100, 100)

  const statusStyles = {
    active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    funded: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    ended: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
  }

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status badge */}
        <Badge 
          variant="outline" 
          className={`absolute top-3 left-3 ${statusStyles[project.status as keyof typeof statusStyles] || statusStyles.active}`}
        >
          {project.status}
        </Badge>
        
        {/* Category badge */}
        <Badge variant="secondary" className="absolute top-3 right-3 bg-black/50 text-white border-0">
          {project.category}
        </Badge>
      </div>

      <CardContent className="p-5">
        {/* Title */}
        <h3 className="font-heading font-semibold text-lg line-clamp-1 mb-2 group-hover:text-indigo-500 transition-colors">
          {project.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">{project.currentFunding} ETH</span>
            <span className="text-muted-foreground">of {project.targetFunding} ETH</span>
          </div>
          <Progress value={fundingPercentage} className="h-1.5" />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{project.backers} backers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{project.daysLeft} days left</span>
          </div>
        </div>

        {/* CTA */}
        <Link to={`/projects/${project.id}`} className="block">
          <Button variant="outline" className="w-full group/btn hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-colors">
            View Project
            <ArrowUpRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
