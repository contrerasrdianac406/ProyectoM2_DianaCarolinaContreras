//importo express
import express from "express";
const router = express.Router();

//Datos de memoria temporal
//import { authors } from "../data/authors.js";

//Llamados desde authors.controllers

import {
  crearAutores,
  obtenerTodosAutores,
  obtenerUnAutor,
  actualizarUnAutor,
  eliminarUnAutor,
} from '../controllers/authors.controllers.js';

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
