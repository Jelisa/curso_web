function setResult(value) {
document.getElementById('results').innerHTML = value;
}
function getResult() {
return(document.getElementById('results').innerHTML);
}
function add(key) {
var result = getResult();
if (result!='0' || isNaN(key)) setResult(result + key);
else setResult(key);
}
function computeResults() {
var result = eval(getResult());
setResult(result);
}
function resetResults() {
setResult(0);
}