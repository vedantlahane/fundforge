import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Plus, 
  BarChart3, 
  User, 
  Heart,
  TrendingUp,
  Users,
  Settings
} from 'lucide-react';
import { useWeb3 } from '../../contexts/Web3Context';

const Sidebar: React.FC = () => {
  const { isConnected } = useWeb3();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home, current: location.pathname === '/' },
    { name: 'Explore', href: '/explore', icon: Search, current: location.pathname === '/explore' },
    { name: 'Trending', href: '/trending', icon: TrendingUp, current: location.pathname === '/trending' },
    { name: 'Categories', href: '/categories', icon: Users, current: location.pathname === '/categories' },
  ];

  const userNavigation = [
    { name: 'Create Campaign', href: '/create', icon: Plus, current: location.pathname === '/create' },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, current: location.pathname === '/dashboard' },
    { name: 'My Campaigns', href: '/my-campaigns', icon: Heart, current: location.pathname === '/my-campaigns' },
    { name: 'Profile', href: '/profile', icon: User, current: location.pathname === '/profile' },
    { name: 'Settings', href: '/settings', icon: Settings, current: location.pathname === '/settings' },
  ];

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:top-16 lg:bottom-0">
      <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="flex flex-col flex-grow pt-6 pb-4">
          {/* Main Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors ${
                      item.current
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* User Navigation */}
            {isConnected && (
              <div className="mt-8">
                <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  My Account
                </h3>
                <div className="mt-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        item.current
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 transition-colors ${
                          item.current
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        }`}
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Bottom Section */}
          <div className="px-4 mt-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
              <h4 className="text-sm font-semibold mb-2">Launch Your Project</h4>
              <p className="text-xs opacity-90 mb-3">
                Turn your ideas into reality with blockchain-powered crowdfunding.
              </p>
              <Link
                to="/create"
                className="inline-flex items-center text-xs font-medium bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-md transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
