//para traer las variables entorno del archivo .env
import { loadEnvFile } from 'node:process';
loadEnvFile('.env');

const requiredEnvVars = [
    'PORT', 'NODE_ENV', 'DB_URL', 'API_KEY', 'CORS_ORIGIN',
    'DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'
];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    console.error(`Error: La variable de entorno ${varName} no está definida`);
    process.exit(1);
  }
}
console.log('Todas las variables de entorno requeridas están presentes');

//const { default: app } = await import('./src/app.js');
//const { default: config } = await import('./src/config/config.js');

const { default: app } = await import('./src/app.js');

const { default: config } = await import('./src/config/config.js');

app.listen(config.PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${config.PORT} en modo ${config.NODE_ENV}`);
});

export default app;



