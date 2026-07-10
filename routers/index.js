import { Router } from 'express';

import { getGroupScheduleByInterval } from '../models/lesson_schedule.js';

import groupsRouter from './groups.js';

const router = new Router();

router.get('/', async (req, res) => {
    res.render('schedule/group', {
        schedule: await getGroupScheduleByInterval(1, '2024-10-01', '2024-10-07')
    });
});

router.use('/group', groupsRouter);

export default router;
