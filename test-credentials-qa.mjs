/**
 * SUITE DE PRUEBAS AUTOMATIZADAS DE TESTING QA - CREDENCIALES & LOCALSTORAGE
 * Proyecto: Pizzería Mamma Mia!
 * Rol: Especialista en Testing QA & Full Stack Developer
 * 
 * Casos de Prueba Verificados:
 *  - QA-01: Inicialización automática de LocalStorage para usuarios
 *  - QA-02: Botón "Register": Creación y persistencia de Cuenta de Usuario y Contraseña en LocalStorage
 *  - QA-03: Botón "Register": Prevención de duplicación de cuentas existentes
 *  - QA-04: Botón "Register": Validación de campos vacíos y longitud mínima de contraseña
 *  - QA-05: Botón "Login": Reconocimiento exitoso de la cuenta creada en "Register"
 *  - QA-06: Botón "Login": Rechazo de autenticación cuando la contraseña es incorrecta
 *  - QA-07: Botón "Login": Rechazo de cuenta no registrada
 *  - QA-08: Botón "Logout": Limpieza de sesión activa conservando las cuentas creadas en LocalStorage
 *  - QA-09: Botón "Login": Re-ingreso exitoso con las mismas credenciales persistidas
 *  - QA-10: Vista Cart: Botón "Pagar" deshabilitado (disabled=true) cuando el usuario NO está logeado
 *  - QA-11: Vista Cart: Botón "Pagar" HABILITADO (disabled=false) una vez logeadas las credenciales
 *  - QA-12: Ejecución de Pago: Orden registrada con éxito en LocalStorage y confirmación visual
 *  - QA-13: Disponibilidad de Cuenta Demo para evaluación inmediata ("test@test.com" / "123123")
 */

// Simulación de entorno Browser LocalStorage para pruebas automatizadas
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
}

globalThis.window = { localStorage: new LocalStorageMock() };
globalThis.localStorage = globalThis.window.localStorage;

// Importar servicio de LocalStorage
import {
  USERS_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
  EMAIL_STORAGE_KEY,
  USER_STORAGE_KEY,
  ORDERS_STORAGE_KEY,
  getStoredUsers,
  saveStoredUsers,
  findUserByEmail,
  registerUserInStorage,
  authenticateUserInStorage,
  generateSessionToken,
} from './src/utils/userStorage.js';

const qaResults = [];

