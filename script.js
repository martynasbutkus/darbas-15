const display = document.querySelector("[data-current-operand]")
const previousDisplay = document.querySelector("[data-previous-operand]")
const dataNumber = document.querySelectorAll("[data-number]")
const dataOperation = document.querySelectorAll("[data-operation]")
const dataEquals = document.querySelector("[data-equals]")


document.addEventListener("DOMContentLoaded", function() {
    var data = JSON.parse(localStorage.getItem('lastResult'));
    previousDisplay.innerText = data.lastResult;
})

class Calculator {
    constructor() {
        this.lastResult = 0
    }
    
    Condition() {
        dataNumber.forEach((button) => {
            button.addEventListener("click", () => {
                switch (button.innerText) {
                    default:
                        display.innerText += button.innerText
                }
            })
        })
        
        dataOperation.forEach((operation) => {
            operation.addEventListener("click", () => {
                const lastChar = display.innerText.slice(-1)
                const isOperator = ["+", "-", "*", "÷"].includes(lastChar)
                
                switch (operation.innerText) {
                    case "+":
                    case "-":
                    case "*":
                    case "÷":
                        if (display.innerText.length && !isOperator) {
                            display.innerText += "" + operation.innerText + " "
                        }
                        break
                    case "AC":
                        display.innerText = ""
                        break
                    case 'DEL':
                        if (display.innerText) {
                            display.innerText = display.innerText.slice(0, -1)
                        }
                        break
                    default:
                        display.innerText += operation.innerText
                }
            })
        })
    }
    Equals() {
        dataEquals.addEventListener("click", () => {
            if (display.innerText.length) {
                let condition = display.innerText
                let operator = condition.match(/[\+\-\*\/]/g)
                let operators = condition.split(/[\+\-\*\/]/).map(parseFloat)
                
                if (operator && operators.length >= 2) {
                    let result = operators[0]
                    for (let i = 0; i < operator.length; i++) {
                        switch (operator[i]) {
                            case "+":
                                result += operators[i + 1]
                                break
                            case "-":
                                result -= operators[i + 1]
                                break
                            case "*":
                                result *= operators[i + 1]
                                break
                            case "÷":
                                result /= operators[i + 1]
                                break
                        }
                    }
                    console.log(result)
                    this.lastResult = result
                    previousDisplay.innerText = result
                    display.innerText = result

                    this.saveToLocalStorage(result);
                }
            }
        })
    }
    saveToLocalStorage(result) {
        var data = JSON.stringify({ lastResult: result });
        localStorage.setItem('lastResult', data);
    }
}
const calculation = new Calculator()
calculation.Condition()
calculation.Equals()