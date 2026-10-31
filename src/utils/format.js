/**
 * Helper utility to format numbers using Spanish (Chile) locale.
 * Adds thousands separators (e.g. 25000 -> "25.000").
 * 
 * @param {number} amount 
 * @returns {string}
 */
export const formatNumber = (amount) => {
  if (typeof amount !== 'number') return '0';
  return amount.toLocaleString('es-CL');
};

/**
 * Helper utility to format amounts with currency symbol.
 * Example: 25000 -> "$25.000"
 * 
 * @param {number} amount 
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return `$${formatNumber(amount)}`;
};

/**
 * Normaliza y traduce mensajes de error técnicos (por ejemplo, "Failed to fetch") a español legible.
 * 
 * @param {Error|string} error 
 * @param {string} [defaultMessage] 
 * @returns {string}
 */
export const translateErrorMessage = (error, defaultMessage = 'Ocurrió un error inesperado') => {
  const message = typeof error === 'string' ? error : error?.message;
  if (!message) return defaultMessage;

  const lower = message.toLowerCase();
  if (lower.includes('failed to fetch') || lower.includes('networkerror') || lower.includes('load failed')) {
    return 'No se pudo conectar con el servidor. Por favor, verifica tu conexión o que el servicio esté disponible.';
  }
  if (lower.includes('user not found')) {
    return 'Usuario no encontrado.';
  }
  if (lower.includes('invalid password')) {
    return 'Contraseña incorrecta.';
  }
  if (lower.includes('user already exists')) {
    return 'El usuario ya se encuentra registrado.';
  }
  if (lower.includes('email and password are required')) {
    return 'El correo y la contraseña son obligatorios.';
  }
  if (lower.includes('invalid email')) {
    return 'Correo electrónico no válido.';
  }
  if (lower.includes('password must be at least 6 characters')) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  if (lower.includes('server error')) {
    return 'Error interno en el servidor.';
  }

  return message;
};
