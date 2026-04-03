import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  function save(updated) {
    setItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  }

  function addItem(product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      const updated = existing
        ? prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  }

  function removeItem(productId) {
    setItems((prev) => {
      const updated = prev.filter((i) => i.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  }

  function updateQuantity(productId, delta) {
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

export function useCart() {
  return useContext(CartContext);
}
