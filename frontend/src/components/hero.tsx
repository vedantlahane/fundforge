import { Button } from "@/components/ui/button"
import { ArrowRight, Wallet, Vote, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// Check if coming from landing page for entrance animation
const useFromLanding = () => {
  const [fromLanding, setFromLanding] = useState(false)
  
  useEffect(() => {
    const isFromLanding = sessionStorage.getItem("fromLanding") === "true"
    setFromLanding(isFromLanding)
    if (isFromLanding) {
      sessionStorage.removeItem("fromLanding")
      // Ensure we're at top of page
      window.scrollTo(0, 0)
    }
  }, [])
  
  return fromLanding
}

export function Hero() {
  const fromLanding = useFromLanding()
  const initialDelay = fromLanding ? 0.2 : 0

  return (
    <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-32">
      {/* Simple subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 to-transparent dark:from-indigo-950/10 dark:to-transparent" />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main content - left aligned for authenticity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: initialDelay }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-md mb-6">
              Milestone-Based Crowdfunding
            </span>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: initialDelay + 0.1 }}
          >
            Back projects.{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Vote on milestones.
            </span>
            <br />
            Get refunds if they fail.
          </motion.h1>

          <motion.p 
            className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: initialDelay + 0.2 }}
          >
            Traditional crowdfunding has a trust problem. FundForge fixes it with smart contracts 
            that release funds only when the community approves completed milestones.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: initialDelay + 0.3 }}
          >
            <Link to="/projects">
              <Button size="lg" className="h-12 px-6 gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500">
                Browse Projects
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/create-project">
              <Button size="lg" variant="outline" className="h-12 px-6 gap-2">
                Start a Campaign
              </Button>
            </Link>
          </motion.div>

          {/* How it works - simple 3 step */}
          <motion.div 
            className="mt-16 grid sm:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: initialDelay + 0.4 }}
          >
            {[
              {
                step: "01",
                icon: Wallet,
                title: "Fund a project",
                desc: "Back campaigns with ETH. Your funds are held in a smart contract."
              },
              {
                step: "02", 
                icon: Vote,
                title: "Vote on milestones",
                desc: "When creators submit work, you vote to approve or reject it."
              },
              {
                step: "03",
                icon: CheckCircle2,
                title: "Funds released or refunded",
                desc: "Approved? Funds go to creator. Rejected? You get a refund."
              }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Step {item.step}</span>
                    <h3 className="font-semibold text-foreground mt-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
                {idx < 2 && (
                  <div className="hidden sm:block absolute top-5 left-full w-8 border-t border-dashed border-border" />
                )}
              </div>
            ))}
          </motion.div>

          {/* Stats - simple inline */}
          <motion.div 
            className="mt-16 pt-8 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: initialDelay + 0.5 }}
          >
            <div className="flex flex-wrap gap-8 lg:gap-16">
              <div>
                <div className="text-2xl font-bold text-foreground">2,847+ ETH</div>
                <div className="text-sm text-muted-foreground">Total raised</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">1,234</div>
                <div className="text-sm text-muted-foreground">Projects funded</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">94%</div>
                <div className="text-sm text-muted-foreground">Milestone approval rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">~0</div>
                <div className="text-sm text-muted-foreground">Rug pulls</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
