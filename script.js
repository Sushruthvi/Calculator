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
  if (b === 0) return "∞";
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
let decimalToggle1=false;
let decimalToggle2=false;
for (let btn of button) {
  btn.addEventListener("click", function () {
    // Handle Clear (C) first so it always works
    if (btn.textContent == "C") {
      if (display.textContent.length > 0) {
        let lastChar = display.textContent[display.textContent.length - 1];
        if (isNaN(lastChar) && lastChar !== '.') {
          operatorToggle = false;
        }
        if (lastChar === '.') {
          if (!operatorToggle) {
            decimalToggle1 = false;
          } else {
            decimalToggle2 = false;
          }
        }
        display.textContent = display.textContent.slice(0, -1);
      }
      return; // Stop further processing for this click
    }
  
    // For Allclear
    if (btn.textContent == "AC") {
      display.textContent = "";
      operatorToggle = false;
      decimalToggle1 = false;
      decimalToggle2 = false;
      return;
    }

    // for Equalsto
    if (btn.textContent == "=") {
      const result = operate(display.textContent);
      let resultStr = String(result);

      if (resultStr.length <= 9) {
        display.textContent = resultStr;
      } else {
        // Try rounding to 2 decimal places
        let rounded = Number(result).toFixed(2);
        if (rounded.length <= 9) {
          display.textContent = rounded;
        } else {
          display.textContent = "Result too big";
        }
      }
      operatorToggle = false;
      decimalToggle1 = false;
      decimalToggle2 = false;
      return;
    }

    // Only handle input if display is not full
    if (display.textContent.length < 9) {
      // for digits(make the decimal thing here too)
      if (!isNaN(btn.textContent)||btn.textContent=='.') {
        if(!isNaN(btn.textContent)){display.textContent += btn.textContent;}
        if(btn.textContent=='.'){
        if(operatorToggle==false && decimalToggle1==false){
          decimalToggle1=true;
          display.textContent+=btn.textContent;
        }
        else if(operatorToggle==true && decimalToggle2==false){
          decimalToggle2=true;
          display.textContent+=btn.textContent;
        }
   
      }
        // for operators
      } else {
        if (
          display.textContent.length < 8 &&
          operatorToggle == false &&
          display.textContent != "" && btn.textContent!='=' && btn.textContent!='.'
        ) {
          display.textContent += btn.textContent;
          operatorToggle = true;
        }
      }
    }

   
  });
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
document.addEventListener("keydown", function (e) {
  const key = e.key;

  // Digits and decimal
  if (!isNaN(key) || key === ".") {
    simulateButtonClick(key);
  }

  // Operators
  if (["+", "-", "*", "/", "%", "^"].includes(key)) {
    simulateButtonClick(key === "/" ? "÷" : key);
  }

  // Enter key for '='
  if (key === "Enter") {
    simulateButtonClick("=");
  }

  // Backspace for 'C'
  if (key === "Backspace") {
    simulateButtonClick("C");
  }

  // Escape for All Clear
  if (key === "Escape") {
    simulateButtonClick("AC");
  }
});
function simulateButtonClick(value) {
  for (let btn of button) {
    if (btn.textContent === value) {
      btn.click();
      break;
    }
  }
}
