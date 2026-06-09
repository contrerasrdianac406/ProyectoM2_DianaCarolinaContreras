// Importar Express
const express = require("express");

// Crear una instancia de Express
const server = express();

//  Agregar middleware para poder leer y convertir los archivos Javascritp y js
server.use(express.json());

// se importa el server para poderlo utilizar en el proyecto
module.exports = server;
