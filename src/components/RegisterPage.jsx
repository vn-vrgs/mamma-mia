import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NotificationModal from './NotificationModal';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Error de Validación',
        message: 'Todos los campos son obligatorios (no pueden estar vacíos).'
      });
      return;
    }

    // 2. El password debe tener al menos 6 caracteres
    if (password.length < 6) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Contraseña Débiles',
        message: 'El password debe tener al menos 6 caracteres.'
      });
      return;
    }

    // 3. El password y la confirmación del password deben ser iguales
    if (password !== confirmPassword) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Contraseñas No Coinciden',
        message: 'El password y la confirmación del password deben ser iguales.'
      });
      return;
    }

    // Éxito en las validaciones
    setModalConfig({
      show: true,
      type: 'success',
      title: '¡Registro Exitoso!',
      message: 'Tu cuenta ha sido registrada correctamente. ¡Bienvenido a Pizzería Mamma Mia!'
    });

    // Resetear los campos del formulario
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Container className="my-5 flex-grow-1 d-flex justify-content-center align-items-center">
      <Card className="p-4 shadow-sm border-0 w-100" style={{ maxWidth: '480px' }}>
        <Card.Body>
          <h2 className="text-start mb-4 fw-normal">Register</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label className="text-secondary small">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label className="text-secondary small">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="registerConfirmPassword">
              <Form.Label className="text-secondary small">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="px-4">
              Register
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

export default RegisterPage;
