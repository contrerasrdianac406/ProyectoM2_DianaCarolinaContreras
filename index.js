// Importar Express
const express = require("express");

// Crear una instancia de Express
const app = express();

// Definir un puerto
const PORT = 3000;

//  Agregar middleware
app.use(express.json());

// Base de datos en memoria (simulada)
let authors = [];
let posts = [];

// Variable para generar IDs únicos autoincrementales
let nextId = 1;

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
    id: nextId++, // Asignar un ID único autoincremental,
    name, // Equivalente a: name: nombre del autor
    email, // Equivalente a: email: correo electrónico del autor
    bio, // Equivalente a: bio: biografía del autor
    created_at, // Equivalente a: created_at: fecha de creación del autor
  };

  // GUARDAR el autor en nuestro "database" (array)
  authors.push(newAuthor);

  //RESPONDER con 201 Created (NO 200!)
  //201 indica que se creo in recurso de manera exitosa
  res.status(201).json(newAuthor);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`);
});
