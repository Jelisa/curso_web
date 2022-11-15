// Obtain the quotes container
const divQuotes = document.getElementById('quotes');
// Obtain the posible template.
const quoteTemplate = document.getElementById('quoteCard').content

// The URL where the data should be retrived.
const URL = "http://localhost:4000/scraper";

// Get the URL information via promise
fetch(URL)
.then((response) => {
    // return the information retrieved
        return response.json();  
    }).then(data => {
        // Use the retrived information to modify the webpage.
        data.forEach(quote => {
            let quoteCard;
            // chek if the browser supports the template
            if (typeof(quoteTemplate) !== "undefined"){
                quoteCard = updateQuoteTemplate(quote)
                divQuotes.appendChild(quoteCard)
            }
            else{
                // A failsafe for browsers that do not support templates.
                quoteCard = generateQuoteCard(quote)
                divQuotes.insertAdjacentHTML('beforeend', quoteCard)
            }
        });
    })
.catch((err) => {
    // If there's an error catch it and print the error information.
    console.log(err);
});

/**
 * A function to generate the information to show on the page from scratch using a string
 * @param {Object} quoteInfo - The Object to obtain the information from
 * @return {String} An string to use as the HTML to be added
 */
function generateQuoteCard (quoteInfo){
    return `<div class="card m-3 border-primary mb-3">
    <div class="card-body">
        <h2 class="card-title align-content-between text-primary">${quoteInfo.autor}</h2>
        <p class="align-content-between">${quoteInfo.text}</p>
    </div>
</div>`
}

/**
 * A function to use the template and update the information
 * @param {Object} quoteInfo - The Object to obtain the information from
 * @return {Object} An HTML fragment to be added
 */
function updateQuoteTemplate(quoteInfo){
    // Create  a new fragment
    const fragment = document.createDocumentFragment();
    // Clone the template
    const tempTemplate = quoteTemplate.cloneNode(true);
    // Modify the template with the appropiated information
    tempTemplate.querySelector(".author").textContent = quoteInfo.autor;
    tempTemplate.querySelector(".quoteText").textContent = quoteInfo.text;
    // Add the template to the fragment 
    fragment.appendChild(tempTemplate);
    return fragment
}