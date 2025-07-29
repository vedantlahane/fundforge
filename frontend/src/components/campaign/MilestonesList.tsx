import React, { useState } from 'react';
import { CheckCircle, Clock, Vote, DollarSign, Users } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { useWeb3 } from '../../contexts/Web3Context';
import toast from 'react-hot-toast';

interface Milestone {
  id: number;
  title: string;
  description: string;
  amount: string;
  approved: boolean;
  released: boolean;
  votesFor: string;
  votesAgainst: string;
}

interface MilestonesListProps {
  milestones: Milestone[];
  campaignAddress: string;
}

const MilestonesList: React.FC<MilestonesListProps> = ({
  milestones,
  campaignAddress,
}) => {
  const { isConnected, createCampaignContract } = useWeb3();
  const [voting, setVoting] = useState<{ [key: number]: boolean }>({});

  const handleVote = async (milestoneId: number, support: boolean) => {
    if (!isConnected) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      setVoting(prev => ({ ...prev, [milestoneId]: true }));
      
      const campaignContract = createCampaignContract(campaignAddress);
      await campaignContract.methods.voteOnMilestone(milestoneId, support).send({
        from: account,
      });

      toast.success(`Vote ${support ? 'for' : 'against'} milestone submitted!`);
    } catch (error) {
      console.error('Voting failed:', error);
      toast.error('Voting failed');
    } finally {
      setVoting(prev => ({ ...prev, [milestoneId]: false }));
    }
  };

  if (milestones.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No milestones yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          The project creator hasn't added any milestones yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => {
        const totalVotes = parseFloat(milestone.votesFor) + parseFloat(milestone.votesAgainst);
        const approvalRate = totalVotes > 0 ? 
          (parseFloat(milestone.votesFor) / totalVotes) * 100 : 0;

        return (
          <Card key={milestone.id} className="relative">
            {/* Milestone Status Badge */}
            <div className="absolute top-4 right-4">
              {milestone.released ? (
                <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs">
                  <CheckCircle className="w-3 h-3" />
                  <span>Released</span>
                </div>
              ) : milestone.approved ? (
                <div className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                  <Vote className="w-3 h-3" />
                  <span>Approved</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs">
                  <Clock className="w-3 h-3" />
                  <span>Voting</span>
                </div>
              )}
            </div>

            <div className="pr-20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    milestone.released 
                      ? 'bg-green-500'
                      : milestone.approved 
                        ? 'bg-blue-500'
                        : 'bg-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {milestone.description}
                  </p>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium">{milestone.amount} ETH</span>
                    </div>
                    <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">
                        {totalVotes.toFixed(2)} ETH in votes
                      </span>
                    </div>
                  </div>

                  {/* Voting Progress */}
                  {!milestone.released && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Community Approval
                        </span>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {approvalRate.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${approvalRate}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                        <span>For: {milestone.votesFor} ETH</span>
                        <span>Against: {milestone.votesAgainst} ETH</span>
                      </div>
                    </div>
                  )}

                  {/* Voting Buttons */}
                  {!milestone.released && !milestone.approved && isConnected && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleVote(milestone.id, true)}
                        loading={voting[milestone.id]}
                        disabled={voting[milestone.id]}
                      >
                        Vote For
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVote(milestone.id, false)}
                        loading={voting[milestone.id]}
                        disabled={voting[milestone.id]}
                      >
                        Vote Against
                      </Button>
                    </div>
                  )}

                  {/* Connection prompt */}
                  {!milestone.released && !milestone.approved && !isConnected && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Connect your wallet to vote on this milestone
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default MilestonesList;
