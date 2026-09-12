import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Estado para la navegación dinámica entre vistas ('home', 'register', 'login')
  const [currentPage, setCurrentPage] = useState('register');

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />

      {/* 
        ========================================================================
        HITO 2 - Selección de vistas (Navegación interactiva o comentar/descomentar)
        ========================================================================
      */}
      {currentPage === 'home' && <Home />}
      {currentPage === 'register' && <RegisterPage />}
      {currentPage === 'login' && <LoginPage />}

      {/* 
        Ejemplo de prueba individual según pauta del Hito 2:
        <Home />
        <RegisterPage />
        <LoginPage />
      */}

      <Footer />
    </div>
  );
}

export default App;
