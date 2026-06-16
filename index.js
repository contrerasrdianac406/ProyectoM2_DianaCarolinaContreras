//para traer las variables entorno del archivo .env
const { loadEnvFile } = require("node:process");
loadEnvFile(".env");

// validación de las variables de entorno
const requiredEnvVars = require("./src/config/validateEnv");

// configuracion del pool de la BD
const pool = require("./src/db/config");

// trae las variables de entorno
//require("dotenv").config();

// configuracion de la OpenApi
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');



// configuración de las rutas
const rutasAutores = require("./src/routers/author.routes");
const rutasPosts = require("./src/routers/posts.routes");

// configuracion para express
const express = require("express");
const app = express();

// se trae configuración desde la carpeta config del archivo config.js
const config = require("./src/config/config");

//Middlewares
app.use(express.json());

//Registrar las rutas
app.use("/", rutasAutores);
app.use("/", rutasPosts);

// ruta de la documentación openApi
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Definir un puerto
const PORT = process.env.PORT;

// Base de datos en memoria (simulada)
//let authors = [];
//const { authors } = require("./src/db/authors");
//const { posts } = require("./src/db/posts"); preguntar

//Endpoints para autores
//GET/health - Verificar que el servidor está funcionando
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Servidor funcionando correctamente" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`);
});
