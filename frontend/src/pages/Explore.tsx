import React, { useState, useEffect } from 'react';
import { Search, Filter, SortAsc, Grid, List } from 'lucide-react';
import CampaignGrid from '../components/campaign/CampaignGrid';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useWeb3 } from '../contexts/Web3Context';

const Explore: React.FC = () => {
  const { factoryContract } = useWeb3();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All', 'Technology', 'Art', 'Games', 'Music', 'Film', 
    'Education', 'Community', 'Business', 'Health', 'Environment'
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'goal_high', label: 'Highest Goal' },
    { value: 'goal_low', label: 'Lowest Goal' },
    { value: 'funded', label: 'Most Funded' },
    { value: 'popular', label: 'Most Popular' },
  ];

  useEffect(() => {
    loadCampaigns();
  }, [factoryContract]);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      // Load campaigns from factory contract
      // This is a placeholder - implement actual contract call
      const mockCampaigns = [
        {
          address: '0x123...',
          title: 'Revolutionary VR Gaming Platform',
          description: 'Building the future of immersive gaming experiences with blockchain integration.',
          goal: '50',
          raised: '32.5',
          deadline: '2024-08-15',
          contributors: 156,
          category: 'Technology',
          creator: '0xabc...',
          imageHash: 'QmHash1',
          featured: true,
        },
        // Add more mock campaigns...
      ];
      setCampaigns(mockCampaigns);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || 
                           campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Explore Campaigns
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Discover innovative projects seeking funding
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card padding="md">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category === 'All' ? '' : category}>
                {category}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Funding Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="funded">Fully Funded</option>
                  <option value="ended">Ended</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Goal Range (ETH)
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">Any Amount</option>
                  <option value="0-10">0 - 10 ETH</option>
                  <option value="10-50">10 - 50 ETH</option>
                  <option value="50-100">50 - 100 ETH</option>
                  <option value="100+">100+ ETH</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Remaining
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">All</option>
                  <option value="1">Less than 1 day</option>
                  <option value="7">Less than 1 week</option>
                  <option value="30">Less than 1 month</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredCampaigns.length} campaigns
        </p>
      </div>

      {/* Campaigns */}
      <CampaignGrid 
        campaigns={filteredCampaigns}
        loading={loading}
        emptyMessage="No campaigns match your search criteria"
      />
    </div>
  );
};

export default Explore;
