import { DashboardTabs } from "@/components/dashboard-tabs"
import { WalletConnection } from "@/components/wallet-connection"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your projects and contributions</p>
        </div>
        <WalletConnection />
      </div>

      <DashboardTabs />
    </div>
  )
}
