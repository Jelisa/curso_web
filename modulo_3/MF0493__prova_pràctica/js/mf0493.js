//1 

const footer = document.querySelector("footer>p");
footer.textContent = "Jelisa Iglesias";


const main = document.querySelector("main");

main.addEventListener(
    "click",
    (e) => {
        if (e.target.id == "button-bcn") {
            /* When the button is clicked we proceed to sort the li elements within the 
                first list found with the class stored in listaClass*/ 
            let listaClass = ".lista-población-bcn";
            const listToOrder = document.querySelector(listaClass); // We select the <ul> element to sort.
            let sortedList = sortListDescendingAsNumbers(listToOrder.children); // Order the <li> elements
            // This approach is more robust and will work even if the list has non-<li> elements at the begining of the list.
            let indxSL = 0 // Set an idx to traverse the sorted List
            for (let i=0; i < listToOrder.children.length; i++){
                if (listToOrder.children[i].tagName == "LI"){
                    // We only modify the <li> elements
                    listToOrder.children[i].textContent = sortedList[indxSL++];
                }
            }
            /* Initial approach which works but doesn't support having elements that aren't <li> at the beginning of the list.
            sortedList.forEach(
                (element, indx) => {
                    let itemToModify = listToOrder.children[indx]; // We modify only the first children which are the li elements 
                    itemToModify.textContent = element
                }
            )*/
        }
        if (e.target.tagName == "IMG" && e.target.parentNode.id == "imagen") {
            // Store the attributes to retrieve names in a variable, and the id in another.
            let attributesToRetrieve = ["prop1", "prop2", "prop3", "prop4"];
            let paragraphId = "answer";

            let sentence = ""; // Initializing an empty string to store the attributes values.
            attributesToRetrieve.forEach(element => sentence += e.target.getAttribute(element))

            document.getElementById(paragraphId).textContent = sentence; 
        }
    }
)


function sortListDescendingAsNumbers(lista) {
    /** A function that sorts a DOM collection containing li elements by converting it to an Array
     *  and returns a sorted list with the contents
     * Params:
        ** lista: a DOM element that can be converted to array and contains li elements to sort.
     * Returns: sortedList an array containing the values of the li elements sorted. It can be shorter than the input.
     */
    let newList = Array.from(lista);
    let sortedList = []
    newList.forEach(
        element => {
            if (element.tagName == "LI") {
                sortedList.push(element.textContent);
            }
        })
    return sortedList.sort()
}
