import fs from 'fs';
import path from 'path';

import db, { queriesDir } from './index.js';

/** Коллекция SQL-запросов */
const sql = {
    getList: fs.readFileSync(path.join(queriesDir, 'group', 'get', 'list.sql'), 'utf8'),
    getGroupInfo: fs.readFileSync(path.join(queriesDir, 'group', 'get', 'group_info.sql'), 'utf8'),
    getScheduleByInterval: fs.readFileSync(
        path.join(queriesDir, 'group', 'get', 'schedule_by_interval.sql'),
        'utf8'
    )
};

/**
 * Получить список групп, отсортированный по номеру курса и названию по алфавиту
 * @returns {Promise<Object[]>}
 */
export async function getGroupList() {
    const { rows } = await db.query(sql.getList);
    return rows;
}

/**
 * Получить информацию о группе (имя, короткое имя и номер курса)
 * @param {number} id - идентификатор группы
 * @returns {object}
 */
export async function getGroupInfo(id) {
    const { rows } = await db.query(sql.getGroupInfo, [id]);
    return rows[0];
}

/**
 * Получение расписания группы в заданном интервале
 * @param {number} groupId - идентификатор группы
 * @param {string} dateStart - дата начала интервала в формате `YYYY-MM-DD`
 * @param {string} dateEnd - дата начала интервала в формате `YYYY-MM-DD
 * @returns {Promise<object[]>}
 */
export async function getGroupScheduleByInterval(groupId, dateStart, dateEnd) {
    const { rows } = await db.query(sql.getScheduleByInterval, [groupId, dateStart, dateEnd]);
    return rows;
}
