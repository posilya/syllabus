import express, { Router } from 'express';

import { getGroupScheduleByInterval } from '../models/lesson_schedule.js'; 

const router = new Router();

router.get('/', async (req, res) => {
    res.send(JSON.stringify(await getGroupScheduleByInterval(1, '2024-10-01', '2024-10-07')));
});

export default router;
