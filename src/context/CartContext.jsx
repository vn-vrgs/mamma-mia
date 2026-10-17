import React, { createContext, useContext, useState } from 'react';
  
// 1. Creación del contexto del carrito de compras
export const CartContext = createContext();
  
// 2. Proveedor del contexto (CartProvider)
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Añadir producto al carrito: si ya existe incrementa su cantidad, si no lo agrega con count: 1
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === pizza.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === pizza.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prevCart, { ...pizza, count: 1 }];
    });
  };

  // Aumentar la cantidad de una pizza en el carrito
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // Disminuir la cantidad de una pizza; si llega a 0, se elimina del carrito
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, count: item.count - 1 } : item))
        .filter((item) => item.count > 0)
    );
  };

  // Eliminar un producto directamente del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Vaciar completamente el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Cálculo del monto total acumulado del carrito
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  // Cantidad total de pizzas seleccionadas
  const totalCount = cart.reduce((acc, item) => acc + item.count, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        total: cartTotal,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3. Custom Hook para consumo ágil del contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};

export default CartProvider;
