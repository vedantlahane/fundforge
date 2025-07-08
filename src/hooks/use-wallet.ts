import  { useState, useEffect } from "react";

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string;
  network: string;
}

interface WalletHookReturn extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (networkId: string) => void;
}

export function useWallet(): WalletHookReturn {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0.00");
  const [network, setNetwork] = useState<string>("ethereum");

  useEffect(() => {
    // Check if wallet is already connected
    const savedAddress = localStorage.getItem("wallet_address");
    if (savedAddress) {
      setIsConnected(true);
      setAddress(savedAddress);
      setBalance("2.45"); // Mock balance
    }
  }, []);

  const connect = async (): Promise<void> => {
    try {
      // Mock wallet connection
      const mockAddress = "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e";
      setAddress(mockAddress);
      setIsConnected(true);
      setBalance("2.45");
      localStorage.setItem("wallet_address", mockAddress);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnect = (): void => {
    setIsConnected(false);
    setAddress(null);
    setBalance("0.00");
    localStorage.removeItem("wallet_address");
  };

  const switchNetwork = (networkId: string): void => {
    setNetwork(networkId);
  };

  return {
    isConnected,
    address,
    balance,
    network,
    connect,
    disconnect,
    switchNetwork,
  };
}

export default useWallet;
