function pick(val) {
  document.getElementById('a').value += val;
}

function clearInput() {
  document.getElementById('a').value = ' ';
}

function calculate() {
  var expression = document.getElementById('a').value;

  var operands = expression.split(/[\+\-\*\/]/);
  var operator = expression.match(/[\+\-\*\/]/);

  var num1 = parseFloat(operands[0]);
  var num2 = parseFloat(operands[1]);
  var result;

  switch (operator[0]) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 == 0) {
        result = 'Error';
      } else {
        result = num1 / num2;
      }
      break;
    default:
      result = 'Error';
  }

  document.getElementById('a').value = result;
  
}
