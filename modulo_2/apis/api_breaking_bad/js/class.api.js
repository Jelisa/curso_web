export default class ApiRest {
    constructor(rootURL) {
        this.rootURL = rootURL; // Setting the root for the API
    }
    async get (endPoint){
        /**A function to obtain the json information from a given endpoint
         * @param {string} endPoint: a string containing the endpoint to look for.
         */

        const URL = this.rootURL + endPoint; // Generating the full URL
        
        const PETICION = await fetch(URL, {
            method:"GET", // Select on the Server
            headers: { "Accept": "application/json"} // Specify it's a json object
        })

        if(PETICION.status === 200){
            let json = await PETICION.json()
            return json;
        }
        else{
            return PETICION.statusText;
        }
    }

    // Qué queremos mostrar y donde.
    pintarPersonajes(listaPersonajes, objectoDOM){
        /**
         * @param {Array} listaPersonajes - An array containing the object from the Json.
         */

        objectoDOM.innerHTML = "";
        for (let personaje of listaPersonajes){
            objectoDOM.innerHTML += `
                <div class="col col-sm-4">
                    <div class="card">
                        <img src="${personaje.img}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <p class="card-title h5">${personaje.name}</p>
                        <p class="card-text">${personaje.occupation}</p>
                        <p class="card-text">${personaje.status}</p>
                        </div>
                    </div>
                </div>`;
        };
    }
}