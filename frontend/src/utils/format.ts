export const formatAddress = (address: string, length = 6): string => {
  if (!address) return '';
  return `${address.slice(0, length)}...${address.slice(-4)}`;
};

export const formatEther = (wei: string | number, decimals = 4): string => {
  const ether = parseFloat(wei.toString());
  return ether.toFixed(decimals);
};

export const formatTimeRemaining = (deadline: string): string => {
  const now = new Date().getTime();
  const end = new Date(deadline).getTime();
  const diff = end - now;

  if (diff <= 0) return 'Ended';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
  return 'Less than 1 hour left';
};

export const formatCurrency = (amount: number, currency = 'ETH'): string => {
  return `${amount.toLocaleString()} ${currency}`;
};

export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};
