import ApiRest from "./class.api.js"; // import the module to operate the api

const BTN_BUSCAR = document.getElementById("btnBuscar"); // El boton de búsqueda de personaje
const INPUT_PERSONAJE = document.getElementById("searchInput"); // The input of the character search button.
const CHARACTER_CONTAINER = document.getElementById("charactersContainer");

// Breaking Bad API
const BREAKING_BAD_API_ROOT_URL = "https://breakingbadapi.com/api/";
const BREAKIN_BAD_OBJECT = new ApiRest(BREAKING_BAD_API_ROOT_URL);
BREAKIN_BAD_OBJECT.get("characters")
    .then(result => {
        BREAKIN_BAD_OBJECT.pintarPersonajes(result, CHARACTER_CONTAINER);
    });

BTN_BUSCAR.addEventListener("click", obtener_Personaje)

function obtener_Personaje (e){
    /**
     * @param {Event} e: the event that triggers the function
     */

    // Prevent the default functionality of the button
    e.preventDefault();
    // Retrive the name to search
    let characterToLookFor = INPUT_PERSONAJE.value; 
    // Following the API documentation we can look for a name using the following string
    let endPoint = "characters?name=" + characterToLookFor.replace(" ","+") 
    BREAKIN_BAD_OBJECT.get( endPoint)
        .then(result => {
            BREAKIN_BAD_OBJECT.pintarPersonajes(result, CHARACTER_CONTAINER);
        });
}

