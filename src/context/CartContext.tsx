import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isMiniCartOpen: boolean;
  setIsMiniCartOpen: (open: boolean) => void;
  openMiniCart: () => void;
  closeMiniCart: () => void;
  subtotal: number;
  itemCount: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
  toastMessage: string | null;
  clearToast: () => void;
  analyticsLog: { event: string; timestamp: string; details?: any }[];
  logAnalytics: (event: string, details?: any) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gms_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [analyticsLog, setAnalyticsLog] = useState<{ event: string; timestamp: string; details?: any }[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('gms_cart_items', JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to persist cart items to localStorage', e);
    }
  }, [items]);

  const logAnalytics = (event: string, details?: any) => {
    const entry = {
      event,
      timestamp: new Date().toLocaleTimeString(),
      details
    };
    setAnalyticsLog((prev) => [entry, ...prev].slice(0, 50));
    console.log(`[GA4 Tracked Event] ${event}`, details || '');
  };

  const addItem = (
    product: Product,
    quantity = 1,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    const size = selectedSize || (product.sizes ? product.sizes[0] : undefined);
    const color = selectedColor || (product.colors ? product.colors[0]?.name : undefined);
    const itemId = `${product.id}-${size || 'default'}-${color || 'default'}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prevItems, { id: itemId, product, quantity, selectedSize: size, selectedColor: color }];
      }
    });

    logAnalytics('add_to_cart', {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity,
      size,
      badge: product.badge
    });

    setToastMessage(`Added ${product.name} to cart`);
    setIsMiniCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    logAnalytics('remove_from_cart', { itemId });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openMiniCart = () => setIsMiniCartOpen(true);
  const closeMiniCart = () => setIsMiniCartOpen(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const freeShippingThreshold = 50;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
  };

  const clearToast = () => setToastMessage(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isMiniCartOpen,
        setIsMiniCartOpen,
        openMiniCart,
        closeMiniCart,
        subtotal,
        itemCount,
        freeShippingThreshold,
        freeShippingProgress,
        recentlyViewed,
        addToRecentlyViewed,
        toastMessage,
        clearToast,
        analyticsLog,
        logAnalytics
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
