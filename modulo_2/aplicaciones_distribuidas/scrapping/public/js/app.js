const divNoticias = document.getElementById('noticias');

const URL = "http://localhost:4000/scraper";

fetch(URL)
.then((response) => {
        return response.json();  
    }).then(data => {
        console.log("🚀 ~ file: app.js ~ line 9 ~ .then ~ data", data)
        data.forEach(noticia => {
            let articulo = `<h2> ${noticia.titulo}</h2><a href=${noticia.url}>${noticia.url}</a>`
            divNoticias.insertAdjacentHTML('beforeend', articulo)
        });
    })
.catch((err) => {
    console.log(err);
});