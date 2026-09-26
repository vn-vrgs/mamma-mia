# 🍕 Pizzería Mamma Mia! — Aplicación Web React & Carrito de Compras

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![React Bootstrap](https://img.shields.io/badge/React--Bootstrap-2.10.4-41E0FD?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Pizzería Mamma Mia!** es una aplicación web SPA (*Single Page Application*) interactiva desarrollada con **React 18**, **Vite** y **Bootstrap 5 / React-Bootstrap**. El proyecto forma parte del programa Full Stack y aborda en profundidad la **renderización dinámica de componentes**, el **manejo inmutable del estado (`useState`)**, el flujo de datos unidireccional (*props*), la gestión de un **carrito de compras dinámico en tiempo real**, validación de formularios de autenticación y una interfaz estilizada con un tema oscuro moderno (*Dark Slate Theme*).

---

## 🔗 Enlaces Oficiales

- **Repositorio en GitHub**: [https://github.com/vn-vrgs/mamma-mia.git](https://github.com/vn-vrgs/mamma-mia.git)
- **Despliegue en Vivo (Vercel)**: [https://mamma-mia-gamma.vercel.app/](https://mamma-mia-gamma.vercel.app/)

---

## ✨ Características Principales

- **Renderización Dinámica de Catálogo (`Home` & `CardPizza`)**:
  - Transformación dinámica de arreglos de datos (`pizzas.js`) a componentes React mediante el método `.map()`.
  - Impresión inmutable de ingredientes en tarjetas con badges CSS responsivos y clave única (`key`) para optimizar el Virtual DOM.
- **Carrito de Compras Interactivo y Global (`Cart`)**:
  - Agregar pizzas al carrito desde la vista principal (`Home`).
  - Incrementar y decrementar cantidades de cada pizza de forma reactiva.
  - Eliminación automática de productos al reducir su cantidad a `0`.
  - Recálculo en tiempo real del total del pedido con `reduce()` y actualización síncrona en la barra de navegación (`Navbar`).
- **Navegación Dinámica entre Vistas**:
  - Cambio de vistas en pantalla sin recargar la página (`home`, `cart`, `register`, `login`).
  - Barra de navegación reactiva que resalta la vista activa y muestra el estado del usuario (`token`).
- **Autenticación y Formularios de Usuario (`LoginPage` & `RegisterPage`)**:
  - Formulario de Inicio de Sesión (*Login*) y Registro de Usuarios (*Register*).
  - Validaciones de campos obligatorios, longitud mínima de contraseña (6 caracteres) y confirmación de contraseñas.
  - Modales emergentes de notificación (`NotificationModal`) estilizados con estados de éxito y error.
- **Diseño Moderno y Adaptativo (*Dark Slate Theme*)**:
  - Layout *Mobile-First* totalmente responsivo.
  - Estética basada en colores oscuros (`#0f172a`, `#1e293b`), efectos de desenfoque de fondo (*backdrop-filter / glassmorphism*) y tipografía limpia.
  - Formateo numérico automático de precios en moneda nacional chilena (`es-CL`).

---

## 🛠️ Tecnologías y Herramientas

| Tecnología / Librería | Versión | Descripción / Uso en el Proyecto |
| :--- | :--- | :--- |
| **React** | `^18.3.1` | Biblioteca principal para construcción de interfaces basadas en componentes y Hooks (`useState`). |
| **Vite** | `^5.4.1` | Build tool y servidor de desarrollo ultra rápido para proyectos frontend modernos. |
| **React-Bootstrap** | `^2.10.4` | Componentes listos para React (`Container`, `Row`, `Col`, `Card`, `Button`, `Navbar`, `Modal`, `ListGroup`). |
| **Bootstrap** | `^5.3.3` | Framework CSS para grilla responsiva, utilidades de espaciado y tematización. |
| **JavaScript (ES6+)** | Modern | Desestructuración, inmutabilidad (*spread operator*), métodos de arreglos (`map`, `filter`, `reduce`). |
| **HTML5 & CSS3** | Standard | Semántica web, diseño adaptativo y personalizaciones en `App.css` e `index.css`. |

---

## 📁 Estructura del Proyecto

```text
mamma-mia/
├── index.html                  # Plantilla HTML principal de la SPA
├── package.json                # Configuración de dependencias y scripts de Vite
├── vite.config.js              # Configuración del empaquetador Vite
├── public/                     # Archivos estáticos servidos directamente
│   └── assets/img/             # Copia pública de imágenes de productos
├── src/
│   ├── assets/
│   │   └── img/                # Imágenes en alta resolución de las pizzas
│   │       ├── napolitana.jpg
│   │       ├── espaniola.jpg
│   │       ├── pepperoni.jpg
│   │       ├── vegetariana.jpg
│   │       ├── suprema.jpg
│   │       └── cuatroquesos.jpg
│   ├── components/
│   │   ├── Navbar.jsx          # Barra superior sticky con navegación y total del carrito
│   │   ├── Header.jsx          # Banner Hero estilizado con tema oscuro y título principal
│   │   ├── Home.jsx            # Vista principal: renderiza el catálogo iterando pizzas.js
│   │   ├── CardPizza.jsx       # Tarjeta individual de producto con lista de ingredientes
│   │   ├── Cart.jsx            # Vista del Carrito de compras con control de cantidades
│   │   ├── RegisterPage.jsx    # Formulario de registro con validaciones avanzadas
│   │   ├── LoginPage.jsx       # Formulario de inicio de sesión con validaciones
│   │   ├── NotificationModal.jsx # Componente modal reutilizable para alertas de éxito/error
│   │   └── Footer.jsx          # Pie de página institucional con copyright
│   ├── utils/
│   │   └── format.js           # Funciones helper para formateo de moneda (es-CL)
│   ├── pizzas.js               # Arreglo de datos del catálogo (pizzas y pizzaCart)
│   ├── App.jsx                 # Componente raíz: gestor de estado global y vistas
│   ├── App.css                 # Estilos específicos, glassmorphism y animaciones
│   ├── index.css               # Estilos globales y paleta de colores Dark Theme
│   └── main.jsx                # Punto de entrada de React en el DOM
└── README.md                   # Documentación técnica completa del proyecto
```

---

## 🧩 Análisis Detallado de Arquitectura y Componentes

### 1. `App.jsx` — Núcleo de la Aplicación y Estado Global
`App.jsx` actúa como el orquestador principal. Gestiona:
- **`currentPage`**: Estado de navegación reactivo (`'home'`, `'cart'`, `'register'`, `'login'`).
- **`cart`**: Arreglo de productos seleccionados en el carrito.
- **`addToCart(pizza)`**: Agrega pizzas al carrito o incrementa la cantidad si ya existen.
- **`increaseQuantity(id)`** & **`decreaseQuantity(id)`**: Manipulación inmutable del estado del carrito mediante `.map()` y `.filter()`.
- **`cartTotal`**: Cálculo dinámico derivado de la suma de `precio * cantidad` acumulado con `.reduce()`.

### 2. `Navbar.jsx` — Barra de Navegación Reactiva
- Muestra el nombre de la pizzería con enlace rápido a `Home`.
- Alterna botones de navegación según la vista seleccionada (`currentPage`).
- Renderiza de forma condicional las opciones `Profile`/`Logout` o `Login`/`Register` basándose en el valor de la variable `token`.
- Despliega el total actualizado del carrito (`🛒 Total: $XX.XXX`), actuando como acceso directo a la vista `Cart`.

### 3. `Home.jsx` & `CardPizza.jsx` — Catálogo Dinámico
- `Home.jsx` importa el catálogo desde `src/pizzas.js` e itera sobre cada pizza renderizando una tarjeta `<CardPizza />` dentro de una grilla responsiva (`Row` / `Col`).
- `CardPizza.jsx` recibe la información vía props (`name`, `price`, `ingredients`, `img`, `desc`, `onAddToCart`).
- Recorre la lista de ingredientes (`ingredients.map()`) generando badges individuales (`<li>`) con clave única.
- Formatea el precio utilizando la función utility `formatCurrency()`.

### 4. `Cart.jsx` — Gestión de Compras
- Renderiza la lista detallada de pizzas en el carrito con imagen miniatura, nombre, subtotal por ítem y controles de cantidad (`+` / `-`).
- Si la cantidad de un ítem llega a cero (`0`), es removido automáticamente del estado mediante `.filter()`.
- Muestra una vista alternativa vacía (`"Tu carrito está vacío"`) cuando no hay productos.
- Incluye el resumen del total a pagar y el botón de pago ("Pagar 💳").

### 5. `LoginPage.jsx` & `RegisterPage.jsx` — Autenticación
- Captura de datos mediante formularios controlados (`useState`).
- Validaciones en cliente:
  - Campos no vacíos (`!email.trim() || !password.trim()`).
  - Contraseña con longitud mínima de 6 caracteres.
  - Coincidencia de contraseñas en el formulario de registro (`password === confirmPassword`).
- Despliegue de resultados mediante el componente modal emergente `<NotificationModal />`.

### 6. `NotificationModal.jsx` — Ventana Emergente Reutilizable
- Modal centrado que soporta dos modos visuales (`error` y `success`).
- Personalización de íconos, títulos, mensajes de confirmación o advertencia, y botón de cierre.

### 7. `src/utils/format.js` — Formateo de Moneda
- `formatNumber(amount)`: Utiliza `toLocaleString('es-CL')` para incluir separadores de miles según el estándar chileno.
- `formatCurrency(amount)`: Concatena el símbolo `$` al número formateado (ej. `25000` ➔ `"$25.000"`).

---

## 📑 Fases de Desarrollo y Cumplimiento de Hitos

### 📌 Hito 1: Componentes y Estructura Base
- Construcción de la maquetación inicial con React y React-Bootstrap.
- Creación de los componentes base: `Navbar`, `Header`, `Home`, `CardPizza` y `Footer`.
- Integración de `Header` al interior de `Home.jsx`.

### 📌 Hito 2: Formularios y Validaciones
- Creación de las vistas `RegisterPage.jsx` y `LoginPage.jsx`.
- Implementación de estado para los inputs de formularios.
- Programación de las validaciones de campos obligatorios y contraseñas.
- Integración de ventanas modales reutilizables para avisos al usuario.

### 📌 Hito 3: Renderización Dinámica & Carrito de Compras
- Creación de `src/pizzas.js` exponiendo los arreglos de productos (`pizzas`) y plantilla de carrito (`pizzaCart`).
- Renderizado dinámico del catálogo mediante `.map()` en `Home.jsx` y de los ingredientes en `CardPizza.jsx`.
- Implementación del estado global e inmutable del carrito de compras (`useState`) en `App.jsx` y vista `Cart.jsx`.
- Incremento/decremento de productos, eliminación en cero y cálculo dinámico en tiempo real del total del pedido.

---

## 🚀 Guía de Instalación y Ejecución Local

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### Requisitos Previos
- **Node.js** (versión 16.0 o superior recomendada)
- **npm** o **yarn**

### Pasos de Instalación

1. **Clonar el repositorio git**:
   ```bash
   git clone https://github.com/vn-vrgs/mamma-mia.git
   cd mamma-mia
   ```

2. **Instalar dependencias del proyecto**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo local**:
   ```bash
   npm run dev
   ```
   Abre tu navegador e ingresa a la dirección indicada en la terminal (usualmente `http://localhost:5173`).

4. **Compilar para producción**:
   ```bash
   npm run build
   ```
   Los archivos optimizados para producción se generarán en la carpeta `dist/`.

5. **Previsualizar la compilación de producción**:
   ```bash
   npm run preview
   ```

---

## 📄 Licencia y Créditos

Desarrollado como parte del programa de desarrollo Full Stack Web. Todos los derechos reservados © 2021-2026 **Pizzería Mamma Mia!**.
