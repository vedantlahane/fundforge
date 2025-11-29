import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Shield, Users, Zap, Rocket, Globe, Lock, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"

// Custom cursor component
function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    window.addEventListener("mousemove", moveCursor)
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] mix-blend-difference bg-white opacity-50 hidden md:block"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    />
  )
}

// Floating particles
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            opacity: Math.random() * 0.5 + 0.1
          }}
          animate={{
            y: [null, -100],
            opacity: [null, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  )
}

// 3D Card component
function Card3D({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateXVal = (e.clientY - centerY) / 20
    const rotateYVal = (centerX - e.clientX) / 20
    setRotateX(rotateXVal)
    setRotateY(rotateYVal)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} transition-transform duration-200`}
      style={{ 
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

// Morphing shapes
function MorphingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Morphing blob 1 */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96"
        animate={{
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%"
          ],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(79, 70, 229, 0.05) 100%)" }}
      />
      
      {/* Morphing blob 2 */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px]"
        animate={{
          borderRadius: [
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "70% 30% 30% 70% / 70% 70% 30% 30%",
            "30% 70% 70% 30% / 30% 30% 70% 70%"
          ],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ background: "linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(67, 56, 202, 0.04) 100%)" }}
      />

      {/* Floating rings */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 border border-white/[0.03] rounded-full"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-48 h-48 border border-indigo-500/[0.05] rounded-full"
        animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

// Animated text reveal
function AnimatedText({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) {
  return (
    <motion.span className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.215, 0.61, 0.355, 1]
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Glitch text effect
function GlitchText({ children, className = "" }: { children: string, className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0.5 text-red-500/50 z-0" style={{ clipPath: "inset(10% 0 60% 0)" }}>
            {children}
          </span>
          <span className="absolute top-0 -left-0.5 text-cyan-500/50 z-0" style={{ clipPath: "inset(50% 0 20% 0)" }}>
            {children}
          </span>
        </>
      )}
    </span>
  )
}

// Main component
export function LandingPage() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Parallax values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  // Track mouse for gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleEnterApp = () => {
    setIsTransitioning(true)
    // Store animation state for page transition
    sessionStorage.setItem("fromLanding", "true")
    setTimeout(() => {
      // Scroll to top before navigating
      window.scrollTo(0, 0)
      navigate("/home")
    }, 1200)
  }

  return (
    <>
      <CustomCursor />
      
      {/* Transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[200] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Circular reveal - darker gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-black"
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(150% at 50% 50%)" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            />
            
            {/* Logo in center during transition */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                className="flex items-center gap-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="w-16 h-16 bg-indigo-500/20 backdrop-blur rounded-2xl flex items-center justify-center border border-indigo-500/30">
                  <Sparkles className="w-8 h-8 text-indigo-400" />
                </div>
                <span className="text-4xl font-heading font-bold text-white">
                  FundForge
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={containerRef} className="min-h-[200vh] bg-black overflow-hidden">
        {/* Fixed background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Dynamic gradient that follows mouse */}
          <div 
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.04), transparent 40%)`
            }}
          />
          
          {/* Base gradient - much darker */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0c0a1d_0%,#050510_40%,#000000_100%)]" />
          
          {/* Animated gradient orbs - much more subtle */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-indigo-600/[0.06] rounded-full blur-[200px]"
            animate={{ 
              x: [0, 100, 0], 
              y: [0, 50, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/[0.04] rounded-full blur-[180px]"
            animate={{ 
              x: [0, -80, 0], 
              y: [0, -60, 0],
              scale: [1, 1.3, 1] 
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-400/[0.03] rounded-full blur-[150px]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]" />
          
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.12] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
          
          {/* Morphing shapes */}
          <MorphingShapes />
          
          {/* Particles */}
          <ParticleField />
        </div>

        {/* First viewport - Hero */}
        <motion.section 
          className="fixed inset-0 flex flex-col z-10"
          style={{ opacity, scale }}
        >
          {/* Header */}
          <motion.header 
            className="container mx-auto px-6 py-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-2xl font-heading font-bold text-white">
                  Fund<span className="text-indigo-400">Forge</span>
                </span>
              </div>
              
              <nav className="hidden md:flex items-center gap-8">
                {["Features", "Projects", "Community"].map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="text-white/50 hover:text-white transition-colors relative group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300" />
                  </motion.a>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm"
                  onClick={() => navigate("/projects")}
                >
                  Explore
                </Button>
              </motion.div>
            </div>
          </motion.header>

          {/* Main content */}
          <main className="flex-1 flex items-center justify-center px-6">
            <div className="max-w-6xl mx-auto text-center">
              {/* Animated badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.span 
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/60 text-sm font-medium backdrop-blur-xl"
                  whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
                >
                  <motion.span 
                    className="flex h-2.5 w-2.5"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </motion.span>
                  <span>Web3 Crowdfunding Protocol</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">v2.0</span>
                </motion.span>
              </motion.div>

              {/* Main headline with letter animation */}
              <div className="mt-10 font-heading text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.95]">
                <motion.div style={{ y: y1 }}>
                  <AnimatedText text="Fund Ideas." className="text-white block" delay={0.4} />
                </motion.div>
                <motion.div style={{ y: y2 }} className="mt-2">
                  <AnimatedText 
                    text="Build Tomorrow." 
                    className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent block" 
                    delay={0.7} 
                  />
                </motion.div>
              </div>

              {/* Subheadline */}
              <motion.p 
                className="mt-8 text-xl sm:text-2xl text-white/35 max-w-3xl mx-auto leading-relaxed font-light"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                The <GlitchText className="text-white/60">decentralized</GlitchText> platform where transparency meets innovation.
                <br className="hidden sm:block" />
                Back projects with confidence through <span className="text-indigo-400">milestone-based</span> smart contracts.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="mt-12 flex flex-col sm:flex-row gap-5 justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <Card3D>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      size="lg" 
                      onClick={handleEnterApp}
                      className="h-16 px-12 text-lg gap-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border-0 shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-500 rounded-2xl relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Rocket className="w-5 h-5" />
                        Launch App
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      />
                    </Button>
                  </motion.div>
                </Card3D>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => navigate("/projects")}
                    className="h-16 px-12 text-lg gap-3 border-white/10 text-white/80 hover:text-white hover:bg-white/[0.03] hover:border-white/15 backdrop-blur-sm rounded-2xl"
                  >
                    <Globe className="w-5 h-5" />
                    Explore Projects
                  </Button>
                </motion.div>
              </motion.div>

              {/* Feature cards */}
              <motion.div 
                className="mt-24 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                {[
                  { icon: Shield, title: "Trustless", desc: "Smart contract secured transactions", color: "from-indigo-600 to-indigo-500" },
                  { icon: Users, title: "Community-Led", desc: "Democratic milestone governance", color: "from-indigo-500 to-indigo-400" },
                  { icon: Lock, title: "Transparent", desc: "On-chain verifiable funding", color: "from-indigo-600 to-indigo-500" },
                ].map((feature, idx) => (
                  <Card3D key={idx}>
                    <motion.div
                      className="group relative p-8 rounded-3xl bg-white/[0.015] border border-white/[0.04] backdrop-blur-xl hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-500 overflow-hidden"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 + idx * 0.1 }}
                      whileHover={{ y: -8 }}
                    >
                      {/* Glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                      
                      <motion.div 
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/10`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <feature.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <h3 className="font-heading text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-white/35 leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  </Card3D>
                ))}
              </motion.div>

              {/* Scroll indicator */}
              <motion.div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <motion.div
                  className="flex flex-col items-center gap-2 text-white/20"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </div>
          </main>
        </motion.section>

        {/* Spacer to allow scrolling past the fixed hero */}
        <div className="h-screen pointer-events-none" />

        {/* Second viewport - Stats section */}
        <section className="min-h-screen flex items-center justify-center relative z-20">
          <div className="container mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { value: "2,847", suffix: "+", label: "ETH Raised", icon: Zap },
                  { value: "1,234", suffix: "", label: "Projects Funded", icon: Rocket },
                  { value: "45.6", suffix: "K", label: "Community Members", icon: Users },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className="text-center p-10 rounded-3xl bg-white/[0.015] border border-white/[0.04] backdrop-blur-xl"
                    initial={{ opacity: 0, y: 60, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: idx * 0.15, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-600/15 to-indigo-500/10 border border-indigo-500/15 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <stat.icon className="w-8 h-8 text-indigo-400" />
                    </motion.div>
                    <div className="text-5xl sm:text-6xl font-heading font-bold text-white mb-2">
                      {stat.value}<span className="text-indigo-400">{stat.suffix}</span>
                    </div>
                    <div className="text-white/35 text-lg">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Final CTA */}
              <motion.div
                className="mt-20 text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
                  Ready to <span className="text-indigo-400">shape the future</span>?
                </h2>
                <p className="text-white/35 text-lg mb-10 max-w-xl mx-auto">
                  Join thousands of innovators and backers building the next generation of breakthrough projects.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg" 
                    onClick={handleEnterApp}
                    className="h-16 px-14 text-lg gap-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border-0 shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-500 rounded-2xl"
                  >
                    <Sparkles className="w-5 h-5" />
                    Start Your Journey
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-20 py-10 border-t border-white/[0.03]">
          <div className="container mx-auto px-6 text-center">
            <motion.p 
              className="text-sm text-white/25"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © 2025 FundForge. Decentralized crowdfunding for the future.
            </motion.p>
          </div>
        </footer>
      </div>
    </>
  )
}
