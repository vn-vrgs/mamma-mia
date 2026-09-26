import React from 'react';
import Button from 'react-bootstrap/Button';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { formatCurrency } from '../utils/format';

const Navbar = ({ onNavigate, currentPage, total = 25000 }) => {
  // Requerimiento Hito 1 & 2: Definición de variables al interior del componente
  const token = false;

  return (
    <NavbarBootstrap bg="dark" variant="dark" expand="lg" className="py-2 border-bottom border-secondary shadow-lg sticky-top">
      <Container fluid className="px-3 px-md-5">
        <NavbarBootstrap.Brand 
          href="#home" 
          className="text-warning fw-bold fs-4 me-4 d-flex align-items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('home');
          }}
        >
          <span>🍕</span> Pizzería Mamma Mia!
        </NavbarBootstrap.Brand>

        <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" className="border-secondary" />

        <NavbarBootstrap.Collapse id="basic-navbar-nav">
          {/* Navegación izquierda: Home y botones según estado de autenticación (token) */}
          <Nav className="me-auto gap-2 my-2 my-lg-0 align-items-lg-center">
            <Button 
              variant={currentPage === 'home' ? 'warning' : 'outline-light'} 
              size="sm" 
              className={`px-3 rounded-3 fw-medium ${currentPage === 'home' ? 'text-dark fw-bold' : ''}`}
              onClick={() => onNavigate && onNavigate('home')}
            >
              🍕 Home
            </Button>

            {token ? (
              <>
                <Button variant="outline-light" size="sm" className="px-3 rounded-3">
                  🔓 Profile
                </Button>
                <Button variant="outline-light" size="sm" className="px-3 rounded-3">
                  🔒 Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant={currentPage === 'login' ? 'warning' : 'outline-light'} 
                  size="sm" 
                  className={`px-3 rounded-3 fw-medium ${currentPage === 'login' ? 'text-dark fw-bold' : ''}`}
                  onClick={() => onNavigate && onNavigate('login')}
                >
                  🔐 Login
                </Button>
                <Button 
                  variant={currentPage === 'register' ? 'warning' : 'outline-light'} 
                  size="sm" 
                  className={`px-3 rounded-3 fw-medium ${currentPage === 'register' ? 'text-dark fw-bold' : ''}`}
                  onClick={() => onNavigate && onNavigate('register')}
                >
                  🔐 Register
                </Button>
              </>
            )}
          </Nav>

          {/* Botón Total del Carrito */}
          <Nav className="ms-auto align-items-center mt-2 mt-lg-0">
            <Button 
              variant={currentPage === 'cart' ? 'info' : 'outline-info'} 
              size="sm" 
              className={`btn-total px-3 py-1.5 rounded-3 fw-bold ${currentPage === 'cart' ? 'bg-info text-dark' : ''}`}
              onClick={() => onNavigate && onNavigate('cart')}
            >
              🛒 Total: {formatCurrency(total)}
            </Button>
          </Nav>
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  );
};

export default Navbar;
