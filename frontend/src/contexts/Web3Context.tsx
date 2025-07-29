import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import Web3 from 'web3';
import toast from 'react-hot-toast';

// Import your contract ABIs
import CrowdfundingFactoryABI from '../contracts/CrowdfundingFactory.json';
import CampaignABI from '../contracts/Campaign.json';

interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  factoryContract: any | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  loading: boolean;
  networkId: number | null;
  createCampaignContract: (address: string) => any;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

// Contract addresses (update these after deployment)
const FACTORY_ADDRESS = import.meta.env.VITE_FACTORY_ADDRESS || '';
const GANACHE_NETWORK_ID = 1337;
const SEPOLIA_NETWORK_ID = 11155111;

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [factoryContract, setFactoryContract] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [networkId, setNetworkId] = useState<number | null>(null);

  const connectWallet = async () => {
    try {
      setLoading(true);
      
      if (!window.ethereum) {
        toast.error('Please install MetaMask!');
        return;
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3Instance = new Web3(window.ethereum);
      const accounts = await web3Instance.eth.getAccounts();
      const network = await web3Instance.eth.net.getId();

      if (accounts.length > 0) {
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setNetworkId(Number(network));
        setIsConnected(true);
        
        // Check if we're on the correct network
        if (Number(network) !== GANACHE_NETWORK_ID && Number(network) !== SEPOLIA_NETWORK_ID) {
          toast.error('Please connect to Ganache (localhost:7545) or Sepolia testnet');
          return;
        }

        // Initialize factory contract
        if (FACTORY_ADDRESS) {
          const factory = new web3Instance.eth.Contract(CrowdfundingFactoryABI.abi, FACTORY_ADDRESS);
          setFactoryContract(factory);
          toast.success('Wallet connected successfully!');
        } else {
          toast.error('Factory contract address not configured');
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWeb3(null);
    setAccount(null);
    setFactoryContract(null);
    setIsConnected(false);
    setNetworkId(null);
    toast.success('Wallet disconnected');
  };

  const createCampaignContract = (address: string): any => {
    if (!web3) throw new Error('Web3 not connected');
    return new web3.eth.Contract(CampaignABI.abi, address);
  };

  useEffect(() => {
    // Auto-connect if previously connected
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          const accounts = await web3Instance.eth.getAccounts();
          
          if (accounts.length > 0) {
            const network = await web3Instance.eth.net.getId();
            setWeb3(web3Instance);
            setAccount(accounts[0]);
            setNetworkId(Number(network));
            setIsConnected(true);
            
            if (FACTORY_ADDRESS) {
              const factory = new web3Instance.eth.Contract(CrowdfundingFactoryABI.abi, FACTORY_ADDRESS);
              setFactoryContract(factory);
            }
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };

    checkConnection();

    // Listen for account and network changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload(); // Refresh on network change
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3,
        account,
        factoryContract,
        isConnected,
        connectWallet,
        disconnectWallet,
        loading,
        networkId,
        createCampaignContract,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
