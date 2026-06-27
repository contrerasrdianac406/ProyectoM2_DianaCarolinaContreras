// configuración de la base de datos
import pg from 'pg';
const { Pool } = pg;

// Support either a full connection string (DATABASE_URL or DB_URL) or individual DB_* vars
const connectionString = process.env.DATABASE_URL || process.env.DB_URL || null;

const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    })
  : new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

export default pool;
