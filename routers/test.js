import { Router } from 'express';
import bcrypt from 'bcrypt'

import { User } from '../models/User.js';

import { BadRequestError, UnauthorizedError, InternalServerError } from '../errors/index.js';

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

router.get('/login', async (_, res) => {
    res.render('test/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        throw new BadRequestError('Не передан email или пароль.');
    }

    const user = await User.getByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        throw new UnauthorizedError('Неверный email или пароль.')
    }

    req.session.user = {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        superuser: user.superuser
    };
    res.json({ user: req.session.user });
});

router.get('/me', async (req, res) => {
    res.json({ user: req.session.user });
});

router.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw new InternalServerError('Не удалось выйти.');
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Успешный выход' });
    });
});
