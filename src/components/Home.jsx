import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Header from './Header';
import CardPizza from './CardPizza';

const Home = ({ onAddToCart, onViewMore }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Requerimiento Hito 4: Consumir la API de pizzas en la fase de montaje mediante useEffect
  const getPizzas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/api/pizzas');
      if (!response.ok) {
        throw new Error(`Error en la petición: HTTP ${response.status}`);
      }
      const data = await response.json();
      setPizzas(data);
    } catch (err) {
      console.error('Error al obtener pizzas de la API:', err);
      setError(err.message || 'No se pudo conectar con el servidor backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <main className="flex-grow-1 pb-5">
      {/* Requerimiento Hito 1 & 3: Componente Header al interior de Home.jsx */}
      <Header />

      <Container className="my-5">
        {loading && (
          <div className="text-center my-5 py-5">
            <Spinner animation="border" variant="warning" role="status" className="mb-3" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Cargando pizzas...</span>
            </Spinner>
            <p className="text-light fs-5">Cargando catálogo de pizzas desde la API...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center my-4 shadow-lg border-danger">
            <Alert.Heading className="fw-bold">❌ Error al cargar la información</Alert.Heading>
            <p>{error}</p>
            <hr />
            <p className="mb-0 small">Verifica que el servidor backend esté ejecutándose en <code>http://localhost:5000</code>.</p>
          </Alert>
        )}

        {!loading && !error && (
          <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
            {pizzas.map((pizza) => (
              <Col key={pizza.id}>
                <CardPizza
                  id={pizza.id}
                  name={pizza.name}
                  price={pizza.price}
                  ingredients={pizza.ingredients}
                  img={pizza.img}
                  desc={pizza.desc}
                  onAddToCart={() => onAddToCart && onAddToCart(pizza)}
                  onViewMore={() => onViewMore && onViewMore(pizza.id)}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </main>
  );
};

export default Home;
