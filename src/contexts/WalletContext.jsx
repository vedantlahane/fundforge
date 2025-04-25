import { createContext, useContext, useState, useEffect } from 'react';
import { checkAndSwitchNetwork } from '../services/blockchain';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  // Check if already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        setAccount(window.ethereum.selectedAddress);
        const networkCheck = await checkAndSwitchNetwork();
        setIsCorrectNetwork(networkCheck);
      }
    };
    
    checkConnection();
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          checkAndSwitchNetwork().then(setIsCorrectNetwork);
        } else {
          setAccount(null);
          setIsCorrectNetwork(false);
        }
      });
      
      window.ethereum.on('chainChanged', () => {
        checkAndSwitchNetwork().then(setIsCorrectNetwork);
      });
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed. Please install MetaMask to use this feature.");
      return;
    }
    
    setIsConnecting(true);
    setError(null);
    
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      
      const networkCheck = await checkAndSwitchNetwork();
      setIsCorrectNetwork(networkCheck);
    } catch (err) {
      setError("Failed to connect wallet. Please try again.");
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsCorrectNetwork(false);
  };

  const switchToMumbai = async () => {
    try {
      const result = await checkAndSwitchNetwork();
      setIsCorrectNetwork(result);
      return result;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const value = {
    account,
    isConnecting,
    isCorrectNetwork,
    error,
    connectWallet,
    disconnectWallet,
    switchToMumbai
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export default function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
