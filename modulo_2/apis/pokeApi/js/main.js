import ApiRest from "./class.pokeapi.js"; // import the module to operate the api

const BTN_BUSCAR = document.getElementById("btnBuscar"); // El boton de búsqueda de personaje
const INPUT_PERSONAJE = document.getElementById("searchInput"); // The input of the character search button.
const CHARACTER_CONTAINER = document.getElementById("charactersContainer");

// Breaking Bad API
const BREAKING_BAD_API_ROOT_URL = "https://pokeapi.co/api/v2/";
const POKEMONS_API_OBJECT = new ApiRest(BREAKING_BAD_API_ROOT_URL);
POKEMONS_API_OBJECT.get("pokemon/?limit=21")
    .then(result => {
        POKEMONS_API_OBJECT.generatePokemonList(result.results, CHARACTER_CONTAINER);
    });

BTN_BUSCAR.addEventListener("click", buscar_Personaje)

function buscar_Personaje (e){
    /**
     * @param {Event} e: the event that triggers the function
     */

    // Prevent the default functionality of the button
    e.preventDefault();
    // Retrive the name to search
    let characterToLookFor = INPUT_PERSONAJE.value; 
    // Following the API documentation we can look for a name using the following string
    let endPoint = "pokemon/" + characterToLookFor.replace(" ","+") 
	console.log("TCL: functionobtener_Personaje -> endPoint", endPoint)
    POKEMONS_API_OBJECT.get( endPoint)
        .then(result => {
            POKEMONS_API_OBJECT.showSpecificPokemon(result, CHARACTER_CONTAINER);
        });
}

const MAIN = document.querySelector("main");
console.log("TCL: MORE_INFO_BTNS", MAIN)

MAIN.addEventListener(
    'click',
    (e) => {
        if(e.target.classList.contains("extraInfo")){
            console.log(e.target.id);
            show_Extra_Information(e.target.id.split("_")[1])
        }
    }
)

function show_Extra_Information(pokemonName){
    let endPoint = "pokemon/" + pokemonName; 
    POKEMONS_API_OBJECT.get( endPoint)
        .then(result => {
            let header = document.getElementById("exampleModalLabel")
            header.textContent = result.name.toUpperCase();
            header.innerHTML += `<p>
            <img src="${result.sprites.other["official-artwork"].front_default}" alt="">
            <img src="${result.sprites.other.dream_world.front_default}" alt="">
            </p>`
            let abilities = [];
            result.abilities.forEach(element => {
                abilities.push(element.ability.name);
            });
			document.getElementById("abilities").textContent = abilities.join(", ");
            let moves = [];
            result.moves.forEach( element => {
                moves.push(element.move.name)
            })
			document.getElementById("moves").textContent = moves.join(", ");
            let types = [];
            console.log(result.types)
            result.types.forEach( element => {
				console.log("TCL: functionshow_Extra_Information -> element", element)
                types.push(element.type.name)
            })
			document.getElementById("types").textContent = types.join(", ");
			console.log("TCL: functionshow_Extra_Information -> types", types)


        });
}
