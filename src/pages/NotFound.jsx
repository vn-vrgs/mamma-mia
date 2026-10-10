import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="my-5 flex-grow-1 d-flex justify-content-center align-items-center">
      <Card className="p-4 p-md-5 shadow-lg border-secondary bg-dark text-white rounded-4 text-center w-100" style={{ maxWidth: '600px' }}>
        <Card.Body>
          <div className="mb-4">
            <span style={{ fontSize: '5rem' }}>🍕❌</span>
          </div>
          
          <h1 className="display-4 fw-bold text-warning mb-2">404</h1>
          <h3 className="fw-semibold text-light mb-3">
            ¡Página no encontrada!
          </h3>
          
          <p className="text-secondary fs-5 mb-4">
            La ruta que intentas consultar no existe o ha sido movida. ¡No dejes que se te enfríe la pizza!
          </p>

          <Button
            as={Link}
            to="/"
            variant="warning"
            size="lg"
            className="px-4 py-2 fw-bold text-dark rounded-3 shadow text-decoration-none"
          >
            🏠 Volver al Inicio
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotFound;
