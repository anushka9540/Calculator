let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = '';
let operators = ['*', '/', '+', '-'];

// Manual evaluation function
function evaluateExpression(expression) {
  let numbers = [];
  let ops = [];
  let num = '';
  let i = 0;

  // Helper function to perform basic operations
  function applyOperation(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b !== 0 ? a / b : 'Error';
      default:
        return 0;
    }
  }

  // Parsing numbers and operators
  while (i < expression.length) {
    const char = expression[i];

    if (!isNaN(char) || char === '.') {
      num += char; // Build the current number
    } else if (operators.includes(char)) {
      if (char === '-' && (i === 0 || operators.includes(expression[i - 1]))) {
        num += char; // Treat as part of a negative number
      } else {
        if (num !== '') {
          numbers.push(num);
          num = '';
        }

        ops.push(char);
      }
    }
    i++;
  }
  if (num !== '') numbers.push(num);

  // Apply high precedence operators first (* and /)
  for (let j = 0; j < ops.length; j++) {
    if (ops[j] === '*' || ops[j] === '/') {
      const result = applyOperation(numbers[j], numbers[j + 1], ops[j]);
      if (result === 'Error') return 'Error';
      numbers.splice(j, 2, result);
      ops.splice(j, 1);
      j--; // Adjust index after modification
    }
  }

  // Apply remaining operators (+ and -)
  while (ops.length) {
    const result = applyOperation(numbers[0], numbers[1], ops[0]);
    if (result === 'Error') return 'Error';
    numbers.splice(0, 2, result);
    ops.splice(0, 1);
  }

  return numbers[0];
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const value = e.target.innerHTML;
    const lastChar = string[string.length - 1];

    if (value === '=') {
      const result = evaluateExpression(string);
      string = result === 'Error' ? '' : result.toString();
      input.value = result;
    } else if (value === 'AC') {
      string = '';
      input.value = string;
    } else if (value === 'DEL') {
      string = string.slice(0, -1);
      input.value = string;
    } else if (operators.includes(value)) {
      // If the string is empty, allow "-" at the start
      if (string === '') {
        if (value === '-') {
          string += value; // Allow '-' at the start
        }
      } else if (!operators.includes(lastChar)) {
        string += value; // Add operator if last char is not an operator
      } else {
        // Replace consecutive operators with the latest one
        string = string.replace(/([*+/\-]){2,}$/, value);
      }

      // If "-" is pressed after "*" or "/", don't replace "*" or "/" with "-"
      if (value === '-' && (lastChar === '*' || lastChar === '/')) {
        string += value; // Just append "-" after * or /
      }

      // Replace * with / or + (only)
      if (value === '*' && (lastChar === '/' || lastChar === '+')) {
        string = string.slice(0, -1) + '*'; // Replace / or + with *
      }

      // Replace / with * or + (only)
      if (value === '/' && (lastChar === '*' || lastChar === '+')) {
        string = string.slice(0, -1) + '/'; // Replace * or + with /
      }

      // Replace + with - or * or / (only)
      if (
        value === '+' &&
        (lastChar === '-' || lastChar === '*' || lastChar === '/')
      ) {
        string = string.slice(0, -1) + '+'; // Replace - or * or / with +
      }

      // Replace - with * or / or + (only)
      if (
        value === '-' &&
        (lastChar === '*' || lastChar === '/' || lastChar === '+')
      ) {
        string = string.slice(0, -1) + '-'; // Replace * or / or + with -
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
      string += value;
      input.value = string;
    }

    // Ensure the input field scrolls to the right
    input.scrollLeft = input.scrollWidth;
  });
});
