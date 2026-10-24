import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { formatCurrency } from '../utils/format';
   
const Cart = () => {
  // Consumir el contexto del carrito de compras
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, total } = useCart();
  // Requerimiento 4: Consumir token desde UserContext
  const { token } = useUser();

  return (
    <Container className="my-5 flex-grow-1 max-w-2xl" style={{ maxWidth: '800px' }}>
      <Card className="bg-dark text-white border-secondary shadow-lg rounded-4 overflow-hidden">
        <Card.Header className="bg-secondary bg-opacity-20 border-secondary py-3 px-4 d-flex justify-content-between align-items-center">
          <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
            🛒 Detalles del pedido:
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
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {/* Resumen de Total y Botón de Pago (Requerimiento 4: Deshabilitado si token es false) */}
          <div className="pt-4 mt-2 border-top border-secondary d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
            <div>
              <span className="text-secondary small text-uppercase tracking-wider d-block">
                Total a Pagar:
              </span>
              <h2 className="fw-bold text-white mb-0">{formatCurrency(total)}</h2>
            </div>
            <div className="d-flex flex-column align-items-sm-end">
              <Button
                variant="warning"
                size="lg"
                className="fw-bold px-5 py-2 text-dark shadow-sm rounded-3"
                disabled={!token || cart.length === 0}
              >
                Pagar 💳
              </Button>
              {!token && cart.length > 0 && (
                <small className="text-warning text-center text-sm-end mt-2 d-block">
                  ⚠️ Inicia sesión para proceder al pago
                </small>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Cart;
