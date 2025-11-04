const displayCurrent = document.querySelector(".display .current");
const displayHistory = document.querySelector(".display .history");
const buttons = document.querySelectorAll(".button");

let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;


        if (button.classList.contains("number")) {
            if (displayCurrent.textContent === "0" || shouldResetDisplay) {
                displayCurrent.textContent = value;
                shouldResetDisplay = false;
            } else if (displayCurrent.textContent.length < 12) { 
                displayCurrent.textContent += value;
            }
        }


        else if (value === ".") {
            if (shouldResetDisplay) {
                displayCurrent.textContent = "0.";
                shouldResetDisplay = false;
            } else if (!displayCurrent.textContent.includes(".")) {
                displayCurrent.textContent += ".";
            }
        }


        else if (value === "C") {
            displayCurrent.textContent = "0";
            displayHistory.textContent = "";
            firstOperand = null;
            operator = null;
            shouldResetDisplay = false;
        }


        else if (value === "±") {
            displayCurrent.textContent = -parseFloat(displayCurrent.textContent);
        }

        else if (value === "%") {
            displayCurrent.textContent = parseFloat(displayCurrent.textContent) / 100;
        }



        else if (button.classList.contains("operator") && value !== "=") {
            if (firstOperand === null) {
                firstOperand = parseFloat(displayCurrent.textContent);
            } else if (operator && !shouldResetDisplay) {
                const result = calculate(firstOperand, parseFloat(displayCurrent.textContent), operator);
                displayCurrent.textContent = formatResult(result);
                firstOperand = result;
            }
            operator = value;
            displayHistory.textContent = `${firstOperand} ${operator}`;
            shouldResetDisplay = true;
        }


        else if (value === "=") {
            if (operator && firstOperand !== null) {
                const secondOperand = parseFloat(displayCurrent.textContent);
                const result = calculate(firstOperand, secondOperand, operator);
                displayCurrent.textContent = formatResult(result);
                displayHistory.textContent = `${firstOperand} ${operator} ${secondOperand}`;
                firstOperand = null;
                operator = null;
                shouldResetDisplay = true;
            }
        }
    });
});


function calculate(a, b, operator) {
    if (typeof a !== "number" || typeof b !== "number") {
        return "Invalid input: both arguments must be numbers.";
    }

    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) {
                return "Error";
            }
            return a / b;
        default:
            return `Unknown operator: ${operator}`;
    }
}


function formatResult(value) {
    if (typeof value === "number") {
        const str = value.toPrecision(12);
        return parseFloat(str).toString();
    } else {
        return value; 
    }
}   
