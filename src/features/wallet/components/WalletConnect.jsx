import { useWallet } from '../../../contexts/WalletContext';
import Button from '../../../components/common/Button/Button';
import LoadingSpinner from '../../../components/ui/LoadingSpinner/LoadingSpinner';

export default function WalletConnect() {
  const { 
    account, 
    chainId, 
    isConnecting, 
    error, 
    connectWallet, 
    disconnectWallet,
    switchToMumbai
  } = useWallet();

  // Mumbai testnet chain ID
  const MUMBAI_CHAIN_ID = 80001;
  
  const isWrongNetwork = account && chainId !== MUMBAI_CHAIN_ID;

  return (
    <div>
      {!account ? (
        <Button
          onClick={connectWallet}
          disabled={isConnecting}
          className="flex items-center"
        >
          {isConnecting ? (
            <>
              <LoadingSpinner size="sm" color="white" className="mr-2" />
              Connecting...
            </>
          ) : (
            'Connect Wallet'
          )}
        </Button>
      ) : isWrongNetwork ? (
        <Button
          onClick={switchToMumbai}
          variant="danger"
          className="flex items-center"
        >
          Switch to Polygon Mumbai
        </Button>
      ) : (
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
      )}
      
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </div>
  );
}
