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
