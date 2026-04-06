import React, { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  totalItems: number;
  totalValue: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  function addItem(product: Product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      const updated = existing
        ? prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
    toast.success(`${product.title} added to cart`, { icon: '🛒' });
  }

  function removeItem(productId: number) {
    setItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      const updated = prev.filter((i) => i.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updated));
      if (item) toast.error(`${item.title} removed from cart`, { icon: '🗑️' });
      return updated;
    });
  }

  function updateQuantity(productId: number, delta: number) {
    setItems((prev) => {
      const updated = prev
        .map((i) => i.id === productId ? { ...i, quantity: i.quantity + delta } : i)
        .filter((i) => i.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalValue = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, totalItems, totalValue }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
