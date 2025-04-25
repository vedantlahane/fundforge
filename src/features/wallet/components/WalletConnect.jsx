import { useWallet } from '../contexts/WalletContext';

export default function WalletConnect() {
  const { 
    account, 
    isCorrectNetwork, 
    isConnecting, 
    error, 
    connectWallet, 
    disconnectWallet,
    switchToMumbai
  } = useWallet();

  return (
    <div>
      {!account ? (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
        >
          {isConnecting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </>
          ) : (
            'Connect Wallet'
          )}
        </button>
      ) : !isCorrectNetwork ? (
        <button
          onClick={switchToMumbai}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Switch to Polygon Mumbai
        </button>
      ) : (
        <div className="flex items-center">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md mr-2 text-sm">
            {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
          </div>
          <button 
            onClick={disconnectWallet}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm font-medium"
          >
            Disconnect
          </button>
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
