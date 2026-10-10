# 🍕 Hito 5 - Pizzería Mamma Mía 
### (React Router I)

Este proyecto corresponde al **Hito 5** del módulo de React, en el cual se implementa el enrutamiento con **React Router v6** (`react-router-dom`) para transformar la aplicación de **Pizzería Mamma Mía** en una **Single Page Application (SPA)** fluida y dinámica.

---

## 🔗 Enlaces Oficiales

- **Repositorio en GitHub**:
  - [https://github.com/vn-vrgs/mamma-mia.git](https://github.com/vn-vrgs/mamma-mia.git)
- **Despliegue en Vivo (Vercel)**: 
  - [https://mamma-mia-gamma.vercel.app/](https://mamma-mia-gamma.vercel.app/)

---

## 📋 Requerimientos Implementados

### 1. Instalación y Configuración (2 puntos)
- [x] **Instalación de `react-router-dom`:** Se instaló e integró la librería de enrutamiento React Router v6.
- [x] **Configuración de `BrowserRouter`:** El componente `<BrowserRouter>` fue añadido en `src/main.jsx` envolviendo a `<App />` para habilitar el historial de navegación y la actualización del UI en función de la URL.

### 2. Organización en Carpeta `pages` (1 punto)
- [x] **Estructura de Vistas:** Se trasladaron y crearon las vistas de la aplicación dentro de la carpeta `src/pages/`:
  - `Home.jsx`
  - `Register.jsx`
  - `Login.jsx`
  - `Cart.jsx`
  - `Pizza.jsx`
  - `Profile.jsx` (Nuevo)
  - `NotFound.jsx` (Nuevo)

### 3. Configuración de Rutas con `<Routes>` y `<Route>` (2 puntos)
- [x] **Ruta `/`**: Muestra el catálogo principal de pizzas (`Home`).
- [x] **Ruta `/register`**: Muestra el formulario de registro (`Register`).
- [x] **Ruta `/login`**: Muestra el formulario de inicio de sesión (`Login`).
- [x] **Ruta `/cart`**: Muestra el carrito de compras (`Cart`).
- [x] **Ruta `/pizza/p001`**: Muestra el detalle de la pizza Napolitana (`Pizza`).
- [x] **Ruta `/profile`**: Muestra la vista de perfil de usuario (`Profile`).
- [x] **Ruta `/404`**: Muestra la vista personalizada de página no encontrada (`NotFound`).

### 4. Componente `NotFound.jsx` (2 puntos)
- [x] **Diseño Creativo:** Implementación de la vista para rutas inexistentes adaptada al diseño oscuro de la pizzería.
- [x] **Redirección:** Incluye un enlace/botón visible que redirige al usuario a la página de inicio (`/`).
- [x] **Ruta por defecto (`*`)**: Captura cualquier URL no declarada y renderiza `NotFound`.

### 5. Componente `Profile.jsx` (1 punto)
- [x] **Información de Usuario:** Muestra el email del usuario (`usuario@mammamia.com`).
- [x] **Acción de Sesión:** Incluye un botón para "Cerrar sesión" (`🔒 Cerrar sesión`).

### 6. Componente `Navbar.jsx` con `Link` / `NavLink` (2 puntos)
- [x] **Navegación SPA sin recarga:** Los elementos del menú utilizan `Link` / `NavLink` de `react-router-dom`.
- [x] **Redirección de Total:** El botón de `Total: $xxx` redirige directamente a la ruta `/cart`.
- [x] **Branding e Inicio:** El logo de la marca redirige a la ruta principal `/`.

---

## 🛠️ Tecnologías Utilizadas

- **React 18** (Vite + React)
- **React Router DOM 6** (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`)
- **React Bootstrap 5** & **Bootstrap Icons**
- **JavaScript (ES6+)** / `async` - `await` / `fetch` API

---

## 📁 Estructura del Proyecto Frontend

```text
src/
├── assets/             # Imágenes y estilos globales
├── components/         # Componentes reutilizables de UI
│   ├── CardPizza.jsx   # Tarjeta individual de pizza
│   ├── Footer.jsx      # Pie de página
│   ├── Header.jsx      # Banner/Encabezado de la pizzería
│   ├── Navbar.jsx      # Barra de navegación con react-router-dom Link/NavLink
│   └── NotificationModal.jsx # Ventana emergente de notificaciones
├── pages/              # Vistas/Páginas de la app (SPA)
│   ├── Cart.jsx        # Página de carrito de compras (/cart)
│   ├── Home.jsx        # Página de catálogo principal (/)
│   ├── Login.jsx       # Página de inicio de sesión (/login)
│   ├── NotFound.jsx    # Pág.404 para rutas inexistentes (/404 y *)
│   ├── Pizza.jsx       # Página de detalle de pizza (/pizza/p001)
│   ├── Profile.jsx     # Página de perfil del usuario (/profile)
│   └── Register.jsx    # Página de registro (/register)
├── utils/              # Funciones auxiliares (formateo de moneda, etc.)
├── App.css             # Estilos CSS específicos de App
├── App.jsx             # Enrutador principal con <Routes> y <Route>
├── main.jsx            # Envoltorio con <BrowserRouter>
└── pizzas.js           # Arreglo estático de respaldo
```

---

## 🚀 Instrucciones de Ejecución

Para probar el proyecto completo en tu entorno local:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev
```

> Accede a `http://localhost:5173` en tu navegador.

---

## ✍️ Autor
Desarrollado para el módulo de **React Router I** - Academia Desafío Latam.
