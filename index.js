// 1. Importar Express
const express = require("express");

// 2. Crear una instancia de Express
const app = express();

// 3. Definir un puerto
const PORT = 3000;

// 4. Agregar middleware
app.use(express.json());

// 5. Definir rutas
app.get("/", (req, res) => {
  res.json({});
});

// 6. Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`);
});
