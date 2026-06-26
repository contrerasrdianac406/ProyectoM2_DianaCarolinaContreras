// conexión de la data creada localmente
//const { authors } = require("../data/authors");

// pool para la conexion de la BD
/* const { Pool } = require("pg");
const pool = require("../db/config");
const { response } = require("express"); */


// pool para la conexion de la BD Ecma6

import pg from 'pg';
const { Pool } = pg;
import pool from "../db/config.js";
import { json } from 'express';
import { validarEmail,esNum,patronesSQL } from '../test/validators.js';



// POST/authors - creación de autores
const crearAutores = async (req, res) => {
  try {

    //Extraer datos del cuerpo de la solicitud
    const { name, email, bio } = req.body;

    //Validar que los campos requeridos estén presentes
    if (!name || !email) {
      // Si falta name o author, responder con error 400 (Bad Request)
      return res
        .status(400)
        .json({ error: "El nombre y el correo electrónico son obligatorios" });
    }

    // Detectar intentos básicos de SQL injection
    // evitar SQL injection para el nombre
      if (patronesSQL (name) === true){
        return res.status(400).json ({error:'El nombre contiene palabras no permitidas'});
      }  

    // Validar el formato del email.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json ({error: "El formato del email es inválido"});
    }
  
    //Validar que el correo electrónico no esté repetido
    const emailExists = await pool.query(
      "SELECT * FROM authors WHERE email = $1",
      [email],
    );
    if (emailExists.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "El correo electrónico ya está registrado" });
    }

// Crea el nuevo autor en la BD
    const result = await pool.query(
      "INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bio],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener el autor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//GET/authors : obtener todos los autores
const obtenerTodosAutores = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM authors ORDER BY id ASC");
    res.status(200).json(result.rows);
    //Esta linea de codigo me permite hacer la consulta de desde la data local
    //res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//GET/authors/:id : obtener autor por id
const obtenerUnAutor = async (req, res) => {
  try {
    // EXTRAER el ID de los parámetros de la URL
    const id = Number(req.params.id); // Convertir el ID a número

    //VALIDAR que el ID sea un número válido
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número válido" });
    }
    //validar que el Id sea positivo
    if (id <= 0) {
      return res
        .status(400)
        .json({ error: "El ID debe ser un número positivo" });
    }

    // consultar un autor en la base de datos
    const result = await pool.query("SELECT * FROM authors WHERE id = $1", [id] );
    const authors = result.rows;

    //BUSCAR el autor en el array
    const author = authors.find((author) => author.id === id);

    //VALIDAR si el autor existe
    if (!author) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    //RESPONDER con el autor encontrado
    res.status(200).json(author);
  } catch (error) {
    console.error("Error al obtener el autor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//PUT/authors/:id : actualizar un autor
const actualizarUnAutor = async (req, res) => {
  try {
    const id = Number(req.params.id);
    // Validar que el ID sea un número válido para validar si es una letra 
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número válido2" });
    }

    // Si el id es menor o igual a 0 o negativos
      if (Number(id) <= 0) {
        return res.status(404).json({ error: 'El ID debe ser un número válido3' });
      }


    //Extraer los datos del body de la solicitud
    const { name, email, bio, created_at } = req.body;
    //EXTRAER y VALIDAR el ID

    // VALIDAR que los datos requeridos estén presentes
    if (!name || !email) {
      return res
        .status(400)
        .json({ error: "El nombre y el correo electrónico son obligatorios" });
    }

    // Validar si el autor existe
    const autorExiste = await pool.query(
      "SELECT * FROM authors WHERE id = $1",
      [id],
    );

    // Detectar intentos básicos de SQL injection
    // evitar SQL injection para el nombre
      if (patronesSQL (name) === true){
        return res.status(400).json ({error:'El nombre contiene palabras no permitidas'});
      }  

    //BUSCAR el autor
    if (autorExiste.rows.length === 0) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    const result = await pool.query(
      "UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *",
      [name, email, bio, id],
    );

    // Responder con el autor actualizado
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener el autor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//DELETE/authors/:id : eliminar un autor
const eliminarUnAutor = async (req, res) => {
  try {
  // extraer y validar el ID
  const id = Number(req.params.id);
  // Valida que el Id ingresado corresponda a un número
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "El id debe ser un número " });
  }

  //Verificar si el autor existe

  const autorExiste = await pool.query("SELECT * FROM authors WHERE id = $1",[id],);
  
  if (autorExiste.rows.length === 0) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  //Eliminar autor por ID
  const result = await pool.query("DELETE FROM authors WHERE id = $1 RETURNING *", [id]);

  //Responder con el autor eliminado
  res.status(200).json(result.rows[0]);

  } catch (error){
    console.error("Error al obtener el autor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
}
};

export {
  crearAutores,
  obtenerTodosAutores,
  obtenerUnAutor,
  actualizarUnAutor,
  eliminarUnAutor,
};
