import fs from 'fs';
import path from 'path';

import db, { queriesDir } from './index.js';

/** Коллекция SQL-запросов */
const sql = {
    getTeachersList: fs.readFileSync(path.join(queriesDir, 'teacher', 'get', 'list.sql'), 'utf-8')
};

/**
 * Получить список преподавателей, отсортированный по фамилии, имени и отчеству
 * @returns {Promise<Object[]>}
*/
export async function getTeachersList(params) {
    const { rows } = await db.query(sql.getTeachersList);
    return rows;
}
