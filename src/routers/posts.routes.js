// importo Express
import express from "express";
const router = express.Router();

// llamado de la data
//const { posts } = require("../data/posts");


import {
  crearPosts,
  obtenerTodosPosts,
  obtenerUnPost,
  actualizarUnPost,
  eliminarUnPost,
  obtenerPostsDeUnAutor,
} from '../controllers/posts.controllers.js';

// POST/posts
router.post("/posts", crearPosts);

//GET/posts
router.get("/posts", obtenerTodosPosts);

//GET/posts/:id
router.get("/posts/:id", obtenerUnPost);

//PUT/posts/:id
router.put("/posts/:id", actualizarUnPost);

//DELETE/posts/:id
router.delete("/posts/:id", eliminarUnPost);

// GET /posts/author/:authorId
router.get("/posts/author/:authorId", obtenerPostsDeUnAutor);

export default router;
