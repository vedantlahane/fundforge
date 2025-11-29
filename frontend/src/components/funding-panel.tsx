import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, Share2, Bookmark, Coins } from "lucide-react"
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
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
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
            <div className="flex justify-between items-center">
              <span className="text-sm">Early Supporter (0.1+ ETH)</span>
              <Badge variant="secondary">10 FRG</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Major Backer (1+ ETH)</span>
              <Badge variant="secondary">100 FRG</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Whale Supporter (10+ ETH)</span>
              <Badge variant="secondary">1000 FRG</Badge>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            FRG tokens provide governance rights and future platform benefits
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
