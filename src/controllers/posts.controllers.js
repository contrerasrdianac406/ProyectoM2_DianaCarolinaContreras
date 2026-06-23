//conexión de la data creada localmente
//const { authors } = require("../data/authors");
// const { posts } = require("../data/posts");

// Pool para la conexion de la BD
/* const { Pool } = require("pg");
const pool = require("../db/config");
const { response } = require("express"); */

// Pool para la conexion de la BD en emac6

import pg from 'pg';
const {Pool} = pg;
import pool from '../db/config.js';


// POST/posts - creación de posts usuarios
const crearPosts = async (req, res) => {
  try {
    //Extraer los datos del post del body de la solicitud
    const {title, content,author_id, published } = req.body;

    //Validación de campos requeridos

    //Validar que authorId sea un número válido
    const authorIdNum = Number(author_id);
    if (!author_id || !title || !content) {
      return res.status(400).json({
        error: "titulo, contenido, and autor_id son requeridos",
      });
    }
    if (Number.isNaN(authorIdNum) || authorIdNum <= 0) {
      return res.status(400).json({
        error: "autor_id debe ser un número positivo válido",
      });
    }

    //Validar que el autor exista
    const authorExists = await pool.query(
      "SELECT * FROM authors WHERE id = $1",
      [author_id],
    );
    if (authorExists.rows.length === 0) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

     // Detectar intentos básicos de SQL injection
      const patronesSQL = /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b)/i;
      if (patronesSQL.test(title || content)) {
        return res.status(400).json ({error:'El nombre contiene palabras no permitidas'});
      }

  // Inserta el nuevo post en la BD
    const result = await pool.query(
      "INSERT INTO posts (title, content,author_id, published) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, author_id, published],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear post:", error);
    res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
};


//GET/posts : obtener todos los posts
const obtenerTodosPosts = async (req, res) => {
  try{
     const result = await pool.query("SELECT * FROM posts");
    res.status(200).json(result.rows);
    //Esta linea de codigo me permite hacer la consulta de desde la data local
    //res.status(200).json(posts);
  }catch(error){
    res.status(500).json({ error: "Error interno del servidor" });

  }
};

//GET/posts/:id : obtener posts por id
const obtenerUnPost = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "el id debe ser un número",
      });
    }

    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Post no encontrado",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//PUT/posts/:id : actualizar post por id
const actualizarUnPost = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "el id debe ser un número",
      });
    }

    const {title, content,author_id, published } = req.body;

    if (!title || !content || !author_id) {
      return res.status(400).json({
        error: "titulo, contenido, and autor_id son requeridos",
      });
    }

/*      // Detectar intentos básicos de SQL injection
      const patronesSQL = /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b)/i;
      if (patronesSQL.test(title || content)) {
        return res.status(400).json ({error:'El nombre contiene palabras no permitidas'});
      } */

    //Validar que el autor exista
    const authorExists = await pool.query(
      "SELECT * FROM authors WHERE id = $1",
      [author_id],
    );
    if (authorExists.rows.length === 0) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }


    // actualiza el post en la BD
    const result = await pool.query(
      "UPDATE posts SET title = $1, content = $2, author_id = $3, published = $4 WHERE id = $5 RETURNING *",
      [ title, content,author_id, published, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Post no encontrado",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//DELETE/posts/:id : eliminar post por id
const eliminarUnPost = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "ID debe ser un número",
      });
    }

        //Validar que el autor exista
    const postExists = await pool.query(
      "SELECT * FROM posts WHERE id = $1",
      [id],
    );
    if (postExists.rows.length === 0) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Post no encontrado",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// GET /posts/author/:authorId : obtener todos los post por autor

const obtenerPostsDeUnAutor = async(req, res) =>{
    const sql = `
        SELECT posts.id,
            posts.title,
            posts.content,
            posts.author_id,
            posts.published,
            posts.created_at,
            authors.name,
            authors.email,
            authors.bio        
        FROM posts 
            JOIN authors ON posts.author_id=authors.id
            WHERE posts.author_id=$1`;

    try{
        // 1. Extraemos y validamos que el authorId sea un número
        const authorId = Number(req.params.authorId);

        if (Number.isNaN(authorId)) {
            return res.status(400).json({
                error: "authorId must be a number"
            });
        }

        // 2. Verificamos si el autor existe en la BD
        const authorExists = await pool.query('SELECT * FROM authors WHERE id = $1', [authorId]);
        
        if (authorExists.rows.length === 0) {
            return res.status(404).json({
                error: "Author not found"
            })
        }

        // 3. Obtenemos los posts del autor con el JOIN
        const consulta = await pool.query(sql, [authorId]);

        // 4. Respondemos con los datos
        res.status(200).json(consulta.rows);
    }catch (error) {
        console.error('Error fetching posts by author:', error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};

export {
  crearPosts,
  obtenerTodosPosts,
  obtenerUnPost,
  actualizarUnPost,
  eliminarUnPost,
  obtenerPostsDeUnAutor,
};
