function add(a, b){
    return a + b;
}

function substract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function square(a){
    return a * a;
}

function operate(operator, a, b){
    switch(operator){
        case '+':
            return add(a, b);
            break;
        
        case '-':
            return substract(a, b);
            break;

        case '*':
            return multiply(a, b);
            break;

        case '/':
            return divide(a, b);
            break;

        case 'x²':
            return square(a);
            break;
    }
}

let display = document.querySelector('#display');
let debug_a = document.getElementById("n1")
let debug_b = document.getElementById("n2")
let debug_operator = document.getElementById("operator")
let debug_result = document.getElementById("result")

let a = '';
let b = '';
let operator = '';
let result = '';

function setOperand(){
    if(operator){
        b = display.value;
    }else{
        a = display.value;
    }
}

function setOperator(value){
    if(!a && !result){
        return;
    }

    calculate();
    operator = value;

    if(result){
        a = result;
        result = 0;
    }
}

function calculate(){
    if(a && b && operator){
        result = operate(operator, Number(a), Number(b));

    }else if(a && !b && !operator){
        b = '0'
        operator = '+'
        result = operate(operator, Number(a), Number(b));
    }
    
    a = '';
    b = '';
    operator = '';
    addDisplay(result);
}

function clearDisplay(){
    display.value = '';
}

function clearAll(){
    clearDisplay();
    a = '';
    b = '';
    operator = '';
    result = 0;
}

function addDisplay(value){
    if(value === '.' && display.value === ''){
        value = '0.'
    }

    if(display.value.includes('.') && (value === '.')){
        return;
    }

    if((!a && !operator && !b) || (a && operator && !b)){
        display.value = value;
    }else{
        display.value = `${display.value}${value}`
    }
   
}

function changeSign(){
    if((!a && !b) || (operator && !b)){
        return;
    }

    if(display.value[0] === '-'){
        console.log("number is negative")
        display.value = display.value.slice(1);

    }else{
        console.log("number is positive")
        display.value = `-${display.value}`;
    }
}


function divideByHundred(){
    if(a && !b && !operator){
        b = 100;
        operator = '/';
        calculate();
    }
}


function parse(value){
    if (['+', '-', '*', '/'].includes(value)){
        setOperator(value);

    }else if(value === "CE"){
        clearDisplay();

    }else if(value === "CA"){
        clearAll();

    }else if(value === "+/-"){
        changeSign();
        setOperand();

    }else if(value === "%"){
        divideByHundred();

    }else if(value === "="){
        calculate();

    }else if(typeof(Number(value)) === "number"){
        addDisplay(value);
        setOperand();

    }else if(value === "."){
        addDisplay(value);
        setOperand();
    }
}


function debug_display(){
    debug_a.textContent = a;
    debug_b.textContent = b;
    debug_operator.textContent = operator;
    debug_result.textContent = result;
}


document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('.btn')) return;

	parse(event.target.textContent)

    //show variables in debug
    //debug_display();

	// Log the clicked element in the console
	console.log(event.target.textContent);

}, false);





