const lista = document.querySelector(".lista")

// console.log(lista.children[0]);

const newElement = document.createElement('li');
newElement.textContent = "Cactus";
newElement.className = "flor";

// lista.appendChild(newElement);

// lista.removeChild(newElement);

// lista.insertAdjacentElement('beforebegin', newElement)
// lista.insertAdjacentElement('afterbegin', newElement)
// lista.insertAdjacentElement('beforeend', newElement)
lista.insertAdjacentElement('afterend', newElement)

const newFlower = document.createElement('li');
// newFlower.textContent = "Cardo";
newFlower.innerHTML = "<span>amapola</span>";
newFlower.style.backgroundColor = "blue";
newFlower.style.color = "white";

const oldFlower = document.querySelector('.lista').children[2];
lista.replaceChild(newFlower, oldFlower)