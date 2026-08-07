import { Router } from 'express';

import { getTeachersList } from '../models/teacher.js'

const router = new Router();

router.get('/', async (req, res) => {
    const teachers = await getTeachersList();

    res.render('teacher/list', { teachers });
});

export default router;
