// Mock Data for Foodie Intelligence System

export const summaryMetrics = {
  totalOrders: 12847,
  totalCustomers: 3256,
  totalRestaurants: 487,
  averageOrderValue: 245.50,
  totalRevenue: 3156234
};

export const topRestaurants = [
  { id: 1, name: 'Pizza Paradise', orders: 1245, revenue: 285600 },
  { id: 2, name: 'Sushi Master', orders: 987, revenue: 312450 },
  { id: 3, name: 'Burger Bliss', orders: 876, revenue: 195600 },
  { id: 4, name: 'Tikka House', orders: 765, revenue: 187500 },
  { id: 5, name: 'Noodle Heaven', orders: 698, revenue: 156800 },
  { id: 6, name: 'Taco Tuesday', orders: 612, revenue: 142800 },
  { id: 7, name: 'Pasta Perfetto', orders: 543, revenue: 128700 },
  { id: 8, name: 'Dragon Wok', orders: 521, revenue: 117000 }
];

export const ordersByCity = [
  { city: 'New York', orders: 2456 },
  { city: 'Los Angeles', orders: 2145 },
  { city: 'Chicago', orders: 1876 },
  { city: 'Houston', orders: 1654 },
  { city: 'Phoenix', orders: 1345 },
  { city: 'Philadelphia', orders: 987 },
  { city: 'San Antonio', orders: 765 }
];

export const ordersByHour = [
  { hour: '08:00', orders: 145 },
  { hour: '09:00', orders: 198 },
  { hour: '10:00', orders: 256 },
  { hour: '11:00', orders: 378 },
  { hour: '12:00', orders: 612 },
  { hour: '13:00', orders: 548 },
  { hour: '14:00', orders: 432 },
  { hour: '15:00', orders: 321 },
  { hour: '16:00', orders: 287 },
  { hour: '17:00', orders: 456 },
  { hour: '18:00', orders: 734 },
  { hour: '19:00', orders: 856 },
  { hour: '20:00', orders: 923 },
  { hour: '21:00', orders: 801 },
  { hour: '22:00', orders: 567 }
];

export const ordersByDay = [
  { day: 'Monday', orders: 1456 },
  { day: 'Tuesday', orders: 1587 },
  { day: 'Wednesday', orders: 1634 },
  { day: 'Thursday', orders: 1721 },
  { day: 'Friday', orders: 2087 },
  { day: 'Saturday', orders: 2345 },
  { day: 'Sunday', orders: 2017 }
];

export const discountComparison = [
  { category: 'With Discount', avgValue: 198.50 },
  { category: 'No Discount', avgValue: 287.30 }
];

export const topCustomers = [
  { id: 1, name: 'John Smith', orders: 87, spending: 21345.50 },
  { id: 2, name: 'Sarah Johnson', orders: 76, spending: 18650.25 },
  { id: 3, name: 'Mike Davis', orders: 65, spending: 15876.00 },
  { id: 4, name: 'Emily Wilson', orders: 54, spending: 13456.75 },
  { id: 5, name: 'David Brown', orders: 48, spending: 11876.50 },
  { id: 6, name: 'Jennifer Lee', orders: 42, spending: 10345.25 },
  { id: 7, name: 'Robert Taylor', orders: 38, spending: 9234.00 },
  { id: 8, name: 'Amanda Garcia', orders: 35, spending: 8567.50 }
];

export const customerSegments = [
  { 
    id: 1,
    name: 'Premium',
    description: 'High-value customers with frequent orders',
    count: 245,
    avgSpending: 3456.50,
    color: '#FF6B35'
  },
  { 
    id: 2,
    name: 'Regular',
    description: 'Consistent customers with moderate spending',
    count: 1256,
    avgSpending: 876.25,
    color: '#F7931E'
  },
  { 
    id: 3,
    name: 'Occasional',
    description: 'Customers with sporadic orders',
    count: 1345,
    avgSpending: 234.75,
    color: '#FDB913'
  },
  { 
    id: 4,
    name: 'New',
    description: 'Recently acquired customers',
    count: 410,
    avgSpending: 145.50,
    color: '#FDBF57'
  }
];

export const spendingCategory = [
  { name: 'High Spender', value: 32, color: '#FF6B35' },
  { name: 'Medium Spender', value: 48, color: '#F7931E' },
  { name: 'Low Spender', value: 20, color: '#FDB913' }
];

