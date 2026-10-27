import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { formatCurrency } from '../utils/format';
import NotificationModal from '../components/NotificationModal';

const Cart = () => {
  // Consumo del contexto del carrito de compras
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, total } = useCart();
  
  // Consumo de token y estado desde UserContext
  const { token } = useUser();

  // Estados locales para proceso de compra y feedback visual
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: 'success',
    title: '',
    message: '',
  });

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, show: false }));
  };

  /**
   * Requerimiento 7: Método para enviar el carrito de compras al backend
   * Consume la ruta POST /api/checkouts enviando el token JWT en el header Authorization
   */
  const handleCheckout = async () => {
    if (!token) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Sesión Requerida',
        message: 'Debes iniciar sesión con tu cuenta para poder procesar la compra.',
      });
      return;
    }

    if (cart.length === 0) {
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Carrito Vacío',
        message: 'Agrega al menos una pizza a tu carrito para proceder con el pago.',
      });
      return;
    }

    try {
      setLoadingCheckout(true);
      setSuccessMessage(null);

      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Ocurrió un error al procesar el pago.');
      }

      // Requerimiento 8: Mostrar mensaje de éxito cuando se haya realizado la compra
      const mensajeExito =
        '¡Tu compra ha sido procesada con éxito! Tu pedido está en camino a ser preparado con masa artesanal fresca.';
      
      setSuccessMessage(mensajeExito);
      setModalConfig({
        show: true,
        type: 'success',
        title: '¡Compra Exitosa!',
        message: mensajeExito,
      });

      // Vaciar el carrito tras compra exitosa
      clearCart();
    } catch (error) {
      console.error('Error en checkout:', error.message);
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Error en la Compra',
        message: error.message || 'No fue posible completar la compra. Intente nuevamente.',
      });
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <Container className="my-5 flex-grow-1 max-w-2xl px-3" style={{ maxWidth: '800px' }}>
      {/* Requerimiento 8: Mensaje de éxito persistente en la vista */}
      {successMessage && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setSuccessMessage(null)}
          className="d-flex align-items-center gap-3 rounded-4 shadow-sm mb-4 border-success bg-opacity-75"
        >
          <span className="fs-1">🎉</span>
          <div>
            <h5 className="alert-heading mb-1 fw-bold text-success">¡Compra Realizada con Éxito!</h5>
            <p className="mb-0 small">{successMessage}</p>
          </div>
        </Alert>
      )}

      <Card className="bg-dark text-white border-secondary shadow-lg rounded-4 overflow-hidden">
        <Card.Header className="bg-secondary bg-opacity-20 border-secondary py-3 px-3 px-md-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
            <span>🛒</span>
            <span>Detalles del pedido:</span>
          </h4>
          <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill">
            {cart.reduce((acc, item) => acc + item.count, 0)} pizzas en orden
          </span>
        </Card.Header>

        <Card.Body className="p-3 p-md-4">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <span className="fs-1 d-block mb-3">🍕</span>
              <h5 className="text-white fw-bold mb-2">Tu carrito está vacío</h5>
              <p className="fs-6 text-muted mb-4">
                ¡Añade tus pizzas favoritas desde el catálogo y disfruta de la mejor masa artesanal!
              </p>
              <Button
                as={Link}
                to="/"
                variant="warning"
                className="fw-bold px-4 py-2 text-dark rounded-3 text-decoration-none shadow-sm"
              >
                🍕 Explorar Menú
              </Button>
            </div>
          ) : (
            <ListGroup variant="flush" className="border-0">
              {cart.map((pizza) => (
                <ListGroup.Item
                  key={pizza.id}
                  className="bg-transparent text-white border-secondary py-3 px-2 px-md-3 d-flex flex-wrap align-items-center justify-content-between gap-3"
                >
                  {/* Imagen y Nombre */}
                  <div className="d-flex align-items-center gap-3" style={{ minWidth: '200px' }}>
                    <Image
                      src={pizza.img}
                      alt={pizza.name}
                      rounded
                      style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                      className="shadow-sm border border-secondary"
                    />
                    <div>
                      <span className="fw-semibold fs-5 text-capitalize d-block">{pizza.name}</span>
                      <small className="text-secondary">
                        {formatCurrency(pizza.price)} c/u
                      </small>
                    </div>
                  </div>

                  {/* Precio, Botones de Cantidad y Subtotal */}
                  <div className="d-flex align-items-center justify-content-between flex-grow-1 flex-md-grow-0 gap-3">
                    <span className="fw-bold fs-5 text-info" style={{ minWidth: '110px', textAlign: 'right' }}>
                      {formatCurrency(pizza.price * pizza.count)}
                    </span>

                    <div className="d-flex align-items-center gap-2">
                      <div className="d-flex align-items-center gap-2 bg-secondary bg-opacity-25 p-1 rounded-3 border border-secondary">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="px-2 py-0 fw-bold rounded-2 border-0"
                          onClick={() => decreaseQuantity(pizza.id)}
                          aria-label={`Disminuir cantidad de ${pizza.name}`}
                          disabled={loadingCheckout}
                        >
                          -
                        </Button>
                        <span className="fw-bold px-2 fs-6 text-white">{pizza.count}</span>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="px-2 py-0 fw-bold rounded-2 border-0"
                          onClick={() => increaseQuantity(pizza.id)}
                          aria-label={`Aumentar cantidad de ${pizza.name}`}
                          disabled={loadingCheckout}
                        >
                          +
                        </Button>
                      </div>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="px-2 py-1 rounded-3 border-secondary"
                        onClick={() => removeFromCart(pizza.id)}
                        title={`Eliminar ${pizza.name} del carrito`}
                        aria-label={`Eliminar ${pizza.name} del carrito`}
                        disabled={loadingCheckout}
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {/* Resumen de Total y Botón de Pago (Requerimiento 7: Envío del carrito al backend) */}
          <div className="pt-4 mt-2 border-top border-secondary d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
            <div>
              <span className="text-secondary small text-uppercase tracking-wider d-block">
                Total a Pagar:
              </span>
              <h2 className="fw-bold text-white mb-0">{formatCurrency(total)}</h2>
            </div>
            <div className="d-flex flex-column align-items-sm-end w-100 w-sm-auto">
              <Button
                variant="warning"
                size="lg"
                className="fw-bold px-5 py-2 text-dark shadow-sm rounded-3 d-flex align-items-center justify-content-center gap-2 w-100 w-sm-auto"
                disabled={!token || cart.length === 0 || loadingCheckout}
                onClick={handleCheckout}
              >
                {loadingCheckout ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    <span>Procesando pago...</span>
                  </>
                ) : (
                  <>
                    <span>Pagar</span>
                    <span>💳</span>
                  </>
                )}
              </Button>
              {!token && cart.length > 0 && (
                <small className="text-warning text-center text-sm-end mt-2 d-block">
                  ⚠️ Inicia sesión para proceder al pago con JWT
                </small>
              )}
            </div>
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

export default Cart;
