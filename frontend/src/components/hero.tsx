import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Users, Zap } from "lucide-react"
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
    }
  }, [])
  
  return fromLanding
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
}

const features = [
  {
    icon: Shield,
    title: "Trustless",
    description: "Funds secured by smart contracts, released only when milestones are met.",
    gradient: "from-indigo-500 to-indigo-600"
  },
  {
    icon: Users,
    title: "Community-Led",
    description: "Backers vote on milestones, ensuring projects deliver on promises.",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    icon: Zap,
    title: "Multi-Chain",
    description: "Deploy on Ethereum, Polygon, or BSC with a unified experience.",
    gradient: "from-violet-500 to-violet-600"
  }
]

export function Hero() {
  const fromLanding = useFromLanding()
  const initialDelay = fromLanding ? 0.3 : 0

  return (
    <motion.section 
      className="relative py-20 lg:py-28 overflow-hidden"
      initial={fromLanding ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-background to-background dark:from-indigo-950/20" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px]"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[80px]"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: initialDelay }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Powered by Smart Contracts
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="mt-8 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: initialDelay + 0.1 }}
          >
            Crowdfunding,{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Reimagined
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: initialDelay + 0.2 }}
          >
            Transparent, milestone-based funding on the blockchain. 
            Back projects you believe in, vote on progress, and ensure accountability.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: initialDelay + 0.3 }}
          >
            <Link to="/projects">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="w-full sm:w-auto gap-2 h-12 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300">
                  Explore Projects
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/create-project">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 h-12 px-8 border-2">
                  Start a Campaign
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="mt-20 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={cardVariant}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
                
                <motion.div 
                  className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 flex items-center justify-center mb-5 mx-auto`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="relative font-heading font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
