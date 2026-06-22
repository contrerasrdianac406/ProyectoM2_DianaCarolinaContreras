// importo Express
import express from "express";

// Invoco el router
const router = express.Router();

// llamado de la data
//import { posts } from "../data/posts.js";

import {
  crearPosts,
  obtenerTodosPosts,
  obtenerUnPost,
  actualizarUnPost,
  eliminarUnPost,
  obtenerPostsDeUnAutor,
} from "../controllers/posts.controllers.js";

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
