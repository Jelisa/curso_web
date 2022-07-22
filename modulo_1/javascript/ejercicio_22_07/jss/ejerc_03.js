let fechasInternacionales = [["2022-10-26"], ["2021-06-30"], ["2020-03-12"]];

console.log("Date property: ", solucionWithDate(fechasInternacionales))
console.log("Split method: ", solucionUsingSplit(fechasInternacionales))

function solucionWithDate(input){
    let fechasLocales = [];
    for (fecha of input){
        let date = new Date(fecha[0]);
        fechasLocales.push([date.toLocaleDateString().replaceAll("/","-")]);
    }
    return fechasLocales;
}

function solucionUsingSplit(input){
    let fechasLocales = [];
    for (fecha of input){
        let date = fecha[0].split("-");
        fechasLocales.push([[date[2],date[1],date[0]].join("-")])
    }
    return fechasLocales
}

function solucionUsingSplitAndFOR(input){
    let fechasLocales = [];
    for (let i = 0; i <input.length; i++){
        let date = input[i][0].split("-");
        let fechas2 = [date[2],date[1],date[0]].join("-");
        fechasLocales.push([fechas2]);
    }
    return fechasLocales;
}

