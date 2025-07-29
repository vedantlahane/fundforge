import React from 'react';
import { TrendingUp } from 'lucide-react';
import CampaignCard from './CampaignCard';

interface Campaign {
  address: string;
  title: string;
  description: string;
  goal: string;
  raised: string;
  deadline: string;
  contributors: number;
  category: string;
  creator: string;
  imageHash?: string;
  featured?: boolean;
}

interface CampaignGridProps {
  campaigns: Campaign[];
  loading?: boolean;
  emptyMessage?: string;
}

const CampaignGrid: React.FC<CampaignGridProps> = ({
  campaigns,
  loading = false,
  emptyMessage = "No campaigns found"
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-t-xl"></div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-b-xl">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
              <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Be the first to launch a campaign or check back later for new projects.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.address}
          {...campaign}
        />
      ))}
    </div>
  );
};

export default CampaignGrid;

