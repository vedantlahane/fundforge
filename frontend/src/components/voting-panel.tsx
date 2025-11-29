import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ThumbsUp, ThumbsDown, Vote, Users, Clock } from "lucide-react"
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
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <Vote className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No active voting at the moment</p>
            <p className="text-sm">Voting opens when milestones are completed</p>
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Vote className="w-5 h-5" />
          Community Voting
        </CardTitle>
        <CardDescription>Vote on milestone completion to release funds</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-1">{activeMilestone.title}</h4>
          <p className="text-sm text-muted-foreground">{activeMilestone.description}</p>
          <div className="flex items-center gap-4 mt-3 text-xs">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {totalVotes} votes
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {voting?.endsIn || "3 days"} left
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-green-500" />
                Approve
              </span>
              <span>{forPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={forPercentage} className="h-2 bg-muted" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="flex items-center gap-2">
                <ThumbsDown className="w-4 h-4 text-red-500" />
                Reject
              </span>
              <span>{againstPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={againstPercentage} className="h-2 bg-muted" />
          </div>
        </div>

        <Separator />

        {hasVoted ? (
          <div className="text-center p-4 bg-muted rounded-lg">
            <Badge>Vote Recorded</Badge>
            <p className="text-sm text-muted-foreground mt-2">Thank you for participating in governance</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={selectedVote === "for" ? "default" : "outline"}
                onClick={() => setSelectedVote("for")}
                className="h-16"
              >
                <ThumbsUp className="w-5 h-5 mr-2" />
                Approve
              </Button>
              <Button
                variant={selectedVote === "against" ? "destructive" : "outline"}
                onClick={() => setSelectedVote("against")}
                className="h-16"
              >
                <ThumbsDown className="w-5 h-5 mr-2" />
                Reject
              </Button>
            </div>

            <Button onClick={handleVote} className="w-full" disabled={!selectedVote || loading}>
              {loading ? "Submitting..." : "Submit Vote"}
            </Button>
          </div>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Voting power based on funding contribution</p>
          <p>• 60% approval required for fund release</p>
          <p>• Results are final after voting period ends</p>
        </div>
      </CardContent>
    </Card>
  )
}
