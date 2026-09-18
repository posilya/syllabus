import { Router } from 'express';

import { User } from '../models/User.js';

const router = new Router();
export default router;

router.get('/create-user', async (req, res) => {
    res.render('test/create_user');
});

router.post('/create-user', async (req, res) => {
    const { name, email, password } = req.body;

    console.log(name);
    console.log(email);
    console.log(password);

    res.status(201).json({ message: 'User created' });
});
