// Importar Express
const express = require("express");

// Crear una instancia de Express
const app = express();

// Definir un puerto
const PORT = 3000;

//  Agregar middleware
app.use(express.json());

// Base de datos en memoria (simulada)
//let authors = [];
const { authors } = require("./src/data/authors");
const { posts } = require("./src/data/posts");

//let posts = [];

// Variable para generar IDs únicos autoincrementales
let nextIdAuthors = authors.length + 1;
let nextIdPosts = posts.length + 1;

//Endpoints para autores
//GET/health - Verificar que el servidor está funcionando
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Servidor funcionando correctamente" });
});

//GET /authors - Obtener todos los autores
app.get("/authors", (req, res) => {
  res.status(200).json(authors);
});

//POST /authors - crear usuario
app.post("/authors", (req, res) => {
  //Extraer datos del cuerpo de la solicitud
  const { name, email, bio, created_at } = req.body;

  //Validar que los campos requeridos estén presentes
  if (!name || !email) {
    // Si falta name o author, responder con error 400 (Bad Request)
    return res
      .status(400)
      .json({ error: "El nombre y el correo electrónico son obligatorios" });
  }

  //Validar que el correo electrónico no esté repetido
  const emailExists = authors.some((author) => author.email === email);
  if (emailExists) {
    // Si el correo electrónico ya existe, responder con error 400 (Bad Request)
    return res
      .status(400)
      .json({ error: "El correo electrónico ya está registrado" });
  }

  // Crear el nuevo objeto de autor
  const newAuthor = {
    id: nextIdAuthors++, // Asignar un ID único autoincremental,
    name, // Equivalente a: name: nombre del autor
    email, // Equivalente a: email: correo electrónico del autor
    bio, // Equivalente a: bio: biografía del autor
    created_at: created_at || new Date().toISOString(), // Equivalente a: created_at: fecha de creación del autor
  };

  // GUARDAR el autor en nuestro "database" (array)
  authors.push(newAuthor);

  //RESPONDER con 201 Created (NO 200!)
  //201 indica que se creo in recurso de manera exitosa
  res.status(201).json(newAuthor);
});

// GET /authors/:id - Obtener un autor específico por su ID

app.get("/authors/:id", (req, res) => {
  // EXTRAER el ID de los parámetros de la URL
  const id = Number(req.params.id); // Convertir el ID a número

  //VALIDAR que el ID sea un número válido
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser un número válido" });
  }
  //BUSCAR el autor en el array
  const author = authors.find((author) => author.id === id);

  //VALIDAR si el autor existe
  if (!author) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }
  //RESPONDER con el autor encontrado
  res.status(200).json(author);
});

// PUT /authors/:id - Actualizar un autor completamente
app.put("/authors/:id", (req, res) => {
  //EXTRAER y VALIDAR el ID
  const id = Number(req.params.id);
  // Validar que el ID sea un número válido
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser un número válido" });
  }

  //Extraer los datos del body de la solicitud
  const { name, email, bio, created_at } = req.body;

  // VALIDAR que los datos requeridos estén presentes
  if (!name || !email) {
    return res
      .status(400)
      .json({ error: "El nombre y el correo electrónico son obligatorios" });
  }

  //BUSCAR el índice del libro en el array
  const authorIndex = authors.findIndex((author) => author.id === id);

  // Validar si el autor existe
  if (authorIndex === -1) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  // REMPLAZAR el autor completo en esta posicion
  authors[authorIndex] = {
    id, // mantener el mismo ID
    name,
    email,
    bio,
    created_at: created_at || new Date().toISOString(),
  };

  // Responder con el autor actualizado
  res.status(200).json(authors[authorIndex]);
});

// DELETE /authors/:id - Eliminar un autor por su ID
app.delete("/authors/:id", (req, res) => {
  // extraer y validar el ID

  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "El id debe ser un número " });
  }

  // Buscar el indice de un autor
  const index = authors.findIndex((author) => author.id === id);

  //Validar que el autor exista
  if (index === -1) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  //Eliminar el autor del arrayy guardar referencia

  const deleted = authors.splice(index, 1)[0];

  // Responder con el autor eliminado

  res.status(200).json(deleted);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`);
});
