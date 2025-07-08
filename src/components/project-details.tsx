import { type JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { useProject } from "@/hooks/use-project";
import type { Project } from "@/types/project";

interface ProjectDetailsProps {
  projectId: string;
}

export function ProjectDetails({ projectId }: ProjectDetailsProps): JSX.Element | null {
  const { project } = useProject(projectId);

  if (!project) return null;

  const getStatusVariant = (status: Project["status"]): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "active":
        return "default";
      case "funded":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
        <img 
          src={project.image || "/placeholder.svg"} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <Badge
          className="absolute top-4 left-4"
          variant={getStatusVariant(project.status)}
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
  );
}

export default ProjectDetails;
