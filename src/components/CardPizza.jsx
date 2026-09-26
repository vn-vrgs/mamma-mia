import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { formatCurrency } from '../utils/format';

const CardPizza = ({ name, price, ingredients = [], img, desc, onAddToCart }) => {
  return (
    <Card className="card-pizza h-100 shadow-lg border-secondary bg-dark text-white rounded-4 overflow-hidden">
      {/* Imagen superior de la pizza */}
      <div className="card-pizza-img-container overflow-hidden position-relative">
        <Card.Img variant="top" src={img} alt={`Pizza ${name}`} className="card-pizza-img" />
        <div className="card-pizza-overlay"></div>
      </div>
      
      <Card.Body className="d-flex flex-column text-center p-4">
        {/* Título de la pizza */}
        <Card.Title className="pizza-title text-start mb-2 text-warning fw-bold fs-4">
          Pizza {name}
        </Card.Title>

        {desc && (
          <Card.Text className="text-start text-secondary small mb-3 opacity-75">
            {desc}
          </Card.Text>
        )}

        <hr className="border-secondary opacity-50 my-2" />

        {/* Requerimiento Hito 3: Itera por la lista de ingredientes de cada pizza y renderiza un <li> por cada ingrediente */}
        <div className="my-3 text-start">
          <p className="ingredients-label mb-2 text-uppercase tracking-wider small text-secondary">
            🍕 Ingredientes:
          </p>
          <ul className="ingredients-list list-unstyled ps-0 mb-0 d-flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <li 
                key={index} 
                className="badge bg-secondary bg-opacity-25 text-light border border-secondary fw-normal px-2 py-1 rounded-2"
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <hr className="border-secondary opacity-50 my-2" />

        {/* Sección de Precio */}
        <div className="my-3 text-center">
          <p className="price-text mb-0 fs-4 text-white">
            Precio: <span className="fw-bold text-success ms-1">{formatCurrency(price)}</span>
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="d-flex justify-content-between align-items-center pt-2 mt-auto gap-2">
          <Button variant="outline-light" size="sm" className="px-3 border-secondary rounded-3 flex-fill">
            Ver Más 👀
          </Button>
          <Button 
            variant="warning" 
            size="sm" 
            className="px-3 fw-bold text-dark rounded-3 flex-fill"
            onClick={onAddToCart}
          >
            Añadir 🛒
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardPizza;
