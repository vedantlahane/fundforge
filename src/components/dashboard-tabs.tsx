import  { type JSX } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Rocket, Heart, Coins, TrendingUp, Eye, Edit } from "lucide-react";

export function DashboardTabs(): JSX.Element {
  return (
    <Tabs defaultValue="my-projects" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="my-projects">My Projects</TabsTrigger>
        <TabsTrigger value="backed-projects">Backed Projects</TabsTrigger>
        <TabsTrigger value="tokens">My Tokens</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="my-projects" className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Projects</h2>
          <Button>
            <Rocket className="w-4 h-4 mr-2" />
            Create New Project
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>DeFi Trading Platform</CardTitle>
                <p className="text-muted-foreground">Revolutionary decentralized trading platform</p>
              </div>
              <Badge>Active</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Funding Progress</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} />
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Raised</span>
                    <p className="font-semibold">32.5 ETH</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Backers</span>
                    <p className="font-semibold">127</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Days Left</span>
                    <p className="font-semibold">15</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="backed-projects" className="space-y-6">
        <h2 className="text-2xl font-bold">Backed Projects</h2>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>NFT Art Marketplace</span>
                <Badge variant="secondary">Backed</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Your Contribution</span>
                  <span className="font-semibold">2.5 ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tokens Earned</span>
                  <span className="font-semibold">250 FRG</span>
                </div>
                <Progress value={75} />
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  <Heart className="w-4 h-4 mr-2" />
                  View Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="tokens" className="space-y-6">
        <h2 className="text-2xl font-bold">My Tokens</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-5 h-5" />
                FRG Tokens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold">1,250 FRG</div>
                <div className="text-sm text-muted-foreground">Governance tokens earned from backing projects</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Voting Power</span>
                    <span>0.125%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Staking Rewards</span>
                    <span>+12.5 FRG/month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="analytics" className="space-y-6">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Invested</p>
                  <p className="text-2xl font-bold">15.7 ETH</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Projects Backed</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Heart className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">87.5%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tokens Earned</p>
                  <p className="text-2xl font-bold">1,250</p>
                </div>
                <Coins className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default DashboardTabs;
