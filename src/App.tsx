import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/sonner"
import HomePage from "@/pages/HomePage"
import ProjectsPage from "@/pages/ProjectsPage"
import ProjectDetailPage from "@/pages/ProjectDetailPage"
import CreateProjectPage from "@/pages/CreateProjectPage"
import DashboardPage from "@/pages/DashboardPage"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="fund-forge-theme">
      <div className="min-h-screen bg-background font-sans antialiased">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/create-project" element={<CreateProjectPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App
