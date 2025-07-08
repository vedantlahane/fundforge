import React, { type JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Circle, Target } from "lucide-react";
import { useProject } from "@/hooks/use-project";
import type { Milestone } from "@/types/project";

interface ProjectMilestonesProps {
  projectId: string;
}

export function ProjectMilestones({ projectId }: ProjectMilestonesProps): JSX.Element | null {
  const { project } = useProject(projectId);

  if (!project?.milestones) return null;

  const getStatusIcon = (status: Milestone["status"]): JSX.Element => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "active":
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: Milestone["status"]): "default" | "secondary" | "outline" => {
    switch (status) {
      case "completed":
        return "default";
      case "active":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Project Milestones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {project.milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                {getStatusIcon(milestone.status)}
                {index < project.milestones.length - 1 && <div className="w-px h-16 bg-border mt-2" />}
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{milestone.title}</h4>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                  <Badge variant={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span>Funding Required: {milestone.fundingRequired} ETH</span>
                  <span>Due: {milestone.dueDate}</span>
                </div>

                {milestone.status === "active" && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Votes for completion</span>
                      <span>
                        {milestone.votes?.for || 0}/{milestone.votes?.total || 0}
                      </span>
                    </div>
                    <Progress
                      value={((milestone.votes?.for || 0) / (milestone.votes?.total || 1)) * 100}
                      className="h-2"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectMilestones;
