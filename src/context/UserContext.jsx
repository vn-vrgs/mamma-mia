import React, { createContext, useContext, useState, useEffect } from 'react';
import { translateErrorMessage } from '../utils/format';

// 1. Creación del contexto de usuario (Requerimiento 1, 2 y 3 - Hito 8)
export const UserContext = createContext();

const API_BASE_URL = 'http://localhost:5000/api';

// 2. Proveedor del contexto (UserProvider)
export const UserProvider = ({ children }) => {
  // Inicialización de estados desde localStorage para persistencia de sesión
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [email, setEmail] = useState(() => localStorage.getItem('email') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Requerimiento 1: Método para hacer login consumiendo /api/auth/login
   * Recibe email y password, almacena token JWT y email en los estados y en localStorage.
   */
  const login = async (userEmail, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(translateErrorMessage(data?.error, 'Error al iniciar sesión'));
      }

      // Almacenar token y email en los estados respectivos
      setToken(data.token);
      setEmail(data.email);
      setUser({ email: data.email });

      // Persistir en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);

      return { success: true, data };
    } catch (error) {
      const translatedMsg = translateErrorMessage(error, 'No se pudo iniciar sesión. Verifica tus credenciales.');
      console.error('Error en UserContext.login:', translatedMsg);
      throw new Error(translatedMsg);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Requerimiento 1: Método para hacer register consumiendo /api/auth/register
   * Recibe email y password, almacena token JWT y email en los estados y en localStorage.
   */
  const register = async (userEmail, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(translateErrorMessage(data?.error, 'Error al registrar usuario'));
      }

      // Almacenar token y email en los estados respectivos
      setToken(data.token);
      setEmail(data.email);
      setUser({ email: data.email });

      // Persistir en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);

      return { success: true, data };
    } catch (error) {
      const translatedMsg = translateErrorMessage(error, 'No se pudo completar el registro. Intenta nuevamente.');
      console.error('Error en UserContext.register:', translatedMsg);
      throw new Error(translatedMsg);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Requerimiento 2: Método para hacer logout
   * Elimina el token y el email del estado y de localStorage.
   */
  const logout = () => {
    setToken(null);
    setEmail(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  /**
   * Requerimiento 3: Método para obtener el perfil del usuario autenticado
   * Consume la ruta /api/auth/me enviando el token JWT en el header Authorization.
   */
  const getProfile = async () => {
    const currentToken = token || localStorage.getItem('token');
    if (!currentToken) {
      return null;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // Si el token es inválido o ha expirado, cerramos la sesión
        if (response.status === 401) {
          logout();
        }
        throw new Error(translateErrorMessage(data?.error, 'Error al consultar el perfil'));
      }

      // Actualizar datos del usuario y email en el estado
      setUser(data);
      if (data.email) {
        setEmail(data.email);
        localStorage.setItem('email', data.email);
      }

      return data;
    } catch (error) {
      const translatedMsg = translateErrorMessage(error, 'Error al consultar el perfil');
      console.error('Error en UserContext.getProfile:', translatedMsg);
      throw new Error(translatedMsg);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para hidratar el perfil del usuario si existe token al iniciar la app
  useEffect(() => {
    if (token) {
      getProfile().catch((err) => {
        console.warn('Sesión no recuperada:', translateErrorMessage(err));
      });
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        token,
        email,
        user,
        loading,
        login,
        register,
        logout,
        getProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom Hook para consumir el UserContext de forma segura
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser utilizado dentro de un UserProvider');
  }
  return context;
};

export default UserProvider;
