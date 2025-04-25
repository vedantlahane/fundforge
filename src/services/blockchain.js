import { ethers } from 'ethers';

// ABI will be filled after contract deployment
const factoryABI = []; // Replace with your contract ABI after deployment
const projectABI = []; // Replace with your contract ABI after deployment
const factoryAddress = ""; // Replace with your deployed factory contract address

// Get provider and signer
export const getProviderAndSigner = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  
  return { provider, signer };
};

// Get factory contract instance
export const getFactoryContract = async () => {
  const { signer } = await getProviderAndSigner();
  return new ethers.Contract(factoryAddress, factoryABI, signer);
};

// Create a new project
export const createProject = async (title, description, goal, deadline, milestones) => {
  const contract = await getFactoryContract();
  
  const goalInWei = ethers.utils.parseEther(goal.toString());
  const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);
  
  const milestoneDescriptions = milestones.map(m => m.description);
  const milestonePercentages = milestones.map(m => parseInt(m.percentage));
  
  const tx = await contract.createProject(
    title,
    description,
    goalInWei,
    deadlineTimestamp,
    milestoneDescriptions,
    milestonePercentages
  );
  
  return await tx.wait();
};

// Get all projects
export const getAllProjects = async () => {
  const contract = await getFactoryContract();
  const projectAddresses = await contract.getDeployedProjects();
  const { provider } = await getProviderAndSigner();
  
  const projects = await Promise.all(
    projectAddresses.map(async (address) => {
      const projectContract = new ethers.Contract(address, projectABI, provider);
      const details = await projectContract.getProjectDetails();
      
      return {
        address,
        title: details[0],
        description: details[1],
        goal: ethers.utils.formatEther(details[2]),
        deadline: new Date(details[3].toNumber() * 1000),
        creator: details[4],
        raised: ethers.utils.formatEther(details[5]),
        backerCount: details[6].toNumber(),
        currentMilestone: details[7].toNumber(),
        fundingSuccessful: details[8]
      };
    })
  );
  
  return projects;
};

// Get project details
export const getProjectDetails = async (projectAddress) => {
  const { provider } = await getProviderAndSigner();
  const projectContract = new ethers.Contract(projectAddress, projectABI, provider);
  
  const details = await projectContract.getProjectDetails();
  const milestoneCount = await projectContract.getMilestoneCount();
  
  const milestones = [];
  for (let i = 0; i < milestoneCount; i++) {
    const milestoneDetails = await projectContract.getMilestoneDetails(i);
    milestones.push({
      id: i,
      description: milestoneDetails[0],
      percentage: milestoneDetails[1].toNumber(),
      completed: milestoneDetails[2],
      approvalCount: milestoneDetails[3].toNumber(),
      rejectionCount: milestoneDetails[4].toNumber()
    });
  }
  
  return {
    address: projectAddress,
    title: details[0],
    description: details[1],
    goal: ethers.utils.formatEther(details[2]),
    deadline: new Date(details[3].toNumber() * 1000),
    creator: details[4],
    raised: ethers.utils.formatEther(details[5]),
    backerCount: details[6].toNumber(),
    currentMilestone: details[7].toNumber(),
    fundingSuccessful: details[8],
    milestones
  };
};

// Contribute to a project
export const contributeToProject = async (projectAddress, amount) => {
  const { signer } = await getProviderAndSigner();
  const projectContract = new ethers.Contract(projectAddress, projectABI, signer);
  
  const tx = await projectContract.contribute({
    value: ethers.utils.parseEther(amount.toString())
  });
  
  return await tx.wait();
};

// Vote on a milestone
export const voteOnMilestone = async (projectAddress, milestoneId, approve) => {
  const { signer } = await getProviderAndSigner();
  const projectContract = new ethers.Contract(projectAddress, projectABI, signer);
  
  const tx = await projectContract.voteOnMilestone(milestoneId, approve);
  
  return await tx.wait();
};

// Claim refund
export const claimRefund = async (projectAddress) => {
  const { signer } = await getProviderAndSigner();
  const projectContract = new ethers.Contract(projectAddress, projectABI, signer);
  
  const tx = await projectContract.claimRefund();
  
  return await tx.wait();
};

// Check network and switch to Mumbai if needed
export const checkAndSwitchNetwork = async () => {
  if (!window.ethereum) return false;
  
  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    // Mumbai testnet chainId is 0x13881 (80001 in decimal)
    if (chainId !== '0x13881') {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }],
        });
        return true;
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x13881',
                chainName: 'Polygon Mumbai Testnet',
                nativeCurrency: {
                  name: 'MATIC',
                  symbol: 'MATIC',
                  decimals: 18
                },
                rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                blockExplorerUrls: ['https://mumbai.polygonscan.com/']
              },
            ],
          });
          return true;
        }
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
