export const validateEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const validateAmount = (amount: string): { isValid: boolean; error?: string } => {
  const num = parseFloat(amount);
  
  if (isNaN(num)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }
  
  if (num <= 0) {
    return { isValid: false, error: 'Amount must be greater than 0' };
  }
  
  if (num < 0.001) {
    return { isValid: false, error: 'Minimum amount is 0.001 ETH' };
  }
  
  return { isValid: true };
};

export const validateCampaignForm = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.title || data.title.trim().length < 5) {
    errors.push('Title must be at least 5 characters long');
  }
  
  if (!data.description || data.description.trim().length < 20) {
    errors.push('Description must be at least 20 characters long');
  }
  
  if (!data.category) {
    errors.push('Please select a category');
  }
  
  const amountValidation = validateAmount(data.goal);
  if (!amountValidation.isValid) {
    errors.push(amountValidation.error!);
  }
  
  if (!data.duration || parseInt(data.duration) < 1) {
    errors.push('Campaign duration must be at least 1 day');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};
