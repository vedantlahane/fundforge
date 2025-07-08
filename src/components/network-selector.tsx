import React, { type JSX } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Network {
  id: string;
  name: string;
  chainId: number;
  color: string;
}

const networks: Network[] = [
  { id: "ethereum", name: "Ethereum", chainId: 1, color: "bg-blue-500" },
  { id: "polygon", name: "Polygon", chainId: 137, color: "bg-purple-500" },
  { id: "bsc", name: "BSC", chainId: 56, color: "bg-yellow-500" },
];

interface NetworkSelectorProps {
  currentNetwork: string;
  onNetworkChange: (network: string) => void;
}

export function NetworkSelector({ currentNetwork, onNetworkChange }: NetworkSelectorProps): JSX.Element {
  const selectedNetwork = networks.find((n) => n.id === currentNetwork);

  return (
    <Select value={currentNetwork} onValueChange={onNetworkChange}>
      <SelectTrigger className="w-32">
        <div className="flex items-center gap-2">
          {selectedNetwork && <div className={`w-2 h-2 rounded-full ${selectedNetwork.color}`} />}
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {networks.map((network) => (
          <SelectItem key={network.id} value={network.id}>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${network.color}`} />
              {network.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default NetworkSelector;
