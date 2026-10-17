import React, { createContext, useContext, useState, useEffect } from 'react';
import { pizzas as mockPizzas } from '../pizzas';
  
// 1. Creación del contexto de pizzas
export const PizzaContext = createContext();

// 2. Proveedor del contexto (PizzaProvider)
export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener catálogo completo de pizzas
  const fetchPizzas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/api/pizzas');
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setPizzas(data);
    } catch (err) {
      console.warn(
        'Backend no disponible en http://localhost:5000, usando catálogo de respaldo local:',
        err.message
      );
      setPizzas(mockPizzas);
    } finally {
      setLoading(false);
    }
  };

  // Obtener pizza por ID (para vista de detalle)
  const getPizzaById = async (id = 'p001') => {
    try {
      const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (err) {
      console.warn(`Backend no disponible para pizza ${id}, buscando en catálogo local:`, err.message);
    }
    // Fallback local
    const found = pizzas.find((p) => p.id === id) || mockPizzas.find((p) => p.id === id) || mockPizzas[0];
    return found;
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <PizzaContext.Provider
      value={{
        pizzas,
        loading,
        error,
        fetchPizzas,
        getPizzaById,
      }}
    >
      {children}
    </PizzaContext.Provider>
  );
};  

// 3. Custom Hook para consumir pizzas
export const usePizzas = () => {
  const context = useContext(PizzaContext);
  if (!context) {
    throw new Error('usePizzas debe ser utilizado dentro de un PizzaProvider');
  }
  return context;
};

export default PizzaProvider;
