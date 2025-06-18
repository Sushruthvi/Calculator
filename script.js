function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function exponent(a, b) {
  return Math.pow(a, b);
}
function divide(a, b) {
  return a / b;
}
function modulus(a, b) {
  return a % b;
}
function multiply(a, b) {
  return a * b;
}
let display = document.getElementById("display");
let button = document.getElementsByTagName("button");
let operatorToggle = false; //tells if a operator is present in the display or not
for (let btn of button) {
  btn.addEventListener("click", function () {
    if (display.textContent.length < 9) {
      // for digits(make the decimal thing here too)
      if (!isNaN(btn.textContent)) {
        display.textContent += btn.textContent;
        // for operators
      } else {
        if (
          display.textContent.length < 8 &&
          operatorToggle == false &&
          display.textContent != ""
        ) {
          display.textContent += btn.textContent;
          operatorToggle = true;
        }
      }
    }
    // for Clear
    if (btn.textContent == "C") {
      if (
        isNaN(display.textContent.charAt(display.textContent.length - 1)) ||
        display.textContent.length == 1
      ) {
        operatorToggle = false;
      }
      display.textContent = display.textContent.slice(0, -1);
    }
    // For Allclear
    else if (btn.textContent == "AC") {
      display.textContent = "";
      operatorToggle = false;
    }
    //for Equalsto
    else if (btn.textContent == "=") {
      const result = operate(display.textContent);
      display.textContent = result.toString().length < 9 ? result : "Result too big";
      operatorToggle=false;
    }

    function operate(mathExpression) {
      for (let i = 0; i < mathExpression.length; i++) {
        let c = mathExpression[i];
        if (isNaN(c) && c !== ".") {
          let operand1 = parseFloat(mathExpression.slice(0, i));
          let operand2 = parseFloat(mathExpression.slice(i + 1));
          switch (c) {
            case "+":
              return add(operand1, operand2);
            case "-":
              return subtract(operand1, operand2);
            case "÷":
              return divide(operand1, operand2);
            case "^":
              return exponent(operand1, operand2);
            case "%":
              return modulus(operand1, operand2);
            case "*":
              return multiply(operand1, operand2);
          }
        }
      }
    }
  });
}
