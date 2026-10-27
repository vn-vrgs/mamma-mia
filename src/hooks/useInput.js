import { useState } from 'react';

/**
 * Custom Hook useInput (Guía de Ejercicios y Clase JWT)
 * Encapsula la lógica de estado y cambio para inputs de formularios en React.
 * Permite desestructurar directamente {...email} en los elementos <input /> o <Form.Control />.
 */
export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    value,
    onChange: handleChange,
    setValue,
    reset,
  };
};

export default useInput;
