// Jelisa Iglesias 
// Aquí van las rutas del proyecto.

const {Router} = require('express');
const {join} = require('node:path')

const router = Router();
const staticFolder = "../public"

router.get('/saludo', (req, res) => {
    res.json({saludo: 'Buenas tarde'});
});

router.get('/', (req,res) => {
    res.sendFile(join(__dirname, staticFolder,'/index.html'))
})

module.exports = router;