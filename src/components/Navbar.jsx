import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link, useLocation } from 'react-router-dom';
import { CartContext, useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';
  
const Navbar = ({ token = false }) => {
  const { total } = useCart();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <NavbarBootstrap bg="dark" variant="dark" expand="lg" className="py-2 border-bottom border-secondary shadow-lg sticky-top">
      <Container fluid className="px-3 px-md-5">
        <NavbarBootstrap.Brand 
          as={Link} 
          to="/" 
          className="text-warning fw-bold fs-4 me-4 d-flex align-items-center gap-2 text-decoration-none"
        >
          <span>🍕</span> Pizzería Mamma Mia!
        </NavbarBootstrap.Brand>

        <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" className="border-secondary" />

        <NavbarBootstrap.Collapse id="basic-navbar-nav">
          {/* Navegación izquierda: Home y botones según token */}
          <Nav className="me-auto gap-2 my-2 my-lg-0 align-items-lg-center">
            <Button 
              as={Link} 
              to="/" 
              variant={currentPath === '/' ? 'warning' : 'outline-light'} 
              size="sm" 
              className={`px-3 rounded-3 fw-medium text-decoration-none ${currentPath === '/' ? 'text-dark fw-bold' : ''}`}
            >
              🍕 Home
            </Button>

            {token ? (
              <>
                <Button 
                  as={Link} 
                  to="/profile" 
                  variant={currentPath === '/profile' ? 'warning' : 'outline-light'} 
                  size="sm" 
                  className={`px-3 rounded-3 fw-medium text-decoration-none ${currentPath === '/profile' ? 'text-dark fw-bold' : ''}`}
                >
                  🔓 Profile
                </Button>
                <Button 
                  variant="outline-light" 
                  size="sm" 
                  className="px-3 rounded-3 text-decoration-none"
                >
                  🔒 Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  as={Link} 
                  to="/login" 
                  variant={currentPath === '/login' ? 'warning' : 'outline-light'} 
                  size="sm" 
                  className={`px-3 rounded-3 fw-medium text-decoration-none ${currentPath === '/login' ? 'text-dark fw-bold' : ''}`}
                >
                  🔐 Login
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant={currentPath === '/register' ? 'warning' : 'outline-light'} 
                  size="sm" 
                  className={`px-3 rounded-3 fw-medium text-decoration-none ${currentPath === '/register' ? 'text-dark fw-bold' : ''}`}
                >
                  🔐 Register
                </Button>
              </>
            )}
          </Nav>

          {/* Botón Total del Carrito -> Redirige a /cart */}
          <Nav className="ms-auto align-items-center mt-2 mt-lg-0">
            <Button 
              as={Link} 
              to="/cart" 
              variant={currentPath === '/cart' ? 'info' : 'outline-info'} 
              size="sm" 
              className={`btn-total px-3 py-1.5 rounded-3 fw-bold text-decoration-none ${currentPath === '/cart' ? 'bg-info text-dark border-info' : ''}`}
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
