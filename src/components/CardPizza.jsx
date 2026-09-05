import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { formatCurrency } from '../utils/format';

const CardPizza = ({ name, price, ingredients = [], img }) => {
  return (
    <Card className="card-pizza h-100 shadow-sm border-0">
      {/* Imagen superior de la pizza */}
      <Card.Img variant="top" src={img} alt={`Pizza ${name}`} className="card-pizza-img" />
      
      <Card.Body className="d-flex flex-column text-center p-3">
        {/* Título de la pizza */}
        <Card.Title className="pizza-title text-start mb-2 ps-1">
          Pizza {name}
        </Card.Title>

        <hr className="my-2" />

        {/* Sección de Ingredientes */}
        <div className="my-2">
          <p className="ingredients-label mb-1">Ingredientes:</p>
          <p className="ingredients-list mb-0">
            🍕 {ingredients.join(', ')}
          </p>
        </div>

        <hr className="my-2" />

        {/* Sección de Precio */}
        <div className="my-2">
          <p className="price-text mb-0">
            Precio: <span className="fw-bold">{formatCurrency(price)}</span>
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="d-flex justify-content-around align-items-center pt-2 mt-auto">
          <Button variant="outline-secondary" size="sm" className="px-3 border">
            Ver Más 👀
          </Button>
          <Button variant="dark" size="sm" className="px-3 fw-medium">
            Añadir 🛒
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardPizza;
