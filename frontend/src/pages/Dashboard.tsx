import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  Eye,
  Edit,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import { useWeb3 } from '../contexts/Web3Context';

const Dashboard: React.FC = () => {
  const { isConnected, account } = useWeb3();
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalRaised: '0',
    totalContributions: '0',
    successfulCampaigns: 0,
  });

  useEffect(() => {
    if (isConnected && account) {
      loadDashboardData();
    }
  }, [isConnected, account]);

  const loadDashboardData = async () => {
    // Load user's campaigns and contributions
    // This is placeholder data
    const mockUserCampaigns = [
      {
        address: '0x123...',
        title: 'My Revolutionary App',
        goal: '10',
        raised: '7.5',
        contributors: 23,
        status: 'active',
        deadline: '2024-08-15',
        milestones: 3,
        completedMilestones: 1,
      },
    ];

    const mockContributions = [
      {
        campaignAddress: '0x456...',
        campaignTitle: 'Green Energy Project',
        amount: '2.5',
        timestamp: '2024-07-01',
        rewardTokens: '2500',
      },
    ];

    setUserCampaigns(mockUserCampaigns);
    setContributions(mockContributions);
    setStats({
      totalCampaigns: mockUserCampaigns.length,
      totalRaised: '7.5',
      totalContributions: '2.5',
      successfulCampaigns: 0,
    });
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center" padding="lg">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Connect your wallet to view your dashboard and manage your campaigns.
          </p>
          <Button size="lg">
            Connect Wallet
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage your campaigns and track your contributions
          </p>
        </div>
        <Link to="/create">
          <Button className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {stats.totalCampaigns}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Your Campaigns
          </div>
        </Card>
        
        <Card className="text-center">
          <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {stats.totalRaised} ETH
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Raised
          </div>
        </Card>
        
        <Card className="text-center">
          <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {stats.totalContributions} ETH
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Your Contributions
          </div>
        </Card>
        
        <Card className="text-center">
          <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {stats.successfulCampaigns}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Successful
          </div>
        </Card>
      </div>

      {/* Your Campaigns */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Your Campaigns
          </h2>
          <Link to="/create">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </Link>
        </div>

        {userCampaigns.length === 0 ? (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No campaigns yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your first campaign to start raising funds for your project.
            </p>
            <Link to="/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userCampaigns.map((campaign, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {campaign.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>Goal: {campaign.goal} ETH</span>
                      <span>Raised: {campaign.raised} ETH</span>
                      <span>{campaign.contributors} contributors</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>
                
                <ProgressBar 
                  value={parseFloat(campaign.raised)} 
                  max={parseFloat(campaign.goal)} 
                  className="mb-4"
                />
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Milestones: {campaign.completedMilestones}/{campaign.milestones} completed
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link to={`/campaign/${campaign.address}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Your Contributions */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Your Contributions
        </h2>

        {contributions.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No contributions yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start supporting projects by making your first contribution.
            </p>
            <Link to="/explore">
              <Button>
                Explore Campaigns
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {contributions.map((contribution, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {contribution.campaignTitle}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Contributed: {contribution.amount} ETH
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Reward tokens: {contribution.rewardTokens}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(contribution.timestamp).toLocaleDateString()}
                    </div>
                    <Link to={`/campaign/${contribution.campaignAddress}`}>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Campaign
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
