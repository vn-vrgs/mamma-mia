# 🍕 Hito 1 - Pizzería Mamma Mia!

Aplicación web interactiva desarrollada con **React 18** y **Vite**, que simula el catálogo principal y menú de navegación para la **Pizzería Mamma Mia!**. Este proyecto fue diseñado siguiendo estándares profesionales de Desarrollo Web Responsivo, arquitectura basada en componentes interconectados mediante *props* y maquetación con **Bootstrap 5 / React-Bootstrap**.

---


# Enlaces
- Repositorio:
  - https://github.com/vn-vrgs/mamma-mia.git
  
- Desploy:
  - https://github.com/vn-vrgs/mamma-mia.git


---

## 🛠️ Tecnologías Utilizadas

- **HTML5 & CSS3**: Semántica, maquetación adaptativa (*Mobile-First*) y variables CSS.
- **JavaScript (ES6+)**: Interpolación de expresiones, desestructuración de objetos, métodos de arreglos y operadores ternarios.
- **React 18**: Biblioteca UI basada en arquitectura de componentes funcionales y JSX.
- **Vite.js**: Entorno de desarrollo ultra rápido y empaquetador moderno.
- **Bootstrap 5 & React-Bootstrap**: Sistema de grillas responsivas y componentes de UI (Navbars, Cards, Buttons, Containers).

---

## 📁 Estructura del Proyecto

```text
mamma-mia/
├── index.html
├── package.json
├── vite.config.js
├── assets/
│   └── img/
│       ├── napolitana.jpg
│       ├── espaniola.jpg
│       └── pepperoni.jpg
├── public/
│   └── assets/
│       └── img/
├── src/
│   ├── assets/
│   │   └── img/
│   │       ├── napolitana.jpg
│   │       ├── espaniola.jpg
│   │       └── pepperoni.jpg
│   ├── components/
│   │   ├── Navbar.jsx      # Barra de navegación con estado de auth (token) y total formateado
│   │   ├── Header.jsx      # Hero Banner con imagen de fondo y título de bienvenida
│   │   ├── Home.jsx        # Componente vista que agrupa Header y la galería de CardPizza
│   │   ├── CardPizza.jsx   # Componente reutilizable de la tarjeta de pizza (recibe props)
│   │   └── Footer.jsx      # Pie de página institucional
│   ├── utils/
│   │   └── format.js       # Helper para formateo de números y moneda local (es-CL)
│   ├── App.jsx             # Componente raíz que ensambla Navbar, Home y Footer
│   ├── App.css             # Estilos específicos de componentes (Header, Cards, Navbar)
│   ├── index.css           # Estilos globales e importación de Bootstrap CSS
│   └── main.jsx            # Punto de entrada de React en el DOM
└── README.md
```

---

## 📋 Cumplimiento de Requerimientos de la Guía

### 1. Componente Principal (`App.jsx`)
- Integra los componentes clave de la aplicación: `<Navbar />`, `<Home />` y `<Footer />`.
- Estructura flexbox para mantener el footer fijado al final del viewport (`min-vh-100`).

### 2. Componente Banner (`Header.jsx`)
- Llamado dentro de `Home.jsx`.
- Incluye el título `¡Pizzería Mamma Mia!` y la descripción `¡Tenemos las mejores pizzas que podrás encontrar!`.
- Presenta un fondo con imagen de pizza y una capa superpuesta (*overlay*) oscura para garantizar máxima legibilidad y contraste.

### 3. Componente de Navegación (`Navbar.jsx`)
- Define internamente las variables especificadas:
  ```javascript
  const total = 25000;
  const token = false;
  ```
- Aplica el **operador ternario** (`token ? (...) : (...)`) para evaluar el estado simulado de sesión:
  - **Si `token === true`**: Muestra los botones `🔓 Profile` y `🔒 Logout`.
  - **Si `token === false`**: Muestra los botones `🔐 Login` y `🔐 Register`.
- Formatea la variable `total` utilizando la función helper `formatCurrency` basada en `toLocaleString('es-CL')`, mostrando `$25.000`.

### 4. Botones Permanentes (`Home` y `Total`)
- Los botones `🍕 Home` y `🛒 Total: $25.000` se muestran siempre de forma independiente del valor booleano de `token`.

### 5. Componente Tarjeta de Pizza (`CardPizza.jsx` y `Home.jsx`)
- `Home.jsx` invoca 3 instancias del componente `CardPizza.jsx` pasando de manera dinámica las siguientes propiedades (*props*) e **imágenes locales del proyecto** (`./assets/img/`):
  1. **Pizza Napolitana**: `$5.950` - Imagen: `napolitana.jpg` - Ingredientes: *mozzarella, tomates, jamón, orégano*.
  2. **Pizza Española**: `$6.950` - Imagen: `espaniola.jpg` - Ingredientes: *mozzarella, gorgonzola, parmesano, provolone*.
  3. **Pizza Pepperoni**: `$6.950` - Imagen: `pepperoni.jpg` - Ingredientes: *mozzarella, pepperoni, orégano*.
- `CardPizza.jsx` desestructura las props (`name`, `price`, `ingredients`, `img`) y muestra:
  - Imagen de la pizza con tamaño uniforme.
  - Nombre formateado ("Pizza Napolitana", etc.).
  - Lista de ingredientes precedida por el icono 🍕.
  - Precio formateado en pesos chilenos (ej: `Precio: $5.950`).
  - Botones de acción `Ver Más 👀` y `Añadir 🛒`.

### 6. Pie de Página (`Footer.jsx`)
- Contiene la leyenda: `© 2021 - Pizzería Mamma Mia! - Todos los derechos reservados`.
- Es invocado correctamente dentro de `App.jsx`.

---

## 🚀 Instalación y Ejecución Local

Para ejecutar este proyecto en tu entorno local:

1. **Clonar o acceder al directorio del proyecto:**
   ```bash
   cd mamma-mia
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre tu navegador e ingresa a la URL entregada por la consola (habitualmente `http://localhost:5173`).

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 📱 Diseño Responsivo
La interfaz ha sido probada en dispositivos móviles (smartphones), tablets y pantallas de escritorio. La grilla utiliza puntos de quiebre de Bootstrap (`Row xs={1} md={2} lg={3}`) para colapsar las tarjetas de pizza a 1 columna en móviles, 2 en tablets y 3 en pantallas anchas.
