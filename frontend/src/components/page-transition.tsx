import { m, LazyMotion, domAnimation, AnimatePresence, useReducedMotion, useMotionValue, animate } from "framer-motion"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeIn" as const,
    },
  },
}

// Static variants for reduced motion
const staticPageVariants = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.15 }
  },
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence mode="wait">
        <m.div
          key={location.pathname}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={shouldReduceMotion ? staticPageVariants : pageVariants}
          className="will-change-transform"
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  )
}

// Fade in animation wrapper for sections
export function FadeIn({ 
  children, 
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.5
}: { 
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  duration?: number
}) {
  const shouldReduceMotion = useReducedMotion()

  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  }

  // Simple fade for reduced motion
  if (shouldReduceMotion) {
    return (
      <LazyMotion features={domAnimation} strict>
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.2, delay }}
          className={className}
        >
          {children}
        </m.div>
      </LazyMotion>
    )
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ opacity: 0, ...directions[direction] }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration, delay, ease: "easeOut" as const }}
        className={`${className} will-change-transform`}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}

// Stagger children animation
export function StaggerContainer({ 
  children, 
  delay = 0,
  staggerDelay = 0.1,
  className = "" 
}: { 
  children: ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  // Static variants for reduced motion
  const staticVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, delayChildren: delay }
    }
  }

  const animatedVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: staggerDelay, 
        delayChildren: delay 
      }
    }
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={shouldReduceMotion ? staticVariants : animatedVariants}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}

// Individual stagger item
export function StaggerItem({ 
  children,
  className = "",
  delay = 0
}: { 
  children: ReactNode
  className?: string
  delay?: number
}) {
  const shouldReduceMotion = useReducedMotion()

  const staticVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2, delay }
    }
  }

  const animatedVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const, delay }
    }
  }

  return (
    <m.div
      variants={shouldReduceMotion ? staticVariants : animatedVariants}
      className={`${className} ${!shouldReduceMotion ? 'will-change-transform' : ''}`}
    >
      {children}
    </m.div>
  )
}

// Scale on hover wrapper
export function ScaleOnHover({ 
  children, 
  scale = 1.02,
  tapScale = 0.98,
  className = ""
}: { 
  children: ReactNode
  scale?: number
  tapScale?: number
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        whileHover={shouldReduceMotion ? {} : { scale }}
        whileTap={shouldReduceMotion ? {} : { scale: tapScale }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
        className={`${className} ${!shouldReduceMotion ? 'will-change-transform' : ''}`}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}

// ============================================================================
// ADDITIONAL UTILITY COMPONENTS
// ============================================================================

// Slide in from side
export function SlideIn({
  children,
  from = "left",
  delay = 0,
  duration = 0.5,
  className = ""
}: {
  children: ReactNode
  from?: "left" | "right" | "top" | "bottom"
  delay?: number
  duration?: number
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    top: { x: 0, y: -100 },
    bottom: { x: 0, y: 100 },
  }

  if (shouldReduceMotion) {
    return (
      <LazyMotion features={domAnimation} strict>
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.2, delay }}
          className={className}
        >
          {children}
        </m.div>
      </LazyMotion>
    )
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ opacity: 0, ...directions[from] }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration, delay, ease: "easeOut" as const }}
        className={`${className} will-change-transform`}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}

// Rotate in animation
export function RotateIn({
  children,
  delay = 0,
  duration = 0.6,
  className = ""
}: {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <LazyMotion features={domAnimation} strict>
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.2, delay }}
          className={className}
        >
          {children}
        </m.div>
      </LazyMotion>
    )
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ opacity: 0, rotate: -10, scale: 0.95 }}
        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration, 
          delay, 
          ease: [0.22, 1, 0.36, 1] as const 
        }}
        className={`${className} will-change-transform`}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}

// Blur in animation
export function BlurIn({
  children,
  delay = 0,
  duration = 0.6,
  className = ""
}: {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <LazyMotion features={domAnimation} strict>
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.2, delay }}
          className={className}
        >
          {children}
        </m.div>
      </LazyMotion>
    )
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration, delay, ease: "easeOut" as const }}
        className={`${className} will-change-transform will-change-[filter]`}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}

// Pulse animation (for loading states)
export function Pulse({
  children,
  className = ""
}: {
  children: ReactNode
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [1, 0.8, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut" as const
        }}
        className={`${className} will-change-transform`}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}

export function CountUp({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  suffix = "",
  prefix = "",
  className = ""
}: {
  from?: number
  to: number
  duration?: number
  delay?: number
  suffix?: string
  prefix?: string
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()
  const motionVal = useMotionValue(from)
  const [current, setCurrent] = useState(from)

  useEffect(() => {
    setCurrent(from)
    const controls = animate(motionVal, to, { duration, delay, ease: "easeOut" as const })
    const unsubscribe = motionVal.on("change", (v: number) => setCurrent(v))
    return () => {
      unsubscribe()
      if (controls && typeof (controls as any).stop === "function") {
        (controls as any).stop()
      }
    }
  }, [from, to, duration, delay, motionVal])

  if (shouldReduceMotion) {
    return (
      <span className={className}>
        {prefix}{to.toLocaleString()}{suffix}
      </span>
    )
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay }}
        className={className}
      >
        <span>
          {prefix}{Math.round(current).toLocaleString()}{suffix}
        </span>
      </m.span>
    </LazyMotion>
  )
}


// Progress bar animation
export function ProgressBar({
  value,
  max = 100,
  className = "",
  barClassName = ""
}: {
  value: number
  max?: number
  className?: string
  barClassName?: string
}) {
  const shouldReduceMotion = useReducedMotion()
  const percentage = (value / max) * 100

  return (
    <div className={`relative overflow-hidden rounded-full ${className}`}>
      <LazyMotion features={domAnimation} strict>
        <m.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={shouldReduceMotion 
            ? { duration: 0.2 } 
            : { duration: 1.5, ease: "easeOut" as const }
          }
          className={`h-full ${barClassName}`}
        />
      </LazyMotion>
    </div>
  )
}

// Typewriter effect
export function Typewriter({
  text,
  delay = 0,
  speed = 0.05,
  className = ""
}: {
  text: string
  delay?: number
  speed?: number
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.span
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay }}
      >
        {text.split("").map((char, i) => (
          <m.span
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + i * speed }}
          >
            {char}
          </m.span>
        ))}
      </m.span>
    </LazyMotion>
  )
}
