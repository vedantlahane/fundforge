import { useState } from 'react';
import Button from '../../../components/common/Button';

export default function WalletConnect() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  
  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed. Please install MetaMask to use this feature.');
      return;
    }
    
    setIsConnecting(true);
    setError(null);
    
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };
  
  const disconnectWallet = () => {
    setAccount(null);
  };
  
  if (account) {
    return (
      <div className="flex items-center">
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md mr-2 text-sm">
          {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={disconnectWallet}
        >
          Disconnect
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <Button
        onClick={connectWallet}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
      
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </div>
  );
}
