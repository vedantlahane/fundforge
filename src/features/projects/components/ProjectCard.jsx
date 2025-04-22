import { Link } from 'react-router-dom';
import Card, { CardBody, CardFooter } from '../../../components/common/Card';

export default function ProjectCard({ project }) {
  // Calculate progress percentage
  const progress = (project.raised / project.goal) * 100;
  
  return (
    <Card className="h-full flex flex-col">
      <img 
        src={project.image || 'https://via.placeholder.com/400x200'} 
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      
      <CardBody className="flex-grow">
        <h3 className="text-xl font-semibold mb-2">
          <Link to={`/project/${project.id}`} className="hover:text-blue-600">
            {project.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span className="font-medium">{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${Math.min(100, progress)}%` }}
            ></div>
          </div>
        </div>
      </CardBody>
      
      <CardFooter className="bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Raised</p>
            <p className="font-medium">{project.raised} MATIC</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Goal</p>
            <p className="font-medium">{project.goal} MATIC</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
