import { useState, useEffect } from "react";
import type { Project } from "@/types/project";
interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
}

const mockProjects: Project[] = [
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
    milestones: [
      {
        id: "m1",
        title: "Smart Contract Development",
        description: "Complete core smart contracts for trading functionality",
        fundingRequired: 15,
        dueDate: "2024-02-15",
        status: "completed",
      },
      {
        id: "m2",
        title: "Frontend Development",
        description: "Build user interface and trading dashboard",
        fundingRequired: 20,
        dueDate: "2024-03-15",
        status: "active",
        votes: { for: 85, against: 12, total: 97 },
      },
      {
        id: "m3",
        title: "Security Audit & Launch",
        description: "Professional security audit and mainnet deployment",
        fundingRequired: 15,
        dueDate: "2024-04-15",
        status: "pending",
      },
    ],
    activeVoting: {
      id: "v1",
      title: "Approve Frontend Milestone Completion",
      description:
        "Vote to approve the completion of the frontend development milestone and release 20 ETH to the project creator.",
      votesFor: 85,
      votesAgainst: 12,
      timeLeft: 3,
    },
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
  {
    id: "4",
    title: "Green Energy DAO",
    description: "Decentralized autonomous organization for funding renewable energy projects.",
    category: "technology",
    targetFunding: 200,
    currentFunding: 156.8,
    backers: 445,
    daysLeft: 12,
    status: "active",
    image: "/placeholder.svg?height=300&width=400",
    creator: "0xabc...123",
    milestones: [],
  },
  {
    id: "5",
    title: "Decentralized Social Network",
    description: "Privacy-focused social media platform built on blockchain technology.",
    category: "technology",
    targetFunding: 75,
    currentFunding: 45.3,
    backers: 178,
    daysLeft: 18,
    status: "active",
    image: "/placeholder.svg?height=300&width=400",
    creator: "0xdef...456",
    milestones: [],
  },
  {
    id: "6",
    title: "AI-Powered Music Creation",
    description: "Revolutionary AI tool for musicians to create and collaborate on blockchain.",
    category: "music",
    targetFunding: 40,
    currentFunding: 28.9,
    backers: 92,
    daysLeft: 25,
    status: "active",
    image: "/placeholder.svg?height=300&width=400",
    creator: "0x789...abc",
    milestones: [],
  },
];



export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { projects, loading };
}

export default useProjects;
