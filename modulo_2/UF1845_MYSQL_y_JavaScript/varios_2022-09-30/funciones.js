function division (a, b){
    return a/b;
}

export function dividir(a, b){
    if (isNaN(a) || isNaN(b)){
        return "Hay que pedir números";} 
    else if (b == 0){
        return "No se puede dividir por zero";}
    else{
        return division(a, b)}
}