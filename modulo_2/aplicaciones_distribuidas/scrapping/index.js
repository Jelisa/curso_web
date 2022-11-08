// JElisa Iglesias
/**
 * Import the required packages
 */
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const cors = require('cors');
const {join} = require('path');


/**
 * Set general variables
 */
const PORT = process.env.PORT || 4000;
const URL = "https://www.lavanguardia.com/";
const STATIC = "public";

// create de server
const app = express();
// usar cors para evitar error de fiveserver
app.use(cors())
// path to the static files
app.use(express.static(join(__dirname, STATIC)))

// Initial root
app.get('/', (req, res) =>{ res.send('Hols')});

// Initial root
app.get('/scraper', (req, res) =>{
    axios(URL).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const noticias = [];
        $('.title', html).each( function (){
            const titulo = $(this).text().trim();
            // console.log("🚀 ~ file: index.js ~ line 30 ~ titulo", titulo)
            const url = URL + $(this).find('a').attr('href');
            // console.log("🚀 ~ file: index.js ~ line 31 ~ url", url)
            noticias.push({titulo, url})
        })
        // console.log("🚀 ~ file: index.js ~ line 28 ~ axios ~ noticias", noticias)

        res.json(noticias)
    }).catch((err) => {
       console.log(err); 
    });
});

// Start listening on the port.
app.listen(PORT, () => console.log(`listening on port ${PORT}`));