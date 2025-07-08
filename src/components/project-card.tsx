import React, { type JSX } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Target, Users, Coins } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  targetFunding: number;
  currentFunding: number;
  backers: number;
  daysLeft: number;
  status: "active" | "funded" | "failed";
  image?: string;
  creator: string;
  milestones: any[];
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  const fundingPercentage = (project.currentFunding / project.targetFunding) * 100;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img 
          src={project.image || "/placeholder.svg"} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <Badge
          className="absolute top-4 left-4"
          variant={project.status === "active" ? "default" : project.status === "funded" ? "secondary" : "destructive"}
        >
          {project.status}
        </Badge>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg line-clamp-2">{project.title}</h3>
          <Badge variant="outline">{project.category}</Badge>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{fundingPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={fundingPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span>{project.targetFunding} ETH</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{project.backers} backers</span>
          </div>
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-muted-foreground" />
            <span>{project.currentFunding} ETH</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{project.daysLeft} days</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link to={`/projects/${project.id}`} className="w-full">
          <Button className="w-full">View Project</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
