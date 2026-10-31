import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { useUser, getStoredUsers } from '../context/UserContext';
import NotificationModal from '../components/NotificationModal';
import useInput from '../hooks/useInput';
import { translateErrorMessage } from '../utils/format';

const Login = () => {
  // Requerimiento: Implementar el método login de UserContext reconociendo las credenciales de localStorage
  const { login } = useUser();
  const navigate = useNavigate();

  // Custom Hooks para gestión de inputs de formulario
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

  const handleGoToCart = () => {
    setModalConfig((prev) => ({ ...prev, show: false }));
    navigate('/cart');
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
      // Autenticación reconociendo las credenciales creadas en Register guardadas en localStorage
      await login(email, password);

      setModalConfig({
        show: true,
        type: 'success',
        title: '¡Inicio de Sesión Exitoso!',
        message: `¡Bienvenido de nuevo a Pizzería Mamma Mia (${email})! Tus credenciales fueron validadas correctamente. Ya puedes activar el botón de Pagar en tu carrito.`,
      });

      emailInput.reset();
      passwordInput.reset();
    } catch (error) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Error de Autenticación',
        message: translateErrorMessage(error, 'No se pudo iniciar sesión. Verifica tus credenciales.'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obtener cantidad de cuentas registradas para feedback visual
  const storedUsers = getStoredUsers();

  return (
    <Container className="my-4 my-md-5 flex-grow-1 d-flex justify-content-center align-items-center px-3">
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
              Ingresa tus credenciales registradas para acceder a tu cuenta
            </p>
          </div>

          <Alert variant="secondary" className="bg-secondary bg-opacity-20 border-secondary small py-2 px-3 rounded-3 mb-4 text-light">
            <div className="d-flex align-items-center gap-2 mb-1">
              <span>💾</span>
              <strong>Credenciales en LocalStorage:</strong>
            </div>
            <p className="mb-1 small opacity-90">
              Este login reconoce automáticamente cualquier cuenta creada con el botón <strong>Register</strong> ({storedUsers.length} registrada{storedUsers.length === 1 ? '' : 's'}).
            </p>
            <div className="bg-black bg-opacity-40 p-2 rounded-2 font-monospace small">
              <div>📧 <strong>Demo:</strong> test@test.com</div>
              <div>🔑 <strong>Clave:</strong> 123123</div>
            </div>
          </Alert>

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label className="text-secondary small fw-semibold">Correo Electrónico (Usuario)</Form.Label>
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
              className="w-100 py-2.5 fw-bold mb-3 text-dark rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm"
              style={{ minHeight: '44px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span>Verificando credenciales en LocalStorage...</span>
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
        primaryLabel={modalConfig.type === 'success' ? 'Ir al Menú Principal 🍕' : 'Aceptar'}
        onPrimaryClick={closeModal}
        secondaryLabel={modalConfig.type === 'success' ? 'Ir al Carrito 🛒' : null}
        onSecondaryClick={modalConfig.type === 'success' ? handleGoToCart : null}
      />
    </Container>
  );
};

export default Login;
