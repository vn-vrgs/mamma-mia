import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import NotificationModal from '../components/NotificationModal';
 
const Register = () => {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estado para controlar la ventana emergente (modal)
  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: 'error',
    title: '',
    message: ''
  });

  const closeModal = () => {
    if (modalConfig.type === 'success') {
      login();
    }
    setModalConfig((prev) => ({ ...prev, show: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Error de Validación',
        message: 'Todos los campos son obligatorios (no pueden estar vacíos).'
      });
      return;
    }

    if (password.length < 6) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Contraseña Débil',
        message: 'El password debe tener al menos 6 caracteres.'
      });
      return;
    }

    if (password !== confirmPassword) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Contraseñas No Coinciden',
        message: 'El password y la confirmación del password deben ser iguales.'
      });
      return;
    }

    setModalConfig({
      show: true,
      type: 'success',
      title: '¡Registro Exitoso!',
      message: 'Tu cuenta ha sido registrada correctamente. ¡Bienvenido a Pizzería Mamma Mia!'
    });

    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Container className="my-5 flex-grow-1 d-flex justify-content-center align-items-center">
      <Card className="p-4 shadow-sm border-0 w-100 bg-dark text-white border-secondary rounded-4" style={{ maxWidth: '480px' }}>
        <Card.Body>
          <h2 className="text-start mb-4 fw-normal text-warning">Register</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label className="text-secondary small">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary bg-opacity-25 text-white border-secondary"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label className="text-secondary small">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary bg-opacity-25 text-white border-secondary"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="registerConfirmPassword">
              <Form.Label className="text-secondary small">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-secondary bg-opacity-25 text-white border-secondary"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2 fw-bold mb-3">
              Register 🔐
            </Button>
          </Form>

          <div className="text-center mt-3 pt-2 border-top border-secondary">
            <span className="text-secondary small me-2">¿Ya tienes una cuenta?</span>
            <Link to="/login" className="text-warning text-decoration-none fw-semibold small">
              Inicia Sesión
            </Link>
          </div>
        </Card.Body>
      </Card>

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

export default Register;
