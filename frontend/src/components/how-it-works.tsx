import { Rocket, Users, Vote, Coins, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Rocket,
    title: "Launch",
    description: "Create your project with clear milestones and funding goals",
    color: "bg-indigo-500",
  },
  {
    icon: Users,
    title: "Fund",
    description: "Community discovers and backs projects they believe in",
    color: "bg-purple-500",
  },
  {
    icon: Vote,
    title: "Vote",
    description: "Backers vote on milestone completion for accountability",
    color: "bg-pink-500",
  },
  {
    icon: Coins,
    title: "Release",
    description: "Smart contracts release funds when milestones are approved",
    color: "bg-emerald-500",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            A transparent, milestone-based system that protects both creators and backers
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-20" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {index + 1}
                </div>
                
                {/* Card */}
                <div className="p-6 rounded-2xl border border-border/50 bg-card hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                
                {/* Arrow - desktop between cards */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
