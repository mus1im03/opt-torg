import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Обработка добавления товара в корзину
      return [...state, action.payload];
      case 'INCREMENT':
        return state.map((item, index) =>
          index === action.index ? { ...item, quantity: item.quantity + 1 } : item
        );
      
      case 'DECREMENT':
        return state.map((item, index) =>
          index === action.index && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        
      case 'REMOVE_FROM_CART':
        return state.filter(item => item.id !== action.payload.id);
    case "CLEAR_CART":
      // Обработка очистки корзины
      return [];
    // Другие случаи обработки...
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};