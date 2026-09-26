import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './Header';
import CardPizza from './CardPizza';
import { pizzas } from '../pizzas';

const Home = ({ onAddToCart }) => {
  return (
    <main className="flex-grow-1 pb-5">
      {/* Requerimiento Hito 1 & 3: Llamada al componente Header al interior de Home.jsx */}
      <Header />

      {/* Requerimiento Hito 3: Recorre el array de pizzas y renderiza un componente CardPizza por cada pizza */}
      <Container className="my-5">
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
      </Container>
    </main>
  );
};

export default Home;
