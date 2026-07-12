import { Router } from 'express';

import { getGroupList, getGroupInfo, getGroupScheduleByInterval } from '../models/group.js';

const router = new Router();

router.get('/', async (req, res) => {
    const groups = await getGroupList();

    res.render('group/list', { groups });
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const [group, schedule] = await Promise.all([
        getGroupInfo(id),
        getGroupScheduleByInterval(id, '2026-07-01', '2026-08-31')]
    );

    res.render('group/schedule', { group, schedule });
});

export default router;
