import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import {
  HomePage,
  ProjectsPage,
  ProjectDetailPage,
  CreateProjectPage,
  DashboardPage,
} from "@/pages"

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="fundforge-theme">
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
    </BrowserRouter>
  )
}

export default App
