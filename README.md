# App Auth

Este proyecto es una aplicación de autenticación construida con React, Vite y Material UI. La aplicación permite la autenticación de usuarios y contiene funcionalidades de administración de usuarios.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```bash
src/
├── components/   # Componentes de la aplicación
├── contexts/     # Contextos de React para la gestión de auth y su estado global
├── hooks/        # Custom hooks para encapsular lógica reutilizable
├── pages/        # Páginas principales de la aplicación
├── services/     # Servicios y llamadas a la API
├── utils/        # Funciones utilitarias y helpers
├── App.tsx       # Componente raíz de la aplicación
├── main.tsx      # Punto de entrada de la aplicación



## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos en tu sistema:

- Node.js (versión 14 o superior)
- npm (gestor de paquetes)

## Instalación

1. Clona el repositorio:
 https://github.com/alanrflores/test-auth.git

cd app-auth

npm install

2. Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

VITE_APP_BASE_URL=https://jsonplaceholder.typicode.com
VITE_TOKEN_ADMIN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
VITE_TOKEN_USER=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
VITE_USER_ADMIN=diego
VITE_USER_ADMIN_PASSWORD=admin
VITE_USER=natalia
VITE_USER_PASSWORD=user

3. Ejecución de la Aplicación

Para iniciar la aplicación en modo de desarrollo:
npm run dev

```


