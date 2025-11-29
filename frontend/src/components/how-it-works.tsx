import { Rocket, Users, Vote, Coins, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: Rocket,
    title: "Launch",
    description: "Create your project with clear milestones and funding goals",
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    icon: Users,
    title: "Fund",
    description: "Community discovers and backs projects they believe in",
    gradient: "from-indigo-600 to-purple-500",
  },
  {
    icon: Vote,
    title: "Vote",
    description: "Backers vote on milestone completion for accountability",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Coins,
    title: "Release",
    description: "Smart contracts release funds when milestones are approved",
    gradient: "from-purple-600 to-indigo-500",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-background via-indigo-50/30 to-background dark:via-indigo-950/10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div 
          className="max-w-2xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            A transparent, milestone-based system that protects both creators and backers
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20" />
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative group"
                variants={itemVariants}
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-indigo-500/25 z-10">
                  {index + 1}
                </div>
                
                {/* Card */}
                <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 h-full group-hover:-translate-y-1">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-heading font-semibold text-xl mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                
                {/* Arrow - desktop between cards */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-14 -right-3 transform z-10">
                    <ArrowRight className="w-4 h-4 text-indigo-500/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
