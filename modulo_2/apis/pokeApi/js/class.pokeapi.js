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
    generatePokemonList(listaPersonajes, objectoDOM){
        /**
         * @param {Array} listaPersonajes - An array containing the object from the Json.
         */
        objectoDOM.innerHTML = "";
        for (let idx in listaPersonajes){
            objectoDOM.innerHTML += `
                <div class="col col-sm-4">
                    <div class="card">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${parseInt(idx)+1}.png" class="card-img-top" alt="...">
                        <div class="card-body">
                        <p class="card-title h5">${listaPersonajes[idx].name}</p>
                        <a href="#" class="btn btn-light extraInfo" id="${listaPersonajes[idx].name}">More Information</a>
                        </div>
                    </div>
                </div>`;
        };
    }
    showSpecificPokemon(pokemon, objectoDOM){
        console.log(3, pokemon)
        const NEW_POKEMON = document.createElement("div");
        NEW_POKEMON.innerHTML = 
         `<div class="col col-sm-4">
           <div class="card">
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="...">
                <div class="card-body">
                <p class="card-title h5">${pokemon.name}</p>
                <a href="#" class="btn btn-light extraInfo" id="${pokemon.name}">More Information</a>
                </div>
            </div>
        </div>`;
        objectoDOM.app
    }
}