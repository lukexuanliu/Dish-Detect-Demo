// This file would contain services for restaurant detection and menu fetching
// For the MVP, we're using mock data, but this would be implemented in a real application

interface Restaurant {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  cuisineType: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
}

/**
 * Gets nearby restaurants based on location
 * In a real implementation, this would use a service like Google Places API
 */
export async function getNearbyRestaurants(
  latitude: number,
  longitude: number,
  radius: number = 1000
): Promise<Restaurant[]> {
  // This is a mock implementation
  console.log(`Getting restaurants near: ${latitude}, ${longitude}, radius: ${radius}m`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data
  return [
    {
      id: '1',
      name: 'Napoli Pizzeria',
      address: '123 Italian Street, New York, NY',
      imageUrl: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg',
      cuisineType: 'Italian',
    },
    {
      id: '2',
      name: 'Thai Delight',
      address: '456 Asian Avenue, New York, NY',
      imageUrl: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
      cuisineType: 'Thai',
    },
    {
      id: '3',
      name: 'Burger Joint',
      address: '789 Burger Lane, New York, NY',
      imageUrl: 'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg',
      cuisineType: 'American',
    }
  ];
}

/**
 * Gets menu items for a specific restaurant
 * In a real implementation, this would use a service like Yelp Fusion API
 */
export async function getRestaurantMenu(restaurantId: string): Promise<MenuItem[]> {
  console.log(`Getting menu for restaurant: ${restaurantId}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data based on restaurant ID
  switch (restaurantId) {
    case '1': // Napoli Pizzeria
      return [
        {
          id: '101',
          name: 'Margherita Pizza',
          description: 'Classic Neapolitan pizza with San Marzano tomato sauce, fresh mozzarella, basil leaves, salt, and extra-virgin olive oil.',
          price: '$14.99',
          imageUrl: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg',
          category: 'Pizza',
        },
        {
          id: '102',
          name: 'Marinara Pizza',
          description: 'Traditional pizza with tomato sauce, garlic, oregano, and olive oil.',
          price: '$12.99',
          imageUrl: 'https://images.pexels.com/photos/6941028/pexels-photo-6941028.jpeg',
          category: 'Pizza',
        },
      ];
    case '2': // Thai Delight
      return [
        {
          id: '201',
          name: 'Chicken Pad Thai',
          description: 'Rice noodles stir-fried with chicken, eggs, bean sprouts, and peanuts.',
          price: '$16.50',
          imageUrl: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg',
          category: 'Noodles',
        },
        {
          id: '202',
          name: 'Green Curry',
          description: 'Thai green curry with coconut milk, vegetables, and your choice of protein.',
          price: '$18.99',
          imageUrl: 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg',
          category: 'Curry',
        },
      ];
    case '3': // Burger Joint
      return [
        {
          id: '301',
          name: 'Classic Beef Burger',
          description: 'Juicy beef patty with lettuce, tomato, onion, and special sauce.',
          price: '$12.99',
          imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
          category: 'Burgers',
        },
        {
          id: '302',
          name: 'Chicken Sandwich',
          description: 'Grilled chicken breast with avocado, bacon, lettuce, and honey mustard.',
          price: '$13.99',
          imageUrl: 'https://images.pexels.com/photos/5409033/pexels-photo-5409033.jpeg',
          category: 'Sandwiches',
        },
      ];
    default:
      return [];
  }
}

export default {
  getNearbyRestaurants,
  getRestaurantMenu
};