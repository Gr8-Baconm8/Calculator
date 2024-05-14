let runningTotal = 0;
let buffer = "0";
let previousOperator
let input = "";

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    updateScreen();
}

function handleSymbol(symbol){
    switch(symbol){
        case 'CE':
            buffer = '0';
            runningTotal = 0;
            input = "";
            break;
        case '=':
            if(previousOperator === null){
                return
            }
            input += buffer;
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            updateScreen();
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.toString(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break; 
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    input += buffer + symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function updateScreen() {
    if (previousOperator === null) {
        screen.innerText = buffer; 
    } else {
        screen.innerText = input + buffer; 
    }
}

function init(){
    document.querySelector('.calc-buttons').
    addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}


init();