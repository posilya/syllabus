import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { User } from '../models/User.js';

async function createSuperuser() {
    console.log('=== Создание суперпользователя ===');
    const { fullName, email, password } = await getUserData();

    await User.create(fullName, email, password, true);
    console.log('Пользователь создан!');
}

async function getUserData() {
    const rl = readline.createInterface({ input, output });

    let fullName;
    while (true) {
        fullName = (await rl.question('Имя: ')).trim();
        if (isValidName(fullName)) {
            break;
        }
        console.log('!! Некорректное имя. Минимум 2 буквы, только буквы, пробелы и дефис.');
    }

    let email;
    while (true) {
        email = (await rl.question('Email: ')).trim();
        if (isValidEmail(email)) {
            break;
        }
        console.log('!! Некорректный email. Пример: user@example.com');
    }

    let password;
    while (true) {
        password = await rl.question('Пароль: ');
        if (isValidPassword(password)) {
            break;
        }
        console.log('!! Некорректный пароль. Минимум 8 символов, буква + цифра.');
    }

    rl.close();

    return { fullName, email, password };
}

// TODO вынести проверку куда-то в другое место
function isValidName(name) {
    return name.trim().length >= 1 && /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name.trim());
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function isValidPassword(password) {
    return password.length >= 8 && /[A-Za-zА-Яа-яЁё]/.test(password) && /\d/.test(password);
}

createSuperuser()
    .catch((err) => { console.error(`Не удалось создать пользователя: ${err.message}`); })
    .then(() => { process.exit(0); });
