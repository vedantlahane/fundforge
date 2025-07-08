import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseVotingReturn {
  vote: (projectId: string, votingId: string, support: boolean, comment?: string) => Promise<void>;
  loading: boolean;
}

export function useVoting(): UseVotingReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = useToast();

  const vote = async (
    projectId: string,
    votingId: string,
    support: boolean,
    comment?: string
  ): Promise<void> => {
    setLoading(true);
    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 1500));

      success("Vote Submitted!", {
        description: `Your ${support ? "support" : "opposition"} vote has been recorded on the blockchain.`,
      });
    } catch (err) {
      error("Vote Failed", {
        description: "There was an error submitting your vote.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { vote, loading };
}

export default useVoting;
