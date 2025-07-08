import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseFundingReturn {
  fundProject: (projectId: string, amount: number) => Promise<void>;
  loading: boolean;
}

export function useFunding(): UseFundingReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = useToast();

  const fundProject = async (_projectId: string, amount: number): Promise<void> => {
    setLoading(true);
    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      success("Funding Successful!", {
        description: `Successfully funded ${amount} ETH to the project.`,
      });
    } catch (err) {
      error("Funding Failed", {
        description: "There was an error processing your funding transaction.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { fundProject, loading };
}

export default useFunding;
