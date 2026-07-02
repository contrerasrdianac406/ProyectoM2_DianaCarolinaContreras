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
- proyectom2dianacarolinacontreras-production-6a42.up.railway.app/authors
- proyectom2dianacarolinacontreras-production-6a42.up.railway.app/posts

### URLs relevantes

- URL interna del servicio: `http://localhost:3020`
- URL pública actual del despliegue: https://proyectom2dianacarolinacontreras-production-6a42.up.railway.app
- Documentación en producción: https://proyectom2dianacarolinacontreras-production-6a42.up.railway.app/api-docs/

## � Ejemplos de ejecución de endpoints con cURL

### 👤 Endpoints de Autores

#### 1. Crear un nuevo autor
```bash
curl -X POST http://localhost:3020/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "bio": "Escritor y desarrollador"
  }'
```

#### 2. Obtener todos los autores
```bash
curl -X GET http://localhost:3020/authors
```

#### 3. Obtener un autor por ID
```bash
curl -X GET http://localhost:3020/authors/1
```

#### 4. Actualizar un autor
```bash
curl -X PUT http://localhost:3020/authors/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez Actualizado",
    "email": "juan.updated@example.com",
    "bio": "Escritor, desarrollador y mentor"
  }'
```

#### 5. Eliminar un autor
```bash
curl -X DELETE http://localhost:3020/authors/1
```

### 📝 Endpoints de Posts

#### 1. Crear un nuevo post
```bash
curl -X POST http://localhost:3020/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi primer blog post",
    "content": "Este es el contenido del blog post",
    "author_id": 1,
    "published": true
  }'
```

#### 2. Obtener todos los posts
```bash
curl -X GET http://localhost:3020/posts
```

#### 3. Obtener un post por ID
```bash
curl -X GET http://localhost:3020/posts/1
```

#### 4. Actualizar un post
```bash
curl -X PUT http://localhost:3020/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi primer blog post - Actualizado",
    "content": "Contenido actualizado del blog post",
    "author_id": 1,
    "published": true
  }'
```

#### 5. Eliminar un post
```bash
curl -X DELETE http://localhost:3020/posts/1
```

#### 6. Obtener todos los posts de un autor
```bash
curl -X GET http://localhost:3020/posts/author/1
```

## 💬 Prompts utilizados con IA

Los siguientes prompts fueron usados durante el desarrollo del proyecto para optimizar distintas etapas:

### Prompts de Estructura y Configuración:
- "Genera un archivo de configuración (config.js) para manejar variables de entorno con validación"
```bash
Tu archivo de configuración en JavaScript está listo.

config
 JS 
Abierto

Este archivo config.js implementa un enfoque robusto y profesional utilizando la biblioteca de validación Joi y dotenv para gestionar tus variables de entorno de manera segura en entornos Node.js.

Características implementadas en el archivo:
 
1.Validación estricta con Joi: Valida tipos de datos (como puertos válidos, URIs complejas, strings de longitud mínima, etc.).

2.Control de fallos temprano (Fail-Fast): Si falta alguna variable obligatoria o tiene un formato incorrecto, la aplicación imprime detalladamente qué falló y detiene el proceso (process.exit(1)) para evitar que el código corra en un estado inestable.

3.Condicionales de entorno: Permite que ciertas variables sean obligatorias únicamente en entornos específicos (por ejemplo, la API Key de SendGrid solo es obligatoria cuando NODE_ENV es production).

4.Estructura limpia y segura: Agrupa los valores en un objeto tipado y estructurado por módulos (server, db, auth, services) y utiliza Object.freeze() para prevenir que cualquier parte del código modifique la configuración accidentalmente durante la ejecución.
```

- "Cómo implementar validaciones de email y protección contra SQL injection en Node.js"


La inyección SQL ocurre cuando concatenas strings directamente en tus consultas de bases de datos (ej. `SELECT * FROM users WHERE id = ${id}`). Para evitarlo, tienes dos caminos principales:

Opción A: Consultas Preparadas (Parametrizadas) - Recomendado si usas SQL puro
Las consultas parametrizadas envían los datos separados de la lógica SQL. El motor de la base de datos trata los parámetros estrictamente como valores, anulando cualquier código malicioso.

Ejemplo utilizando el driver de PostgreSQL (pg) o MySQL (mysql2):
```bash
   // ❌ INSEGURO: Vulnerable a SQL Injection
const queryInsegura = `SELECT * FROM usuarios WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;

//  SEGURO: Usando marcadores de posición ($1, $2 o ?)
const querySegura = 'SELECT * FROM usuarios WHERE email = $1 AND password = $2';
const valores = [req.body.email, req.body.password];

db.query(querySegura, valores)
  .then(result => {
    // Procesar resultado de forma segura
  })
  .catch(err => console.error(err));
