// Jelisa Iglesias
// Aquí van la lógica del proyecto y la configuración de express 

const express = require('express');
const morgan = require('morgan');
const router = require('./routes/routes.js');
const {join} = require('node:path')

const app = express();

app.use(morgan('dev'));

app.use(router);

app.use(express.static(join(__dirname,'public')))

module.exports = app;