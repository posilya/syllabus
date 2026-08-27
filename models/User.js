import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

import db, { queriesDir } from './index.js';

const sql = {
    create: fs.readFileSync(path.join(queriesDir, 'user', 'create', 'user.sql'), 'utf8')
};

export class User {
    static async create(name, email, plainPassword) {
        const passwordHash = await bcrypt.hash(plainPassword, 10);

        const { rows } = await db.query(sql.create, [name, email, passwordHash]);
        return rows[0].id;
    }
}

