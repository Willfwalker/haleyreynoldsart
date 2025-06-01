export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'stickers' | 'bookmarks' | 'paintings';
  images: string[];
  inventory: number;
  featured: boolean;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  dimensions?: string;
  materials?: string;
  tags?: string[];
  details?: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentIntentId: string;
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
}

export interface Address {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Commission {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  description: string;
  budget: number;
  timeline: string;
  referenceImages?: string[];
  status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'cancelled';
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}
