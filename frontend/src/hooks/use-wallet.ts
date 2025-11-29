import { useState, useEffect } from "react"

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState("0.00")
  const [network, setNetwork] = useState("ethereum")

  useEffect(() => {
    // Check if wallet is already connected
    const savedAddress = localStorage.getItem("wallet_address")
    if (savedAddress) {
      setIsConnected(true)
      setAddress(savedAddress)
      setBalance("2.45") // Mock balance
    }
  }, [])

  const connect = async () => {
    try {
      // Mock wallet connection
      const mockAddress = "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e"
      setAddress(mockAddress)
      setIsConnected(true)
      setBalance("2.45")
      localStorage.setItem("wallet_address", mockAddress)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance("0.00")
    localStorage.removeItem("wallet_address")
  }

  const switchNetwork = (networkId: string) => {
    setNetwork(networkId)
  }

  return {
    isConnected,
    address,
    balance,
    network,
    connect,
    disconnect,
    switchNetwork,
  }
}
