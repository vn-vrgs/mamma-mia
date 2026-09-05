import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Requerimiento 1: En App.jsx se muestran los componentes Navbar, Home y Footer */}
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
