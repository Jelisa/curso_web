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
 const urlToScrape = "https://webscraper.io/test-sites/e-commerce/allinone/computers";

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
        // console.log('hola')
        const html = response.data;
        const $ = load(html);
        const productos = [];
        $('div.caption', html).each(function () {
            const precio = $(this).find('h4.price').text().trim();
            const nombreProducto = $(this).find('h4>a').attr('title').trim();
            const descripcion = $(this).find('p.description').text().trim();
            productos.push({ precio, nombreProducto, descripcion });
        })
        res.json(productos)
    }).catch((err) => {
        console.log(err);
    });
 });

 
 // Start listening on the port.
 app.listen(PORT, () => console.log(`listening on ${SELF_ROOT_URL}`));