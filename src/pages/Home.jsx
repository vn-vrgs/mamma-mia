import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Header from '../components/Header';
import CardPizza from '../components/CardPizza';
import { CartContext, useCart } from '../context/CartContext';
import { PizzaContext, usePizzas } from '../context/PizzaContext';
  
const Home = () => {
  // Consumo del contexto de pizzas (Requerimiento 6 opcional)
  const { pizzas, loading } = usePizzas();

  // Consumo del contexto del carrito (Requerimiento 3)
  const { addToCart } = useCart();

  return (
    <main className="flex-grow-1 pb-5">
      <Header />

      <Container className="my-5">
        {loading ? (
          <div className="text-center my-5 py-5">
            <Spinner
              animation="border"
              variant="warning"
              role="status"
              className="mb-3"
              style={{ width: '3rem', height: '3rem' }}
            >
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
                  onAddToCart={() => addToCart(pizza)}
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
