import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const Profile = ({ email = 'usuario@mammamia.com', onLogout }) => {
  return (
    <Container className="my-5 flex-grow-1 d-flex justify-content-center align-items-center">
      <Card className="p-4 shadow-lg border-secondary bg-dark text-white rounded-4 w-100" style={{ maxWidth: '480px' }}>
        <Card.Body className="text-center">
          <div className="mb-4">
            <span className="fs-1 d-inline-block p-3 rounded-circle bg-secondary bg-opacity-25 border border-secondary mb-3">
              👤
            </span>
            <h3 className="fw-bold text-warning mb-1">Perfil de Usuario</h3>
            <Badge bg="info" className="text-dark fw-bold px-3 py-1">
              Cliente Registrado
            </Badge>
          </div>

          <div className="bg-secondary bg-opacity-25 p-3 rounded-3 border border-secondary mb-4 text-start">
            <p className="text-secondary small text-uppercase tracking-wider mb-1">Email de la cuenta:</p>
            <p className="fs-5 fw-medium text-white mb-0 text-break">
              📧 {email}
            </p>
          </div>

          <Button
            variant="outline-danger"
            size="lg"
            className="w-100 py-2 fw-bold rounded-3 d-flex align-items-center justify-content-center gap-2"
            onClick={onLogout}
          >
            🔒 Cerrar sesión
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
