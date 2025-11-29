import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Shield, Users, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
}

const floatAnimation = {
  y: [-10, 10, -10],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const }
}

export function LandingPage() {
  const navigate = useNavigate()

  const handleEnterApp = () => {
    // Store animation state for page transition
    sessionStorage.setItem("fromLanding", "true")
    navigate("/home")
  }

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e1b4b_0%,#0f0a1e_50%,#020617_100%)]" />
        
        {/* Animated orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px]"
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[130px]"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, -50, 0],
            scale: [1, 1.15, 1] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header 
          className="container mx-auto px-6 py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-heading font-bold text-white">
                Fund<span className="text-indigo-400">Forge</span>
              </span>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="ghost" 
                className="text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => navigate("/projects")}
              >
                Explore Projects
              </Button>
            </motion.div>
          </div>
        </motion.header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Powered by Blockchain
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              className="mt-8 font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-[1.05]"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Fund Ideas.
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Build Tomorrow.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              The decentralized crowdfunding platform where transparency meets innovation.
              Back projects with confidence through milestone-based smart contracts.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  onClick={handleEnterApp}
                  className="h-14 px-10 text-lg gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300"
                >
                  Launch App
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/projects")}
                  className="h-14 px-10 text-lg border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                >
                  Browse Projects
                </Button>
              </motion.div>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="mt-20 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {[
                { icon: Shield, title: "Trustless", desc: "Smart contract secured" },
                { icon: Users, title: "Community-Led", desc: "Democratic governance" },
                { icon: Zap, title: "Instant", desc: "Real-time settlements" },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={scaleIn}
                  className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4"
                    animate={floatAnimation}
                  >
                    <feature.icon className="w-6 h-6 text-indigo-400" />
                  </motion.div>
                  <h3 className="font-heading font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-white/40">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="mt-20 pt-10 border-t border-white/5"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                {[
                  { value: "2,847", label: "ETH Raised" },
                  { value: "1,234", label: "Projects Funded" },
                  { value: "45.6K", label: "Community Members" },
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={fadeInUp}
                    className="text-center"
                  >
                    <div className="text-3xl sm:text-4xl font-heading font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/40 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <motion.footer 
          className="container mx-auto px-6 py-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-white/30">© 2025 FundForge. Decentralized crowdfunding for the future.</p>
        </motion.footer>
      </div>
    </div>
  )
}