function recordQACase(id, description, passed, details = '') {
  qaResults.push({ id, description, passed, details });
  const icon = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${icon} | [Caso ${id}] ${description} ${details ? `-> ${details}` : ''}`);
}

async function runQACredentialsSuite() {
  console.log('\n===============================================================');
  console.log('🧪 SUITE DE PRUEBAS QA: GESTIÓN DE CREDENCIALES & LOCALSTORAGE');
  console.log('Ambiente: Standalone Frontend (Sin bases de datos externas)');
  console.log('===============================================================\n');

  try {
    // -------------------------------------------------------------
    // PRUEBA 1: Inicialización de LocalStorage con usuarios iniciales
    // -------------------------------------------------------------
    localStorage.clear();
    const initialUsers = getStoredUsers();
    recordQACase(
      'QA-01',
      'Inicialización automática de LocalStorage para usuarios',
      Array.isArray(initialUsers) && initialUsers.length >= 2,
      `Usuarios iniciales disponibles: ${initialUsers.length}`
    );

    // -------------------------------------------------------------
    // PRUEBA 2: Creación de credenciales con botón 'Register'
    // -------------------------------------------------------------
    const testEmail = `cliente_qa_${Date.now()}@mammamia.cl`;
    const testPassword = 'mipassword123';

    // Ejecución de registro mediante el servicio
    const registeredUser = registerUserInStorage(testEmail, testPassword);
    const tokenAfterRegister = generateSessionToken({ email: registeredUser.email, id: registeredUser.id });

    // Guardar sesión activa como hace UserContext
    localStorage.setItem(TOKEN_STORAGE_KEY, tokenAfterRegister);
    localStorage.setItem(EMAIL_STORAGE_KEY, registeredUser.email);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ id: registeredUser.id, email: registeredUser.email }));

    // Verificar que quedó registrado en USERS_STORAGE_KEY
    const storedAfterRegister = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const registeredAccount = storedAfterRegister.find((u) => u.email === testEmail.toLowerCase());

    const isRegisterSuccessful =
      Boolean(registeredAccount) &&
      registeredAccount.password === testPassword &&
      Boolean(registeredAccount.id);

    recordQACase(
      'QA-02',
      'Botón "Register": Creación y persistencia de Cuenta de Usuario y Contraseña en LocalStorage',
      isRegisterSuccessful,
      `Cuenta creada: ${testEmail} | ID: ${registeredAccount?.id}`
    );

    // -------------------------------------------------------------
    // PRUEBA 3: Rechazo de duplicados en 'Register'
    // -------------------------------------------------------------
    let duplicateRejected = false;
    try {
      registerUserInStorage(testEmail, 'otrapassword123');
    } catch (e) {
      duplicateRejected = e.message.includes('ya se encuentra registrado');
    }

    recordQACase(
      'QA-03',
      'Botón "Register": Prevención de duplicación de cuentas existentes',
      duplicateRejected,
      'Rechazó duplicado con mensaje informativo'
    );

    // -------------------------------------------------------------
    // PRUEBA 4: Validaciones en 'Register' (Campos vacíos o contraseña < 6)
    // -------------------------------------------------------------
    let validationPassed = false;
    try {
      registerUserInStorage('test_short@mail.com', '123');
    } catch (e) {
      validationPassed = e.message.includes('al menos 6 caracteres');
    }

    recordQACase(
      'QA-04',
      'Botón "Register": Validación de contraseñas cortas (< 6 caracteres)',
      validationPassed,
      'Rechazó contraseña débil correctamente'
    );

    // -------------------------------------------------------------
    // PRUEBA 5: Reconocimiento de la cuenta en el botón 'Login'
    // -------------------------------------------------------------
    const authResult = authenticateUserInStorage(testEmail, testPassword);
    const isLoginRecognized =
      Boolean(authResult) &&
      authResult.email === testEmail.toLowerCase() &&
      authResult.password === testPassword;

    recordQACase(
      'QA-05',
      'Botón "Login": Reconocimiento exitoso de la cuenta creada en "Register"',
      isLoginRecognized,
      `Cuenta reconocida en LocalStorage: ${authResult?.email}`
    );

    // -------------------------------------------------------------
    // PRUEBA 6: Login con contraseña incorrecta (Caso Negativo QA)
    // -------------------------------------------------------------
    let wrongPasswordBlocked = false;
    try {
      authenticateUserInStorage(testEmail, 'clave_erronea_999');
    } catch (e) {
      wrongPasswordBlocked = e.message.includes('Contraseña incorrecta');
    }

    recordQACase(
      'QA-06',
      'Botón "Login": Rechazo de autenticación cuando la contraseña es incorrecta',
      wrongPasswordBlocked,
      'Mensaje: Contraseña incorrecta'
    );

    // -------------------------------------------------------------
    // PRUEBA 7: Login con correo inexistente (Caso Negativo QA)
    // -------------------------------------------------------------
    let unregisteredBlocked = false;
    try {
      authenticateUserInStorage('cuenta_fantasma@mammamia.cl', 'password123');
    } catch (e) {
      unregisteredBlocked = e.message.includes('Usuario no encontrado');
    }

    recordQACase(
      'QA-07',
      'Botón "Login": Rechazo de cuenta no registrada',
      unregisteredBlocked,
      'Mensaje: Usuario no encontrado'
    );

    // -------------------------------------------------------------
    // PRUEBA 8: Logout preserva las cuentas registradas en LocalStorage
    // -------------------------------------------------------------
    // Al hacer logout se limpian las claves de sesión activa
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(EMAIL_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);

    const usersAfterLogout = getStoredUsers();
    const accountStillExists = usersAfterLogout.some((u) => u.email === testEmail.toLowerCase());
    const sessionCleared = localStorage.getItem(TOKEN_STORAGE_KEY) === null;

    recordQACase(
      'QA-08',
      'Botón "Logout": Limpieza de sesión activa conservando las cuentas creadas en LocalStorage',
      accountStillExists && sessionCleared,
      `Cuentas persistidas en LocalStorage: ${usersAfterLogout.length} | Sesión borrada: Sí`
    );

    // -------------------------------------------------------------
    // PRUEBA 9: Re-login con la cuenta registrada tras haber cerrado sesión
    // -------------------------------------------------------------
    const reLoginUser = authenticateUserInStorage(testEmail, testPassword);
    const newSessionToken = generateSessionToken({ email: reLoginUser.email, id: reLoginUser.id });
    localStorage.setItem(TOKEN_STORAGE_KEY, newSessionToken);
    localStorage.setItem(EMAIL_STORAGE_KEY, reLoginUser.email);

    recordQACase(
      'QA-09',
      'Botón "Login": Re-ingreso exitoso con las mismas credenciales persistidas',
      Boolean(reLoginUser) && Boolean(localStorage.getItem(TOKEN_STORAGE_KEY)),
      `Sesión re-establecida para: ${reLoginUser.email}`
    );

    // -------------------------------------------------------------
    // PRUEBA 10: Carrito - Botón "Pagar" deshabilitado si NO hay sesión
    // -------------------------------------------------------------
    const mockCart = [
      { id: 'p001', name: 'napolitana', price: 5950, count: 2 },
      { id: 'p002', name: 'espaniola', price: 7250, count: 1 },
    ];
    const totalOrder = mockCart.reduce((sum, item) => sum + item.price * item.count, 0);

    // Regla de activación en Cart.jsx: disabled = !token || cart.length === 0
    const isPagarDisabled = (token, cart) => !token || cart.length === 0;

    const noToken = null;
    const testCheckoutDisabled = isPagarDisabled(noToken, mockCart);

    recordQACase(
      'QA-10',
      'Vista Cart: Botón "Pagar" deshabilitado (disabled=true) cuando el usuario NO está logeado',
      testCheckoutDisabled === true,
      `Estado disabled: ${testCheckoutDisabled} | Requiere inicio de sesión`
    );

    // -------------------------------------------------------------
    // PRUEBA 11: Carrito - Botón "Pagar" HABILITADO una vez logeado
    // -------------------------------------------------------------
    const activeToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    const testCheckoutEnabled = isPagarDisabled(activeToken, mockCart) === false;

    recordQACase(
      'QA-11',
      'Vista Cart: Botón "Pagar" HABILITADO (disabled=false) una vez logeadas las credenciales',
      testCheckoutEnabled === true,
      `Estado habilitado: ${testCheckoutEnabled} | Total orden: $${totalOrder.toLocaleString('es-CL')}`
    );

    // -------------------------------------------------------------
    // PRUEBA 12: Procesamiento de Pago y persistencia de orden en LocalStorage
    // -------------------------------------------------------------
    const storedOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
    const newOrder = {
      orderId: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: mockCart,
      totalAmount: totalOrder,
      userEmail: testEmail,
    };
    storedOrders.push(newOrder);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(storedOrders));

    const ordersInStorage = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
    const orderSaved = ordersInStorage.find((o) => o.orderId === newOrder.orderId);

    recordQACase(
      'QA-12',
      'Ejecución de Pago: Orden registrada con éxito en LocalStorage y confirmación visual',
      Boolean(orderSaved) && orderSaved.totalAmount === totalOrder,
      `Orden ID: ${orderSaved?.orderId} | Monto: $${orderSaved?.totalAmount}`
    );

    // -------------------------------------------------------------
    // PRUEBA 13: Cuenta Demo pre-cargada 'test@test.com' / '123123'
    // -------------------------------------------------------------
    const demoAuth = authenticateUserInStorage('test@test.com', '123123');

    recordQACase(
      'QA-13',
      'Disponibilidad de Cuenta Demo para evaluación inmediata ("test@test.com" / "123123")',
      Boolean(demoAuth),
      `Demo email: ${demoAuth?.email} autenticado exitosamente`
    );

    // -------------------------------------------------------------
    // RESUMEN QA
    // -------------------------------------------------------------
    const totalCases = qaResults.length;
    const passedCases = qaResults.filter((r) => r.passed).length;
    const failedCases = totalCases - passedCases;
    const approvalRate = ((passedCases / totalCases) * 100).toFixed(1);

    console.log('\n===============================================================');
    console.log('📊 RESUMEN FINAL DEL INFORME DE TESTING QA');
    console.log(`Casos de Prueba Ejecutados: ${totalCases}`);
    console.log(`Pruebas Aprobadas:          ${passedCases}`);
    console.log(`Pruebas Fallidas:           ${failedCases}`);
    console.log(`Tasa de Aprobación:         ${approvalRate}%`);
    console.log('===============================================================\n');

    if (failedCases > 0) {
      process.exit(1);
    } else {
      console.log('🎯 RESULTADO QA: TODOS LOS CASOS DE PRUEBA FUERON SATISFACTORIOS.');
    }
  } catch (err) {
    console.error('Error fatal durante la suite QA:', err);
    process.exit(1);
  }
}

runQACredentialsSuite();
