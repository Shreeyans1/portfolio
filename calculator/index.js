const display = document.getElementById("display")
var expression = null

function appendToDisplay(input){
    display.textContent += input;
}

function clearDisplay(){
    display.textContent = ""
}

function calculate(){
    display.textContent = eval(display.textContent)
}
