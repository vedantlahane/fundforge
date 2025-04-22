export default function Card({ children, className = '' }) {
    return (
      <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardHeader({ children, className = '' }) {
    return (
      <div className={`px-6 py-4 border-b ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardBody({ children, className = '' }) {
    return (
      <div className={`px-6 py-4 ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardFooter({ children, className = '' }) {
    return (
      <div className={`px-6 py-4 bg-gray-50 ${className}`}>
        {children}
      </div>
    );
  }
  