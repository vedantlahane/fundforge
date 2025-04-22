import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MailLayout';
import Button from '../components/common/Button';
import ProjectList from '../features/projects/components/ProjectList';  

// Mock data for demonstration
const MOCK_PROJECTS = [
  {
    id: 1,
    title: 'Decentralized Renewable Energy Grid',
    description: 'Building a peer-to-peer energy trading platform that allows homeowners with solar panels to sell excess energy to neighbors.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    goal: 50,
    raised: 32,
    backers: 18,
    daysLeft: 12
  },
  {
    id: 2,
    title: 'Community-Owned Vertical Farm',
    description: 'Creating an urban vertical farm owned and operated by the community, providing fresh produce to local residents.',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    goal: 75,
    raised: 45,
    backers: 32,
    daysLeft: 20
  },
  {
    id: 3,
    title: 'Open Source Medical Devices',
    description: 'Developing affordable, open-source medical devices for underserved communities around the world.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    goal: 100,
    raised: 68,
    backers: 42,
    daysLeft: 15
  }
];

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch projects
    setTimeout(() => {
      setFeaturedProjects(MOCK_PROJECTS);
      setLoading(false);
    }, 1000);
  }, []);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
              Fund the future with blockchain
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Fundforge is a decentralized crowdfunding platform that connects innovative projects with backers. No intermediaries, lower fees, complete transparency.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/explore">
                <Button variant="secondary" size="lg">
                  Explore Projects
                </Button>
              </Link>
              <Link to="/create">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">
                  Start a Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
            <Link to="/explore" className="text-blue-600 hover:text-blue-800 font-medium">
              View all projects →
            </Link>
          </div>
          
          <ProjectList projects={featuredProjects} loading={loading} />
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fundforge uses blockchain technology to create a transparent and efficient crowdfunding experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create a Project</h3>
              <p className="text-gray-600">
                Define your funding goals, project milestones, and rewards for backers. Deploy your project to the blockchain.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Funded</h3>
              <p className="text-gray-600">
                Backers contribute cryptocurrency directly to your project. Track funding progress in real-time on the blockchain.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Milestones</h3>
              <p className="text-gray-600">
                Funds are released as you complete project milestones. Backers vote to approve progress, ensuring accountability.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to bring your idea to life?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join the decentralized crowdfunding revolution. Create your project today and connect with backers who believe in your vision.
          </p>
          <Link to="/create">
            <Button variant="secondary" size="lg">
              Start Your Project
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
