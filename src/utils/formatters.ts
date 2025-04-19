// Format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Format percentage
export const formatPercent = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};

// Format large numbers with abbreviations (K, M, B)
export const formatCompactNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};

// Format date to readable string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};

// Calculate percent change between two values
export const calculatePercentChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
};

// Get trend indicator (up, down, or neutral)
export const getTrendIndicator = (value: number): 'up' | 'down' | 'neutral' => {
  if (value > 0) return 'up';
  if (value < 0) return 'down';
  return 'neutral';
};

// Format number with thousands separators
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
}; 