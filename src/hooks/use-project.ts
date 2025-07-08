import React, { useState, useEffect } from "react";
import type { Project } from "@/types/project";

interface UseProjectReturn {
  project: Project | null;
  loading: boolean;
}

const mockProject: Project = {
  id: "1",
  title: "DeFi Trading Platform",
  description:
    "Revolutionary decentralized trading platform with advanced analytics and automated strategies. Our platform combines cutting-edge DeFi protocols with institutional-grade trading tools to provide retail investors with professional-level trading capabilities.",
  category: "technology",
  targetFunding: 50,
  currentFunding: 32.5,
  backers: 127,
  daysLeft: 15,
  status: "active", // This matches the centralized type
  image: "/placeholder.svg?height=400&width=600",
  creator: "0x123...abc",
  milestones: [
    {
      id: "m1",
      title: "Smart Contract Development",
      description:
        "Complete core smart contracts for trading functionality including order matching, liquidity pools, and security features.",
      fundingRequired: 15,
      dueDate: "2024-02-15",
      status: "completed",
    },
    {
      id: "m2",
      title: "Frontend Development",
      description:
        "Build comprehensive user interface with trading dashboard, portfolio management, and analytics tools.",
      fundingRequired: 20,
      dueDate: "2024-03-15",
      status: "active",
      votes: { for: 85, against: 12, total: 97 },
    },
    {
      id: "m3",
      title: "Security Audit & Launch",
      description:
        "Professional security audit by leading firms and mainnet deployment with initial liquidity provision.",
      fundingRequired: 15,
      dueDate: "2024-04-15",
      status: "pending",
    },
  ],
  activeVoting: {
    id: "v1",
    title: "Approve Frontend Milestone Completion",
    description:
      "The development team has completed the frontend development milestone including the trading dashboard, portfolio management interface, and analytics tools. Vote to approve completion and release 20 ETH funding.",
    votesFor: 85,
    votesAgainst: 12,
    timeLeft: 3,
  },
};

export function useProject(projectId: string): UseProjectReturn {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProject(mockProject);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [projectId]);

  return { project, loading };
}

export default useProject;
