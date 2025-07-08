import React, { type JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar } from "lucide-react";

interface Update {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  type: "progress" | "milestone" | "community";
}

interface ProjectUpdatesProps {
  projectId: string;
  updates?: Update[];
}

const mockUpdates: Update[] = [
  {
    id: "1",
    title: "Frontend Development Progress Update",
    content:
      "Great progress on the trading dashboard! We've completed the main interface and are now working on the advanced charting features. The portfolio management section is also taking shape nicely.",
    author: "Project Creator",
    date: "2 days ago",
    type: "progress",
  },
  {
    id: "2",
    title: "Smart Contract Audit Results",
    content:
      "Excellent news! Our smart contracts have passed the initial security review with flying colors. Only minor optimizations suggested, which we've already implemented.",
    author: "Project Creator",
    date: "1 week ago",
    type: "milestone",
  },
  {
    id: "3",
    title: "Community Feedback Integration",
    content:
      "Thank you for all the valuable feedback! We've incorporated several community suggestions into our roadmap, including enhanced mobile support and additional trading pairs.",
    author: "Project Creator",
    date: "2 weeks ago",
    type: "community",
  },
];

export function ProjectUpdates({ projectId, updates = mockUpdates }: ProjectUpdatesProps): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Project Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {updates.map((update) => (
            <div key={update.id} className="border-l-2 border-muted pl-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>PC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-sm">{update.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{update.author}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {update.date}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {update.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{update.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectUpdates;
