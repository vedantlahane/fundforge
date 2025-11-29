import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ThumbsUp, ThumbsDown, Vote, Users, Clock, CheckCircle2 } from "lucide-react"
import { useVoting } from "@/hooks/use-voting"
import { useProject } from "@/hooks/use-project"

interface VotingPanelProps {
  projectId: string
}

export function VotingPanel({ projectId }: VotingPanelProps) {
  const { project } = useProject(projectId)
  const activeMilestone = project?.milestones?.find((m) => m.status === "active")

  const { voting, vote, loading, hasVoted } = useVoting(activeMilestone?.id || "")
  const [selectedVote, setSelectedVote] = useState<"for" | "against" | null>(null)

  if (!project || !activeMilestone) {
    return (
      <Card className="border-border/50">
        <CardContent className="pt-8 pb-8">
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Vote className="w-8 h-8 opacity-50" />
            </div>
            <p className="font-medium text-foreground">No active voting</p>
            <p className="text-sm mt-1">Voting opens when milestones are completed</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalVotes = (voting?.votesFor || 0) + (voting?.votesAgainst || 0)
  const forPercentage = totalVotes > 0 ? ((voting?.votesFor || 0) / totalVotes) * 100 : 0
  const againstPercentage = totalVotes > 0 ? ((voting?.votesAgainst || 0) / totalVotes) * 100 : 0

  const handleVote = async () => {
    if (!selectedVote) return
    await vote(selectedVote)
  }

  return (
    <Card className="border-border/50 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-heading">
          <Vote className="w-5 h-5 text-blue-500" />
          Community Voting
        </CardTitle>
        <CardDescription>Vote on milestone completion to release funds</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Active Milestone */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
          <h4 className="font-semibold mb-1">{activeMilestone.title}</h4>
          <p className="text-sm text-muted-foreground">{activeMilestone.description}</p>
          <div className="flex items-center gap-4 mt-3 text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              {totalVotes} votes cast
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {voting?.endsIn || "3 days"} left
            </span>
          </div>
        </div>

        {/* Vote Progress */}
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
            <div className="flex justify-between text-sm mb-2">
              <span className="flex items-center gap-2 font-medium">
                <ThumbsUp className="w-4 h-4 text-emerald-500" />
                Approve
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{forPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={forPercentage} className="h-2" />
          </div>

          <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex justify-between text-sm mb-2">
              <span className="flex items-center gap-2 font-medium">
                <ThumbsDown className="w-4 h-4 text-red-500" />
                Reject
              </span>
              <span className="text-red-600 dark:text-red-400 font-semibold">{againstPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={againstPercentage} className="h-2" />
          </div>
        </div>

        <Separator />

        {hasVoted ? (
          <div className="text-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
            <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-0">Vote Recorded</Badge>
            <p className="text-sm text-muted-foreground mt-2">Thank you for participating in governance</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={selectedVote === "for" ? "default" : "outline"}
                onClick={() => setSelectedVote("for")}
                className={`h-14 ${selectedVote === "for" ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-500" : ""}`}
              >
                <ThumbsUp className="w-5 h-5 mr-2" />
                Approve
              </Button>
              <Button
                variant={selectedVote === "against" ? "destructive" : "outline"}
                onClick={() => setSelectedVote("against")}
                className="h-14"
              >
                <ThumbsDown className="w-5 h-5 mr-2" />
                Reject
              </Button>
            </div>

            <Button 
              onClick={handleVote} 
              className="w-full h-11 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600" 
              disabled={!selectedVote || loading}
            >
              {loading ? "Submitting..." : "Submit Vote"}
            </Button>
          </div>
        )}

        <div className="text-xs text-muted-foreground space-y-1.5 pt-2">
          <p className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-blue-500" />
            Voting power based on funding contribution
          </p>
          <p className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-blue-500" />
            60% approval required for fund release
          </p>
          <p className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-blue-500" />
            Results are final after voting period ends
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
