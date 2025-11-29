import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, Share2, Bookmark, Coins, Zap, Users, Timer, TrendingUp } from "lucide-react"
import { useProject } from "@/hooks/use-project"
import { useFunding } from "@/hooks/use-funding"

interface FundingPanelProps {
  projectId: string
}

export function FundingPanel({ projectId }: FundingPanelProps) {
  const [fundAmount, setFundAmount] = useState("")
  const { project } = useProject(projectId)
  const { fundProject, loading } = useFunding()

  if (!project) return null

  const fundingPercentage = (project.currentFunding / project.targetFunding) * 100

  const handleFund = async () => {
    if (!fundAmount) return
    await fundProject(projectId, Number.parseFloat(fundAmount))
    setFundAmount("")
  }

  const quickAmounts = ["0.1", "0.5", "1", "5"]

  return (
    <div className="space-y-4">
      {/* Main Funding Card */}
      <Card className="border-border/50 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-heading">
            <Coins className="w-5 h-5 text-indigo-500" />
            Fund This Project
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Progress Section */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">{fundingPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={fundingPercentage} className="h-2" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Raised
              </div>
              <div className="font-semibold">{project.currentFunding} ETH</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                <Zap className="w-3.5 h-3.5" />
                Goal
              </div>
              <div className="font-semibold">{project.targetFunding} ETH</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                <Users className="w-3.5 h-3.5" />
                Backers
              </div>
              <div className="font-semibold">{project.backers}</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                <Timer className="w-3.5 h-3.5" />
                Days Left
              </div>
              <div className="font-semibold">{project.daysLeft}</div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Funding Input */}
          <div className="space-y-3">
            <Label htmlFor="amount" className="text-sm font-medium">Funding Amount (ETH)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.1"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              step="0.01"
              min="0"
              className="h-11"
            />
            
            {/* Quick Amount Buttons */}
            <div className="flex gap-2">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => setFundAmount(amount)}
                >
                  {amount} ETH
                </Button>
              ))}
            </div>

            <Button 
              onClick={handleFund} 
              className="w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 font-medium" 
              disabled={!fundAmount || loading}
            >
              {loading ? "Processing..." : "Fund Project"}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground space-y-1.5 pt-2">
            <p className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              Funds are held in smart contract
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              Released based on milestone completion
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              Community voting determines releases
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="border-border/50">
        <CardContent className="pt-4 pb-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Heart className="w-4 h-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reward Tokens */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-heading flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Reward Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { tier: "Early Supporter", threshold: "0.1+ ETH", tokens: "10 FRG" },
              { tier: "Major Backer", threshold: "1+ ETH", tokens: "100 FRG" },
              { tier: "Whale Supporter", threshold: "10+ ETH", tokens: "1000 FRG" },
            ].map((reward) => (
              <div key={reward.tier} className="flex justify-between items-center p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div>
                  <span className="text-sm font-medium">{reward.tier}</span>
                  <span className="text-xs text-muted-foreground ml-2">({reward.threshold})</span>
                </div>
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">
                  {reward.tokens}
                </Badge>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border/50">
            FRG tokens provide governance rights and future platform benefits
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
