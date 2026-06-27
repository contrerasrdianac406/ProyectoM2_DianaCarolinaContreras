// Cargar variables de entorno (usar .env en local)
import dotenv from 'dotenv';
dotenv.config();

import validateEnv from './src/config/validateEnv.js';

// Validar variables de entorno (flexible: acepta DB_URL/DATABASE_URL o credenciales DB_*)
validateEnv();

//const { default: app } = await import('./src/app.js');
//const { default: config } = await import('./src/config/config.js');

const { default: app } = await import('./src/app.js');

const { default: config } = await import('./src/config/config.js');

app.listen(config.PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${config.PORT} en modo ${config.NODE_ENV}`);
});

export default app;



