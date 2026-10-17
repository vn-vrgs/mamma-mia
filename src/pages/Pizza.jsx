import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import { useCart } from '../context/CartContext';
import { usePizzas } from '../context/PizzaContext';
import { formatCurrency } from '../utils/format';
  
const Pizza = ({ pizzaId: propPizzaId }) => {
  const { id: paramId } = useParams();
  const pizzaId = propPizzaId || paramId || 'p001';

  const { addToCart } = useCart();
  const { getPizzaById } = usePizzas();

  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCurrentPizza = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPizzaById(pizzaId);
        if (isMounted) {
          if (data) {
            setPizza(data);
          } else {
            setError('No se pudo encontrar la pizza solicitada.');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Error al cargar la información de la pizza.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCurrentPizza();
    return () => {
      isMounted = false;
    };
  }, [pizzaId, getPizzaById]);

  return (
    <Container className="my-5 flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="warning" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Cargando información de la pizza...</span>
          </Spinner>
          <p className="text-light fs-5 mt-3">Cargando detalles de la pizza...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center shadow-lg border-danger w-100" style={{ maxWidth: '600px' }}>
          <Alert.Heading className="fw-bold">❌ Error al cargar la pizza</Alert.Heading>
          <p>{error}</p>
          <Button as={Link} to="/" variant="outline-light" size="sm" className="mt-2">
            Volver al Inicio
          </Button>
        </Alert>
      )}

      {!loading && !error && pizza && (
        <Card className="shadow-lg border-secondary bg-dark text-white rounded-4 overflow-hidden my-4 w-100" style={{ maxWidth: '850px' }}>
          <div className="row g-0 align-items-center">
            <div className="col-md-6 overflow-hidden position-relative">
              <Card.Img
                src={pizza.img}
                alt={`Pizza ${pizza.name}`}
                className="img-fluid h-100 w-100 object-fit-cover"
                style={{ minHeight: '320px', maxHeight: '450px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6">
              <Card.Body className="p-4 d-flex flex-column h-100">
                <Card.Title className="text-warning fw-bold fs-2 text-capitalize mb-2">
                  Pizza {pizza.name}
                </Card.Title>

                <hr className="border-secondary opacity-50 my-2" />

                <Card.Text className="text-light opacity-90 my-3 leading-relaxed">
                  {pizza.desc}
                </Card.Text>

                <hr className="border-secondary opacity-50 my-2" />

                <div className="my-2">
                  <p className="mb-2 text-uppercase tracking-wider small text-secondary fw-semibold">
                    🍕 Ingredientes:
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    {pizza.ingredients && pizza.ingredients.map((ingredient, index) => (
                      <Badge
                        key={index}
                        bg="secondary"
                        className="bg-opacity-25 text-light border border-secondary fw-normal px-2.5 py-1.5 rounded-2 text-capitalize"
                      >
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>

                <hr className="border-secondary opacity-50 my-3" />

                <div className="d-flex justify-content-between align-items-center mt-auto pt-2 gap-3 flex-wrap">
                  <div>
                    <span className="text-secondary small d-block">Precio:</span>
                    <span className="fs-3 fw-bold text-success">{formatCurrency(pizza.price)}</span>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      as={Link}
                      to="/"
                      variant="outline-light"
                      size="md"
                      className="border-secondary rounded-3 px-3 text-decoration-none"
                    >
                      ← Volver
                    </Button>
                    <Button
                      variant="warning"
                      size="md"
                      className="fw-bold text-dark rounded-3 px-4 shadow"
                      onClick={() => addToCart(pizza)}
                    >
                      Añadir 🛒
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </div>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default Pizza;
