import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

interface Network {
  id: string
  name: string
  shortName: string
  chainId: number
  color: string
}

const networks: Network[] = [
  { id: "ethereum", name: "Ethereum Mainnet", shortName: "ETH", chainId: 1, color: "bg-blue-500" },
  { id: "polygon", name: "Polygon", shortName: "MATIC", chainId: 137, color: "bg-purple-500" },
  { id: "bsc", name: "BNB Chain", shortName: "BNB", chainId: 56, color: "bg-yellow-500" },
]

interface NetworkSelectorProps {
  currentNetwork: string
  onNetworkChange: (network: string) => void
}

export function NetworkSelector({ currentNetwork, onNetworkChange }: NetworkSelectorProps) {
  const selectedNetwork = networks.find((n) => n.id === currentNetwork)

  return (
    <Select value={currentNetwork} onValueChange={onNetworkChange}>
      <SelectTrigger className="w-auto gap-2 h-9 px-3 border-border/50">
        <div className="flex items-center gap-2">
          {selectedNetwork && <div className={`w-2 h-2 rounded-full ${selectedNetwork.color}`} />}
          <span className="text-sm font-medium">{selectedNetwork?.shortName || "Network"}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {networks.map((network) => (
          <SelectItem key={network.id} value={network.id}>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${network.color}`} />
              <span>{network.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
