//para traer las variables entorno del archivo .env
/* const { loadEnvFile } = require("node:process");
loadEnvFile(".env"); */

// trae las variables de entorno
//require("dotenv").config(); 

// configuración de las variables de entorno
const { loadEnvFile } = require('node:process');
loadEnvFile('.env');


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
