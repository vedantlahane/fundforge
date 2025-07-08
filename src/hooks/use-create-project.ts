import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProjectData {
  title: string;
  description: string;
  category: string;
  targetFunding: number;
  duration: number;
  image: File | null;
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    fundingRequired: number;
    dueDate: string;
  }>;
}

interface UseCreateProjectReturn {
  createProject: (projectData: ProjectData) => Promise<void>;
  loading: boolean;
}

export function useCreateProject(): UseCreateProjectReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const createProject = async (_projectData: ProjectData): Promise<void> => {
    setLoading(true);
    try {
      // Simulate blockchain deployment
      await new Promise((resolve) => setTimeout(resolve, 3000));

      toast({
        title: "Project Created!",
        description: "Your project has been successfully deployed to the blockchain.",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "There was an error creating your project.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { createProject, loading };
}

export default useCreateProject;
