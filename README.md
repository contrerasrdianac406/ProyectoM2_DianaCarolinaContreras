# ProyectoM2_DianaCarolinaContreras

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.x-6E9F18?logo=vitest&logoColor=white)

API MiniBlog desarrollada con Node.js, Express y PostgreSQL para gestionar autores y publicaciones de forma sencilla y escalable.

## Descripción

Esta aplicación expone un backend REST con operaciones CRUD para:
- Autores
- Posts
- Búsqueda de publicaciones por autor
- Documentación interactiva con Swagger

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- Vitest + Supertest
- Swagger UI
- dotenv

## Requisitos previos

- Node.js 18 o superior
- PostgreSQL en ejecución
- npm

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/contrerasrdianac406/ProyectoM2_DianaCarolinaContreras.git
   cd ProyectoM2_DianaCarolinaContreras
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea la base de datos y ejecuta el script SQL incluido en [scripts/setup.sql](scripts/setup.sql).

## Variables de entorno

Crea un archivo .env con este contenido:

```env
PORT=3020
NODE_ENV=development
API_KEY=mi_api_key
CORS_ORIGIN=http://localhost:3020

# Opción 1: usar una URL de conexión
DB_URL=postgresql://usuario:password@localhost:5432/miniblog

# Opción 2: usar credenciales individuales
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=miniblog
# DB_USER=usuario
# DB_PASSWORD=password
```

## Ejecutar la aplicación

Inicia el servidor en modo desarrollo:

```bash
npm run dev
```


## Endpoints principales

### Autores
- POST /authors
- GET /authors
- GET /authors/:id
- PUT /authors/:id
- DELETE /authors/:id

### Posts
- POST /posts
- GET /posts
- GET /posts/:id
- PUT /posts/:id
- DELETE /posts/:id
- GET /posts/author/:authorId

## Pruebas

Ejecuta las pruebas del proyecto:

```bash
npm test
```

Para ejecutar específicamente las pruebas de autores y posts:

```bash
npx vitest run authors posts
```

Resultado verificado en la ejecución actual:
- 2 archivos de prueba procesados
- 37 tests ejecutados
- 37 tests aprobados
- 0 fallos

Para generar cobertura:

```bash
npm run test:coverage
```

## Estructura del proyecto

- [src/app.js](src/app.js): configuración de la aplicación Express.
- [src/controllers](src/controllers): lógica de los endpoints.
- [src/routers](src/routers): definición de rutas.
- [src/test](src/test): pruebas automatizadas con Vitest.
- [openapi.yaml](openapi.yaml): especificación OpenAPI de la API.
- [scripts/setup.sql](scripts/setup.sql): script de creación de tablas y datos base.


## Documentación Swagger
- http://localhost:3020/api-docs/

## Railway

- https://proyectom2dianacarolinacontreras-production-6a42.up.railway.app/authors
- https://proyectom2dianacarolinacontreras-production-6a42.up.railway.app/posts

## Autor

Diana Carolina Contreras Romero
