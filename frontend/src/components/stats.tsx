import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Zap } from "lucide-react"

export function Stats() {
  const stats = [
    {
      icon: DollarSign,
      label: "Total Raised",
      value: "2,847 ETH",
      change: "+12.5%",
      color: "text-green-600",
    },
    {
      icon: Users,
      label: "Active Projects",
      value: "1,234",
      change: "+8.2%",
      color: "text-blue-600",
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: "87.3%",
      change: "+2.1%",
      color: "text-purple-600",
    },
    {
      icon: Zap,
      label: "Community Members",
      value: "45,678",
      change: "+15.7%",
      color: "text-orange-600",
    },
  ]

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
