import { TrendingUp, Users, Target, Flame } from "lucide-react"
import { motion } from "framer-motion"

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function Stats() {
  return (
    <section className="py-16 border-y border-border/40 bg-gradient-to-r from-indigo-50/50 via-background to-purple-50/50 dark:from-indigo-950/20 dark:via-background dark:to-purple-950/20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center lg:text-left"
              variants={itemVariants}
            >
              <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/10">
                  <stat.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              </div>
              <div className="flex items-baseline justify-center lg:justify-start gap-1">
                <span className="text-3xl lg:text-4xl font-heading font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">{stat.value}</span>
                {stat.unit && <span className="text-lg text-muted-foreground">{stat.unit}</span>}
              </div>
              <div className={`text-sm mt-1 font-medium ${stat.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                {stat.change} this month
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
