import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Users, Zap } from "lucide-react"
import { Link } from "react-router-dom"

export function Hero() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-background to-background dark:from-indigo-950/20" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Powered by Smart Contracts
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Crowdfunding,{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Reimagined
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Transparent, milestone-based funding on the blockchain. 
            Back projects you believe in, vote on progress, and ensure accountability.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/projects">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all">
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/create-project">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                Start a Campaign
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-heading font-semibold mb-2">Trustless</h3>
              <p className="text-sm text-muted-foreground">
                Funds secured by smart contracts, released only when milestones are met.
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-heading font-semibold mb-2">Community-Led</h3>
              <p className="text-sm text-muted-foreground">
                Backers vote on milestones, ensuring projects deliver on promises.
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-heading font-semibold mb-2">Multi-Chain</h3>
              <p className="text-sm text-muted-foreground">
                Deploy on Ethereum, Polygon, or BSC with a unified experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
