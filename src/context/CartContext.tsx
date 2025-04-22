// src/context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type Product = {
  id: string;
  title: string;
  description: string;
  image: { url: string; alt: string };
  price: number;
  discountedPrice: number;
  quantity: number;
};

type CartContextType = {
  cart: Product[];
  updateCart: (cart: Product[]) => void;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const normalizedCart = storedCart.map((item: any) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCart(normalizedCart);
  }, []);

  const updateCart = (newCart: Product[]) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart([...newCart]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0); // 👈 Calculate total quantity

  return (
    <CartContext.Provider value={{ cart, updateCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
