import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Target, 
  Users, 
  TrendingUp, 
  Share2, 
  Heart,
  Flag,
  CheckCircle,
  Clock,
  DollarSign,
  MessageCircle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import ContributeModal from '../components/campaign/ContributeModal';
import MilestonesList from '../components/campaign/MilestonesList';
import { useWeb3 } from '../contexts/Web3Context';
import toast from 'react-hot-toast';

const CampaignDetails: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const { isConnected, web3, createCampaignContract } = useWeb3();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [userContribution, setUserContribution] = useState('0');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (address) {
      loadCampaignDetails();
    }
  }, [address]);

  const loadCampaignDetails = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      const mockCampaign = {
        address: address,
        title: 'Revolutionary VR Gaming Platform',
        description: 'We are building the next generation of immersive gaming experiences using cutting-edge VR technology combined with blockchain integration. This platform will allow players to truly own their in-game assets and trade them across multiple games.\n\nOur team has been working on VR technology for over 5 years and has developed proprietary algorithms for reducing motion sickness and improving visual fidelity. With your support, we can bring this revolutionary platform to market and change the gaming industry forever.',
        category: 'Technology',
        goal: '50',
        raised: '32.5',
        deadline: '2024-08-15',
        contributors: 156,
        creator: '0xabc123...',
        imageHash: 'QmHash1',
        status: 'active',
        milestones: [
          {
            id: 0,
            title: 'MVP Development',
            description: 'Complete the minimum viable product with basic VR functionality',
            amount: '15',
            approved: true,
            released: true,
            votesFor: '25.5',
            votesAgainst: '2.3',
          },
          {
            id: 1,
            title: 'Beta Testing',
            description: 'Conduct extensive beta testing with 1000+ users',
            amount: '10',
            approved: false,
            released: false,
            votesFor: '18.2',
            votesAgainst: '8.1',
          },
          {
            id: 2,
            title: 'Platform Launch',
            description: 'Official platform launch with marketing campaign',
            amount: '25',
            approved: false,
            released: false,
            votesFor: '0',
            votesAgainst: '0',
          },
        ],
        updates: [
          {
            id: 1,
            title: 'Development Update #3',
            content: 'Great progress on the VR engine! We have successfully implemented the new rendering pipeline...',
            timestamp: '2024-07-20',
          },
        ],
      };

      setCampaign(mockCampaign);
    } catch (error) {
      console.error('Error loading campaign:', error);
      toast.error('Failed to load campaign details');
    } finally {
      setLoading(false);
    }
  };

  const handleContribute = async (amount: string) => {
    if (!isConnected || !web3) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      const campaignContract = createCampaignContract(address!);
      const amountWei = web3.utils.toWei(amount, 'ether');
      
      await campaignContract.methods.contribute().send({
        from: account,
        value: amountWei,
      });

      toast.success('Contribution successful!');
      setShowContributeModal(false);
      loadCampaignDetails();
    } catch (error) {
      console.error('Contribution failed:', error);
      toast.error('Contribution failed');
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="space-y-4">
            <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Campaign Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The campaign you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/explore">
          <Button>Browse Campaigns</Button>
        </Link>
      </div>
    );
  }

  const progress = (parseFloat(campaign.raised) / parseFloat(campaign.goal)) * 100;
  const daysLeft = Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isExpired = daysLeft <= 0;

  return (
    <div className="space-y-6">
      {/* Campaign Hero */}
      <Card padding="none" className="overflow-hidden">
        <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
          {campaign.imageHash && (
            <img
              src={`https://ipfs.io/ipfs/${campaign.imageHash}`}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-black bg-opacity-60 px-2 py-1 rounded text-sm">
                  {campaign.category}
                </span>
                {campaign.status === 'active' && !isExpired && (
                  <span className="bg-green-500 px-2 py-1 rounded text-sm">
                    Active
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
              <p className="text-lg opacity-90">
                by {campaign.creator.slice(0, 6)}...{campaign.creator.slice(-4)}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Navigation Tabs */}
          <Card padding="none">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'milestones', label: 'Milestones' },
                  { id: 'updates', label: 'Updates' },
                  { id: 'comments', label: 'Comments' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                    {campaign.description}
                  </div>
                </div>
              )}

              {activeTab === 'milestones' && (
                <MilestonesList 
                  milestones={campaign.milestones}
                  campaignAddress={campaign.address}
                />
              )}

              {activeTab === 'updates' && (
                <div className="space-y-4">
                  {campaign.updates.map((update) => (
                    <div key={update.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {update.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {update.content}
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(update.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'comments' && (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Comments feature coming soon
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Funding Progress */}
          <Card>
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {campaign.raised} ETH
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                raised of {campaign.goal} ETH goal
              </div>
            </div>

            <ProgressBar 
              value={parseFloat(campaign.raised)} 
              max={parseFloat(campaign.goal)} 
              className="mb-6"
            />

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {campaign.contributors}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Backers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isExpired ? 0 : daysLeft}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Days left
                </div>
              </div>
            </div>

            {!isExpired && (
              <div className="space-y-3">
                <Button 
                  className="w-full"
                  onClick={() => setShowContributeModal(true)}
                  disabled={!isConnected}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Back this project
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            )}

            {isExpired && (
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <Clock className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="text-red-700 dark:text-red-300 font-medium">
                  Campaign Ended
                </div>
                <div className="text-sm text-red-600 dark:text-red-400 mt-1">
                  This campaign has ended and is no longer accepting contributions.
                </div>
              </div>
            )}
          </Card>

          {/* Campaign Stats */}
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Campaign Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Created</span>
                <span className="text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Deadline</span>
                <span className="text-gray-900 dark:text-white">
                  {new Date(campaign.deadline).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
                <span className="text-gray-900 dark:text-white">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Contract</span>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-mono">
                  {campaign.address.slice(0, 6)}...{campaign.address.slice(-4)}
                </span>
              </div>
            </div>
          </Card>

          {/* Creator Info */}
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Creator
            </h3>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {campaign.creator.slice(2, 4).toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {campaign.creator.slice(0, 6)}...{campaign.creator.slice(-4)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Campaign Creator
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                View Profile
              </Button>
              <Button variant="outline" size="sm">
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Contribute Modal */}
      {showContributeModal && (
        <ContributeModal
          campaign={campaign}
          onContribute={handleContribute}
          onClose={() => setShowContributeModal(false)}
        />
      )}
    </div>
  );
};

export default CampaignDetails;
