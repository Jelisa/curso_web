export default class ApiRest {
    constructor(rootURL) {
        this.rootURL = rootURL; // Setting the root for the API
    }
    async get (endPoint){
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
}