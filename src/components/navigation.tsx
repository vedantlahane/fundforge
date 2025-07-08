import  { useState, type JSX } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { WalletConnection } from "@/components/wallet-connection";
import { Menu, X, Zap } from "lucide-react";

export function Navigation(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-heading font-bold gradient-text">Fund Forge</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/projects"
              className="text-foreground/80 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium"
            >
              Projects
            </Link>
            <Link
              to="/create-project"
              className="text-foreground/80 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium"
            >
              Create
            </Link>
            <Link
              to="/dashboard"
              className="text-foreground/80 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium"
            >
              Dashboard
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <WalletConnection />
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-slide-in">
            <Link
              to="/projects"
              className="block text-foreground/80 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium py-2"
            >
              Projects
            </Link>
            <Link
              to="/create-project"
              className="block text-foreground/80 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium py-2"
            >
              Create
            </Link>
            <Link
              to="/dashboard"
              className="block text-foreground/80 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium py-2"
            >
              Dashboard
            </Link>
            <div className="flex items-center space-x-4 pt-4 border-t">
              <ThemeToggle />
              <WalletConnection />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
