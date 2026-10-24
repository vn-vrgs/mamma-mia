import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
   
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Pizza from './pages/Pizza';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import { useUser } from './context/UserContext';
import './App.css';

function App() {
  // Requerimiento 5: Consumir token desde UserContext para proteger rutas
  const { token } = useUser();

  return (
    <div className="d-flex flex-column min-vh-100 bg-slate-900 text-white dark-theme">
      {/* Navbar consume directamente CartContext y UserContext */}
      <Navbar />

      <Routes>
        {/* Ruta Home: pública, siempre accesible */}
        <Route path="/" element={<Home />} />

        {/* Requerimiento 5: Si token es true, redirige a "/" (Home) para login y register */}
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />

        {/* Ruta Cart: accesible, con pago condicionado a token */}
        <Route path="/cart" element={<Cart />} />

        {/* Requerimiento 1: Ruta dinámica de detalle de pizza con parámetro :id */}
        <Route path="/pizza/:id" element={<Pizza />} />
        <Route path="/pizza" element={<Navigate to="/pizza/p001" />} />

        {/* Requerimiento 5: Ruta protegida para "/profile". Si token es false, redirige a "/login" */}
        <Route 
          path="/profile" 
          element={token ? <Profile email="usuario@mammamia.com" /> : <Navigate to="/login" />} 
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
