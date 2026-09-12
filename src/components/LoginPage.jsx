import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NotificationModal from './NotificationModal';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para controlar la ventana emergente (modal)
  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: 'error', // 'error' | 'success'
    title: '',
    message: ''
  });

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, show: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones del Hito 2
    // 1. Todos los campos son obligatorios
    if (!email.trim() || !password.trim()) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Campos Incompletos',
        message: 'Todos los campos son obligatorios (no pueden estar vacíos).'
      });
      return;
    }

    // 2. El password debe tener al menos 6 caracteres
    if (password.length < 6) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Contraseña Corta',
        message: 'El password debe tener al menos 6 caracteres.'
      });
      return;
    }

    // Éxito en las validaciones
    setModalConfig({
      show: true,
      type: 'success',
      title: 'Authentication Successful!',
      message: '¡Inicio de sesión exitoso! Bienvenido de nuevo a Pizzería Mamma Mia.'
    });

    // Resetear campos
    setEmail('');
    setPassword('');
  };

  return (
    <Container className="my-5 flex-grow-1 d-flex justify-content-center align-items-center">
      <Card className="p-4 shadow-sm border-0 w-100" style={{ maxWidth: '480px' }}>
        <Card.Body>
          <h2 className="text-start mb-4 fw-normal">Login</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label className="text-secondary small">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label className="text-secondary small">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="px-4">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Ventana Emergente (Modal) con Fondo Degradado */}
      <NotificationModal
        show={modalConfig.show}
        onHide={closeModal}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
      />
    </Container>
  );
};

export default LoginPage;
