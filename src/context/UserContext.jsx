import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translateErrorMessage } from '../utils/format';
import {
  USERS_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
  EMAIL_STORAGE_KEY,
  USER_STORAGE_KEY,
  safeStorage,
  getStoredUsers,
  saveStoredUsers,
  registerUserInStorage,
  authenticateUserInStorage,
  generateSessionToken,
} from '../utils/userStorage';

// Re-exportar utilidades de almacenamiento para compatibilidad
export {
  USERS_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
  EMAIL_STORAGE_KEY,
  USER_STORAGE_KEY,
  safeStorage,
  getStoredUsers,
  saveStoredUsers,
  registerUserInStorage,
  authenticateUserInStorage,
  generateSessionToken,
};

// 1. Creación del contexto de usuario
export const UserContext = createContext();

const API_BASE_URL = 'http://localhost:5000/api';

// 2. Proveedor del contexto (UserProvider)
export const UserProvider = ({ children }) => {
  // Inicialización de estados desde localStorage para persistencia de sesión
  const [token, setToken] = useState(() => safeStorage.getItem(TOKEN_STORAGE_KEY) || null);
  const [email, setEmail] = useState(() => safeStorage.getItem(EMAIL_STORAGE_KEY) || null);
  const [user, setUser] = useState(() => {
    const cached = safeStorage.getItem(USER_STORAGE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  // Asegurar inicialización de la lista de usuarios en localStorage al montar
  useEffect(() => {
    getStoredUsers();
  }, []);

  /**
   * Requerimiento: Registro de credenciales en localStorage.
   * Crea y almacena la nueva cuenta de usuario (email y contraseña) de forma persistente en localStorage.
   * También genera el token y establece la sesión activa.
   */
  const register = async (userEmail, password) => {
    try {
      setLoading(true);
      const cleanEmail = (userEmail || '').trim().toLowerCase();
      const cleanPassword = (password || '').trim();

      // 1. Registrar y persistir en localStorage de forma síncrona/inmediata
      const newUser = registerUserInStorage(cleanEmail, cleanPassword);

      // 2. Generar token de sesión
      let sessionToken = generateSessionToken({ email: newUser.email, id: newUser.id });

      // 3. Intento no bloqueante de sincronización con backend Express (si estuviera activo)
      try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data?.token) {
            sessionToken = data.token;
          }
        }
      } catch (backendError) {
        console.info('Modo LocalStorage activo: credenciales registradas localmente con éxito.');
      }

      // 4. Establecer estados y persistir sesión en localStorage
      setToken(sessionToken);
      setEmail(newUser.email);
      setUser({ id: newUser.id, email: newUser.email });

      safeStorage.setItem(TOKEN_STORAGE_KEY, sessionToken);
      safeStorage.setItem(EMAIL_STORAGE_KEY, newUser.email);
      safeStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ id: newUser.id, email: newUser.email }));

      return {
        success: true,
        data: {
          email: newUser.email,
          token: sessionToken,
          id: newUser.id,
        },
      };
    } catch (error) {
      const translatedMsg = translateErrorMessage(error, 'No se pudo completar el registro. Intenta nuevamente.');
      console.error('Error en UserContext.register:', translatedMsg);
      throw new Error(translatedMsg);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Requerimiento: Login que reconoce las credenciales creadas en Register almacenadas en localStorage.
   * Valida email y password contra las credenciales registradas localmente.
   */
  const login = async (userEmail, password) => {
    try {
      setLoading(true);
      const cleanEmail = (userEmail || '').trim().toLowerCase();
      const cleanPassword = (password || '').trim();

      let authenticatedUser = null;

      // 1. Intentar autenticar contra las cuentas guardadas en localStorage
      try {
        authenticatedUser = authenticateUserInStorage(cleanEmail, cleanPassword);
      } catch (localAuthErr) {
        // Si no está o falló localmente, revisar si el backend lo tiene (en caso de servidor externo)
        try {
          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
          });

          if (response.ok) {
            const data = await response.json();
            const users = getStoredUsers();
            authenticatedUser = {
              id: data.id || `usr_${Date.now()}`,
              email: cleanEmail,
              password: cleanPassword,
              createdAt: new Date().toISOString(),
            };
            users.push(authenticatedUser);
            saveStoredUsers(users);

            setToken(data.token);
            setEmail(data.email);
            setUser({ id: authenticatedUser.id, email: data.email });

            safeStorage.setItem(TOKEN_STORAGE_KEY, data.token);
            safeStorage.setItem(EMAIL_STORAGE_KEY, data.email);
            safeStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ id: authenticatedUser.id, email: data.email }));

            return { success: true, data };
          }
        } catch {}

        // Relanzar el error de validación local
        throw localAuthErr;
      }

      // 2. Generar sesión local
      let sessionToken = generateSessionToken({ email: authenticatedUser.email, id: authenticatedUser.id });

      // Intento opcional de sincronización con backend
      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data?.token) {
            sessionToken = data.token;
          }
        }
      } catch {}

      // 3. Almacenar sesión activa en estados y localStorage
      setToken(sessionToken);
      setEmail(authenticatedUser.email);
      setUser({ id: authenticatedUser.id, email: authenticatedUser.email });

      safeStorage.setItem(TOKEN_STORAGE_KEY, sessionToken);
      safeStorage.setItem(EMAIL_STORAGE_KEY, authenticatedUser.email);
      safeStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ id: authenticatedUser.id, email: authenticatedUser.email }));

      return {
        success: true,
        data: {
          email: authenticatedUser.email,
          token: sessionToken,
          id: authenticatedUser.id,
        },
      };
    } catch (error) {
      const translatedMsg = translateErrorMessage(error, 'No se pudo iniciar sesión. Verifica tus credenciales.');
      console.error('Error en UserContext.login:', translatedMsg);
      throw new Error(translatedMsg);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Requerimiento: Cerrar sesión.
   * Elimina el token, email y usuario de la sesión activa, pero CONSERVA las credenciales registradas en localStorage.
   */
  const logout = useCallback(() => {
    setToken(null);
    setEmail(null);
    setUser(null);
    safeStorage.removeItem(TOKEN_STORAGE_KEY);
    safeStorage.removeItem(EMAIL_STORAGE_KEY);
    safeStorage.removeItem(USER_STORAGE_KEY);
  }, []);

  /**
   * Requerimiento: Obtener información del perfil autenticado.
   * Lee la sesión y perfil desde localStorage o /api/auth/me si está disponible.
   */
  const getProfile = useCallback(async () => {
    const currentToken = token || safeStorage.getItem(TOKEN_STORAGE_KEY);
    const currentEmail = email || safeStorage.getItem(EMAIL_STORAGE_KEY);

    if (!currentToken) {
      return null;
    }

    try {
      setLoading(true);

      // 1. Revisar si tenemos currentUser en localStorage
      const cached = safeStorage.getItem(USER_STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setUser(parsed);
          if (parsed.email) setEmail(parsed.email);
          return parsed;
        } catch {}
      }

      // 2. Buscar en los usuarios registrados de localStorage
      if (currentEmail) {
        const users = getStoredUsers();
        const found = users.find((u) => u.email.toLowerCase() === currentEmail.toLowerCase());
        if (found) {
          const profileData = { id: found.id, email: found.email };
          setUser(profileData);
          setEmail(found.email);
          safeStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profileData));
          return profileData;
        }
      }

      // 3. Intentar consultar el backend si está activo
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          if (data.email) {
            setEmail(data.email);
            safeStorage.setItem(EMAIL_STORAGE_KEY, data.email);
          }
          safeStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
          return data;
        }
      } catch {}

      // Fallback perfil local
      const fallbackProfile = {
        email: currentEmail || 'usuario@mammamia.com',
        id: 'usr_local',
      };
      setUser(fallbackProfile);
      return fallbackProfile;
    } catch (error) {
      console.warn('Advertencia en getProfile:', error.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token, email]);

  // Efecto para hidratar el perfil del usuario si existe token al iniciar la app
  useEffect(() => {
    if (token) {
      getProfile().catch(() => {});
    }
  }, [token, getProfile]);

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
