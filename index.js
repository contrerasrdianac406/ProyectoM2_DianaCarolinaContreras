// Importar Express
const express = require("express");

// Crear una instancia de Express
const app = express();

// Definir un puerto
const PORT = 3000;

//  Agregar middleware
app.use(express.json());

// Base de datos en memoria (simulada)
let authors = [];
let posts = [];

// Variable para generar IDs únicos autoincrementales
let nextId = 1;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`);
});

//Endpoints para autores
//GET/health - Verificar que el servidor está funcionando
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Servidor funcionando correctamente" });
});

//GET /authors - Obtener todos los autores
app.get("/authors", (req, res) => {
  res.status(200).json(authors);
});
