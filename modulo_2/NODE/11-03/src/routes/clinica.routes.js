// Jelisa Iglesias
import {Router} from 'express';
import { countPatientsByGenre, deletePatient, insertPatients, modifyPatientByNIF, selectPatients, selectPatientsByNIF, sortBySurname } from '../controllers/patients.controller.js';

const router = Router();

// 1) Ver todos los pacientes mediante la ruta
router.get("/api/pacientes", selectPatients);

// 2) Filtrar los pacientes por su NIF
router.get("/api/pacientes/:nif", selectPatientsByNIF);

// 3) Añadir pacientes por post en la url
router.post("/api/pacientes", insertPatients);

// 4) Modificar pacientes por patch en la url
router.patch("/api/pacientes/:nif", modifyPatientByNIF);

// 4) Borrar pacientes por delete en la url
router.delete("/api/pacientes/:nif",deletePatient);

// 5) Mostrar la cantidad de pacientes de cada género en la url
router.get("/api/genero", countPatientsByGenre);

// 6) Mostrar los pacientes ordenados por apellido en la url
router.get("/api/apellidos", sortBySurname);

export default router;
