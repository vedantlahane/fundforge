import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Clock, TrendingUp, Users, CheckCircle2 } from "lucide-react"

interface ProjectUpdatesProps {
  projectId: string
}

const mockUpdates = [
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
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "progress":
      return <TrendingUp className="w-3.5 h-3.5" />
    case "milestone":
      return <CheckCircle2 className="w-3.5 h-3.5" />
    case "community":
      return <Users className="w-3.5 h-3.5" />
    default:
      return null
  }
}

const getTypeBadgeStyle = (type: string) => {
  switch (type) {
    case "progress":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
    case "milestone":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
    case "community":
      return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}

export function ProjectUpdates({ projectId: _projectId }: ProjectUpdatesProps) {
  return (
    <Card className="border-border/50 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-heading">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          Project Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockUpdates.map((update) => (
            <div key={update.id} className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-border transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9 border-2 border-background">
                    <AvatarFallback className="text-xs bg-gradient-to-br from-indigo-500 to-purple-500 text-white">PC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-sm">{update.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>{update.author}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {update.date}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className={`${getTypeBadgeStyle(update.type)} border shrink-0 flex items-center gap-1`}>
                  {getTypeIcon(update.type)}
                  {update.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{update.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
