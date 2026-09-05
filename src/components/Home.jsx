import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './Header';
import CardPizza from './CardPizza';

// Importación de imágenes locales desde el directorio del proyecto
import napolitanaImg from '../assets/img/napolitana.jpg';
import espaniolaImg from '../assets/img/espaniola.jpg';
import pepperoniImg from '../assets/img/pepperoni.jpg';

const Home = () => {
  return (
    <main className="flex-grow-1 pb-5">
      {/* Requerimiento 2: Llamada al componente Header al interior de Home.jsx */}
      <Header />

      {/* Requerimiento 5: Galería de pizzas usando el componente CardPizza con sus correspondientes props e imágenes locales */}
      <Container className="my-5">
        <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
          {/* Pizza 1: Napolitana */}
          <Col>
            <CardPizza
              name="Napolitana"
              price={5950}
              ingredients={["mozzarella", "tomates", "jamón", "orégano"]}
              img={napolitanaImg}
            />
          </Col>

          {/* Pizza 2: Española */}
          <Col>
            <CardPizza
              name="Española"
              price={6950}
              ingredients={["mozzarella", "gorgonzola", "parmesano", "provolone"]}
              img={espaniolaImg}
            />
          </Col>

          {/* Pizza 3: Pepperoni */}
          <Col>
            <CardPizza
              name="Pepperoni"
              price={6950}
              ingredients={["mozzarella", "pepperoni", "orégano"]}
              img={pepperoniImg}
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
