# Next TodoList

Aplicación de ejemplo construida con **Next.js 16**, **React 19**, **TypeScript** y **Mongoose** para una lista de tareas con persistencia en MongoDB.

## Qué hace

- Lista tareas desde una API interna en `/api/todolist`
- Agrega nuevas tareas
- Actualiza el estado de las tareas a `inProgress` y `done`
- Edita títulos de tareas
- Elimina tareas
- Guarda y consulta datos usando **MongoDB** a través de **Mongoose**

## Stack principal

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Mongoose
- MongoDB

## Instalación

1. Clonar el repositorio

```bash
git clone <tu-repo> && cd next-todolist
```

2. Instalar dependencias

```bash
npm install
# o
bun install
```

3. Configurar la variable de entorno

Crea un archivo `.env` o `.env.local` en la raíz y define:

```env
DATABASE=<tu_cadena_de_conexion_a_MongoDB>
```

4. Ejecutar en desarrollo

```bash
npm run dev
# o
bun dev
```

Abre `http://localhost:3000` en tu navegador.

## Scripts disponibles

- `npm run dev` - ejecuta la app en modo desarrollo
- `npm run build` - construye la app para producción
- `npm run start` - inicia el servidor de producción
- `npm run lint` - ejecuta ESLint

## Estructura importante

- `src/app/page.tsx` - página principal de la app
- `src/app/api/todolist/route.ts` - API REST para tareas
- `src/app/api/user/route.ts` - endpoint de ejemplo para usuario
- `src/lib/database.ts` - conexión con MongoDB
- `src/database/models/todolist.ts` - modelo de datos de tareas
- `src/components/Card.tsx` - componente para mostrar cada tarea
- `src/styles/todoList.css` - estilos de la lista de tareas

## Endpoints

- `GET /api/todolist` - obtiene todas las tareas
- `POST /api/todolist` - crea una nueva tarea
- `PUT /api/todolist` - actualiza una tarea existente
- `DELETE /api/todolist` - elimina una tarea
- `GET /api/user` - endpoint de prueba

## Notas

- La aplicación usa `fetch` desde el cliente para llamar a la API del servidor.
- La conexión a la base de datos se realiza con `mongoose.connect(process.env.DATABASE)` en `src/lib/database.ts`.
- Si usas `bun`, puedes ejecutar `bun dev` para iniciar el servidor.

## Mejoras posibles

- Validar mejor las entradas del usuario
- Agregar autenticación
- Mostrar mensajes de error/éxito en la UI
- Agregar paginación o filtros
- Guardar estado local en `localStorage`