export const frequencyCategory = [
  { name: 'High Frequency', value: 28, color: '#FF6B35' },
  { name: 'Medium Frequency', value: 52, color: '#F7931E' },
  { name: 'Low Frequency', value: 20, color: '#FDB913' }
];

export const restaurantPerformance = [
  {
    id: 1,
    name: 'Pizza Paradise',
    rating: 4.8,
    orders: 1245,
    revenue: 285600,
    avgOrderValue: 229.50,
    trend: 'up'
  },
  {
    id: 2,
    name: 'Sushi Master',
    rating: 4.9,
    orders: 987,
    revenue: 312450,
    avgOrderValue: 316.67,
    trend: 'up'
  },
  {
    id: 3,
    name: 'Burger Bliss',
    rating: 4.5,
    orders: 876,
    revenue: 195600,
    avgOrderValue: 223.29,
    trend: 'down'
  },
  {
    id: 4,
    name: 'Tikka House',
    rating: 4.7,
    orders: 765,
    revenue: 187500,
    avgOrderValue: 245.10,
    trend: 'up'
  },
  {
    id: 5,
    name: 'Noodle Heaven',
    rating: 4.6,
    orders: 698,
    revenue: 156800,
    avgOrderValue: 224.64,
    trend: 'stable'
  },
  {
    id: 6,
    name: 'Taco Tuesday',
    rating: 4.4,
    orders: 612,
    revenue: 142800,
    avgOrderValue: 233.33,
    trend: 'down'
  }
];

export const recommendedRestaurants = [
  {
    id: 1,
    name: 'Pizza Paradise',
    cuisine: 'Italian',
    rating: 4.8,
    avgDeliveryTime: '25 mins',
    minOrder: 50,
    discount: '20%'
  },
  {
    id: 2,
    name: 'Sushi Master',
    cuisine: 'Japanese',
    rating: 4.9,
    avgDeliveryTime: '30 mins',
    minOrder: 75,
    discount: '15%'
  },
  {
    id: 3,
    name: 'Tikka House',
    cuisine: 'Indian',
    rating: 4.7,
    avgDeliveryTime: '28 mins',
    minOrder: 60,
    discount: '25%'
  }
];

export const recommendedFoods = [
  { 
    id: 1, 
    name: 'Margherita Pizza', 
    restaurant: 'Pizza Paradise',
    price: 120,
    rating: 4.8,
    orders: 645
  },
  { 
    id: 2, 
    name: 'California Roll', 
    restaurant: 'Sushi Master',
    price: 180,
    rating: 4.9,
    orders: 523
  },
  { 
    id: 3, 
    name: 'Butter Chicken', 
    restaurant: 'Tikka House',
    price: 145,
    rating: 4.7,
    orders: 387
  },
  { 
    id: 4, 
    name: 'Pepperoni Pizza', 
    restaurant: 'Pizza Paradise',
    price: 140,
    rating: 4.7,
    orders: 512
  },
  { 
    id: 5, 
    name: 'Dragon Roll', 
    restaurant: 'Sushi Master',
    price: 210,
    rating: 4.8,
    orders: 456
  },
  { 
    id: 6, 
    name: 'Paneer Tikka', 
    restaurant: 'Tikka House',
    price: 95,
    rating: 4.6,
    orders: 298
  }
];

export const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio'
];

export const subzones = {
  'New York': ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'],
  'Los Angeles': ['Downtown LA', 'West LA', 'Santa Monica', 'Long Beach', 'Pasadena'],
  'Chicago': ['Downtown', 'Lincoln Park', 'Logan Square', 'Wicker Park', 'Ukrainian Village'],
  'Houston': ['Downtown', 'Midtown', 'Uptown', 'Museum District', 'Medical Center'],
  'Phoenix': ['Downtown', 'Tempe', 'Chandler', 'Scottsdale', 'Mesa'],
  'Philadelphia': ['Center City', 'Old City', 'Rittenhouse', 'Fishtown', 'South Philly'],
  'San Antonio': ['Downtown', 'River Walk', 'North Star', 'Medical Center', 'Pearl District']
};

export const hours = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
];

export const spendingCategories = ['High Spender', 'Medium Spender', 'Low Spender'];
export const frequencyCategories = ['High Frequency', 'Medium Frequency', 'Low Frequency'];
