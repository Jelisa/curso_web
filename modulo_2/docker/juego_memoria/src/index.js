// Jelisa Iglesias
// aquí arrancaremos el servidor

const process = require('node:process');
const app = require('./app.js');

const PORT = process.env.PORT || 4011;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

app.listen(PORT, () => {console.log(`Listening on: http://${HOSTNAME}:${PORT}`);});