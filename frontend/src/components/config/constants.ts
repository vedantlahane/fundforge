export const NETWORK_CONFIG = {
  development: {
    chainId: '0x539', // 1337 in hex
    chainName: 'Ganache Local',
    rpcUrl: 'http://localhost:7545',
    blockExplorer: '',
  },
  sepolia: {
    chainId: '0xaa36a7', // 11155111 in hex
    chainName: 'Sepolia Test Network',
    rpcUrl: 'https://sepolia.infura.io/v3/',
    blockExplorer: 'https://sepolia.etherscan.io',
  },
};

export const CONTRACT_ADDRESSES = {
  development: {
    factory: process.env.VITE_FACTORY_ADDRESS_DEV || '',
    governance: process.env.VITE_GOVERNANCE_ADDRESS_DEV || '',
  },
  sepolia: {
    factory: process.env.VITE_FACTORY_ADDRESS_SEPOLIA || '',
    governance: process.env.VITE_GOVERNANCE_ADDRESS_SEPOLIA || '',
  },
};

export const IPFS_CONFIG = {
  gateway: process.env.VITE_IPFS_GATEWAY || 'https://ipfs.io/ipfs/',
  apiUrl: process.env.VITE_IPFS_API_URL || 'https://api.pinata.cloud',
};

export const APP_CONFIG = {
  name: 'Fund Forge',
  description: 'Decentralized Crowdfunding Platform',
  version: '1.0.0',
  supportEmail: 'support@fundforge.io',
  githubUrl: 'https://github.com/fundforge',
  twitterUrl: 'https://twitter.com/fundforge',
  discordUrl: 'https://discord.gg/fundforge',
};
