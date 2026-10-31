/**
 * src/utils/userStorage.js
 * Servicio de persistencia y validación de credenciales en LocalStorage.
 * Permite registrar, buscar, autenticar y almacenar usuarios de forma temporal
 * en el navegador del cliente sin requerir bases de datos externas.
 */

export const USERS_STORAGE_KEY = 'mamma_mia_users';
export const TOKEN_STORAGE_KEY = 'token';
export const EMAIL_STORAGE_KEY = 'email';
export const USER_STORAGE_KEY = 'currentUser';
export const ORDERS_STORAGE_KEY = 'mamma_mia_orders';

// Usuarios semilla para pruebas inmediatas si localStorage está limpio
export const DEFAULT_STORED_USERS = [
  {
    id: 'usr_demo_1',
    email: 'test@test.com',
    password: '123123',
    createdAt: '2026-10-30T10:00:00.000Z',
  },
  {
    id: 'usr_demo_2',
    email: 'qa_user@mammamia.test',
    password: 'password123',
    createdAt: '2026-10-30T10:00:00.000Z',
  },
  {
    id: 'usr_demo_3',
    email: 'admin@mammamia.com',
    password: 'admin123',
    createdAt: '2026-10-30T10:00:00.000Z',
  },
];

/**
 * Wrapper seguro para interactuar con LocalStorage en cualquier entorno (Browser o Node.js)
 */
export const safeStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
      if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
        return globalThis.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`Error al leer ${key} de localStorage:`, e);
    }
    return null;
  },
  setItem: (key, value) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      } else if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
        globalThis.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn(`Error al escribir ${key} en localStorage:`, e);
    }
  },
  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      } else if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
        globalThis.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn(`Error al eliminar ${key} de localStorage:`, e);
    }
  },
};

/**
 * Obtiene la lista completa de usuarios registrados desde localStorage.
 * Si no existe o está vacía, la inicializa con las cuentas por defecto.
 */
export const getStoredUsers = () => {
  try {
    const raw = safeStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      safeStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_STORED_USERS));
      return [...DEFAULT_STORED_USERS];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      safeStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_STORED_USERS));
      return [...DEFAULT_STORED_USERS];
    }
    return parsed;
  } catch (error) {
    console.warn('Error al parsear usuarios desde localStorage:', error);
    return [...DEFAULT_STORED_USERS];
  }
};

/**
 * Guarda la lista de usuarios en localStorage.
 */
export const saveStoredUsers = (users) => {
  try {
    safeStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error al guardar usuarios en localStorage:', error);
  }
};

/**
 * Busca un usuario por email (case-insensitive) en localStorage.
 */
export const findUserByEmail = (email) => {
  if (!email) return null;
  const cleanEmail = email.trim().toLowerCase();
  const users = getStoredUsers();
  return users.find((u) => u.email.toLowerCase() === cleanEmail) || null;
};

/**
 * Registra una nueva cuenta de usuario en localStorage.
 * Retorna el usuario creado o lanza error si ya existe o los datos son inválidos.
 */
export const registerUserInStorage = (email, password) => {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  if (!cleanEmail || !cleanPassword) {
    throw new Error('El correo electrónico y la contraseña son obligatorios.');
  }

  if (cleanPassword.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres.');
  }

  const existing = findUserByEmail(cleanEmail);
  if (existing) {
    throw new Error('El correo electrónico ya se encuentra registrado. Inicia sesión con tus credenciales.');
  }

  const users = getStoredUsers();
  const newUser = {
    id: `usr_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    email: cleanEmail,
    password: cleanPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveStoredUsers(users);

  return newUser;
};

/**
 * Valida credenciales contra las cuentas en localStorage.
 * Retorna el usuario coincidente o lanza un error descriptivo.
 */
export const authenticateUserInStorage = (email, password) => {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  if (!cleanEmail || !cleanPassword) {
    throw new Error('El correo electrónico y la contraseña son obligatorios.');
  }

  if (cleanPassword.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres.');
  }

  const user = findUserByEmail(cleanEmail);
  if (!user) {
    throw new Error('Usuario no encontrado. Asegúrate de registrarte primero con el botón "Register".');
  }

  // Compatibilidad para demo
  const isDemo = cleanEmail === 'test@test.com';
  const isMatch =
    user.password === cleanPassword ||
    (isDemo && (cleanPassword === '123123' || cleanPassword === 'password123'));

  if (!isMatch) {
    throw new Error('Contraseña incorrecta. Verifica tus credenciales e intenta nuevamente.');
  }

  return user;
};

/**
 * Genera un token JWT compatible en base64 para autenticación y persistencia de sesión.
 */
export const generateSessionToken = (payload) => {
  try {
    const encode = typeof btoa === 'function' ? btoa : (str) => Buffer.from(str, 'binary').toString('base64');
    const header = encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = encode(
      JSON.stringify({
        ...payload,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400,
      })
    );
    const signature = encode('mamma_mia_auth_secret_sign');
    return `${header}.${body}.${signature}`;
  } catch {
    return `jwt_session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
};
