import fs from 'fs';
import path from 'path';

import db, { queriesDir } from './index.js';

/** Коллекция SQL-запросов */
const sql = {
    getTeachersList: fs.readFileSync(path.join(queriesDir, 'teacher', 'get', 'list.sql'), 'utf-8'),
    getTeacherInfo: fs.readFileSync(
        path.join(queriesDir, 'teacher', 'get', 'teacher_info.sql'),
        'utf-8'
    ),
    getScheduleByInterval: fs.readFileSync(
        path.join(queriesDir, 'teacher', 'get', 'schedule_by_interval.sql'),
        'utf-8'
    )
};

/**
 * Получить список преподавателей, отсортированный по фамилии, имени и отчеству
 * @returns {Promise<Object[]>}
*/
export async function getTeachersList(params) {
    const { rows } = await db.query(sql.getTeachersList);
    return rows;
}

/**
 * Получить информацию о преподавателе (ФИО)
 * @param {number} id - идентификатор преподавателя
 * @returns {Promise<Object>}
 */
export async function getTeacherInfo(id) {
    const { rows } = await db.query(sql.getTeacherInfo, [id]);
    return rows[0];
}

/**
 * Получить расписание преподавателя в заданном интервале
 * @param {number} groupId - идентификатор группы
 * @param {string} dateStart - дата начала интервала в формате `YYYY-MM-DD`
 * @param {string} dateEnd - дата начала интервала в формате `YYYY-MM-DD
 * @returns {Promise<Object[]>}
 */
export async function getTeacherScheduleByInterval(id, dateStart, dateEnd) {
    const { rows } = await db.query(sql.getScheduleByInterval, [id, dateStart, dateEnd]);
    return rows;
}
