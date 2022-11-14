import {Router} from 'express';
import {selectPeople, insertPeople, getPerson, updatePerson, deletePeople, patchPeople} from '../controllers/people.controller.js';

const router = Router();

// router.get('/test', async (req, res) => {
//         const [rows] = pool.query("SELECT * FROM people", (err =>{
//             res.status(500).send("ha habido un error.<br>Inténtelo más tarde")
//         }));
//         res.send(rows);
//         res.status(500).send("ha habido un error.<br>Inténtelo más tarde")
// });
// router.get('/test', getTest);


// Para mostrar
router.get('/api/people', selectPeople);

// Para mostrar
router.get('/api/people/:id', getPerson);

router.get("/api/year", (req, res) => {
    res.send('year')
});

router.get("/api/oscar", (req, res) => {
    res.send('oscar')
});

// para añadir
router.post('/api/people', insertPeople);

// para modificar
router.put('/api/people/:id', updatePerson);

// para modificar
router.patch('/api/people/:id', patchPeople);

// para borrar
router.delete('/api/people/:id', deletePeople);

export default router;