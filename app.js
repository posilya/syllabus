import express from 'express';
import hbs from 'hbs';

import { fileURLToPath } from 'node:url';
import path from 'node:path';

import router from './routers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const viewsPath = path.join(__dirname, 'views');

app.use('/', router);

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(path.join(viewsPath, 'partials'));

app.listen(port, () => {
    console.log(`http://127.0.1:${port}/`);
});
