import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoute from "./routes/auth.route.js";
import checkoutRoute from "./routes/checkout.route.js";
import pizzaRoute from "./routes/pizza.route.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/pizzas", pizzaRoute);
app.use("/api/checkouts", checkoutRoute);
app.use((_, res) => {
  res.status(404).json({ error: "Not Found" });
});

const TEST_PORT = 5055;
const BASE_URL = `http://localhost:${TEST_PORT}/api`;

const testResults = [];

function recordResult(testName, passed, details = "") {
  testResults.push({ testName, passed, details });
  const symbol = passed ? "✅ PASS" : "❌ FAIL";
  console.log(`${symbol} | ${testName} ${details ? `(${details})` : ""}`);
}

async function runTestSuite() {
  const server = app.listen(TEST_PORT, async () => {
    console.log(`\n========================================`);
    console.log(`🧪 SUITE DE PRUEBAS QA AUTOMATIZADAS`);
    console.log(`Pizzería Mamma Mia - Backend & API Testing`);
    console.log(`Servidor de pruebas escuchando en puerto ${TEST_PORT}`);
    console.log(`========================================\n`);

    try {
      // Test 1: Catálogo de pizzas GET /api/pizzas
      const resPizzas = await fetch(`${BASE_URL}/pizzas`);
      const pizzas = await resPizzas.json();
      recordResult(
        "GET /api/pizzas - Catálogo de pizzas",
        resPizzas.ok && Array.isArray(pizzas) && pizzas.length > 0,
        `Pizzas devueltas: ${pizzas.length}`
      );

      // Test 2: Registro de nuevo usuario POST /api/auth/register
      const randomId = Math.floor(Math.random() * 100000);
      const testEmail = `qa_user_${randomId}@mammamia.test`;
      const testPassword = "password123";

      const resRegister = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail, password: testPassword }),
      });
      const dataRegister = await resRegister.json();
      const registerSuccess =
        resRegister.ok &&
        dataRegister.token &&
        dataRegister.email === testEmail;
      recordResult(
        "POST /api/auth/register - Registro de nuevo usuario (Req 1)",
        registerSuccess,
        `Email: ${dataRegister.email}, Token generado: ${Boolean(dataRegister.token)}`
      );

      // Test 3: Login con usuario recién registrado POST /api/auth/login
      const resLogin = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail, password: testPassword }),
      });
      const dataLogin = await resLogin.json();
      const loginSuccess =
        resLogin.ok &&
        dataLogin.token &&
        dataLogin.email === testEmail;
      const userToken = dataLogin.token;
      recordResult(
        "POST /api/auth/login - Autenticación con credenciales correctas (Req 1)",
        loginSuccess,
        `JWT válido recibido: ${Boolean(userToken)}`
      );

      // Test 4: Login con contraseña incorrecta (caso negativo)
      const resLoginBad = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail, password: "wrongpassword" }),
      });
      recordResult(
        "POST /api/auth/login - Rechazo de contraseña inválida (QA Negativo)",
        resLoginBad.status === 400,
        `Status HTTP: ${resLoginBad.status}`
      );

      // Test 5: Perfil de usuario sin token GET /api/auth/me (debe fallar 401)
      const resMeNoToken = await fetch(`${BASE_URL}/auth/me`);
      recordResult(
        "GET /api/auth/me - Rechazo cuando no se proporciona Token (Req 3)",
        resMeNoToken.status === 401,
        `Status HTTP: ${resMeNoToken.status}`
      );

      // Test 6: Perfil de usuario con Bearer token válido GET /api/auth/me
      const resMeWithToken = await fetch(`${BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const dataMe = await resMeWithToken.json();
      const meSuccess =
        resMeWithToken.ok &&
        dataMe.email === testEmail &&
        Boolean(dataMe.id);
      recordResult(
        "GET /api/auth/me - Obtención de perfil autenticado con JWT (Req 3)",
        meSuccess,
        `Email: ${dataMe.email}, User ID: ${dataMe.id}`
      );

      // Test 7: Checkout sin token POST /api/checkouts (debe fallar 401)
      const mockCart = [
        { id: "p001", name: "napolitana", price: 5950, count: 2 },
      ];
      const resCheckoutNoToken = await fetch(`${BASE_URL}/checkouts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: mockCart }),
      });
      recordResult(
        "POST /api/checkouts - Rechazo de checkout sin autenticación (Req 7)",
        resCheckoutNoToken.status === 401,
        `Status HTTP: ${resCheckoutNoToken.status}`
      );

      // Test 8: Checkout con token válido POST /api/checkouts
      const resCheckoutWithToken = await fetch(`${BASE_URL}/checkouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ cart: mockCart }),
      });
      const dataCheckout = await resCheckoutWithToken.json();
      const checkoutSuccess =
        resCheckoutWithToken.ok &&
        dataCheckout.message === "Checkout successful" &&
        Boolean(dataCheckout.user);
      recordResult(
        "POST /api/checkouts - Procesamiento exitoso de carrito con JWT (Req 7)",
        checkoutSuccess,
        `Mensaje: ${dataCheckout.message}, User ID: ${dataCheckout.user?.id}`
      );

      // Resumen estadístico
      const passedCount = testResults.filter((r) => r.passed).length;
      const totalCount = testResults.length;
      const successRate = ((passedCount / totalCount) * 100).toFixed(1);

      console.log(`\n========================================`);
      console.log(`📊 RESUMEN ESTADÍSTICO DE PRUEBAS QA`);
      console.log(`Total de Casos Ejecutados: ${totalCount}`);
      console.log(`Pruebas Aprobadas:         ${passedCount}`);
      console.log(`Pruebas Fallidas:          ${totalCount - passedCount}`);
      console.log(`Tasa de Aprobación:        ${successRate}%`);
      console.log(`========================================\n`);

    } catch (err) {
      console.error("Error en pruebas QA:", err);
    } finally {
      if (server.closeAllConnections) {
        server.closeAllConnections();
      }
      server.close();
    }
  });
}

runTestSuite();