```

### Prompts de Desarrollo:
- "Cómo conectarse a PostgreSQL desde Node.js y ejecutar queries parametrizadas"
- "Cómo validar datos y evitar SQL injection en endpoints REST"

### Prompts de Documentación:
- "Genera una especificación OpenAPI (Swagger) para documentar una API REST"

Para conectarte a PostgreSQL desde Node.js de forma eficiente y segura, la librería estándar de la industria es pg (node-postgres). Esta librería soporta la creación de un Pool de conexiones (ideal para aplicaciones web porque reutiliza conexiones) y maneja consultas parametrizadas nativamente para protegerte contra inyección SQL.

A continuación, te muestro cómo configurarlo paso a paso.

1. Instalación
Primero, instala el driver de PostgreSQL en tu proyecto:
```bash
Bash
npm install pg
```
2. Configuración de la Conexión (db.js)
Es una excelente práctica crear un archivo centralizado para gestionar el Pool de conexiones. De este modo, no abres y cierras conexiones en cada consulta, lo cual destruiría el rendimiento de tu base de datos.

Crea un archivo llamado db.js:

```bash
const { Pool } = require('pg');

// Configuración utilizando variables de entorno (puedes integrarlo con tu config.js)
const pool = new Pool({
  user: process.env.DB_USER || 'tu_usuario',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'tu_base_datos',
  password: process.env.DB_PASSWORD || 'tu_contraseña',
  port: process.env.DB_PORT || 5432,
  // Configuraciones del Pool
  max: 20, // Máximo número de clientes en el pool
  idleTimeoutMillis: 30000, // Tiempo para cerrar conexiones inactivas
  connectionTimeoutMillis: 2000, // Tiempo límite para conectar antes de dar error
});

// Exportamos un método helper para ejecutar las queries
module.exports = {
  query: (text, params) => pool.query(text, params),
};
```

- "Cómo configurar y servir documentación Swagger/OpenAPI en una aplicación Express"

Para servir documentación interactiva de tu API con Swagger/OpenAPI en una aplicación Express, la combinación estándar y más utilizada es la de los paquetes swagger-ui-express (para renderizar la interfaz visual) y swagger-jsdoc (para generar la especificación leyendo comentarios en tu código).

A continuación, te muestro el paso a paso para configurarlo de manera profesional.

1. Instalación de dependencias

```bash
Bash
npm install swagger-ui-express swagger-jsdoc
```
2. Configuración inicial (swagger.js)
Es una buena práctica separar la configuración de Swagger en su propio archivo para no saturar el archivo principal (app.js o index.js).

Crea un archivo llamado swagger.js:
```bash
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración general de la especificación OpenAPI
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API en Express',
      version: '1.0.0',
      description: 'Documentación oficial de la API de la aplicación',
      contact: {
        name: 'Soporte Técnico',
        email: 'soporte@tuempresa.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Servidor de Desarrollo Local',
      },
    ],
    components: {
      // Aquí puedes definir esquemas globales reutilizables (ej. seguridad, errores)
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Rutas donde Swagger buscará los comentarios para generar la documentación
  // Puedes usar comodines para leer todos los archivos de una carpeta (ej: './routes/*.js')
  apis: ['./src/routes/*.js', './app.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  // Servimos la documentación en la ruta /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  // Opcional: Exponer el JSON de la especificación por si necesitas exportarlo
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('📖 Documentación Swagger disponible en http://localhost:3000/api-docs');
}

module.exports = setupSwagger;
```


### Prompts de Testing:
- "Cómo escribir tests para endpoints REST con Vitest y Supertest"
Escribir pruebas automatizadas para tus endpoints es la mejor manera de asegurar que tu API siga funcionando correctamente a medida que añades nuevas funciones. La combinación de Vitest (un entorno de testing moderno y ultra rápido) y Supertest (una librería fantástica para simular peticiones HTTP sin necesidad de levantar el servidor real en un puerto de red) es una de las opciones más eficientes en el ecosistema de Node.js actual.

A continuación, te muestro el paso a paso para configurarlo y escribir tus primeros tests de integración.

1. Instalación de dependencias
Instala Vitest y Supertest en tus dependencias de desarrollo:

```bash
Bash
npm install -D vitest supertest
```
Añade el script de prueba en tu archivo package.json:

```bash
JSON
{
  "scripts": {
    "test": "vitest"
  }
}
```

### Prompts de Deployment:
- "Cómo desplegar una aplicación Node.js + PostgreSQL en Railway"

Desplegar una aplicación Node.js con una base de datos PostgreSQL en Railway es uno de los procesos más rápidos y sencillos gracias a su soporte nativo para ambas tecnologías y su aprovisionamiento automático.

A continuación, tienes la guía paso a paso para poner tu proyecto en producción.

Paso 1: Preparar tu aplicación Node.js
Antes de subir tu código, asegúrate de que tu aplicación cumpla con los estándares para la nube:

1. Usa la variable de entorno para el puerto: Railway asignará dinámicamente un puerto a tu contenedor mediante la variable PORT. Asegúrate de que tu código la use:

```bash
JSON
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
```
2.Define el script de inicio: En tu package.json, debes tener configurados correctamente tus scripts:
```bash
JSON
"scripts": {
  "start": "node index.js"
```


## ✍️ Autor

Diana Carolina Contreras Romero

