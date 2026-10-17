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
  const [token, setToken] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100 bg-slate-900 text-white dark-theme">
      {/* Navbar consume directamente CartContext para el total del pedido */}
      <Navbar token={token} />

      <Routes>
        {/* Ruta Home: consume CartContext y PizzaContext */}
        <Route path="/" element={<Home />} />

        {/* Ruta Register */}
        <Route path="/register" element={<Register />} />

        {/* Ruta Login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta Cart: consume CartContext */}
        <Route path="/cart" element={<Cart />} />

        {/* Rutas de detalle de Pizza (específica p001 y dinámica :id) */}
        <Route path="/pizza/p001" element={<Pizza pizzaId="p001" />} />
        <Route path="/pizza/:id" element={<Pizza />} />

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
