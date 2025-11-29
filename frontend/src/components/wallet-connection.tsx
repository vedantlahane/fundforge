import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut, Check } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"
import { NetworkSelector } from "@/components/network-selector"
import { useState } from "react"

export function WalletConnection() {
  const { isConnected, address, balance, network, connect, disconnect, switchNetwork } = useWallet()
  const [copied, setCopied] = useState(false)

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!isConnected) {
    return (
      <Button onClick={connect} className="gap-2 bg-indigo-600 hover:bg-indigo-700">
        <Wallet className="w-4 h-4" />
        <span className="hidden sm:inline">Connect</span>
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <NetworkSelector currentNetwork={network} onNetworkChange={switchNetwork} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 h-9 px-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-sm">{formatAddress(address!)}</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">Connected Wallet</p>
              <p className="text-xs text-muted-foreground font-mono">{address}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <div className="px-2 py-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Balance</span>
              <span className="font-medium">{balance} ETH</span>
            </div>
          </div>
          
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={copyAddress} className="gap-2">
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Address"}
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2">
            <ExternalLink className="w-4 h-4" />
            View on Explorer
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={disconnect} className="gap-2 text-red-600 focus:text-red-600">
            <LogOut className="w-4 h-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
