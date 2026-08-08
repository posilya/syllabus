import { Router } from 'express';

import { getTeacherInfo, getTeacherScheduleByInterval, getTeachersList } from '../models/teacher.js'

const router = new Router();

router.get('/', async (req, res) => {
    const teachers = await getTeachersList();

    res.render('teacher/list', { teachers });
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const [teacher, schedule] = await Promise.all([
        getTeacherInfo(id),
        getTeacherScheduleByInterval(id, '2026-07-01', '2026-08-31')
    ]);

    res.render('teacher/schedule', { teacher, schedule });
})

export default router;
