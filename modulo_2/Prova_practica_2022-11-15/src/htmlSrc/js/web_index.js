const divQuotes = document.getElementById('quotes');

const URL = "http://localhost:4000/scraper";

fetch(URL)
.then((response) => {
        return response.json();  
    }).then(data => {
        data.forEach(quote => {
            let quoteCard = `<div class="card m-3 border-primary mb-3">
                    <div class="card-body">
                        <h2 class="card-title align-content-between text-primary">${quote.autor}</h2>
                        <p class="align-content-between">${quote.text}</p>
                    </div>
                </div>`
            divQuotes.insertAdjacentHTML('beforeend', quoteCard)
        });
    })
.catch((err) => {
    console.log(err);
});
