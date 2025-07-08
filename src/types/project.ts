export interface Milestone {
  id: string;
  title: string;
  description: string;
  fundingRequired: number;
  dueDate: string;
  status: "pending" | "active" | "completed";
  votes?: {
    for: number;
    against: number;
    total: number;
  };
}

export interface ActiveVoting {
  id: string;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  timeLeft: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  targetFunding: number;
  currentFunding: number;
  backers: number;
  daysLeft: number;
  status: "active" | "funded" | "failed";
  image: string;
  creator: string;
  milestones: Milestone[];
  activeVoting?: ActiveVoting;
}
