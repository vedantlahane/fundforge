import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Wallet, TrendingUp, Vote, Settings, ExternalLink, Coins, Award, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import { useWallet } from "@/hooks/use-wallet"

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("overview")
  const { address, balance } = useWallet()

  const mockFundedProjects = [
    { id: "1", title: "DeFi Trading Platform", amount: 0.5, status: "active", returns: "+15%" },
    { id: "2", title: "NFT Marketplace", amount: 1.0, status: "funded", returns: "+8%" },
    { id: "3", title: "DAO Governance Tool", amount: 0.25, status: "active", returns: "+22%" },
  ]

  const mockCreatedProjects = [
    { id: "4", title: "My Crypto Wallet", raised: 5.5, goal: 10, backers: 45, status: "active" },
  ]

  const mockVotingHistory = [
    { projectId: "1", milestone: "Phase 1", vote: "for", date: "2 days ago" },
    { projectId: "2", milestone: "Launch", vote: "for", date: "1 week ago" },
    { projectId: "3", milestone: "Testing", vote: "against", date: "2 weeks ago" },
  ]

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <Wallet className="w-4 h-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="investments" className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Investments
        </TabsTrigger>
        <TabsTrigger value="voting" className="flex items-center gap-2">
          <Vote className="w-4 h-4" />
          Voting
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <Coins className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.75 ETH</div>
              <p className="text-xs text-muted-foreground">Across 3 projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">FRG Tokens</CardTitle>
              <Award className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">350 FRG</div>
              <p className="text-xs text-muted-foreground">Governance tokens earned</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Votes</CardTitle>
              <Vote className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Pending your vote</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <Wallet className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{balance || "0"} ETH</div>
              <p className="text-xs text-muted-foreground truncate">{address || "Not connected"}</p>
            </CardContent>
          </Card>
        </div>

        {mockCreatedProjects.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Projects</CardTitle>
              <CardDescription>Projects you've created</CardDescription>
            </CardHeader>
            <CardContent>
              {mockCreatedProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between py-4">
                  <div>
                    <h4 className="font-semibold">{project.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {project.backers} backers • {project.raised}/{project.goal} ETH
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <Progress value={(project.raised / project.goal) * 100} className="h-2" />
                    </div>
                    <Badge>{project.status}</Badge>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/projects/${project.id}`}>
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="investments" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Investments</CardTitle>
            <CardDescription>Projects you've funded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockFundedProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between py-4 border-b last:border-0">
                  <div>
                    <h4 className="font-semibold">{project.title}</h4>
                    <p className="text-sm text-muted-foreground">Invested: {project.amount} ETH</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={project.returns.startsWith("+") ? "default" : "destructive"}>
                      {project.returns}
                    </Badge>
                    <Badge variant="outline">{project.status}</Badge>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/projects/${project.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="voting" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Voting History</CardTitle>
            <CardDescription>Your governance participation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVotingHistory.map((vote, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b last:border-0">
                  <div>
                    <h4 className="font-semibold">{vote.milestone}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {vote.date}
                    </p>
                  </div>
                  <Badge variant={vote.vote === "for" ? "default" : "destructive"}>
                    {vote.vote === "for" ? "Approved" : "Rejected"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voting Power</CardTitle>
            <CardDescription>Your governance influence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>FRG Token Balance</span>
                <span className="font-semibold">350 FRG</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span>Voting Power</span>
                <span className="font-semibold">0.35%</span>
              </div>
              <p className="text-xs text-muted-foreground">Voting power is calculated based on your FRG token holdings</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Wallet Settings</CardTitle>
            <CardDescription>Manage your connected wallet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Connected Wallet</h4>
                <p className="text-sm text-muted-foreground truncate max-w-[300px]">{address || "Not connected"}</p>
              </div>
              <Button variant="outline">Disconnect</Button>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Network</h4>
                <p className="text-sm text-muted-foreground">Ethereum Mainnet</p>
              </div>
              <Button variant="outline">Switch</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Voting Reminders</h4>
                <p className="text-sm text-muted-foreground">Get notified when new votes open</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Project Updates</h4>
                <p className="text-sm text-muted-foreground">Updates from projects you've funded</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
