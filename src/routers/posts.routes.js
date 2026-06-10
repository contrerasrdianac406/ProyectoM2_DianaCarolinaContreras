// importo Express
const express = require("express");

// Invoco el router
const router = express.Router();

// llamado de la data
const { posts } = require("../db/posts");

const {
  crearPosts,
  obtenerTodosPosts,
  obtenerUnPost,
  actualizarUnPost,
  eliminarUnPost,
  obtenerPostsDeUnAutor,
} = require("../controllers/posts.controllers");
const { obtenerUnAutor } = require("../controllers/authors.controllers");

// POST/posts
router.post("/posts", crearPosts);

//GET/authors
router.get("/posts", obtenerTodosPosts);

//GET/authors/:id
router.get("/posts/:id", obtenerUnAutor);

//PUT/authors/:id
router.put("/authors/:id", actualizarUnPost);

//DELETE/authors/:id
router.delete("/authors/:id", eliminarUnPost);

// GET /posts/author/:authorId
router.get("/posts/author/:authorId", obtenerPostsDeUnAutor);

module.exports = router;
