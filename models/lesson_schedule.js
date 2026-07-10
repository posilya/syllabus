import fs from 'fs';
import path from 'path';

import db, { queriesDir } from './index.js';

/** Коллекция SQL-запросов */
const sql = {
    byInterval: fs.readFileSync(
        path.join(queriesDir, 'lesson_schedule', 'get', 'group', 'by_interval.sql'),
        'utf8'
    )
};

/**
 * Получение расписания группы в заданном интервале
 * @param {number} groupId - идентификатор группы
 * @param {string} dateStart - дата начала интервала в формате `YYYY-MM-DD`
 * @param {string} dateEnd - дата начала интервала в формате `YYYY-MM-DD
 * @returns {Promise<object[]>}
 */
export async function getGroupScheduleByInterval(groupId, dateStart, dateEnd) {
    const { rows } = await db.query(sql.byInterval, [groupId, dateStart, dateEnd]);
    return rows;
}
