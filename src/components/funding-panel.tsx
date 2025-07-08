import { useState, type JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Share2, Bookmark, Coins } from "lucide-react";
import { useProject } from "@/hooks/use-project";
import { useFunding } from "@/hooks/use-funding";

interface FundingPanelProps {
  projectId: string;
}

interface RewardTier {
  threshold: number;
  tokens: number;
  label: string;
}

export function FundingPanel({ projectId }: FundingPanelProps): JSX.Element | null {
  const [fundAmount, setFundAmount] = useState<string>("");
  const { project } = useProject(projectId);
  const { fundProject, loading } = useFunding();

  if (!project) return null;

  const fundingPercentage = (project.currentFunding / project.targetFunding) * 100;

  const rewardTiers: RewardTier[] = [
    { threshold: 0.1, tokens: 10, label: "Early Supporter (0.1+ ETH)" },
    { threshold: 1, tokens: 100, label: "Major Backer (1+ ETH)" },
    { threshold: 10, tokens: 1000, label: "Whale Supporter (10+ ETH)" },
  ];

  const handleFund = async (): Promise<void> => {
    if (!fundAmount) return;
    await fundProject(projectId, Number.parseFloat(fundAmount));
    setFundAmount("");
  };

  const handleSocialAction = (action: string): void => {
    console.log(`${action} action triggered for project ${projectId}`);
    // Add your social action logic here
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            Fund This Project
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{fundingPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={fundingPercentage} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Raised</div>
              <div className="font-semibold">{project.currentFunding} ETH</div>
            </div>
            <div>
              <div className="text-muted-foreground">Goal</div>
              <div className="font-semibold">{project.targetFunding} ETH</div>
            </div>
            <div>
              <div className="text-muted-foreground">Backers</div>
              <div className="font-semibold">{project.backers}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Days Left</div>
              <div className="font-semibold">{project.daysLeft}</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Funding Amount (ETH)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.1"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                step="0.01"
                min="0"
              />
            </div>

            <Button onClick={handleFund} className="w-full" size="lg" disabled={!fundAmount || loading}>
              {loading ? "Processing..." : "Fund Project"}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>• Funds are held in smart contract</p>
            <p>• Released based on milestone completion</p>
            <p>• Community voting determines releases</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => handleSocialAction("like")}>
              <Heart className="w-4 h-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleSocialAction("share")}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleSocialAction("save")}>
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Reward Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rewardTiers.map((tier) => (
              <div key={tier.threshold} className="flex justify-between items-center">
                <span className="text-sm">{tier.label}</span>
                <Badge variant="secondary">{tier.tokens} FRG</Badge>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            FRG tokens provide governance rights and future platform benefits
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default FundingPanel;
