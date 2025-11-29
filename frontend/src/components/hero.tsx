import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Users } from "lucide-react"
import { Link } from "react-router-dom"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Powered by Blockchain Technology
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 bg-clip-text text-transparent">
              Fund Forge
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            The future of crowdfunding is here. Transparent, secure, and community-driven fundraising powered by smart
            contracts on multiple blockchains.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/projects">
              <Button
                size="lg"
                className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40"
              >
                Explore Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/create-project">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 bg-transparent border-2 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              >
                Start a Project
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Trustless & Secure</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Smart contracts ensure funds are released only when milestones are met and approved by the community
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Community Governed</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Backers vote on milestone completion with weighted voting based on their contribution amount
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Multi-Chain Support</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Deploy seamlessly on Ethereum, Polygon, and Binance Smart Chain with unified experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
