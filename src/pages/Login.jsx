import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import NotificationModal from '../components/NotificationModal';
import useInput from '../hooks/useInput';

const Login = () => {
  // Requerimiento 4: Implementar el método login de UserContext para acceder al sistema
  const { login } = useUser();
  const navigate = useNavigate();

  // Custom Hooks para gestión de inputs de formulario (Material de clase y guía)
  const emailInput = useInput('');
  const passwordInput = useInput('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: 'error',
    title: '',
    message: '',
  });

  const closeModal = () => {
    const wasSuccess = modalConfig.type === 'success';
    setModalConfig((prev) => ({ ...prev, show: false }));
    if (wasSuccess) {
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Campos Incompletos',
        message: 'Todos los campos son obligatorios (email y contraseña no pueden estar vacíos).',
      });
      return;
    }

    if (password.length < 6) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Contraseña Muy Corta',
        message: 'La contraseña debe tener al menos 6 caracteres.',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Requerimiento 1 & 4: Consumo asíncrono del método login con JWT
      await login(email, password);

      setModalConfig({
        show: true,
        type: 'success',
        title: '¡Inicio de Sesión Exitoso!',
        message: `Bienvenido de nuevo a Pizzería Mamma Mia (${email}).`,
      });

      emailInput.reset();
      passwordInput.reset();
    } catch (error) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Error de Autenticación',
        message: error.message || 'No se pudo iniciar sesión. Verifica tus credenciales.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="my-5 flex-grow-1 d-flex justify-content-center align-items-center px-3">
      <Card
        className="p-3 p-md-4 shadow-lg border-0 w-100 bg-dark text-white border-secondary rounded-4"
        style={{ maxWidth: '480px' }}
      >
        <Card.Body>
          <div className="text-center mb-4">
            <span className="fs-1 d-inline-block p-2 rounded-circle bg-warning bg-opacity-10 border border-warning mb-2">
              🍕
            </span>
            <h2 className="fw-bold text-warning mb-1">Iniciar Sesión</h2>
            <p className="text-secondary small mb-0">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label className="text-secondary small fw-semibold">Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@correo.com"
                value={emailInput.value}
                onChange={emailInput.onChange}
                className="bg-secondary bg-opacity-25 text-white border-secondary py-2"
                disabled={isSubmitting}
                autoComplete="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label className="text-secondary small fw-semibold">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={passwordInput.value}
                onChange={passwordInput.onChange}
                className="bg-secondary bg-opacity-25 text-white border-secondary py-2"
                disabled={isSubmitting}
                autoComplete="current-password"
                required
              />
            </Form.Group>

            <Button
              variant="warning"
              type="submit"
              className="w-100 py-2 fw-bold mb-3 text-dark rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span>Verificando credenciales...</span>
                </>
              ) : (
                <>
                  <span>Ingresar</span>
                  <span>🔑</span>
                </>
              )}
            </Button>
          </Form>

          <div className="text-center mt-3 pt-3 border-top border-secondary">
            <span className="text-secondary small me-2">¿Aún no tienes una cuenta?</span>
            <Link to="/register" className="text-warning text-decoration-none fw-semibold small">
              Regístrate aquí
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

export default Login;
