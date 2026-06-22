// importo Express
import express from "express";

// Invoco el router
const router = express.Router();

// llamado de la data
//import { authors } from "../data/authors.js";

import {
  crearAutores,
  obtenerTodosAutores,
  obtenerUnAutor,
  actualizarUnAutor,
  eliminarUnAutor,
} from "../controllers/authors.controllers.js";

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

export default router;
