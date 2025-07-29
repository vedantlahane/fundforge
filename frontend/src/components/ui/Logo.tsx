import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="relative">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
    </div>
  );
};

export default Logo;
