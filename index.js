//para traer las variables entorno del archivo .env
const { loadEnvFile } = require("node:process");
loadEnvFile(".env");

// Importar modulo server que trae Express
const server = require("./src/server");

//Definir un puerto
const PORT = process.env.PORT;

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`);
});

// Base de datos en memoria (simulada)
//let authors = [];
const { authors } = require("./src/db/authors");
const { posts } = require("./src/db/posts");

//let posts = [];

// Variable para generar IDs únicos autoincrementales
let nextIdAuthors = authors.length + 1;
let nextIdPosts = posts.length + 1;

//Endpoints para autores
//GET/health - Verificar que el servidor está funcionando
server.get("/health", (req, res) => {
  res.status(200).json({ message: "Servidor funcionando correctamente" });
});

//GET /authors - Obtener todos los autores
server.get("/authors", (req, res) => {
  res.status(200).json(authors);
});

//POST /authors - crear usuario
server.post("/authors", (req, res) => {
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

server.get("/authors/:id", (req, res) => {
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
server.put("/authors/:id", (req, res) => {
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
server.delete("/authors/:id", (req, res) => {
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

//#2. POSTS

//GET./posts consultar todos los posts
server.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

//GET./posts/:id Consultar un post por ID
server.get("/posts/:id", (req, res) => {
  //Extraer el ID de los parámetros de la ruta y lo convierte a número
  const id = Number(req.params.id);

  //Validar que eñ id es valido
  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "ID must be a number",
    });
  }
  //buscar el post por ID
  const post = posts.find((p) => p.id === id);

  if (!post) {
    //si el post no existe
    return res.status(404).json({
      error: "Post not found",
    });
  }

  //responder que el post fue encontrado
  res.status(200).json(post);
});

//POST./posts Crear un post
server.post("/posts", (req, res) => {
  //Extraer los datos del post del body de la solicitud
  const { authorId, title, content, published, created_at } = req.body;

  //Valuidacion de campos requeridos
  if (!authorId || !title || !content) {
    return res.status(400).json({
      error: "authorId, title and content are required",
    });
  }

  //Crear el objeto Post
  const newPost = {
    id: nextIdPost++,
    title,
    content,
    authorId,
    published: published || false, //si no viene sera false
    created_at: created_at || new Date().toISOString(),
  };

  //Guardar el post en el array de posts
  posts.push(newPost);

  //Devolver el post creado con un status 201
  res.status(201).json(newPost);
});

//PUT./posts/:id Actualizar un post por ID

server.put("/posts/:id", (req, res) => {
  //Extrae el ID del endpoint
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "ID must be a number",
    });
  }

  //Extrae los nuevos datos del body
  const { authorId, title, content, published, created_at } = req.body;

  if (!title || !content || !authorId) {
    return res.status(400).json({
      error: "title, or content, or authorId are required",
    });
  }

  //buscar el indice del post por ID en el array
  //findIndex devuelve la posicion del elemento array, sino lo encuentra devuelve -1
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Post not found",
    });
  }

  posts[index] = {
    id,
    title,
    content,
    authorId,
    published,
    created_at,
  };

  res.status(200).json(posts[index]);
});

//DELETE./posts/:id Eliminar el post
server.delete("/posts/:id", (req, res) => {
  //Extrae el id del endpoint
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "ID must be a number",
    });
  }

  //Buscar el indice del posts
  const index = posts.findIndex((p) => p.id === id);

  //Validar que el indice exista
  if (index === -1) {
    return res.status(404).json({
      error: "Posts not found",
    });
  }

  //Elimina el posts con el indice indicado
  const deleted = posts.splice(index, 1)[0];

  //Cod de respuesta del posts eliminado
  res.status(200).json(deleted);
});

// GET /posts/author/:authorId - Obtener todos los posts con el detalle de su respectivo autor
server.get("/posts/author/:authorId", (req, res) => {
  // 1. Extraemos y validamos que el authorId sea un número
  const authorId = Number(req.params.authorId);

  if (Number.isNaN(authorId)) {
    return res.status(400).json({
      error: "authorId must be a number",
    });
  }

  // 2. Verificamos si el autor realmente existe en nuestra base de datos en memoria
  const authorExists = authors.find((a) => a.id === authorId);
  if (!authorExists) {
    return res.status(404).json({
      error: "Author not found",
    });
  }

  // 3. Filtramos todos los posts que pertenezcan a este authorId
  const authorPosts = posts.filter((p) => p.authorId === authorId);

  // 4. Mapeamos los posts encontrados para incrustar el objeto del autor dentro de cada uno
  const postsWithAuthorDetail = authorPosts.map((post) => {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published,
      created_at: post.created_at,
      author: {
        id: authorExists.id,
        name: authorExists.name,
        email: authorExists.email,
        bio: authorExists.bio,
      },
    };
  });

  // 5. Respondemos con el array finalizado
  res.status(200).json(postsWithAuthorDetail);
});
