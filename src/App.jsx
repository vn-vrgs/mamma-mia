import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import Footer from './components/Footer';

import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';

import './App.css';

function App() {
  // Estado para la navegación interactiva entre vistas ('home', 'cart', 'register', 'login')
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);

  // Función para agregar pizzas al carrito desde la vista Home
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === pizza.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === pizza.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevCart, { ...pizza, count: 1 }];
      }
    });
  };

  // Función para incrementar cantidad en el carrito
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // Función para decrementar cantidad y eliminar del carrito cuando llega a 0
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, count: item.count - 1 } : item))
        .filter((item) => item.count > 0)
    );
  };

  // Total calculado dinámicamente según el estado global del carrito
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <div className="d-flex flex-column min-vh-100 bg-slate-900 text-white dark-theme">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} total={cartTotal} />

      {/* Renderizado dinámico de vistas según la navegación */}
      {currentPage === 'home' && <Home onAddToCart={addToCart} />}
      {currentPage === 'cart' && (
        <Cart 
          cart={cart} 
          onIncrease={increaseQuantity} 
          onDecrease={decreaseQuantity} 
        />
      )}
      {currentPage === 'register' && <RegisterPage />}
      {currentPage === 'login' && <LoginPage />}

      <Footer />
    </div>
  );
}
export default App;
