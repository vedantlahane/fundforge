import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Rocket,
  ArrowRight,
  Star,
  Shield,
  Zap
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import CampaignGrid from '../components/campaign/CampaignGrid';
import { useWeb3 } from '../contexts/Web3Context';

const Home: React.FC = () => {
  const { isConnected } = useWeb3();
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const [stats, setStats] = useState({
    totalCampaigns: 156,
    totalFunded: '1,234',
    successRate: 87,
    totalUsers: '5,432'
  });

  const features = [
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Your funds are secured by smart contracts on Ethereum, ensuring transparency and trust.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Milestone-based funding with community voting ensures projects deliver on their promises.'
    },
    {
      icon: Zap,
      title: 'Instant Transactions',
      description: 'Fast, global payments with low fees using cryptocurrency and Web3 technology.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 -z-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Fund the{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Future
              </span>
              {' '}with Blockchain
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Launch your project with transparent, secure, and community-driven crowdfunding. 
              Powered by Ethereum smart contracts for maximum trust and accountability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className="w-full sm:w-auto">
                  <Rocket className="w-5 h-5 mr-2" />
                  Explore Projects
                </Button>
              </Link>
              <Link to="/create">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Start a Campaign
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalCampaigns}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Campaigns
            </div>
          </Card>
          
          <Card className="text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalFunded} ETH
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Funded
            </div>
          </Card>
          
          <Card className="text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.successRate}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Success Rate
            </div>
          </Card>
          
          <Card className="text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalUsers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Active Users
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Fund Forge?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the next generation of crowdfunding with blockchain technology,
            ensuring transparency, security, and community governance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center" hover>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Campaigns */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Campaigns
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover innovative projects making a difference
            </p>
          </div>
          <Link to="/explore">
            <Button variant="outline">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        <CampaignGrid 
          campaigns={featuredCampaigns} 
          loading={false}
          emptyMessage="No featured campaigns at the moment"
        />
      </section>

      {/* CTA Section */}
      {!isConnected && (
        <section className="relative">
          <Card className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white" padding="lg">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Connect your wallet to explore campaigns, contribute to projects, 
              or launch your own revolutionary idea.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Connect Wallet
            </Button>
          </Card>
        </section>
      )}
    </div>
  );
};

export default Home;
