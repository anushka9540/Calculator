let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = '';
let operators = ['*', '/', '+', '-'];

// Function to evaluate the expression manually
function evaluateExpression(expression) {
  // Step 1: Handle the multiplication and division first
  let numbers = expression.split(/([*\/])/); // Split by multiplication or division
  let result = parseFloat(numbers[0]);

  for (let i = 1; i < numbers.length; i += 2) {
    const operator = numbers[i];
    const nextNumber = parseFloat(numbers[i + 1]);

    if (operator === '*') {
      result *= nextNumber;
    } else if (operator === '/') {
      result /= nextNumber;
    }
  }

  // Step 2: Handle addition and subtraction
  let finalResult = result;
  let additionAndSubtractionParts = expression.split(/([+-])/); // Split by + or -

  // Now go through the parts and process addition/subtraction
  for (let i = 1; i < additionAndSubtractionParts.length; i += 2) {
    const operator = additionAndSubtractionParts[i];
    const nextValue = parseFloat(additionAndSubtractionParts[i + 1]);

    if (operator === '+') {
      finalResult += nextValue;
    } else if (operator === '-') {
      finalResult -= nextValue;
    }
  }

  return finalResult;
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const value = e.target.innerHTML;
    const lastChar = string[string.length - 1];

    if (value === '=') {
      try {
        // Call evaluateExpression to evaluate the expression
        const result = evaluateExpression(string);
        string = result.toString();
        input.value = result;
      } catch (error) {
        string = '';
        input.value = 'Error';
      }
    } else if (value === 'AC') {
      // Clear the input
      string = '';
      input.value = string;
    } else if (value === 'DEL') {
      // Remove last character
      string = string.slice(0, -1);
      input.value = string;
    } else if (operators.includes(value)) {
      // Handle operator inputs
      if (string === '') {
        if (value === '-') {
          string += value;
        }
      } else if (!operators.includes(lastChar)) {
        string += value;
      } else {
        // If last operator is * or /, treat - as part of the next number
        if (lastChar === '*' || lastChar === '/') {
          string += value;
        } else {
          string = string.slice(0, -1) + value;
        }
      }
      input.value = string;
    } else if (value === '.') {
      const lastOperatorIndex = Math.max(
        string.lastIndexOf('+'),
        string.lastIndexOf('-'),
        string.lastIndexOf('*'),
        string.lastIndexOf('/')
      );

      const currentNumber = string.slice(lastOperatorIndex + 1);

      if (!currentNumber.includes('.')) {
        if (currentNumber === '') {
          string += '0.';
        } else {
          string += value;
        }
        input.value = string;
      }
    } else {
      // Append the number to the string
      string += value;
      input.value = string;
    }
  });
});
