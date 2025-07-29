import React, { useState, useEffect } from 'react';
import { 
  User, 
  Edit, 
  Copy, 
  ExternalLink,
  Shield,
  Award,
  TrendingUp,
  Users
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useWeb3 } from '../contexts/Web3Context';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { account, isConnected } = useWeb3();
  const [profile, setProfile] = useState({
    verified: false,
    totalCampaigns: 3,
    totalRaised: '45.2',
    totalContributions: '12.8',
    successRate: 67,
    memberSince: '2024-01-15',
    bio: 'Passionate entrepreneur focused on sustainable technology solutions.',
    website: 'https://example.com',
    twitter: '@username',
  });

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      toast.success('Address copied to clipboard');
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center" padding="lg">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Connect your wallet to view and manage your profile.
          </p>
          <Button size="lg">
            Connect Wallet
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {account?.slice(2, 4).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </h1>
                {profile.verified && (
                  <Shield className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <button
                  onClick={copyAddress}
                  className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="text-sm font-mono">{account}</span>
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Member since {new Date(profile.memberSince).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {profile.totalCampaigns}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Campaigns Created
          </div>
        </Card>
        
        <Card className="text-center">
          <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {profile.totalRaised} ETH
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Raised
          </div>
        </Card>
        
        <Card className="text-center">
          <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {profile.totalContributions} ETH
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Contributed
          </div>
        </Card>
        
        <Card className="text-center">
          <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {profile.successRate}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Success Rate
          </div>
        </Card>
      </div>

      {/* Profile Information */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            About
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <p className="text-gray-600 dark:text-gray-300">
                {profile.bio}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website
              </label>
              <a 
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                {profile.website}
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Twitter
              </label>
              <p className="text-gray-600 dark:text-gray-300">
                {profile.twitter}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Verification
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                profile.verified 
                  ? 'bg-green-100 dark:bg-green-900'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                <Shield className={`w-4 h-4 ${
                  profile.verified 
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-400'
                }`} />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Identity Verification
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {profile.verified ? 'Verified' : 'Not verified'}
                </div>
              </div>
            </div>
            
            {!profile.verified && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Get Verified
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-200 mb-3">
                  Increase trust with your supporters by verifying your identity.
                </p>
                <Button size="sm" variant="outline">
                  Start Verification
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Activity */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">
                Created campaign "VR Gaming Platform"
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                2 days ago
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">
                Contributed 2.5 ETH to "Green Energy Project"
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                1 week ago
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
