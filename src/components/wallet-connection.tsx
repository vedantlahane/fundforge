import { type JSX } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";
import { NetworkSelector } from "@/components/network-selector";

export function WalletConnection(): JSX.Element {
  const { isConnected, address, balance, network, connect, disconnect, switchNetwork } = useWallet();

  const formatAddress = (addr: string): string => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = async (): Promise<void> => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
        // Optional: Add toast notification here
      } catch (error) {
        console.error("Failed to copy address:", error);
      }
    }
  };

  if (!isConnected) {
    return (
      <Button onClick={connect} className="flex items-center gap-2">
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <NetworkSelector currentNetwork={network} onNetworkChange={switchNetwork} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">{formatAddress(address!)}</span>
            <Badge variant="secondary" className="hidden sm:inline">
              {balance} ETH
            </Badge>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={copyAddress}>
            <Copy className="w-4 h-4 mr-2" />
            Copy Address
          </DropdownMenuItem>

          <DropdownMenuItem>
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Explorer
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={disconnect} className="text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default WalletConnection;
