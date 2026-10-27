import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useUser } from '../context/UserContext';

const Profile = ({ onLogout }) => {
  // Requerimientos 3 y 5: Consumo del método para obtener perfil y logout
  const { email, user, logout, getProfile, loading } = useUser();
  const [profileError, setProfileError] = useState(null);

  // Requerimiento 3: Invocar /api/auth/me al montar el componente
  useEffect(() => {
    let isMounted = true;
    const fetchUserData = async () => {
      try {
        setProfileError(null);
        await getProfile();
      } catch (err) {
        if (isMounted) {
          setProfileError(err.message || 'Error al sincronizar datos de perfil');
        }
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = onLogout || logout;
  const displayEmail = email || user?.email || 'Cargando usuario...';

  return (
    <Container className="my-5 flex-grow-1 d-flex justify-content-center align-items-center px-3">
      <Card
        className="p-3 p-md-4 shadow-lg border-secondary bg-dark text-white rounded-4 w-100"
        style={{ maxWidth: '520px' }}
      >
        <Card.Body className="text-center">
          <div className="mb-4">
            <span className="fs-1 d-inline-block p-3 rounded-circle bg-warning bg-opacity-10 border border-warning mb-3">
              👤
            </span>
            <h3 className="fw-bold text-warning mb-1">Perfil de Usuario</h3>
            <Badge bg="success" className="text-white fw-semibold px-3 py-1 rounded-pill">
              Sesión Activa con JWT
            </Badge>
          </div>

          {profileError && (
            <Alert variant="danger" className="text-start py-2 px-3 small rounded-3">
              ⚠️ {profileError}
            </Alert>
          )}

          {/* Requerimiento 5: Mostrar el email del usuario autenticado */}
          <div className="bg-secondary bg-opacity-25 p-3 rounded-3 border border-secondary mb-4 text-start">
            <p className="text-secondary small text-uppercase tracking-wider mb-1 fw-semibold">
              Email del Usuario Autenticado:
            </p>
            <div className="d-flex align-items-center gap-2">
              <span className="fs-5">📧</span>
              {loading && !email ? (
                <div className="d-flex align-items-center gap-2 text-warning">
                  <Spinner animation="border" size="sm" />
                  <span className="small">Obteniendo perfil desde /api/auth/me...</span>
                </div>
              ) : (
                <span className="fs-5 fw-bold text-white text-break">
                  {displayEmail}
                </span>
              )}
            </div>
            {user?.id && (
              <small className="text-secondary d-block mt-2 font-monospace">
                ID de sesión: {user.id}
              </small>
            )}
          </div>

          {/* Requerimiento 5: Botón para cerrar sesión */}
          <Button
            variant="outline-danger"
            size="lg"
            className="w-100 py-2.5 fw-bold rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm"
            onClick={handleLogout}
          >
            <span>🔒</span>
            <span>Cerrar sesión</span>
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
