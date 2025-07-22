import { Product } from '@/contexts/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'Flyknit Shoe for Men',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.3,
    reviews: 100,
    category: 'shoes',
    colors: ['Blue', 'White', 'Grey', 'Red'],
    sizes: ['7', '8', '9', '10', '11'],
    description: 'Comfortable flyknit sneakers perfect for daily wear and sports activities.'
  },
  {
    id: '2',
    name: 'Tripod DSLR Camera',
    price: 899,
    originalPrice: 999,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviews: 1299,
    category: 'electronics',
    description: 'Professional tripod perfect for DSLR cameras and photography.'
  },
  {
    id: '3',
    name: 'Casual Black T-shirt',
    price: 620,
    originalPrice: 720,
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: 1089,
    category: 'clothes',
    colors: ['Black', 'White', 'Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Premium quality casual t-shirt made from 100% cotton.'
  },
  {
    id: '4',
    name: 'Apple Watch Series 9',
    price: 699,
    originalPrice: 799,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviews: 892,
    category: 'watch',
    description: 'Latest Apple Watch with advanced health monitoring features.'
  },
  {
    id: '8',
    name: 'Samsung Galaxy Watch',
    price: 399,
    originalPrice: 499,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    reviews: 567,
    category: 'watch',
    description: 'Smart watch with fitness tracking and long battery life.'
  },
  {
    id: '9',
    name: 'Classic Analog Watch',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviews: 234,
    category: 'watch',
    description: 'Elegant classic watch perfect for formal occasions.'
  },
  {
    id: '5',
    name: 'White Fly Knit Casual Shoe',
    price: 699,
    originalPrice: 799,
    image: 'https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviews: 456,
    category: 'shoes',
    colors: ['White', 'Black', 'Grey'],
    sizes: ['7', '8', '9', '10', '11'],
    description: 'Lightweight and comfortable casual sneakers for everyday wear.'
  },
  {
    id: '6',
    name: 'Red Color Casual Shoe',
    price: 899,
    originalPrice: 999,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    reviews: 324,
    category: 'shoes',
    colors: ['Red', 'Blue', 'Black'],
    sizes: ['7', '8', '9', '10', '11'],
    description: 'Stylish red casual shoes perfect for making a statement.'
  },
  {
    id: '7',
    name: 'Leather Handbag',
    price: 459,
    originalPrice: 599,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviews: 234,
    category: 'bags',
    colors: ['Brown', 'Black', 'Tan'],
    description: 'Premium leather handbag perfect for everyday use and professional settings.'
  },
  {
    id: '10',
    name: 'Canvas Backpack',
    price: 189,
    originalPrice: 249,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.3,
    reviews: 156,
    category: 'bags',
    colors: ['Navy', 'Grey', 'Black'],
    description: 'Durable canvas backpack ideal for travel and daily commute.'
  },
  {
    id: '11',
    name: 'Designer Tote Bag',
    price: 329,
    originalPrice: 429,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviews: 189,
    category: 'bags',
    colors: ['Beige', 'Black', 'White'],
    description: 'Elegant designer tote bag perfect for shopping and work.'
  },
  {
    id: '12',
    name: 'Travel Duffel Bag',
    price: 279,
    originalPrice: 349,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    reviews: 167,
    category: 'bags',
    colors: ['Black', 'Navy', 'Grey'],
    description: 'Spacious travel duffel bag with multiple compartments for weekend trips.'
  }
];

export const categories = [
  { id: 'popular', name: 'Popular', icon: 'star' },
  { id: 'clothes', name: 'Clothes', icon: 'shirt' },
  { id: 'shoes', name: 'Shoes', icon: 'shoe' },
  { id: 'bags', name: 'Bags', icon: 'bag' },
  { id: 'watch', name: 'Watch', icon: 'clock' }
];