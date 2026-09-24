export type BadgeType = 'HERO' | 'FAN FAVOURITE' | 'TRENDING' | 'HIDDEN GEM' | 'NEW' | 'SUPPORTING';

export type ProductRole = 'HERO' | 'FAN FAVOURITE' | 'TRENDING' | 'HIDDEN GEM' | 'SUPPORTING' | 'CATALOG';

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'apparel' | 'accessories' | 'retro';
  collections: string[];
  badge?: BadgeType;
  role: ProductRole;
  images: string[];
  description?: string;
  story?: string;
  highlights?: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  availability?: 'in_stock' | 'low_stock' | 'sold_out';
  stockCount?: number;
  rating?: number;
  reviewCount?: number;
  ga4Insight?: {
    revenue?: number;
    purchases?: number;
    views?: number;
    highlight: string;
  };
  relatedProductIds?: string[];
  frequentlyBoughtWith?: string[];
  productUrl?: string;
}

export interface CartItem {
  id: string; // unique item key (productId + size + color)
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface LookbookPhoto {
  id: string;
  title: string;
  caption: string;
  category: 'All' | 'Lookbook' | 'Studio' | 'Details' | 'Streetwear' | '1998 Archive';
  imageUrl: string;
  aspectRatio: string;
  featuredProductId?: string;
  featuredProductName?: string;
  cameraInfo: string;
  year?: string;
}

export type CheckoutStep = 'contact' | 'shipping' | 'payment' | 'review' | 'confirmed';

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
  paymentMethod: 'card' | 'gpay';
}

export interface Order {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  shippingInfo: ShippingInfo;
  paymentInfo: {
    lastFour: string;
    cardName: string;
    paymentMethod: string;
  };
  createdAt: string;
  estimatedDelivery: string;
}
