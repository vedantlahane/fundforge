import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useWallet } from '../contexts/WalletContext';
import { getCrowdfundingContract, contributeToProject, voteOnMilestone } from '../services/blockchain/thirdweb';
import { ethers } from 'ethers';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { account, signer } = useWallet();
  
  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contributionAmount, setContributionAmount] = useState('');
  const [isContributing, setIsContributing] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      if (!signer || !id) return;
      
      try {
        setLoading(true);
        const contract = await getCrowdfundingContract(signer);
        
        // Get project details
        const projectData = await contract.call("getProject", [id]);
        
        // Format the project data
        const formattedProject = {
          id: id,
          title: projectData[1], // Adjust these indices based on your contract's return values
          description: projectData[2],
          goal: ethers.utils.formatEther(projectData[3]),
          raised: ethers.utils.formatEther(projectData[4]),
          deadline: new Date(projectData[5] * 1000),
          creator: projectData[0],
          backerCount: projectData[6].toNumber(),
          currentMilestone: projectData[7].toNumber(),
          funded: projectData[8]
        };
        
        setProject(formattedProject);
        
        // Get milestone details
        const milestoneCount = await contract.call("getMilestoneCount", [id]);
        const milestonePromises = [];
        
        for (let i = 0; i < milestoneCount; i++) {
          milestonePromises.push(contract.call("getMilestone", [id, i]));
        }
        
        const milestoneResults = await Promise.all(milestonePromises);
        const formattedMilestones = milestoneResults.map((ms, index) => ({
          id: index,
          description: ms[0],
          percentage: ms[1].toNumber(),
          completed: ms[2],
          approvalCount: ms[3].toNumber(),
          rejectionCount: ms[4].toNumber()
        }));
        
        setMilestones(formattedMilestones);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [id, signer]);

  const handleContribute = async (e) => {
    e.preventDefault();
    
    if (!account) {
      setError('Please connect your wallet first');
      return;
    }
    
    if (!contributionAmount || parseFloat(contributionAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    setIsContributing(true);
    setError(null);
    
    try {
      await contributeToProject(signer, id, contributionAmount);
      
      // Refresh project data after contribution
      const contract = await getCrowdfundingContract(signer);
      const projectData = await contract.call("getProject", [id]);
      
      setProject({
        ...project,
        raised: ethers.utils.formatEther(projectData[4]),
        backerCount: projectData[6].toNumber()
      });
      
      setContributionAmount('');
    } catch (err) {
      console.error("Error contributing:", err);
      setError('Failed to contribute. Please try again.');
    } finally {
      setIsContributing(false);
    }
  };

  const handleVote = async (milestoneId, approve) => {
    if (!account) {
      setError('Please connect your wallet first');
      return;
    }
    
    setIsVoting(true);
    setError(null);
    
    try {
      await voteOnMilestone(signer, id, milestoneId, approve);
      
      // Refresh milestone data after voting
      const contract = await getCrowdfundingContract(signer);
      const milestoneData = await contract.call("getMilestone", [id, milestoneId]);
      
      setMilestones(milestones.map((ms, idx) => 
        idx === milestoneId ? {
          ...ms,
          completed: milestoneData[2],
          approvalCount: milestoneData[3].toNumber(),
          rejectionCount: milestoneData[4].toNumber()
        } : ms
      ));
      
      // Also refresh project data in case milestone completion changed
      const projectData = await contract.call("getProject", [id]);
      setProject({
        ...project,
        currentMilestone: projectData[7].toNumber()
      });
    } catch (err) {
      console.error("Error voting:", err);
      setError('Failed to vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto py-12 px-4 flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto py-12 px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/explore')}>
            Browse Projects
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Calculate progress percentage
  const progress = (parseFloat(project.raised) / parseFloat(project.goal)) * 100;
  
  // Format deadline
  const deadlineDate = new Date(project.deadline);
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24)));
  
  // Check if project is active
  const isActive = now < deadlineDate && !project.funded;

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-12 px-4">
        {project.image && (
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-64 object-cover rounded-lg mb-6" 
          />
        )}
        
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        
        <div className="flex items-center text-gray-600 mb-6">
          <span>Created by {project.creator.substring(0, 6)}...{project.creator.substring(project.creator.length - 4)}</span>
        </div>
        
        <p className="text-gray-700 mb-8 whitespace-pre-line">{project.description}</p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-8 mb-4">
            <div>
              <div className="text-gray-500 text-sm">Goal</div>
              <div className="font-bold text-lg">{project.goal} MATIC</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Raised</div>
              <div className="font-bold text-lg">{project.raised} MATIC</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Backers</div>
              <div className="font-bold text-lg">{project.backerCount}</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Time Left</div>
              <div className="font-bold text-lg">
                {daysLeft > 0 ? `${daysLeft} days` : 'Ended'}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span className="font-medium">{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${Math.min(100, progress)}%` }}
              ></div>
            </div>
          </div>
          
          {isActive ? (
            <form onSubmit={handleContribute} className="flex flex-wrap gap-3 items-end">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Amount (MATIC)</label>
                <input
                  type="number"
                  value={contributionAmount}
                  onChange={e => setContributionAmount(e.target.value)}
                  className="border rounded p-2 w-32"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={isContributing || !account}
                className="flex items-center"
              >
                {isContributing ? (
                  <>
                    <LoadingSpinner size="sm" color="white" className="mr-2" />
                    Processing...
                  </>
                ) : (
                  'Back This Project'
                )}
              </Button>
            </form>
          ) : (
            <div className="bg-gray-100 p-3 rounded text-gray-700">
              {project.funded ? 'This project has been fully funded!' : 'Funding period has ended.'}
            </div>
          )}
          
          {error && (
            <div className="mt-4 bg-red-100 text-red-800 p-3 rounded">
              {error}
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Milestones</h2>
          
          {milestones.length === 0 ? (
            <p className="text-gray-500">No milestones defined for this project.</p>
          ) : (
            <div className="space-y-4">
              {milestones.map((ms, idx) => (
                <div key={idx} className={`border rounded-lg p-4 ${ms.completed ? 'bg-green-50 border-green-200' : idx === project.currentMilestone ? 'bg-blue-50 border-blue-200' : ''}`}>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">
                      {ms.description}
                      {idx === project.currentMilestone && !ms.completed && (
                        <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Current</span>
                      )}
                      {ms.completed && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Completed</span>
                      )}
                    </h3>
                    <span className="text-gray-600">{ms.percentage}% of funds</span>
                  </div>
                  
                  <div className="flex gap-4 text-sm text-gray-600 mb-3">
                    <div>Approvals: {ms.approvalCount}</div>
                    <div>Rejections: {ms.rejectionCount}</div>
                  </div>
                  
                  {idx === project.currentMilestone && !ms.completed && account && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleVote(idx, true)}
                        disabled={isVoting}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleVote(idx, false)}
                        disabled={isVoting}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
