import { TrendingUp, Users, Target, Flame } from "lucide-react"

const stats = [
  {
    icon: Target,
    label: "Total Raised",
    value: "2,847",
    unit: "ETH",
    change: "+12.5%",
    positive: true,
  },
  {
    icon: Flame,
    label: "Active Projects",
    value: "1,234",
    unit: "",
    change: "+8.2%",
    positive: true,
  },
  {
    icon: TrendingUp,
    label: "Success Rate",
    value: "87.3",
    unit: "%",
    change: "+2.1%",
    positive: true,
  },
  {
    icon: Users,
    label: "Community",
    value: "45.6K",
    unit: "",
    change: "+15.7%",
    positive: true,
  },
]

export function Stats() {
  return (
    <section className="py-16 border-y border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-indigo-500/10">
                  <stat.icon className="w-5 h-5 text-indigo-500" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              </div>
              <div className="flex items-baseline justify-center lg:justify-start gap-1">
                <span className="text-3xl lg:text-4xl font-heading font-bold tracking-tight">{stat.value}</span>
                {stat.unit && <span className="text-lg text-muted-foreground">{stat.unit}</span>}
              </div>
              <div className={`text-sm mt-1 ${stat.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.change} this month
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
