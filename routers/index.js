import { Router } from 'express';

import { getGroupScheduleByInterval } from '../models/group.js';

import groupsRouter from './groups.js';

const router = new Router();

router.get('/', async (req, res) => {
    res.render('schedule/group', {
        schedule: await getGroupScheduleByInterval(1, '2026-07-01', '2026-08-31')
    });
});

router.use('/group', groupsRouter);

export default router;
