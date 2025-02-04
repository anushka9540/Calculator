let input = document.getElementById('inputBox');

let buttons = document.querySelectorAll('button');

let str = '';
let arr = Array.from(buttons);

arr.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (e.target.innerHTML == '=') {
      var expression = document.getElementById('inputBox').value;

      var operands = expression.split(/[\+\-\*\%\/]/);
      var operator = expression.match(/[\+\-\*\%\/]/);

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
        case '%':
          result = num1 % num2;
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

      document.getElementById('inputBox').value = result;
    } else if (e.target.innerHTML == 'AC') {
      str = '';
      input.value = str;
    } else if (e.target.innerHTML == 'DEL') {
      str = str.substring(0, str.length - 1);
      input.value = str;
    } else {
      str += e.target.innerHTML;
      input.value = str;
    }
  });
});
