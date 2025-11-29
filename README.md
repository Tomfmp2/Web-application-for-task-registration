# NotasApp - Aplicación de Notas Moderna

Una aplicación web moderna para gestionar notas y tareas con una interfaz elegante y animada.

## 🚀 Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con animaciones
- **JavaScript ES6+** - Módulos nativos
- **MockAPI** - Backend para persistencia de datos

## 📦 Estructura del Proyecto

```
├── index.html          # Página principal
├── css/
│   └── style.css      # Estilos de la aplicación
├── public/
│   ├── app.js         # Lógica principal
│   └── api/
│       └── api-mokapi.js  # Cliente API
└── vercel.json        # Configuración de Vercel
```

## 🌐 Despliegue en Vercel

### Opción 1: Desde la interfaz web de Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Add New Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto estático
5. Haz clic en "Deploy"

### Opción 2: Usando Vercel CLI

```bash
# Instalar Vercel CLI (solo la primera vez)
npm i -g vercel

# Desplegar
vercel

# Para producción
vercel --prod
```

## 💻 Desarrollo Local

Simplemente abre `index.html` en tu navegador o usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve

# Con VS Code
# Usa la extensión "Live Server"
```

## ✨ Características

- ✅ Agregar, editar y eliminar notas
- ✅ Marcar notas como completadas
- ✅ Animaciones suaves y modernas
- ✅ Partículas flotantes en el fondo
- ✅ Diseño responsive
- ✅ Persistencia de datos con MockAPI

## 📝 API

La aplicación usa MockAPI para almacenar las notas:
- **Endpoint**: `https://6925b48882b59600d724d243.mockapi.io/Nota-Usuarios`
- **Métodos**: GET, POST, PUT, DELETE

## 🎨 Personalización

Para cambiar el endpoint de la API, edita el archivo `public/api/api-mokapi.js`:

```javascript
const API_URL = "tu-nuevo-endpoint-aqui"
```
