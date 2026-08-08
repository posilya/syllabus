import { Pool } from 'pg';
import { fileURLToPath } from 'url';
import path from 'path';

import 'dotenv/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === 'required'
});

export const queriesDir = path.join(__dirname, 'sql');

export default pool;
