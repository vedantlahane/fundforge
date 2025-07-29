import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Target, Users, TrendingUp, MapPin, Clock } from 'lucide-react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';

interface CampaignCardProps {
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

const CampaignCard: React.FC<CampaignCardProps> = ({
  address,
  title,
  description,
  goal,
  raised,
  deadline,
  contributors,
  category,
  creator,
  imageHash,
  featured = false,
}) => {
  const progress = (parseFloat(raised) / parseFloat(goal)) * 100;
  const isExpired = new Date(deadline) < new Date();
  const daysLeft = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Card hover className={`overflow-hidden ${featured ? 'ring-2 ring-blue-500' : ''}`} padding="none">
      {/* Campaign Image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        {imageHash ? (
          <img
            src={`https://ipfs.io/ipfs/${imageHash}`}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <TrendingUp className="h-16 w-16 text-white opacity-80" />
          </div>
        )}
        
        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          <span className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
            {category}
          </span>
          {featured && (
            <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
        </div>
        
        {isExpired && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Expired
          </div>
        )}
        
        {!isExpired && daysLeft <= 7 && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {daysLeft} days left
          </div>
        )}
      </div>

      {/* Campaign Content */}
      <div className="p-6">
        {/* Creator Info */}
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {creator.slice(2, 4).toUpperCase()}
          </div>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            by {formatAddress(creator)}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Progress */}
        <ProgressBar 
          value={parseFloat(raised)} 
          max={parseFloat(goal)} 
          className="mb-4"
        />

        {/* Campaign Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Goal</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {goal} ETH
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Raised</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {raised} ETH
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-purple-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Backers</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {contributors}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Days Left</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {isExpired ? 'Ended' : daysLeft}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link to={`/campaign/${address}`} className="flex-1">
            <Button className="w-full">
              View Campaign
            </Button>
          </Link>
          {!isExpired && (
            <Button variant="outline" size="md" className="px-4">
              <Users className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CampaignCard;
