// Validación flexible de variables de entorno
function validateEnv() {
  const requiredBase = ['PORT', 'NODE_ENV', 'API_KEY', 'CORS_ORIGIN'];
  const missingBase = requiredBase.filter(v => !process.env[v]);
  if (missingBase.length) {
    console.error(`Error: faltan variables de entorno obligatorias: ${missingBase.join(', ')}`);
    process.exit(1);
  }

  // Para la base de datos aceptamos una URL completa (DB_URL o DATABASE_URL)
  // o las credenciales separadas (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD)
  const hasDbUrl = Boolean(process.env.DB_URL || process.env.DATABASE_URL);
  const dbVars = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
  const hasDbCreds = dbVars.every(v => Boolean(process.env[v]));
  if (!hasDbUrl && !hasDbCreds) {
    console.error('Error: configure DB_URL/DATABASE_URL o las variables DB_HOST,DB_PORT,DB_NAME,DB_USER,DB_PASSWORD');
    process.exit(1);
  }

  console.log('Variables de entorno validadas correctamente');
}

export default validateEnv;

