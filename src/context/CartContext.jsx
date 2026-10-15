import React, { createContext, useContext, useState, useEffect } from 'react';
import { menuItems, isAvailableNow } from '../data/restaurantData';

const CartContext = createContext();

// A dish can be ordered only while it is on the menu and not sold out.
const canOrder = (dishId) => isAvailableNow(menuItems.find((dish) => dish.id === dishId));

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('baansiam_cart');
      // Drop saved items that have since sold out or left the menu.
      return saved ? JSON.parse(saved).filter((item) => canOrder(item.id)) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('baansiam_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (item, spiceLevel = null, notes = "") => {
    if (!canOrder(item.id)) return;
    setCart((prev) => {
      const chosenSpice = spiceLevel !== null ? spiceLevel : item.spiceLevel;
      const cartItemId = `${item.id}-${chosenSpice}-${notes.trim().toLowerCase()}`;
      
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          ...item,
          cartItemId,
          selectedSpice: chosenSpice,
          notes,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            if (delta > 0 && !canOrder(item.id)) return item;
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1025; // estimated Los Angeles sales tax
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        tax,
        total,
        isCartOpen,
        setIsCartOpen,
        isReservationOpen,
        setIsReservationOpen,
        selectedDish,
        setSelectedDish,
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
