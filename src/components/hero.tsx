import { type JSX, memo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Users, Sparkles, TrendingUp, Rocket, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Shield,
    title: "Secure & Trustless",
    description: "Smart contracts protect your funds with automated milestone releases",
    gradient: "from-emerald-500 to-teal-600",
    shadowColor: "shadow-emerald-500/20"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Democratic voting system where your contribution equals your voice",
    gradient: "from-purple-500 to-pink-600",
    shadowColor: "shadow-purple-500/20"
  },
  {
    icon: Globe,
    title: "Multi-Chain Ready",
    description: "Deploy on Ethereum, Polygon, or BSC with one-click simplicity",
    gradient: "from-blue-500 to-cyan-600",
    shadowColor: "shadow-blue-500/20"
  }
];

const stats = [
  { value: "$2.5M+", label: "Total Raised", icon: TrendingUp },
  { value: "150+", label: "Live Projects", icon: Rocket },
  { value: "10K+", label: "Active Users", icon: Users }
];

export const Hero = memo(function Hero(): JSX.Element {
  return (
    <section className="relative min-h-screen flex items-center py-12 lg:py-20 overflow-hidden">
      {/* Simplified gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" />
      
      {/* Subtle animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-r from-brand-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top Badge */}
          <div className="flex justify-center mb-8 animate-fade-in-down">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100/80 dark:bg-brand-900/20 backdrop-blur-sm border border-brand-200/50 dark:border-brand-800/50">
              <div className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                <span className="text-xs font-medium text-brand-700 dark:text-brand-300">Live on Mainnet</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-fade-in-up">
                <span className="block text-gray-900 dark:text-white mb-2">Crowdfunding</span>
                <span className="block bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
                  Reimagined
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
                Launch your vision with blockchain-powered transparency. No middlemen, no hidden fees, just pure community support.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up animation-delay-300">
                <Link to="/projects">
                  <Button
                    size="lg"
                    className="group w-full sm:w-auto bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Browse Projects
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/create-project">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group w-full sm:w-auto border-2 px-8 py-6 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    Launch Project
                    <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Compact Stats */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start animate-fade-in-up animation-delay-400">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                      <stat.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative animate-fade-in animation-delay-500">
              {/* Floating Cards */}
              <div className="relative h-[400px] lg:h-[500px]">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`absolute bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transform transition-all duration-500 hover:scale-105 ${
                      index === 0 ? 'top-0 left-0 z-30' : 
                      index === 1 ? 'top-20 right-0 z-20' : 
                      'bottom-0 left-12 z-10'
                    } ${feature.shadowColor} hover:shadow-2xl`}
                    style={{
                      animation: `float ${3 + index}s ease-in-out infinite`,
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 max-w-[200px]">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Feature Strip */}
          <div className="mt-20 py-8 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-600">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Instant Deployment</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Audited Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>Global Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
});

export default Hero;