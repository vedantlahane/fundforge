export default function Button({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    size = 'md',
    fullWidth = false,
    disabled = false,
    className = ''
  }) {
    const baseClasses = 'rounded-md font-medium focus:outline-none transition-colors';
    
    const variantClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      success: 'bg-green-600 hover:bg-green-700 text-white',
      danger: 'bg-red-600 hover:bg-red-700 text-white',
      outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50'
    };
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };
    
    const widthClass = fullWidth ? 'w-full' : '';
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
    
    const buttonClasses = `
      ${baseClasses}
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${widthClass}
      ${disabledClass}
      ${className}
    `;
    
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={buttonClasses}
      >
        {children}
      </button>
    );
  }
  