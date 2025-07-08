import { type JSX } from "react";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  targetFunding: number;
  currentFunding: number;
  backers: number;
  daysLeft: number;
  status: "active" | "failed" | "funded";
  image: string;
  creator: string;
  milestones: any[];
}

const featuredProjects: Project[] = [
  {
    id: "1",
    title: "DeFi Trading Platform",
    description: "Revolutionary decentralized trading platform with advanced analytics and automated strategies.",
    category: "technology",
    targetFunding: 50,
    currentFunding: 32.5,
    backers: 127,
    daysLeft: 15,
    status: "active",
    image: "/placeholder.svg?height=300&width=400",
    creator: "0x123...abc",
    milestones: [],
  },
  {
    id: "2",
    title: "NFT Art Marketplace",
    description: "Community-driven NFT marketplace focusing on emerging digital artists.",
    category: "art",
    targetFunding: 25,
    currentFunding: 18.7,
    backers: 89,
    daysLeft: 22,
    status: "active",
    image: "/placeholder.svg?height=300&width=400",
    creator: "0x456...def",
    milestones: [],
  },
  {
    id: "3",
    title: "GameFi RPG Adventure",
    description: "Play-to-earn RPG game with blockchain-based character ownership and rewards.",
    category: "games",
    targetFunding: 100,
    currentFunding: 75.2,
    backers: 234,
    daysLeft: 8,
    status: "active",
    image: "/placeholder.svg?height=300&width=400",
    creator: "0x789...ghi",
    milestones: [],
  },
];

export function FeaturedProjects(): JSX.Element {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground">Discover innovative projects making waves in the web3 space</p>
          </div>
          <Link to="/projects">
            <Button variant="outline">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
