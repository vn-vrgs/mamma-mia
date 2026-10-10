import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Header from '../components/Header';
import CardPizza from '../components/CardPizza';
import { pizzas as mockPizzas } from '../pizzas';

const Home = ({ onAddToCart }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Consumir la API de pizzas con respaldo a datos locales si el backend no está disponible
  const getPizzas = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/pizzas');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      setPizzas(data);
    } catch (err) {
      console.warn('Backend no disponible en http://localhost:5000, cargando catálogo de respaldo local:', err.message);
      setPizzas(mockPizzas);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <main className="flex-grow-1 pb-5">
      <Header />

      <Container className="my-5">
        {loading ? (
          <div className="text-center my-5 py-5">
            <Spinner animation="border" variant="warning" role="status" className="mb-3" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Cargando pizzas...</span>
            </Spinner>
            <p className="text-light fs-5">Cargando catálogo de pizzas...</p>
          </div>
        ) : (
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
