process.loadEnvFile();

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
    }
};
