import ApiRest from "./class.apiopenweather.js";

// Get the buttons that will send and get information from the API
const BTN_GET_DATA = document.getElementById("changeCity");
const BTN_GET_FORECAST = document.getElementById("forecast");

// Set the parameters needed for the API
const OPENWEATHER_API_ROOT = "http://api.openweathermap.org/";
const OPENWEATHER_API_OBJECT = new ApiRest(OPENWEATHER_API_ROOT);
const API_KEY = "APPID=6c9744b35586f6b311223250a34696cf";

// Get the content to modify with the API Information
const CURRENT_WEATHER_CARD = document.getElementById("currentWeather");
const FORECAST_CONTAINER = document.getElementById("forecast");
console.log("🚀 ~ file: main.js ~ line 15 ~ FORECAST_CONTAINER", FORECAST_CONTAINER.replaceChildren())

// let endPoint = `data/2.5/weather?q=${DEFAULT_CITY},${DEFAULT_COUNTRY}&${API_KEY}&units=metric`

getDataFromApi();

BTN_GET_DATA.addEventListener(
    'click',
    (e) => {
        e.preventDefault();
        getDataFromApi();
    }
)

function getDataFromApi(){
    let country = document.getElementById("formCountry").value;
    let city = document.getElementById("formCity").value;
    let currentWeatherEndPoint = `data/2.5/weather?q=${city},${country}&${API_KEY}&units=metric`
    OPENWEATHER_API_OBJECT.get(currentWeatherEndPoint)
        .then(result => {
            if (result === "Not Found" || result === "Bad Request"){
                console.log("TCL: getDataFromApi -> result", result)
                if (!checkErrorMessage()){
                    printError();}
            }
            else{
                if (checkErrorMessage()){
                    deleteErrorMessage();
                }
                OPENWEATHER_API_OBJECT.Current_Weather(result, CURRENT_WEATHER_CARD);
				console.log("TCL: getDataFromApi -> result", result.coord.lon);
                let forecastEndPoint = `data/2.5/forecast?lat=${result.coord.lat}&lon=${result.coord.lon}&${API_KEY}&units=metric`;
                OPENWEATHER_API_OBJECT.get(forecastEndPoint)
                    .then(
                        result => {
                            console.log(0, FORECAST_CONTAINER.hasChildNodes());
                            OPENWEATHER_API_OBJECT.Forecast_Prediction(result, FORECAST_CONTAINER);
                        }
                    )
                console.log(FORECAST_CONTAINER, forecastEndPoint)
            }
        });
}

function printError(){
    const ERROR_NODE = document.createElement('p');
    ERROR_NODE.textContent = "Invalid City and/or Country"
    ERROR_NODE.id = "errorMessage";
    ERROR_NODE.classList.add("text-danger")
    const CITY_LINE = document.getElementById("cityAndCountry");
    CITY_LINE.insertAdjacentElement("beforebegin", ERROR_NODE);

}

function checkErrorMessage(){
    const ERROR_NODE = document.getElementById("errorMessage");
    if (ERROR_NODE == null){
        return false;
    }
    else{
        return true;
    }
}

function deleteErrorMessage(){
    const ERROR_NODE = document.getElementById("errorMessage");
    ERROR_NODE.remove();
}