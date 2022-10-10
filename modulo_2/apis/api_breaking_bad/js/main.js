import ApiRest from "./class.api.js"; // import the module to operate the api

const BTN_BUSCAR = document.getElementById("btnBuscar"); // El boton de búsqueda de personaje
const INPUT_PERSONAJE = document.getElementById("searchInput"); // The input of the character search button.

// Breaking Bad API
const BREAKING_BAD_API_ROOT_URL = "https://breakingbadapi.com/api/";
const BREAKIN_BAD_OBJECT = new ApiRest(BREAKING_BAD_API_ROOT_URL);
BREAKIN_BAD_OBJECT.get("characters/1")
// console.log(INPUT_PERSONAJE.value);

BTN_BUSCAR.addEventListener("click", obtener_Personaje)

function obtener_Personaje (e){
    /**
     * @param {Event} e: the event that triggers the function
     */
    // Prevent the default functionality of the button
    e.preventDefault();
    let characterToLookFor = INPUT_PERSONAJE.value;

}