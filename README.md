# 🍕 Hito 7 - Pizzería Mamma Mía 
### (React Router II: Rutas Protegidas, Parámetros Dinámicos y Contexto de Usuario)
  
Este proyecto corresponde al **Hito 7** del módulo de React, enfocado en la consolidación de **React Router II** junto con la integración de **Context API** para la gestión de autenticación simulada, rutas protegidas mediante redirecciones condicionales (`<Navigate />`), consumo de parámetros de URL con el hook `useParams`, estilización de rutas activas mediante `NavLink`, y control de acciones según el estado de sesión del usuario.

---

## 🔗 Enlaces Oficiales

- **Repositorio en GitHub**:
  - [https://github.com/vn-vrgs/mamma-mia.git](https://github.com/vn-vrgs/mamma-mia.git)
- **Despliegue en Vivo (Vercel)**: 
  - [https://mamma-mia-gamma.vercel.app/](https://mamma-mia-gamma.vercel.app/)

---

## 📋 Requerimientos del Hito 7 Implementados (10 / 10 Puntos)

### 1. Parámetros Dinámicos con `useParams` en `Pizza.jsx` (2 puntos)
- [x] **Captura de ID dinámico:** Se implementó el hook `useParams` en `src/pages/Pizza.jsx` para extraer el parámetro `id` proveniente de la ruta `/pizza/:id`.
- [x] **Petición a la API:** Con el ID obtenido, se realiza una petición asíncrona mediante `fetch` al endpoint `http://localhost:5000/api/pizzas/:id`.
- [x] **Manejo de Estados y Fallback Resiliente:** Dispone de estados de carga (`loading`), error visual amigable y respaldo automático al catálogo local (`pizzas.js`) para garantizar que la vista funcione de manera ininterrumpida incluso si el backend local no está levantado.
- [x] **Navegación desde Catálogo:** Se integró el componente `Link` de `react-router-dom` en `CardPizza.jsx` en el botón **"Ver Más 👀"**, dirigiendo dinámicamente a la ruta `/pizza/${id}` de cada pizza.

### 2. Creación del `UserContext` para Sesión Simulada (2 puntos)
- [x] **Contexto Modular (`src/context/UserContext.jsx`):** Se creó el contexto global `UserContext` mediante `createContext()`.
- [x] **Estado Inicial:** Almacena la variable de estado `token`, la cual por defecto inicia en `true` (`useState(true)`).
- [x] **Método `logout`:** Función que conmuta el estado del `token` a `false`.
- [x] **Métodos Auxiliares y Custom Hook:** Se añadió `login` (`setToken(true)`) para facilitar pruebas interactivas de login y logout, además del hook personalizado `useUser()` para un consumo tipado y limpio.
- [x] **Proveedor Global (`main.jsx`):** `<UserProvider>` envuelve toda la jerarquía de la aplicación dentro del `BrowserRouter`.

### 3. Consumo de `UserContext` y Navegación en `Navbar.jsx` (2 puntos)
- [x] **Eliminación de Props:** `Navbar.jsx` consume directamente `token` y `logout` mediante el hook `useUser()`.
- [x] **Ejecución de Logout:** Al hacer click en el botón **"🔒 Logout"**, se ejecuta el método `logout` del contexto, cambiando el token a `false` de forma instantánea y reactiva.
- [x] **Renderizado Condicional de Botones:**
  - **Cuando `token === true`:** Muestra los botones **"🔓 Profile"** y **"🔒 Logout"**.
  - **Cuando `token === false`:** Muestra los botones **"🔐 Login"** y **"🔐 Register"**.
  - **Siempre Visibles:** Los botones **"🍕 Home"** y **"🛒 Total: $..."** permanecen visibles en todo momento independientemente del estado del token.
- [x] **Estilización de Rutas Activas con `NavLink`:** Se implementó el componente `NavLink` con función evaluadora `({ isActive })` para resaltar visualmente la página activa en color amarillo/dorado (`btn-warning`) con texto en negrita, optimizando la experiencia del usuario.

### 4. Condicionamiento de Pago en `Cart.jsx` (1 punto)
- [x] **Consumo de `UserContext`:** La página `Cart.jsx` consume `token` a través de `useUser()`.
- [x] **Botón "Pagar 💳" Deshabilitado:** Si `token === false` o si el carrito está vacío, el botón de pago queda totalmente inhabilitado (`disabled={!token || cart.length === 0}`).
- [x] **Feedback Visual:** Cuando el token es `false` y hay productos en el carrito, se despliega una alerta amigable informando: *"⚠️ Inicia sesión para proceder al pago"*.

### 5. Protección de Rutas con `<Navigate />` en `App.jsx` (3 puntos)
- [x] **Ruta Protegida `/profile`:** Se condicionó el renderizado del componente `<Profile />`:
  - Si `token === true`: Permite el acceso a la vista de perfil.
  - Si `token === false`: Redirige automáticamente mediante `<Navigate to="/login" />`.
- [x] **Rutas Restringidas para Usuarios Autenticados (`/login` y `/register`):**
  - Si `token === true`: El usuario autenticado es redirigido automáticamente a la página principal (`<Navigate to="/" />`).
  - Si `token === false`: Se permite el acceso al formulario de autenticación correspondiente.
- [x] **Página de Error 404:** Se preservan las rutas `/404` y el comodín `path="*"` hacia `<NotFound />` para cualquier ruta inexistente.

---

## 🗺️ Matriz de Enrutamiento y Control de Acceso

| Ruta | Componente | Tipo de Acceso | Condición de Navegación |
| :--- | :--- | :--- | :--- |
| `/` | `<Home />` | **Pública** | Acceso libre para cualquier usuario. |
| `/pizza/:id` | `<Pizza />` | **Pública Dinámica** | Acceso libre; carga detalles según el ID de la URL (`useParams`). |
| `/cart` | `<Cart />` | **Pública** | Acceso libre; el botón "Pagar" se deshabilita si `token === false`. |
| `/profile` | `<Profile />` | **Protegida (Privada)** | Requiere `token === true`. Si es `false` ➔ Redirige a `/login`. |
| `/login` | `<Login />` | **Restringida a Invitados** | Si `token === true` ➔ Redirige a `/`. Si es `false` ➔ Muestra formulario. |
| `/register` | `<Register />` | **Restringida a Invitados** | Si `token === true` ➔ Redirige a `/`. Si es `false` ➔ Muestra formulario. |
| `/404` / `*` | `<NotFound />` | **Pública (Catch-All)** | Atrapa cualquier URL inválida y ofrece botón de retorno a `/`. |

---

## 🏗️ Arquitectura de Estado Global y Contextos

```
                          ┌──────────────────────────┐
                          │      BrowserRouter       │
                          └─────────────┬────────────┘
                                        │
                          ┌─────────────▼────────────┐
                          │       UserProvider       │  ──> Token (simulado), login(), logout()
                          └─────────────┬────────────┘
                                        │
                          ┌─────────────▼────────────┐
                          │      PizzaProvider       │  ──> Catálogo & Peticiones API
                          └─────────────┬────────────┘
                                        │
                          ┌─────────────▼────────────┐
                          │       CartProvider       │  ──> Carrito, Cantidades & Total
                          └─────────────┬────────────┘
                                        │
                          ┌─────────────▼────────────┐
                          │           App            │
                          └──────┬────────────┬──────┘
                                 │            │
            ┌────────────────────▼───┐    ┌───▼──────────────────────────┐
            │         Navbar         │    │       Rutas Protegidas       │
            │  (Profile/Logout vs    │    │  /profile ➔ (token ? OK : login)│
            │   Login/Register)      │    │  /login   ➔ (token ? home : OK) │
            │  (Home + Total activos)│    │  /pizza/:id ➔ useParams      │
            └────────────────────────┘    └──────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```text
mamma-mia/
├── public/                  # Archivos públicos e imágenes estáticas
├── src/
│   ├── assets/              # Imágenes de pizzas y recursos gráficos
│   ├── components/          # Componentes modulares y reutilizables
│   │   ├── CardPizza.jsx    # Tarjeta de pizza con botón "Ver Más" dinámico (Link)
│   │   ├── Footer.jsx       # Pie de página institucional
│   │   ├── Header.jsx       # Banner principal
│   │   ├── Navbar.jsx       # Barra de navegación con NavLink y UserContext
│   │   └── NotificationModal.jsx # Modales para feedback de autenticación
│   ├── context/             # Gestión de estados globales con Context API
│   │   ├── CartContext.jsx  # Estado global del carrito y cálculo del total
│   │   ├── PizzaContext.jsx # Catálogo de pizzas y fallback local
│   │   └── UserContext.jsx  # 🌟 Estado global del usuario (token, logout, login)
│   ├── pages/               # Vistas de la aplicación
│   │   ├── Cart.jsx         # Carrito con botón "Pagar" condicionado al token
│   │   ├── Home.jsx         # Catálogo principal
│   │   ├── Login.jsx        # Inicio de sesión con feedback y activación de sesión
│   │   ├── NotFound.jsx     # Página de error 404
│   │   ├── Pizza.jsx        # 🌟 Detalle de pizza con useParams y consumo de API
│   │   ├── Profile.jsx      # 🌟 Perfil de usuario con acción de logout
│   │   └── Register.jsx     # Registro de usuario con validaciones
│   ├── utils/               # Funciones utilitarias (formato CLP)
│   ├── App.css              # Estilos responsivos y personalizados en tema oscuro
│   ├── App.jsx              # 🌟 Configuración de rutas protegidas y públicas
│   ├── index.css            # Estilos base y variables CSS
│   ├── main.jsx             # 🌟 Configuración de raíz con Providers y Router
│   └── pizzas.js            # Catálogo de respaldo local
├── index.html               # Plantilla HTML5
├── package.json             # Dependencias del proyecto
├── vite.config.js           # Configuración de compilación con Vite
└── README.md                # Documentación oficial del proyecto
```

---

## 🚀 Instrucciones de Ejecución

### 1. Clonar el Repositorio e Instalar Dependencias
```bash
git clone https://github.com/vn-vrgs/mamma-mia.git
cd mamma-mia
npm install
```

### 2. Ejecutar Servidor de Desarrollo (Frontend)
```bash
npm run dev
```
> La aplicación estará disponible en [http://localhost:5173/](http://localhost:5173/).

### 3. Compilar para Producción
```bash
npm run build
```

### 4. (Opcional) Servidor Backend de la Academia
Si se desea utilizar el backend local en el puerto `5000`:
```bash
node index.js
```
*Nota: Si el servidor backend no se encuentra activo, la aplicación utiliza automáticamente el catálogo de respaldo local garantizando una experiencia fluida sin errores en pantalla.*

---

## 🛠️ Tecnologías y Librerías

- **React 18** (Vite 5)
- **React Router DOM v7**:
  - `useParams` para parámetros dinámicos de URL
  - `<Navigate />` para redireccionamiento de rutas protegidas
  - `NavLink` con callbacks `({ isActive })` para navegación activa estilizada
  - `Link` para transiciones declarativas sin recargar página
- **React Context API** (`createContext`, `useContext`, `Provider` modulares para Carrito, Pizzas y Usuario)
- **Bootstrap 5** & **React-Bootstrap** (Diseño 100% responsivo para móviles, tablets y escritorio)
- **JavaScript Moderno (ES6+)** / `async` - `await`

---

## ✍️ Autor
Desarrollado para la evaluación del **Hito 7 - React Router II** en la carrera Full Stack - **Academia Desafío Latam**.
