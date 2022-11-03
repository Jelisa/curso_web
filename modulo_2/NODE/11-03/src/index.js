// Jelisa Iglesias
import express from 'express';
import  patientsRoutes from './routes/clinica.routes.js';


const PORT = 3000;

const APP = express();

APP.use(express.json());

APP.use(patientsRoutes);

APP.use((req, res) => {
    console.log('Ruta incorrecta');
    res.send("No se ha encontrado la ruta.");
});

APP.listen(PORT);