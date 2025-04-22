import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./contexts/WalletContext";
import HomePage from "./pages/HomePage";
import CreateProjectPage from "./pages/CreateProjectPage";
import ExploreProjectsPage from "./pages/ExploreProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateProjectPage />} />
          <Route path="/explore" element={<ExploreProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </WalletProvider>
  );
}

export default App;
