# 🎾 Wilson Store - Ecommerce de Productos de Tenis

Una aplicación web moderna de ecommerce especializada en productos de tenis Wilson, desarrollada con React y optimizada para dispositivos móviles, tablets y escritorio.

## ✨ Características Principales

### 🛍️ **Gestión de Productos**

- ✅ Catálogo completo de productos de tenis
- ✅ Búsqueda avanzada en tiempo real
- ✅ Filtros por categoría y precio
- ✅ Ordenamiento múltiple (nombre, precio, fecha)
- ✅ Paginación inteligente y responsiva
- ✅ Gestión CRUD completa (Crear, Leer, Actualizar, Eliminar)

### 🛒 **Sistema de Carrito**

- ✅ Agregar/eliminar productos
- ✅ Control de cantidades (incrementar/decrementar)
- ✅ Cálculo automático de totales
- ✅ Persistencia en localStorage
- ✅ Notificaciones toast integradas

### 🔐 **Autenticación y Seguridad**

- ✅ Sistema de login/logout
- ✅ Rutas protegidas para administración
- ✅ Gestión de sesiones de usuario
- ✅ Context API para estado global

### 📱 **Diseño Responsivo**

- ✅ Mobile-first design
- ✅ Optimizado para móviles, tablets y desktop
- ✅ Navegación táctil intuitiva
- ✅ Accesibilidad mejorada (ARIA labels, focus management)

### 🎨 **Interfaz Moderna**

- ✅ React Icons para iconografía
- ✅ React Toastify para notificaciones
- ✅ Animaciones suaves y transiciones
- ✅ Diseño limpio y profesional

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd ecommerce-app
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

4. **Abrir en el navegador**

```
http://localhost:5173
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de la construcción
npm run preview

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
ecommerce-app/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Navbar.jsx      # Navegación principal
│   │   ├── ProductList.jsx # Lista de productos con búsqueda
│   │   ├── ProductCard.jsx # Tarjeta individual de producto
│   │   ├── CartPage.jsx    # Página del carrito
│   │   ├── Pagination.jsx  # Componente de paginación
│   │   └── ...
│   ├── context/            # Context API para estado global
│   │   ├── AuthContext.jsx # Autenticación
│   │   ├── CarritoContext.jsx # Gestión del carrito
│   │   └── ProductsContext.jsx # Gestión de productos
│   ├── database/           # Datos locales
│   │   └── productos.json  # Productos de respaldo
│   └── ...
├── public/                 # Archivos estáticos
├── index.html             # HTML principal
└── package.json           # Dependencias y scripts
```

## 🔧 Tecnologías Utilizadas

### Frontend

- **React 18** - Biblioteca de interfaz de usuario
- **React Router DOM** - Enrutamiento de la aplicación
- **React Icons** - Iconografía moderna
- **React Toastify** - Notificaciones toast
- **React Helmet** - Gestión de meta tags

### Estilo y UX

- **CSS Modules** - Estilos modulares
- **Responsive Design** - Diseño adaptativo
- **CSS Grid & Flexbox** - Layout moderno
- **CSS Animations** - Transiciones suaves

### Herramientas de Desarrollo

- **Vite** - Build tool y servidor de desarrollo
- **ESLint** - Linting de código
- **MockAPI** - API simulada para datos

## 📱 Compatibilidad

### Dispositivos Soportados

- ✅ **Móviles** (320px - 480px)
- ✅ **Tablets** (481px - 768px)
- ✅ **Desktop** (769px+)

### Navegadores

- ✅ Chrome (última versión)
- ✅ Firefox (última versión)
- ✅ Safari (última versión)
- ✅ Edge (última versión)

## 🎯 Funcionalidades Detalladas

### Búsqueda y Filtros

- **Búsqueda en tiempo real** por nombre y descripción
- **Filtro por categoría** (Raquetas, Pelotas, Accesorios, etc.)
- **Rango de precios** (mínimo y máximo)
- **Ordenamiento** por nombre, precio ascendente/descendente, más recientes
- **Paginación inteligente** con navegación completa

### Gestión de Productos

- **Agregar productos** con formulario validado
- **Editar productos** existentes
- **Eliminar productos** con confirmación
- **Validación de formularios** en tiempo real
- **Manejo de errores** robusto

### Carrito de Compras

- **Agregar productos** al carrito
- **Control de cantidades** con botones +/-
- **Eliminar productos** individuales
- **Vaciar carrito** completo
- **Persistencia** en localStorage
- **Cálculo automático** de totales

### Autenticación

- **Login/Logout** de usuarios
- **Rutas protegidas** para administración
- **Gestión de sesiones** con Context API
- **Interfaz de usuario** intuitiva

## 🔒 Seguridad

### Autenticación

- Rutas protegidas para funciones administrativas
- Gestión de estado de autenticación
- Redirección automática para usuarios no autenticados

### Validación de Datos

- Validación de formularios en el frontend
- Sanitización de inputs
- Manejo de errores robusto

## 📊 Optimizaciones de Rendimiento

### React Optimizations

- **useMemo** para cálculos costosos
- **useCallback** para funciones estables
- **React.memo** para componentes puros
- **Lazy loading** de componentes

### Rendimiento Web

- **Imágenes optimizadas** con placeholders
- **CSS optimizado** con media queries
- **Código minificado** para producción
- **Caching** de datos en localStorage

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Error de conexión con MockAPI**

   - La aplicación cargará datos de respaldo automáticamente
   - Verificar conexión a internet

2. **Problemas de responsividad**

   - Verificar viewport meta tag
   - Limpiar cache del navegador

3. **Errores de hooks**
   - Asegurar que todos los hooks estén en el nivel superior
   - Verificar dependencias de useEffect

### Debugging

```bash
# Ver logs en consola del navegador
F12 > Console

# Verificar estado de la aplicación
F12 > React DevTools
```

## 🤝 Contribución

### Guías de Desarrollo

1. Mantener consistencia en el código
2. Seguir las convenciones de React
3. Probar en múltiples dispositivos
4. Documentar cambios importantes

### Estructura de Commits

```
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: cambios de estilo
refactor: refactorización de código
test: pruebas
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado como proyecto educativo para demostrar habilidades en:

- React y hooks modernos
- Diseño responsivo
- Gestión de estado global
- Integración con APIs
- UX/UI moderno

---

**Wilson Store** - Tu tienda de confianza para productos de tenis 🎾
