# 🍕 Hito 6 - Pizzería Mamma Mía 
### (Estado Global con React Context API)

Este proyecto corresponde al **Hito 6** del módulo de React, enfocado en la implementación de **Context API** para la gestión centralizada del estado global en una Single Page Application (SPA), eliminando el *prop drilling* y asegurando sincronización reactiva en tiempo real entre múltiples componentes y vistas.
 
---

## 🔗 Enlaces Oficiales

- **Repositorio en GitHub**:
  - [https://github.com/vn-vrgs/mamma-mia.git](https://github.com/vn-vrgs/mamma-mia.git)
- **Despliegue en Vivo (Vercel)**: 
  - [https://mamma-mia-gamma.vercel.app/](https://mamma-mia-gamma.vercel.app/)

---

## 📋 Requerimientos del Hito 6 Implementados (10 / 10 Puntos)

### 1. Implementación de Cart Context (2 puntos)
- [x] **Contexto Modular (`src/context/CartContext.jsx`):** Se creó el contexto global `CartContext` mediante `createContext()`.
- [x] **Proveedor `CartProvider`:** Encapsula el estado global `cart` (`useState([])`) y expone los métodos:
  - `addToCart(pizza)`: Agrega una nueva pizza o incrementa su cantidad si ya existe en el carrito.
  - `increaseQuantity(id)`: Aumenta la cantidad del producto especificado en 1.
  - `decreaseQuantity(id)`: Disminuye la cantidad en 1; cuando la cantidad llega a 0, el producto se elimina automáticamente del listado.
  - `removeFromCart(id)`: Remueve directamente un producto del carrito.
  - `clearCart()`: Vacía el carrito por completo.
  - `total` / `cartTotal`: Cálculo reactivo mediante `reduce` del valor total acumulado del pedido.
- [x] **Hook Personalizado `useCart()`:** Provee un acceso ergonómico y validado al contexto en cualquier componente consumidor.

### 2. Consumo de Cart Context en Navbar (2 puntos)
- [x] **Consumo del Total en Tiempo Real:** El componente `Navbar.jsx` consume directamente `CartContext` mediante el hook `useCart()`.
- [x] **Eliminación de Props:** Ya no requiere recibir la prop `total` desde `App.jsx`.
- [x] **Botón Dinámico:** Muestra el precio acumulado con formato de moneda chilena (`🛒 Total: $...`), actualizándose al instante ante cualquier modificación del carrito y redirigiendo a `/cart`.

### 3. Agregar Productos desde Home (2 puntos)
- [x] **Consumo de `addToCart`:** La vista `Home.jsx` y las tarjetas individuales `CardPizza.jsx` consumen la función `addToCart` del `CartContext`.
- [x] **Acción en Cada Card:** Al presionar el botón **"Añadir 🛒"** de cualquier tarjeta de pizza en el catálogo, el producto se añade de inmediato al carrito global y el total del Navbar se actualiza reactivamente sin recargar la página.

### 4. Gestión de Productos en la Página Cart (2 puntos)
- [x] **Visualización Dinámica:** La vista `Cart.jsx` consume el estado `cart` de `CartContext`, mostrando la lista exacta de pizzas seleccionadas por el usuario con su imagen, nombre, precio unitario y subtotal.
- [x] **Incremento (`+`):** Invoca `increaseQuantity(pizza.id)` para sumar unidades en tiempo real.
- [x] **Decremento y Eliminación (`-`):** Invoca `decreaseQuantity(pizza.id)`. Si el contador desciende a 0, el ítem se filtra y remueve de la orden.
- [x] **Estado Vacío Amigable:** Si el carrito no tiene artículos, presenta una ilustración amigable con enlace directo a explorar el catálogo (`/`).

### 5. Sincronización del Total entre Cart y Navbar (2 puntos)
- [x] **Cálculo Centralizado:** El total a pagar en `Cart.jsx` proviene de la misma fuente de verdad (`total` en `CartContext`), garantizando consistencia absoluta (100% idéntico al valor visualizado en el botón del Navbar).
- [x] **Actualización Simultánea:** Cualquier cambio realizado en el carrito (añadir, sumar o restar) actualiza en el mismo instante tanto el total de la página Cart como el del Navbar.

### 6. Consumo Centralizado de Pizzas con Context (Requerimiento Opcional)
- [x] **`PizzaContext` (`src/context/PizzaContext.jsx`):** Se modularizó la obtención del catálogo de pizzas (`/api/pizzas`) y el detalle individual (`/api/pizzas/:id`), con manejo de estados de carga (`loading`), error y respaldo automático a catálogo local (`mockPizzas`).
- [x] Consumido limpiamente por `Home.jsx` y `Pizza.jsx`, optimizando el rendimiento y la mantenibilidad.

---

## 🏗️ Arquitectura de la Solución (Context API)

```
                    ┌─────────────────────────┐
                    │      BrowserRouter      │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │      PizzaProvider      │  ──> Catálogo & Detalle de Pizzas
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │       CartProvider      │  ──> Estado Global del Carrito & Total
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │           App           │  (Sin Prop Drilling)
                    └──────┬───────────┬──────┘
                           │           │
            ┌──────────────▼───┐   ┌───▼────────────────┐
            │      Navbar      │   │       Routes       │
            │ (Muestra Total)  │   │  (/, /cart, etc.)  │
            └──────────────────┘   └────────────────────┘
```

---

## 📁 Estructura del Proyecto Frontend

```text
src/
├── assets/                  # Imágenes oficiales de pizzas y estilos
├── components/              # Componentes de interfaz reutilizables
│   ├── CardPizza.jsx        # Tarjeta individual con acción de agregar al carrito
│   ├── Footer.jsx           # Pie de página institucional
│   ├── Header.jsx           # Banner principal de la pizzería
│   ├── Navbar.jsx           # Barra de navegación consumidora de CartContext
│   └── NotificationModal.jsx# Modales estilizados de notificación
├── context/                 # 🌟 Contextos globales de la aplicación
│   ├── CartContext.jsx      # Estado global del carrito (items, total, acciones)
│   └── PizzaContext.jsx     # Estado global de catálogo de pizzas y API
├── pages/                   # Vistas/Páginas de la SPA
│   ├── Cart.jsx             # Carrito con gestión reactiva (+, -, pagar)
│   ├── Home.jsx             # Catálogo principal con botón añadir
│   ├── Login.jsx            # Formulario de autenticación
│   ├── NotFound.jsx         # Página 404 personalizada con redirección a Home
│   ├── Pizza.jsx            # Detalle de pizza (/pizza/:id) con botón añadir
│   ├── Profile.jsx          # Vista de perfil de usuario
│   └── Register.jsx         # Formulario de registro con validaciones
├── utils/                   # Utilidades de formato de moneda (CLP)
├── App.css                  # Estilos generales de la aplicación
├── App.jsx                  # Definición de rutas y layout limpio
├── main.jsx                 # Montaje de React con Providers y BrowserRouter
└── pizzas.js                # Catálogo de respaldo local
```

---

## 🚀 Instrucciones de Ejecución

### 1. Clonar e Instalar Dependencias
```bash
git clone https://github.com/vn-vrgs/mamma-mia.git
cd mamma-mia
npm install
```

### 2. Iniciar el Servidor Frontend (Vite)
```bash
npm run dev
```
> La aplicación estará disponible en [http://localhost:5173/](http://localhost:5173/).

### 3. (Opcional) Iniciar Servidor Backend de la Academia
Si deseas conectar el backend local en el puerto 5000:
```bash
node index.js
```
*Nota: Si el servidor backend no está en ejecución, la aplicación utiliza automáticamente el catálogo de respaldo local garantizando 100% de operatividad.*

---

## 🛠️ Tecnologías Utilizadas

- **React 18** (Vite 5)
- **React Context API** (`createContext`, `useContext`, Providers modulares)
- **React Router DOM v7** (Enrutamiento SPA fluido)
- **Bootstrap 5** & **React-Bootstrap** (Componentes responsivos y accesibles)
- **JavaScript Moderno (ES6+)** / `async` - `await`

---

## ✍️ Autor
Desarrollado para la evaluación del **Hito 6 - React Context API** en la carrera Full Stack - **Academia Desafío Latam**.
