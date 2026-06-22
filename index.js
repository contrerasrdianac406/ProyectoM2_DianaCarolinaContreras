//para traer las variables entorno del archivo .env
import { loadEnvFile } from "node:process";
loadEnvFile(".env");

// validación de las variables de entorno
import requiredEnvVars from "./src/config/validateEnv.js";

// configuracion del pool de la BD
import pool from "./src/db/config.js";

// trae las variables de entorno
//import dotenv from "dotenv";
//dotenv.config();

// configuracion de la OpenApi
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./openapi.yaml');



// configuración de las rutas
import rutasAutores from "./src/routers/author.routes.js";
import rutasPosts from "./src/routers/posts.routes.js";

// configuracion para express
import express from "express";
const app = express();

// se trae configuración desde la carpeta config del archivo config.js
import config from "./src/config/config.js";

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
//import { authors } from "./src/db/authors.js";
//import { posts } from "./src/db/posts.js"; preguntar

//Endpoints para autores
//GET/health - Verificar que el servidor está funcionando
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Servidor funcionando correctamente" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`);
});
