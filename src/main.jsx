import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import UserProvider from './context/UserContext.jsx';
import CartProvider from './context/CartContext.jsx';
import PizzaProvider from './context/PizzaContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PizzaProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </PizzaProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
