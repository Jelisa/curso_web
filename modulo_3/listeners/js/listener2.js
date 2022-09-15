const abuelo = document.querySelector("#abuelo");
const padre = document.querySelector("#padre");
const nieto = document.querySelector("#nieto");


// abuelo.addEventListener(
//     'click',
//     (e) => {
//         console.log(e.target.id);
//         e.stopPropagation();
//     }
// )

// padre.addEventListener(
//     'click',
//     (e) => {
//         console.log(e.target.id);
//         e.stopPropagation();
//     }
// )

// nieto.addEventListener(
//     'click',
//     (e) => {
//         console.log(e.target.id);
//         e.stopPropagation();
//     }
// )

document.addEventListener(
    'click',
    (e) => {
        // if (e.target.classList[0] === "familia"){
        //     alert("soy TU PADRE");
        // }
        // if (e.target.classList.contains("familia")){
        //     alert("We Are family~");
        // }
        // if (e.target.matches(".familia")){
        //     alert("We Are family2~");
        // }
        if (e.target.dataset['div'] == "divAbuelo"){
            alert("Soy el abu!");
            e.preventDefault();
        }
        console.log(e)}
);
