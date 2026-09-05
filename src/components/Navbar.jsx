import React from 'react';
import Button from 'react-bootstrap/Button';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { formatCurrency } from '../utils/format';

const Navbar = () => {
  // Requerimiento 3: Definición de variables al interior del componente
  const total = 25000;
  const token = false;

  return (
    <NavbarBootstrap bg="dark" variant="dark" expand="lg" className="py-2 shadow-sm sticky-top">
      <Container fluid className="px-3 px-md-4">
        <NavbarBootstrap.Brand href="#home" className="text-white me-3">
          Pizzería Mamma Mia!
        </NavbarBootstrap.Brand>
        <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBootstrap.Collapse id="basic-navbar-nav">
          {/* Navegación izquierda: Home y botones según estado de autenticación (token) */}
          <Nav className="me-auto gap-2 my-2 my-lg-0 align-items-lg-center">
            {/* Requerimiento 4: Botón Home (Siempre visible) */}
            <Button variant="outline-light" size="sm" className="px-3">
              🍕 Home
            </Button>

            {/* Requerimiento 3: Renderizado condicional mediante operador ternario según variable 'token' */}
            {token ? (
              <>
                <Button variant="outline-light" size="sm" className="px-3">
                  🔓 Profile
                </Button>
                <Button variant="outline-light" size="sm" className="px-3">
                  🔒 Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-light" size="sm" className="px-3">
                  🔐 Login
                </Button>
                <Button variant="outline-light" size="sm" className="px-3">
                  🔐 Register
                </Button>
              </>
            )}
          </Nav>

          {/* Requerimiento 4: Botón Total (Siempre visible, formateado con formato de miles) */}
          <Nav className="ms-auto align-items-center mt-2 mt-lg-0">
            <Button variant="outline-info" size="sm" className="btn-total px-3 py-1">
              🛒 Total: {formatCurrency(total)}
            </Button>
          </Nav>
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  );
};

export default Navbar;
