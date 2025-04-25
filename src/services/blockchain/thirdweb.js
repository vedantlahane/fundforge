import { createThirdwebClient, getContract } from "thirdweb";
import { polygonMumbai } from "thirdweb/chains";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";


const client = createThirdwebClient({
  clientId: "33e4e06c99b0b8aac3515e061452dcdd",
});
export const getCrowdfundingContract = async (signer) => {
  return getContract({
    client,
    chain: polygonMumbai,
    address: CONTRACT_ADDRESS,
    wallet: signer
  });
};

// Rest of your contract interaction functions remain the same

// Create a new project
export const createProject = async (signer, projectData) => {
  const contract = await getCrowdfundingContract(signer);
  if (!contract) throw new Error("Contract not found");
  
  const { title, description, goal, deadline, milestones } = projectData;
  
  // Convert goal to wei (assuming input is in MATIC)
  const goalInWei = ethers.utils.parseEther(goal.toString());
  
  // Convert deadline to timestamp
  const deadlineDate = new Date(deadline);
  const deadlineTimestamp = Math.floor(deadlineDate.getTime() / 1000);
  
  // Extract milestone data
  const milestoneDescriptions = milestones.map(m => m.description);
  const milestonePercentages = milestones.map(m => parseInt(m.percentage));
  
  // Call the contract method
  const tx = await contract.call("createProject", [
    title,
    description,
    goalInWei,
    deadlineTimestamp,
    milestoneDescriptions,
    milestonePercentages
  ]);
  
  return tx;
};

// Get all projects
export const getAllProjects = async (signer) => {
  const contract = await getCrowdfundingContract(signer);
  if (!contract) return [];
  
  const projectIds = await contract.call("getAllProjects");
  
  // Get details for each project
  const projects = await Promise.all(
    projectIds.map(async (id) => {
      const projectData = await contract.call("getProject", [id]);
      
      // Format the data
      return {
        id: id.toString(),
        title: projectData.title,
        description: projectData.description,
        goal: ethers.utils.formatEther(projectData.goal),
        raised: ethers.utils.formatEther(projectData.raised),
        deadline: new Date(projectData.deadline * 1000),
        creator: projectData.creator,
        backerCount: projectData.backerCount.toNumber(),
        currentMilestone: projectData.currentMilestone.toNumber(),
        funded: projectData.funded
      };
    })
  );
  
  return projects;
};

// Contribute to a project
export const contributeToProject = async (signer, projectId, amount) => {
  const contract = await getCrowdfundingContract(signer);
  if (!contract) throw new Error("Contract not found");
  
  // Convert amount to wei
  const amountInWei = ethers.utils.parseEther(amount.toString());
  
  // Call the contract method
  const tx = await contract.call("contributeToProject", [projectId], {
    value: amountInWei
  });
  
  return tx;
};

// Vote on a milestone
export const voteOnMilestone = async (signer, projectId, milestoneId, approve) => {
  const contract = await getCrowdfundingContract(signer);
  if (!contract) throw new Error("Contract not found");
  
  // Call the contract method
  const tx = await contract.call("voteOnMilestone", [projectId, milestoneId, approve]);
  
  return tx;
};
