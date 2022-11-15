// Jelisa Iglesias
/**
 * Import the required packages
 */
 const  express = require('express');
 const  { load } = require('cheerio');
 const  axios = require('axios');
 const  cors = require('cors');
 const  { join } = require('path');

 /**
  * Set general variables
  */
 const PORT = process.env.PORT || 4000;
 const urlToScrape = "https://quotes.toscrape.com";

 const STATIC = "htmlSrc";
 
 const HOST = process.env.HOSTNAME || 'localhost';
 
 const SELF_ROOT_URL = `http://${HOST}:${PORT}/`
 
 // create de server
 const app = express();
 // usar cors para evitar error de fiveserver
 app.use(cors())
 // path to the static files
 app.use(express.static(join(__dirname, STATIC)))
  
 // Initial root
 app.get('/scraper', (req, res) => {
    axios(urlToScrape).then((response) => {
        const html = response.data;
        const $ = load(html);
        const productos = [];
        $('.quote', html).each(function () {
            const text = $(this).find('span.text').text().trim();
            const autor = $(this).find('small.author').text().trim();
            productos.push({ autor,text });
        })
        res.json(productos)
    }).catch((err) => {
        console.log(err);
    });
 });

 
 // Start listening on the port.
 app.listen(PORT, () => console.log(`listening on ${SELF_ROOT_URL}`));