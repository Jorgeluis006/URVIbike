# Mmotos – Motos Eléctricas (React + Vite)

Sitio web simple sobre motos eléctricas con navegación por pestañas e información estática (sin base de datos externa).

## Características
- React + Vite (JS)
- Header con navegación: Inicio, Modelos, Características y Contacto
- Datos locales en `src/data/motos.js`
- Estilos responsive en `src/styles.css`

## Requisitos
- Node.js y npm ya instalados (verificados)

## Ejecutar en desarrollo (Windows PowerShell)
```powershell
npm install
npm run dev
```
Luego abre la URL que aparece en la terminal (por defecto http://localhost:5173).

## Estructura
- `index.html`: punto de entrada Vite
- `src/main.jsx`: montaje de React
- `src/App.jsx`: layout, header y pestañas
- `src/data/motos.js`: datos estáticos de modelos y características
- `src/styles.css`: estilos globales
- `img/`: coloca aquí tus imágenes (asegúrate de usar nombres que coincidan con `src/data/motos.js`)

## Personalización
- Cambia textos y pestañas en `src/App.jsx`
- Añade/edita modelos en `src/data/motos.js`
- Reemplaza imágenes en `img/` y ajusta las rutas en los datos (por ejemplo `/img/volt-x1.jpg`)

## Build de producción
```powershell
npm run build
npm run preview
```

## Notas
- No se usa ninguna base de datos ni se realizan llamadas a APIs externas.
- Si no ves imágenes, coloca archivos con esos nombres en `img/` o actualiza las rutas en `src/data/motos.js`.