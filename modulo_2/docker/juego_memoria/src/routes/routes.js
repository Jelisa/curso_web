// Jelisa Iglesias 
// Aquí van las rutas del proyecto.

const {Router} = require('express');
const {join} = require('node:path')

const router = Router();
const staticFolder = "../html"


router.get('/juego', (req, res) => {
    res.sendFile(join(__dirname, staticFolder,'index.html'))
})


module.exports = router;