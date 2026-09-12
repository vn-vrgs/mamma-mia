# 🍕 Hito 2 - Pizzería Mamma Mia!

Aplicación web interactiva desarrollada con **React 18**, **Vite** y **Bootstrap 5 / React-Bootstrap**, correspondiente al módulo de **Estados de los componentes y eventos**.

En este hito se integran los **formularios de Registro y Login**, gestionando el estado de la interfaz mediante el hook `useState()`, capturando eventos de formulario (`onSubmit`, `onChange`), previniendo comportamientos por defecto (`e.preventDefault()`) y aplicando **validaciones de negocio con retroalimentación mediante ventanas emergentes (Modales) profesionales con fondo degradado y desenfoque**.

---

## 🔗 Enlaces

- **Repositorio**: [https://github.com/vn-vrgs/mamma-mia.git](https://github.com/vn-vrgs/mamma-mia.git)
- **Despliegue**: [https://mamma-mia-gamma.vercel.app/](https://mamma-mia-gamma.vercel.app/)

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 & CSS3**: Semántica moderna, maquetación adaptativa (*Mobile-First*), degradados CSS (`linear-gradient`) y desenfoque de fondo (`backdrop-filter: blur`).
- **JavaScript (ES6+)**: Desestructuración, validación de cadenas (`trim()`), funciones flecha y operadores ternarios.
- **React 18**: Biblioteca de UI basada en componentes funcionales, JSX y Hooks (`useState`).
- **Vite.js**: Entorno de desarrollo ultrarrápido y empaquetador de producción.
- **Bootstrap 5 & React-Bootstrap**: Grilla responsiva y componentes UI (`Container`, `Card`, `Form`, `Button`, `Modal`, `Navbar`).

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
├── src/
│   ├── assets/
│   │   └── img/
│   │       ├── napolitana.jpg
│   │       ├── espaniola.jpg
│   │       └── pepperoni.jpg
│   ├── components/
│   │   ├── Navbar.jsx            # Barra de navegación con estado de auth (token), total y callbacks de navegación
│   │   ├── Header.jsx            # Hero Banner con imagen de fondo y título de bienvenida
│   │   ├── Home.jsx              # Vista principal con catálogo de CardPizza
│   │   ├── CardPizza.jsx         # Tarjeta de producto reutilizable
│   │   ├── RegisterPage.jsx      # Vista de Formulario de Registro con validaciones y modal emergente
│   │   ├── LoginPage.jsx         # Vista de Formulario de Login con validaciones y modal emergente
│   │   ├── NotificationModal.jsx # Ventana emergente (Modal) profesional para errores/éxito con botón de acción
│   │   └── Footer.jsx            # Pie de página institucional
│   ├── utils/
│   │   └── format.js             # Helper de formateo numérico y moneda chilena (es-CL)
│   ├── App.jsx                   # Componente principal con ensamblado de vistas y navegación interactiva
│   ├── App.css                   # Estilos personalizados (Modales, backdrop degradado con blur, Cards)
│   ├── index.css                 # Estilos globales de la aplicación
│   └── main.jsx                  # Punto de entrada de React en el DOM
└── README.md
```

---

## 📋 Cumplimiento de Requerimientos del Hito 2

### 1. Formulario de Registro (`RegisterPage.jsx`)
Crea un componente enfocado en el registro de usuarios que incluye:
- **Campos del formulario**:
  - `Email` (`type="email"`)
  - `Contraseña` (`type="password"`)
  - `Confirmar contraseña` (`type="password"`)
- **Gestión de Estado**: Mantiene variables locales (`email`, `password`, `confirmPassword`, `modalConfig`) mediante `useState()`.
- **Validaciones mínimas de negocio**:
  1. **Campos obligatorios**: Verifica que ningún campo se envíe vacío o compuesto únicamente por espacios en blanco (`!email.trim() || !password.trim() || !confirmPassword.trim()`).
  2. **Longitud de contraseña**: Valida que la contraseña tenga **al menos 6 caracteres** (`password.length >= 6`).
  3. **Coincidencia de contraseñas**: Confirma que la contraseña y la confirmación coincidan exactamente (`password === confirmPassword`).
- **Retroalimentación por Ventana Emergente**: Dispara la ventana emergente `NotificationModal` al detectar un error o al registrar con éxito.

### 2. Formulario de Login (`LoginPage.jsx`)
Crea un componente para el inicio de sesión de usuarios registrado:
- **Campos del formulario**:
  - `Email` (`type="email"`)
  - `Contraseña` (`type="password"`)
- **Gestión de Estado**: Control de entradas mediante `useState()`.
- **Validaciones mínimas de negocio**:
  1. **Campos obligatorios**: Comprueba que los campos no estén vacíos (`!email.trim() || !password.trim()`).
  2. **Longitud de contraseña**: Exige un mínimo de **6 caracteres** (`password.length >= 6`).
- **Retroalimentación por Ventana Emergente**: Muestra un popup emergente `NotificationModal` con el resultado de la autenticación `"Authentication successful!"` o error.

### 3. Componente de Ventana Emergente (`NotificationModal.jsx`) & Fondo Degradado
- Ventana emergente modal flotante con cabecera de color según la severidad (`bg-danger` o `bg-success`), título descriptivo, mensaje claro e icono.
- Incluye botón exclusivo **"Aceptar"** para cerrar la ventana emergente.
- Estilizado de **fondo de ventana degradado y desenfocado** (`backdrop-filter: blur(8px); background: linear-gradient(...)`) que oscurece suavemente el resto de la aplicación mientras el popup está activo.

### 4. Integración y Navegación (`App.jsx` & `Navbar.jsx`)
- `App.jsx` integra las tres vistas principales: `<Home />`, `<RegisterPage />` y `<LoginPage />`.
- Permite probar individualmente las vistas comentando/descomentando los componentes en el JSX según la pauta del hito, o navegar interactivamente haciendo clic en los botones del `<Navbar />` (`Home`, `Login`, `Register`).

---

## 🚀 Instalación y Ejecución Local

1. **Clonar o acceder al directorio del proyecto:**
   ```bash
   cd mamma-mia
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre la URL indicada en la terminal (por ejemplo, `http://localhost:5173`).

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 📱 Diseño Responsivo
Los formularios de **Registro** y **Login** utilizan tarjetas adaptativas (`Card`) centradas mediante contenedores Flexbox de Bootstrap, garantizando una excelente visualización y usabilidad en smartphones, tablets y monitores de escritorio.
