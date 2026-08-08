import { Router } from 'express';

import { getGroupScheduleByInterval } from '../models/group.js';

import groupRouter from './group.js';
import teacherRouter from './teacher.js';

const router = new Router();

router.get('/', async (_, res) => {
    res.render('index');
});

router.use('/group', groupRouter);
router.use('/teacher', teacherRouter);

export default router;
