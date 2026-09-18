import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

import db, { queriesDir } from './index.js';
import { config } from '../config.js';

import { UserAlreadyExistsError } from '../errors/index.js';

const sql = {
    create: fs.readFileSync(path.join(queriesDir, 'user', 'create', 'user.sql'), 'utf8'),
    getByEmail: fs.readFileSync(path.join(queriesDir, 'user', 'get', 'by_email.sql'), 'utf8')
};

export class User {
    static async create(name, email, plainPassword, superuser = false) {
        const passwordHash = await bcrypt.hash(plainPassword, config.auth.saltRound);
        const normalizedEmail = email?.toLowerCase().trim();

        try {
            const { rows } = await db.query(sql.create, [
                name,
                normalizedEmail,
                passwordHash,
                superuser
            ]);
            return rows[0].id;
        } catch (err) {
            if (err.code === '23505') {
                throw new UserAlreadyExistsError();
            }
            throw err;
        }
    }

    static async getByEmail(email) {
        const normalizedEmail = email?.toLowerCase().trim();
        if (!normalizedEmail) {
            return null;
        }

        const { rows } = await db.query(sql.getByEmail, [normalizedEmail]);
        return rows[0] || null;
    }
}
