import React, { createContext, useContext, useState } from 'react';

// 1. Creación del contexto de usuario (Requerimiento 2 - Hito 7)
export const UserContext = createContext();
  
// 2. Proveedor del contexto (UserProvider)
export const UserProvider = ({ children }) => {
  // Estado que almacena el token simulado, por defecto en true (Requerimiento 2.1)
  const [token, setToken] = useState(true);

  // Método logout que cambia el estado del token a false (Requerimiento 2.2)
  const logout = () => {
    setToken(false);
  };

  // Método login para permitir simular el inicio de sesión y probar la reactividad
  const login = () => {
    setToken(true);
  };

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        logout,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom Hook para consumir el UserContext de forma sencilla y segura
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser utilizado dentro de un UserProvider');
  }
  return context;
};

export default UserProvider;
