import { Pool } from 'pg';
import { fileURLToPath } from 'url';
import path from 'path';

import 'dotenv/config.js';

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

export const queriesDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'sql', 'lesson_schedule'
);

export default pool;
