import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { pizzaCart } from '../pizzas';
import { formatCurrency } from '../utils/format';

const Cart = ({ cart: propCart, onIncrease, onDecrease, onUpdateTotal }) => {
  // Requerimiento 3 (Hito 3): Manejo de estado del carrito usando useState
  const [internalCart, setInternalCart] = useState(pizzaCart);

  const cart = propCart !== undefined ? propCart : internalCart;

  // Función para incrementar la cantidad de una pizza
  const increaseQuantity = (id) => {
    if (onIncrease) {
      onIncrease(id);
    } else {
      const updatedCart = internalCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      );
      setInternalCart(updatedCart);
      if (onUpdateTotal) onUpdateTotal(calculateTotal(updatedCart));
    }
  };

  // Función para decrementar la cantidad y eliminar si la cantidad es 0
  const decreaseQuantity = (id) => {
    if (onDecrease) {
      onDecrease(id);
    } else {
      const updatedCart = internalCart
        .map((item) => (item.id === id ? { ...item, count: item.count - 1 } : item))
        .filter((item) => item.count > 0);
      setInternalCart(updatedCart);
      if (onUpdateTotal) onUpdateTotal(calculateTotal(updatedCart));
    }
  };

  // Función para calcular el total del carrito
  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.count, 0);
  };

  const total = calculateTotal(cart);

  return (
    <Container className="my-5 flex-grow-1 max-w-2xl" style={{ maxWidth: '800px' }}>
      <Card className="bg-dark text-white border-secondary shadow-lg rounded-4 overflow-hidden">
        <Card.Header className="bg-secondary bg-opacity-20 border-secondary py-3 px-4">
          <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
            🛒 Detalles del pedido:
          </h4>
        </Card.Header>
        <Card.Body className="p-3 p-md-4">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <span className="fs-1">🍕</span>
              <p className="fs-5 text-muted mt-3 mb-0">Tu carrito está vacío</p>
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
                    <span className="fw-semibold fs-5 text-capitalize">{pizza.name}</span>
                  </div>

                  {/* Precio, Botones de Cantidad y Subtotal */}
                  <div className="d-flex align-items-center justify-content-between flex-grow-1 flex-md-grow-0 gap-3">
                    <span className="fw-bold fs-5 text-info" style={{ minWidth: '100px', textAlign: 'right' }}>
                      {formatCurrency(pizza.price * pizza.count)}
                    </span>

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
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {/* Resumen de Total y Botón de Pago */}
          <div className="pt-4 mt-2 border-top border-secondary d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
            <div>
              <span className="text-secondary small text-uppercase tracking-wider">Total a Pagar</span>
              <h2 className="fw-bold text-white mb-0">{formatCurrency(total)}</h2>
            </div>
            <Button
              variant="warning"
              size="lg"
              className="fw-bold px-5 py-2 text-dark shadow-sm rounded-3"
              disabled={cart.length === 0}
            >
              Pagar 💳
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Cart;
