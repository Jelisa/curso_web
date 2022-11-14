const divProductos = document.getElementById('productos');

const URL = "http://localhost:4000/scraper";

fetch(URL)
.then((response) => {
        return response.json();  
    }).then(data => {
        data.forEach(producto => {
            let productCard = `<div class="card col-lg-4 m-2" style="width: 18rem;">
                    <div class="card-body">
                        <h2 class="card-title align-content-between">${producto.nombreProducto}</h2>
                        <p class="text-primary align-content-between">${producto.precio}</p>
                        <p class"align-content-between">${producto.descripcion}</p>
                    </div>
                </div>`
            divProductos.insertAdjacentHTML('beforeend', productCard)
        });
    })
.catch((err) => {
    console.log(err);
});
