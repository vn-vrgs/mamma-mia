import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import NotificationModal from '../components/NotificationModal';
import useInput from '../hooks/useInput';
import { translateErrorMessage } from '../utils/format';

const Register = () => {
  // Requerimiento: Implementar el método register de UserContext con persistencia en localStorage
  const { register, logout } = useUser();
  const navigate = useNavigate();

  // Custom Hooks para gestión de inputs de formulario
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const confirmPasswordInput = useInput('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastRegisteredEmail, setLastRegisteredEmail] = useState('');

  // Estado para controlar la ventana emergente (modal)
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

  const handleTestLogin = () => {
    // Cierra modal, cierra sesión activa y redirige a /login para probar las credenciales recién registradas
    setModalConfig((prev) => ({ ...prev, show: false }));
    logout();
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!email || !password || !confirmPassword) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Error de Validación',
        message: 'Todos los campos son obligatorios (no pueden estar vacíos).',
      });
      return;
    }

    if (password.length < 6) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Contraseña Débil',
        message: 'La contraseña debe tener al menos 6 caracteres.',
      });
      return;
    }

    if (password !== confirmPassword) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Contraseñas No Coinciden',
        message: 'La contraseña y su confirmación deben ser exactamente iguales.',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Registro y persistencia de credenciales en localStorage
      await register(email, password);
      setLastRegisteredEmail(email);

      setModalConfig({
        show: true,
        type: 'success',
        title: '¡Registro Exitoso!',
        message: `Tu cuenta (${email}) ha sido registrada y guardada con éxito en LocalStorage. Ya puedes usar tus credenciales para iniciar sesión o navegar por la pizzería.`,
      });

      emailInput.reset();
      passwordInput.reset();
      confirmPasswordInput.reset();
    } catch (error) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Error en el Registro',
        message: translateErrorMessage(error, 'No se pudo completar el registro. Intenta nuevamente.'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="my-4 my-md-5 flex-grow-1 d-flex justify-content-center align-items-center px-3">
      <Card
        className="p-3 p-md-4 shadow-lg border-0 w-100 bg-dark text-white border-secondary rounded-4"
        style={{ maxWidth: '480px' }}
      >
        <Card.Body>
          <div className="text-center mb-4">
            <span className="fs-1 d-inline-block p-2 rounded-circle bg-warning bg-opacity-10 border border-warning mb-2">
              📝
            </span>
            <h2 className="fw-bold text-warning mb-1">Crear Cuenta</h2>
            <p className="text-secondary small mb-0">
              Registra tus credenciales (Usuario y Contraseña) en Pizzería Mamma Mia
            </p>
          </div>

          <Alert variant="info" className="bg-info bg-opacity-10 border-info text-info small py-2 px-3 rounded-3 mb-4">
            💾 <strong>Almacenamiento Local:</strong> Las credenciales quedarán registradas temporalmente en tu navegador mediante <code>localStorage</code>.
          </Alert>

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="registerEmail">
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

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label className="text-secondary small fw-semibold">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={passwordInput.value}
                onChange={passwordInput.onChange}
                className="bg-secondary bg-opacity-25 text-white border-secondary py-2"
                disabled={isSubmitting}
                autoComplete="new-password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="registerConfirmPassword">
              <Form.Label className="text-secondary small fw-semibold">Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmPasswordInput.value}
                onChange={confirmPasswordInput.onChange}
                className="bg-secondary bg-opacity-25 text-white border-secondary py-2"
                disabled={isSubmitting}
                autoComplete="new-password"
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
                  <span>Creando cuenta en LocalStorage...</span>
                </>
              ) : (
                <>
                  <span>Registrarme</span>
                  <span>🔐</span>
                </>
              )}
            </Button>
          </Form>

          <div className="text-center mt-3 pt-3 border-top border-secondary">
            <span className="text-secondary small me-2">¿Ya tienes una cuenta registrada?</span>
            <Link to="/login" className="text-warning text-decoration-none fw-semibold small">
              Inicia sesión aquí
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
        secondaryLabel={modalConfig.type === 'success' ? 'Probar Botón Login 🔑' : null}
        onSecondaryClick={modalConfig.type === 'success' ? handleTestLogin : null}
      />
    </Container>
  );
};

export default Register;
