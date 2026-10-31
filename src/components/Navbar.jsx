import React from 'react';
import Button from 'react-bootstrap/Button';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { formatCurrency } from '../utils/format';
   
const Navbar = () => {
  const { total } = useCart();
  // Consumir token y logout desde UserContext
  const { token, logout, email } = useUser();

  // Función para estilizar la ruta activa utilizando NavLink
  const setActiveClass = ({ isActive }) =>
    isActive
      ? 'btn btn-warning text-dark fw-bold px-3 py-2 rounded-3 text-decoration-none d-inline-flex align-items-center justify-content-center'
      : 'btn btn-outline-light px-3 py-2 rounded-3 fw-medium text-decoration-none d-inline-flex align-items-center justify-content-center';

  return (
    <NavbarBootstrap bg="dark" variant="dark" expand="lg" className="py-2 border-bottom border-secondary shadow-lg sticky-top">
      <Container fluid className="px-3 px-md-5">
        <NavbarBootstrap.Brand 
          as={Link} 
          to="/" 
          className="text-warning fw-bold fs-4 me-3 me-md-4 d-flex align-items-center gap-2 text-decoration-none"
        >
          <span>🍕</span> Pizzería Mamma Mia!
        </NavbarBootstrap.Brand>

        <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" className="border-secondary" />

        <NavbarBootstrap.Collapse id="basic-navbar-nav">
          {/* Navegación izquierda: Home y botones según token de UserContext */}
          <Nav className="me-auto gap-2 my-2 my-lg-0 align-items-stretch align-items-lg-center">
            {/* Home siempre visible */}
            <NavLink to="/" className={setActiveClass}>
              🍕 Home
            </NavLink>

            {/* Si token existe -> Profile y Logout. Si no existe -> Login y Register */}
            {token ? (
              <>
                <NavLink to="/profile" className={setActiveClass}>
                  🔓 Profile
                </NavLink>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  className="px-3 py-2 rounded-3 text-decoration-none d-inline-flex align-items-center justify-content-center fw-medium"
                  style={{ minHeight: '38px' }}
                  onClick={logout}
                  title={`Cerrar sesión de ${email || 'usuario'}`}
                >
                  🔒 Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={setActiveClass}>
                  🔐 Login
                </NavLink>
                <NavLink to="/register" className={setActiveClass}>
                  🔐 Register
                </NavLink>
              </>
            )}
          </Nav>

          {/* Botón Total del Carrito -> Siempre visible, redirige a /cart */}
          <Nav className="ms-auto align-items-stretch align-items-lg-center mt-2 mt-lg-0">
            <NavLink 
              to="/cart" 
              className={({ isActive }) =>
                `btn-total btn px-3 py-2 rounded-3 fw-bold text-decoration-none d-inline-flex align-items-center justify-content-center ${
                  isActive ? 'btn-info text-dark border-info' : 'btn-outline-info'
                }`
              }
              style={{ minHeight: '40px' }}
            >
              🛒 Total: {formatCurrency(total)}
            </NavLink>
          </Nav>
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  );
};

export default Navbar;
