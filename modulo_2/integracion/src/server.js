// Jelisa Iglesias 
import express from 'express';
import { join } from 'path';
import cors from 'cors'

import { PORT, STATIC_FOLDER } from './config/serverConfig.js';


import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const APP = express();

APP.use(express.urlencoded({extended: true}))

APP.use(cors())

APP.set('view engine', 'ejs');
APP.set('views', join(__dirname, 'views'))

APP.use(express.static(join(__dirname, STATIC_FOLDER)));

APP.post('/informacion', (req, res) => {
    res.sendFile(join(__dirname, STATIC_FOLDER, 'welcome.html'));
    // res.send(`<h1> Bienvenido ${req.body.inputName}</h1><br><p>Tu email es: ${req.body.inputEmail}</p><p>Tu mensaje ha sido:</p><p>${req.body.inputText}</p>`);
    // res.json(req.body)
    res.render('welcome.ejs', req.body)
});

// APP.get('/informacion', (req, res) => {
//     res.sendFile(join(__dirname, STATIC_FOLDER, 'welcome.html'))
// })


APP.listen(PORT, () => console.log('Server running'));