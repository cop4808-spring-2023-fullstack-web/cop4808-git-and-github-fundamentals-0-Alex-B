let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll('button');

let Shift = false;

window.addEventListener('keyup', function(e){
    let code = e.code;
    if (Shift)
    {
        if(e.code == "ShiftLeft")
        {
            console.log("Shift UP")
            Shift = false
        }
    }
});

window.addEventListener('keydown', function(e){
    let code = e.code;
    let num = -1;
    if (Shift == false)
    {
        if (code == "Digit0" || code == "Numpad0")
        {
            num = 48
        }
        if (code == "Digit1" || code == "Numpad1")
        {
            num = 49
        }
        if (code == "Digit2" || code == "Numpad2")
        {
            num = 50
        }
        if (code == "Digit3" || code == "Numpad3")
        {
            num = 51
        }
        if (code == "Digit4" || code == "Numpad4")
        {
            num = 52
        }
        if (code == "Digit5" || code == "Numpad5")
        {
            num = 53
        }
        if (code == "Digit6" || code == "Numpad6")
        {
            num = 54
        }
        if (code == "Digit7" || code == "Numpad7")
        {
            num = 55
        }
        if (code == "Digit8" || code == "Numpad8")
        {
            num = 56
        }
        if (code == "Digit9" || code == "Numpad9")
        {
            num = 57
        }
        if (code == "Equal" || code == "Enter" || code == "NumpadEnter")
        {
            inputEquals();
        }    
    }
    if (Shift == true)
    {
        if (code == "Digit5")
        {
            console.log("Percent Recived")
            num = 80
        }
        if (code == "Digit8")
        {
            inputOperator("*");
        }
        if (code == "Equal")
        {
            inputOperator("+");
        }
        if (code == "Digit6")
        {
            num = 103;
        }
    }
    if (code == "NumpadAdd")
    {
        inputOperator("+");
    }
    if (code == "Backspace")
    {
        inputBackspace();
    }
    if (code == "Minus" || code == "NumpadSubtract")
    {
        inputOperator("-");
    }
    if (code == "Slash" || code == "NumpadDivide")
    {
        inputOperator("/");
    }
    if (code == "Period" || code == "NumpadDecimal")
    {
        inputDecimal(".");
    }
    if (code == "NumpadMultiply")
    {
        inputOperator("*");
    }
    if (code == "KeyE")
    {
        num = 102;
    }
    if (code == "Escape")
    {
        num = 8;
    }
    if (code == "KeyR")
    {
        num = 101;
    }
    if (code == "KeyM")
    {
        num = 104;
    }

    if (code == "ShiftLeft")
    {
        Shift = true;
    }

    const key = document.querySelector(`button[data-key='${num}']`);
    console.log("Key:" + e.code)
    if (num != -1)
    {
        key.click();
    }
    updateDisplay();
});

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
    if(displayValue.length > 9) {
        console.error("Overflow Possible:" + displayValue)
        if(displayValue.includes(".") && !displayValue.includes("e"))
        {
            let cut = displayValue.indexOf(".");
            console.error(displayValue);
            if(cut < 9)
            {
                console.log("Reduction Needed");
                console.error("Found . at:" + cut);
                var p1 = displayValue.substring(0, cut).toString();
                var p2 = displayValue.substring(cut, 9).toString();
                let p3 = p1 + p2
                console.error("Part 1:" + p1)
                console.error("Part 2:" + p2)
                console.error("Part 3:" + p3)
                display.innerText = p3
                displayValue = p3;
            }
        }
        else
        {
            display.innerText = displayValue.substring(1, 10);
            displayValue = displayValue.substring(1, 10);
        }
    }
}
  
updateDisplay();

function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(buttons[i].classList.contains('operand')) {
                inputOperand(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
            } else if(buttons[i].classList.contains('equals')) {
                inputEquals();
                updateDisplay();
            } else if(buttons[i].classList.contains('decimal')) {
                inputDecimal(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('percent')) {
                inputPercent(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('sign')) {
                inputSign(displayValue);
                updateDisplay();
            } 
            else if(buttons[i].classList.contains('clear'))
            {
                clearDisplay();
                updateDisplay();
            }
            else if(buttons[i].classList.contains('rand'))
            {
                displayValue = inputRand(displayValue);
                updateDisplay();
            }
            else if(buttons[i].classList.contains('e'))
            {
                inputE(displayValue);
                updateDisplay();
            }

        }
    )}
}

clickButton();

function inputOperand(operand) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
            //1st click - handles first operand input
            displayValue = operand;
        } else if(displayValue === firstOperand) {
            //starts new operation after inputEquals()
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        //3rd/5th click - inputs to secondOperand
        if(displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function inputOperator(operator) {
    if(firstOperator != null && secondOperator === null) {
        //4th click - handles input of second operator
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else if(firstOperator != null && secondOperator != null) {
        //6th click - new secondOperator
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else { 
        //2nd click - handles first operator input
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function inputEquals() {
    //hitting equals doesn't display undefined before operate()
    if(firstOperator === null) {
        displayValue = displayValue;
    } 
    else if(secondOperator != null) {
        //handles final result
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if(result === 'lmao') {
            displayValue = 'lmao';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } 
    else {
        //handles first operation
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result === 'lmao') {
            displayValue = 'lmao';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
    if (displayValue.includes("e") && displayValue.length > 9)
    {
        console.error("E Contained")
        let cut = displayValue.indexOf("e");
        let start = displayValue.length - cut;
        console.error(displayValue);
        displayValue = displayValue.substring(0, start+1) + displayValue.substring(cut, displayValue.length);

        //Testing E fix
        let fix = Number(displayValue);
        fix = fix.toLocaleString('fullwide', {useGrouping:false});
        console.error("Fix:" + fix);

        //Experimental
        //fix = secondOperand;
    }
}

function inputDecimal(dot) {
    if(displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

function inputRand(num) {
    return Math.abs(Math.floor(Math.random() * (num)))
}

function inputPercent(num) {
    displayValue = (num/100).toString();
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}

function inputE() {
    var E = Math.E.toString();
    displayValue = E.substring(0,9);
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function inputBackspace() {
    if(displayValue.length > 1) {
        let cut = displayValue.length-1;
        display.innerText = displayValue.substring(0, cut);
        displayValue = displayValue.substring(0, cut);
    }
    else 
    {
        display.innerText = 0;
        displayValue = 0;
    }
}

function operate(x, y, op) {
    if(op === '+') {
        return x + y;
    } else if(op === '-') {
        return x - y;
    } else if(op === '*') {
        return x * y;
    } else if(op === '/') {
        if(y === 0) {
            return 'lmao';
        } else {
        return x / y;
        }
    }
    else if(op === '^')
    {
        console.log("Result:"+Math.pow(x,y));
        return Math.pow(x,y);
    }
    else if(op === "%")
    {
        return x%y;
    }
}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}