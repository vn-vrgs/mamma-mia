// src/pizzas.js
import napolitanaImg from './assets/img/napolitana.jpg';
import espaniolaImg from './assets/img/espaniola.jpg';
import pepperoniImg from './assets/img/pepperoni.jpg';
import vegetarianaImg from './assets/img/vegetariana.jpg';
import supremaImg from './assets/img/suprema.jpg';
import cuatroquesosImg from './assets/img/cuatroquesos.jpg';

export const pizzas = [
  {
    id: "p001",
    name: "Napolitana",
    price: 5950,
    ingredients: ["mozzarella", "tomates", "jamón", "orégano"],
    img: napolitanaImg,
    desc: "La pizza Napolitana es un clásico italiano con una suave base de salsa de tomate fresco, abundante queso mozzarella y orégano."
  },
  {
    id: "p002",
    name: "Española",
    price: 6950,
    ingredients: ["mozzarella", "gorgonzola", "parmesano", "provolone"],
    img: espaniolaImg,
    desc: "Exquisita combinación de cuatro quesos seleccionados sobre una crujiente masa horneada a la perfección."
  },
  {
    id: "p003",
    name: "Pepperoni",
    price: 6950,
    ingredients: ["mozzarella", "pepperoni", "orégano"],
    img: pepperoniImg,
    desc: "Sabrosas rodajas de pepperoni americano con queso mozzarella derretido y finas especias."
  },
  {
    id: "p004",
    name: "Vegetariana",
    price: 5950,
    ingredients: ["mozzarella", "tomates", "champiñones", "aceitunas"],
    img: vegetarianaImg,
    desc: "Una selección fresca de vegetales de temporada sobre queso mozzarella derretido y salsa artesanal."
  },
  {
    id: "p005",
    name: "Suprema",
    price: 7950,
    ingredients: ["mozzarella", "pepperoni", "salchicha", "pimientos", "cebolla"],
    img: supremaImg,
    desc: "Cargada con una combinación explosiva de carnes de alta calidad y vegetales frescos."
  },
  {
    id: "p006",
    name: "Cuatro Quesos",
    price: 6950,
    ingredients: ["mozzarella", "gorgonzola", "parmesano", "provolone"],
    img: cuatroquesosImg,
    desc: "La mezcla artesanal definitiva de quesos madurados y cremosos para paladares exigentes."
  }
];

export const pizzaCart = [];

export default pizzas;
