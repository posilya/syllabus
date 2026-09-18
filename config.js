process.loadEnvFile();

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
    throw new Error('FATAL ERROR: Переменная SESSION_SECRET обязательна.');
}
if (sessionSecret.length < 32) {
    throw new Error('FATAL ERROR: Переменная SESSION_SECRET должна быть не менее 32 символов.');
}

export const config = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '5432',
        name: process.env.DB_NAME || 'syllabus',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'secret'
    },
    auth: {
        saltRound: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10
    },
    session: {
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: process.env.HAS_HTTP === 'true',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * (parseInt(process.env.HAS_HTTP, 10) || 8)
        }
    }
};
