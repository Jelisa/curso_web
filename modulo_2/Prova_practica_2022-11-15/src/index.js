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
 
// Create de server
const app = express();
// Use cors to avoid  self-referencing errors
app.use(cors())

// Path to the static files, this include the predefined root folder
app.use(express.static(join(__dirname, STATIC)))

// Scraper root
app.get('/scraper', (req, res) => {
    // use axios to obtain the html information via a promise
    axios(urlToScrape).then((response) => {
        // It  will give us a response. that we can load via cheerios
        const $ = load(response.data);
        // Empty array to store the retrived information in objects
        const quotes = [];
        // using cheerios look for each item of class quote
        $('.quote', html).each(function () {
            // obtain the text 
            const text = $(this).find('span.text').text().trim();
            // obtain the autor 
            const autor = $(this).find('small.author').text().trim();
            // add the information as an object to the quotes array
            quotes.push({ autor,text });
        })
        // Send the information as a json to the page.
        res.json(quotes)
    }).catch((err) => {
        // If there's an error catch it and print the error information.
        console.log(err);
    });
});

// Start listening on the port.
app.listen(PORT, () => console.log(`Service running`));