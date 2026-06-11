// importo Express
const express = require("express");

// Invoco el router
const router = express.Router();

// llamado de la data
const { authors } = require("../data/authors");

const {
  crearAutores,
  obtenerTodosAutores,
  obtenerUnAutor,
  actualizarUnAutor,
  eliminarUnAutor,
} = require("../controllers/authors.controllers");

// POST/authors
router.post("/authors", crearAutores);

//GET/authors
router.get("/authors", obtenerTodosAutores);

//GET/authors/:id
router.get("/authors/:id", obtenerUnAutor);

//PUT/authors/:id
router.put("/authors/:id", actualizarUnAutor);

//DELETE/authors/:id
router.delete("/authors/:id", eliminarUnAutor);

module.exports = router;
