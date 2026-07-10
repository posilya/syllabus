import { Router } from 'express';

import { getGroupList } from '../models/group.js';

const router = new Router();

router.get('/', async (req, res) => {
    const groups = await getGroupList();

    res.render('group/list', { groups });
});

export default router;
