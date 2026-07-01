# 📘 ProyectoM2_DianaCarolinaContreras

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.x-6E9F18?logo=vitest&logoColor=white)

API MiniBlog desarrollada con Node.js, Express y PostgreSQL para gestionar autores y publicaciones de forma sencilla y escalable.

## 📖 Descripción

Esta aplicación expone un backend REST con operaciones CRUD para:
- Autores
- Posts
- Búsqueda de publicaciones por autor
- Documentación interactiva con Swagger

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- Vitest + Supertest
- Swagger UI
- dotenv

## 📁 Estructura de carpetas del proyecto

```text
.
├── index.js                 # Punto de entrada de la aplicación
├── openapi.yaml             # Especificación OpenAPI de la API
├── package.json             # Dependencias y scripts del proyecto
├── scripts/
│   └── setup.sql            # Script SQL para crear tablas y datos base
├── src/
│   ├── app.js               # Configuración de Express y Swagger
│   ├── config/
│   │   ├── config.js        # Configuración general
│   │   └── validateEnv.js  # Validación de variables de entorno
│   ├── controllers/        # Lógica de negocio de autores y posts
│   ├── data/               # Datos de ejemplo utilizados por la app
│   ├── db/
│   │   └── config.js       # Conexión a PostgreSQL
│   ├── routers/            # Definición de rutas de la API
│   └── test/               # Pruebas automatizadas con Vitest
└── README.md
```

## 🚀 Requisitos y pasos para ejecutar localmente

### ✅ Requisitos previos

- Node.js 18 o superior
- PostgreSQL en ejecución
- npm

### 1. 📥 Clonar el repositorio

```bash
git clone https://github.com/contrerasrdianac406/ProyectoM2_DianaCarolinaContreras.git
cd ProyectoM2_DianaCarolinaContreras
```

### 2. 📦 Instalar dependencias

```bash
npm install
```

### 3. 🗄️ Crear la base de datos y ejecutar el setup SQL

Crea una base de datos en PostgreSQL, por ejemplo llamada `miniblog`, y ejecuta el script incluido en [scripts/setup.sql](scripts/setup.sql):

```bash
psql -U postgres -d miniblog -f scripts/setup.sql
```

Si prefieres usar una herramienta visual como pgAdmin, puedes ejecutar ese mismo script desde la interfaz.

### 4. ⚙️ Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con este contenido:

```env
PORT=3020
NODE_ENV=development
API_KEY=mi_api_key
CORS_ORIGIN=http://localhost:3020

# Opción 1: usar una URL de conexión
DATABASE_URL=postgresql://usuario:password@localhost:5432/miniblog

# Opción 2: usar credenciales individuales
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=miniblog
# DB_USER=usuario
# DB_PASSWORD=password
```

### 5. ▶️ Ejecutar la aplicación

```bash
npm run dev
```

La API quedará disponible en:
- http://localhost:3020/health
- http://localhost:3020/api-docs/

## 🧪 Cómo ejecutar tests

Ejecuta las pruebas del proyecto con:

```bash
npm test
```

Para generar cobertura:

```bash
npm run test:coverage
```

Verificación reciente del proyecto:
- 2 archivos de prueba procesados
- 37 tests ejecutados
- 37 tests aprobados
- 0 fallos

## 📚 Cómo ejecutar la documentación OpenAPI

La documentación Swagger se sirve automáticamente desde la ruta:

- http://localhost:3020/api-docs/

También está definida en [openapi.yaml](openapi.yaml) y se puede visualizar en entornos desplegados agregando `/api-docs` a la URL pública.

## 🔗 Endpoints principales

### 👤 Autores

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | /authors | Crear un nuevo autor |
| GET | /authors | Listar todos los autores |
| GET | /authors/:id | Obtener un autor por ID |
| PUT | /authors/:id | Actualizar un autor |
| DELETE | /authors/:id | Eliminar un autor |

### 📝 Posts

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | /posts | Crear una nueva publicación |
| GET | /posts | Listar todas las publicaciones |
| GET | /posts/:id | Obtener una publicación por ID |
| PUT | /posts/:id | Actualizar una publicación |
| DELETE | /posts/:id | Eliminar una publicación |
| GET | /posts/author/:authorId | Obtener publicaciones por autor |

## 🚀 Deployment en Railway

Esta API también puede desplegarse en Railway siguiendo estos pasos:

1. Crear un nuevo proyecto en Railway y conectar el repositorio.
2. Añadir las variables de entorno necesarias en la sección de Variables:
   - `PORT` (Railway lo asigna automáticamente en la mayoría de casos)
   - `NODE_ENV=production`
   - `API_KEY=<valor_seguro>`
   - `CORS_ORIGIN=<url_publica_del_proyecto>`
   - `DATABASE_URL=<cadena_de_conexion_postgres>`
3. Definir el comando de inicio del servicio como:
   ```bash
   npm start
   ```
4. Railway asignará una URL interna para la comunicación del servicio y una URL pública accesible desde internet.

### URLs relevantes

- URL interna del servicio: `http://localhost:3020`
- URL pública actual del despliegue: https://proyectom2dianacarolinacontreras-production-6a42.up.railway.app
- Documentación en producción: https://proyectom2dianacarolinacontreras-production-6a42.up.railway.app/api-docs/

## 🤖 Registro del uso de AI en el proyecto

Se utilizó asistencia de IA para apoyar distintas etapas del desarrollo:
- Generación y refinamiento de la estructura del backend y sus rutas.
- Sugerencias para la organización del código, validaciones de entorno y documentación.
- Elaboración de pruebas automatizadas y mejora del contenido del README.

El uso de IA sirvió como apoyo de productividad y calidad, complementando la implementación manual del proyecto.

## ✍️ Autor

Diana Carolina Contreras Romero
