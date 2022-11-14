import express from 'express';
import  peopleRoutes from './routes/people.routes.js';


const PORT = 3000;

const APP = express();

APP.use(express.json());

APP.use(peopleRoutes);

APP.use((req, res) => {
    res.send("No se ha encontrado la ruta.");
});

APP.listen(PORT);