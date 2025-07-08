import React, { useState, type JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Vote, ThumbsUp, ThumbsDown } from "lucide-react";
import { useProject } from "@/hooks/use-project";
import { useVoting } from "@/hooks/use-voting";

interface ActiveVoting {
  id: string;
  title: string;
  description: string;
  timeLeft: number;
  votesFor: number;
  votesAgainst: number;
}

interface Project {
  id: string;
  activeVoting?: ActiveVoting;
}

interface VotingPanelProps {
  projectId: string;
}

export function VotingPanel({ projectId }: VotingPanelProps): JSX.Element | null {
  const [comment, setComment] = useState<string>("");
  const { project } = useProject(projectId);
  const { vote, loading } = useVoting();

  if (!project?.activeVoting) return null;

  const { activeVoting } = project;
  const totalVotes = activeVoting.votesFor + activeVoting.votesAgainst;
  const forPercentage = totalVotes > 0 ? (activeVoting.votesFor / totalVotes) * 100 : 0;
  const againstPercentage = totalVotes > 0 ? (activeVoting.votesAgainst / totalVotes) * 100 : 0;

  const handleVote = async (support: boolean): Promise<void> => {
    await vote(projectId, activeVoting.id, support, comment);
    setComment("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Vote className="w-5 h-5" />
          Community Voting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">{activeVoting.title}</h4>
            <Badge variant="secondary">{activeVoting.timeLeft} days left</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{activeVoting.description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-green-500" />
                Support ({activeVoting.votesFor})
              </span>
              <span>{forPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={forPercentage} className="h-2 mb-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="flex items-center gap-2">
                <ThumbsDown className="w-4 h-4 text-red-500" />
                Against ({activeVoting.votesAgainst})
              </span>
              <span>{againstPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={againstPercentage} className="h-2" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Add Comment (Optional)</label>
            <Textarea
              placeholder="Share your thoughts on this milestone..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={() => handleVote(true)} disabled={loading} className="flex-1" variant="default">
              <ThumbsUp className="w-4 h-4 mr-2" />
              Vote For
            </Button>
            <Button onClick={() => handleVote(false)} disabled={loading} className="flex-1" variant="destructive">
              <ThumbsDown className="w-4 h-4 mr-2" />
              Vote Against
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>• Only project backers can vote</p>
          <p>• Voting power based on contribution amount</p>
          <p>• 60% approval needed for milestone completion</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default VotingPanel;
