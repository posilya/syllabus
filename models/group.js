import fs from 'fs';
import path from 'path';

import db, { queriesDir } from './index.js';

/** Коллекция SQL-запросов */
const sql = {
    getList: fs.readFileSync(path.join(queriesDir, 'group', 'get', 'list.sql'), 'utf8')
};

/**
 * Получить список групп, отсортированный по номеру курса и названию по алфавиту
 * @returns {Promise<Object[]>}
 */
export async function getGroupList() {
    const { rows } = await db.query(sql.getList);
    return rows;
}
