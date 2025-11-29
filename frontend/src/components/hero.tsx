import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
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
      window.scrollTo(0, 0)
    }
  }, [])
  
  return fromLanding
}

export function Hero() {
  const fromLanding = useFromLanding()
  const initialDelay = fromLanding ? 0.2 : 0

  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-background to-background dark:from-indigo-950/20" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px] dark:bg-indigo-500/5" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] dark:bg-purple-500/5" />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: initialDelay }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Decentralized Crowdfunding
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: initialDelay + 0.1 }}
          >
            Back projects.{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Vote on milestones.
            </span>
            <br />
            Get refunds if they fail.
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: initialDelay + 0.2 }}
          >
            Traditional crowdfunding has a trust problem. FundForge fixes it with smart contracts 
            that release funds only when the community approves completed milestones.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: initialDelay + 0.3 }}
          >
            <Link to="/projects">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all">
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/create-project">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 gap-2 border-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/30">
                <Sparkles className="w-4 h-4" />
                Start a Campaign
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
