import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Pizza from './pages/Pizza';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(false);

  // Función para agregar pizzas al carrito
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
      <Navbar total={cartTotal} token={token} />

      <Routes>
        {/* Ruta Home */}
        <Route path="/" element={<Home onAddToCart={addToCart} />} />

        {/* Ruta Register */}
        <Route path="/register" element={<Register />} />

        {/* Ruta Login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta Cart */}
        <Route 
          path="/cart" 
          element={
            <Cart 
              cart={cart} 
              onIncrease={increaseQuantity} 
              onDecrease={decreaseQuantity} 
            />
          } 
        />

        {/* Ruta Pizza Detail */}
        <Route 
          path="/pizza/p001" 
          element={<Pizza pizzaId="p001" onAddToCart={addToCart} />} 
        />

        {/* Ruta Profile */}
        <Route 
          path="/profile" 
          element={
            <Profile 
              email="usuario@mammamia.com" 
              onLogout={() => setToken(false)} 
            />
          } 
        />

        {/* Ruta 404 explícita */}
        <Route path="/404" element={<NotFound />} />

        {/* Ruta por defecto (catch-all) */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
