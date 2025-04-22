import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import ProjectList from '../features/projects/components/ProjectList';
import { useWallet } from '../contexts/WalletContext';
import { getAllProjects } from '../services/blockchain/thirdweb';

export default function ExploreProjectsPage() {
  const { signer } = useWallet();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!signer) return;
      
      try {
        setLoading(true);
        const projectsData = await getAllProjects(signer);
        setProjects(projectsData);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [signer]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">Explore Projects</h2>
        
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <ProjectList projects={projects} loading={loading} />
      </div>
    </MainLayout>
  );
}
