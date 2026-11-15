# Gestor de Tareas - Frontend

Este es el frontend de mi proyecto de gestor de tareas. Aquí es donde se ven las tareas, se crean, se filtran, se editan y se borran.

Me demoré **+5h en total** en todo el proyecto, pero en el frontend como tal fueron **menos de 2.5h programando**. El resto se me fue en instalaciones, errores de Vite, de Vitest y de React Router.

## Librerías que usé

- React 19 + Vite + TypeScript
- React Router 7, para las páginas
- Tailwind CSS, para los estilos
- Vitest + Testing Library + user-event, para los tests


## Lo que hice

Hice 4 páginas:

- **Lista (`/`):** muestra todas las tareas en cards, con filtros por botones: `Todas / Pendiente / En Curso / Hecha`.
- **Crear (`/crear`):** formulario con Título, Responsable y Estado. No deja enviar si falta el título.
- **Detalle (`/tarea/:id`):** ver una tarea sola.
- **Editar (`/editar/:id`):** editar una tarea.

Separé la card en `TareaCard.tsx` porque antes tenía todo pegado en `ListaTareas.tsx` y no se entendía nada. La card muestra:

- Título con link al detalle 
- Badge de estado con color
- Responsable
- Descripción
- Fecha de creación (`creadoEn`) como `15 de noviembre de 2026`
- Select para cambiar el estado sin salir de la página
- Botones Editar y Eliminar

También quité todos los `any`. Creé el tipo `Tarea` en un solo archivo y lo usé en la API, en los componentes y en los tests.

## Tests

Hice 3 tests con Vitest:

- Crear una tarea llama a la API con los datos correctos
- No envía si falta el título
- Al hacer click en `Pendiente` solo muestra las pendientes

```bash
npm install
npm test
npm run dev



