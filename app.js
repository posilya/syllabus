import express from 'express';

import router from './routers/index.js'

const app = express();
const port = (process.env.PORT) || 3000;

app.use('/', router);

app.listen(port, () => {
    console.log(`http://127.0.1:${port}/`)
})
