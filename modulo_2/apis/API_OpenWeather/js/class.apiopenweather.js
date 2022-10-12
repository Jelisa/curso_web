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
        /** Función para poder imprimir la prediccion del tiempo
         * 
         */
        
        // If the document object has children Nodes they'll be removed to append the new ones.
        if (objectoDOM.hasChildNodes()){
            objectoDOM.replaceChildren();
        }

        // Let's pick the template from the HTML 
        const TEMPLATE = document.getElementById("forecastCard").content;

        // Create a fragment that will contain the information temporary.
        const NEW_FRAGMENT = document.createDocumentFragment();

        // for each prediction provided by the API we'll create a card and store it into the fragment.
        predictions.list.forEach(
            (element, idx) =>{
                const NEW_ELEMENT = TEMPLATE.cloneNode(true);

                const DATETIME = NEW_ELEMENT.getElementById("dateTime");
                DATETIME.innerHTML = element.dt_txt;
                DATETIME.id = `dateTime_${idx}`;
                DATETIME.classList.add("dateTimeInfo");

                const ICON = NEW_ELEMENT.getElementById("iconFC");
                ICON.src = `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`;
                ICON.alt = element.weather[0].description;
                ICON.id = `iconFC_${idx}`;
                ICON.classList.add("weatherIcon");

                const CURRENT_TEMP = NEW_ELEMENT.getElementById("temperatureFC");
                CURRENT_TEMP.textContent = `${element.main.temp}ºC`;
                CURRENT_TEMP.id = `temperatureFC_${idx}`;
                CURRENT_TEMP.classList.add("currentTemp");

                const HUMIDITY = NEW_ELEMENT.getElementById("humidityFC");
                HUMIDITY.textContent = `${element.main.humidity}%`;
                HUMIDITY.id = `humidityFC_${idx}`;
                HUMIDITY.classList.add("currentHum");

                const MIN_TEMP = NEW_ELEMENT.getElementById("minTemp");
                MIN_TEMP.textContent = `min: ${element.main.temp_min}ºC`;
                MIN_TEMP.id = `minTemp_${idx}`;
                MIN_TEMP.classList.add("minTemp");

                const MAX_TEMP = NEW_ELEMENT.getElementById("maxTemp");
                MAX_TEMP.textContent = `max: ${element.main.temp_max}ºC`;
                MAX_TEMP.id = `maxTemp_${idx}`;
                MAX_TEMP.classList.add("maxTemp");

                // Append the modified  element to the fragment
                NEW_FRAGMENT.appendChild(NEW_ELEMENT);
            }
        );

        // Transfer the fragment's  children to the node of the document that will contin it.
        objectoDOM.appendChild(NEW_FRAGMENT)
        
    }

}