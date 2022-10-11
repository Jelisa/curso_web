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
    Current_Weather(citisCurrentWeather, objectoDOM){
        /**
         * @param {Array} listaPersonajes - The Json with the city's weather to show.
         * @param {Node} objectoDOM - The Node to modify with the info from the API
         */

        const CONTENT_ORIGINAL_PARENT = objectoDOM.parentNode;
        
        const NEW_FRAGMENT = document.createDocumentFragment();
        NEW_FRAGMENT.appendChild(objectoDOM);
        NEW_FRAGMENT.getElementById("cityAndCountry").textContent = 
            `${citisCurrentWeather.name.toUpperCase()} / ${citisCurrentWeather.sys.country.toUpperCase()}`
        NEW_FRAGMENT.getElementById("skyes").innerHTML = 
            `${citisCurrentWeather.weather[0].description.toUpperCase()} 
            <img src="http://openweathermap.org/img/wn/${citisCurrentWeather.weather[0].icon}@2x.png" alt="">`
        NEW_FRAGMENT.getElementById("temperature").textContent = `${citisCurrentWeather.main.temp} º C`
        NEW_FRAGMENT.getElementById("humidity").textContent = `Humidity: ${citisCurrentWeather.main.humidity} %`
        NEW_FRAGMENT.getElementById("wind").textContent = `Wind: ${citisCurrentWeather.wind.speed} m/s`
        CONTENT_ORIGINAL_PARENT.appendChild(NEW_FRAGMENT)
    }

    Forecast_Prediction(predictions, objectoDOM){
        /** Función para poder imprimir la prediccion dle tiempo
         * 
         */
        // const template = document.   
    }

}