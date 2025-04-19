// Dashboard mock data
export const revenueData = [
  { month: 'Jan', revenue: 12500, target: 10000, lastYear: 9800 },
  { month: 'Feb', revenue: 13250, target: 11000, lastYear: 10400 },
  { month: 'Mar', revenue: 14800, target: 12000, lastYear: 11500 },
  { month: 'Apr', revenue: 16200, target: 13000, lastYear: 12300 },
  { month: 'May', revenue: 18900, target: 14000, lastYear: 13500 },
  { month: 'Jun', revenue: 21500, target: 15000, lastYear: 14900 },
  { month: 'Jul', revenue: 24800, target: 16000, lastYear: 16200 },
  { month: 'Aug', revenue: 22400, target: 17000, lastYear: 17800 },
  { month: 'Sep', revenue: 26900, target: 18000, lastYear: 19500 },
  { month: 'Oct', revenue: 29300, target: 19000, lastYear: 20100 },
  { month: 'Nov', revenue: 31800, target: 20000, lastYear: 22000 },
  { month: 'Dec', revenue: 34500, target: 22000, lastYear: 25000 },
];

export const revenueByChannel = [
  { channel: 'Online Store', value: 42 },
  { channel: 'Marketplace', value: 28 },
  { channel: 'Social Media', value: 16 },
  { channel: 'Retail Partners', value: 14 },
];

export const productPerformance = [
  { 
    id: 1,
    name: 'Premium Headphones',
    sales: 1245,
    revenue: 124500,
    growth: 12.5,
    category: 'Electronics',
    image: '/images/products/headphones.png',
  },
  { 
    id: 2,
    name: 'Fitness Tracker',
    sales: 986,
    revenue: 98600,
    growth: 8.2,
    category: 'Wearables',
    image: '/images/products/tracker.png',
  },
  { 
    id: 3,
    name: 'Bluetooth Speaker',
    sales: 879,
    revenue: 87900,
    growth: -2.1,
    category: 'Electronics',
    image: '/images/products/speaker.png',
  },
  { 
    id: 4,
    name: 'Smart Watch',
    sales: 654,
    revenue: 65400,
    growth: 15.8,
    category: 'Wearables',
    image: '/images/products/watch.png',
  },
  { 
    id: 5,
    name: 'Wireless Earbuds',
    sales: 542,
    revenue: 54200,
    growth: 18.5,
    category: 'Electronics',
    image: '/images/products/earbuds.png',
  },
];

export const salesByRegion = [
  { region: 'North America', sales: 42500, target: 45000 },
  { region: 'Europe', sales: 38700, target: 35000 },
  { region: 'Asia Pacific', sales: 31200, target: 30000 },
  { region: 'Latin America', sales: 18500, target: 20000 },
  { region: 'Africa', sales: 12800, target: 15000 },
];

export const customerSegments = [
  { segment: 'New Customers', count: 1245, percentage: 32 },
  { segment: 'Returning', count: 1876, percentage: 48 },
  { segment: 'Loyal', count: 780, percentage: 20 },
];

export const kpiSummary = {
  totalRevenue: 430650,
  revenueGrowth: 12.4,
  totalSales: 4306,
  salesGrowth: 8.7,
  averageOrderValue: 100.01,
  aovGrowth: 3.2,
  conversionRate: 3.2,
  conversionGrowth: 0.3,
};

export const recentTransactions = [
  { id: 'T-1001', customer: 'John Smith', amount: 346.9, date: '2023-04-18T09:12:00', status: 'completed' },
  { id: 'T-1002', customer: 'Emily Johnson', amount: 125.5, date: '2023-04-18T10:23:00', status: 'completed' },
  { id: 'T-1003', customer: 'Michael Brown', amount: 89.9, date: '2023-04-18T10:45:00', status: 'processing' },
  { id: 'T-1004', customer: 'Sarah Wilson', amount: 432.1, date: '2023-04-18T11:02:00', status: 'completed' },
  { id: 'T-1005', customer: 'David Taylor', amount: 58.3, date: '2023-04-18T11:45:00', status: 'failed' },
];

export const productCategories = [
  'Electronics',
  'Wearables',
  'Home',
  'Accessories',
  'Audio',
  'Gaming',
  'Office',
];

export const timeRanges = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'Year to Date', value: 'ytd' },
  { label: 'Last 12 months', value: '12m' },
  { label: 'All Time', value: 'all' },
]; 