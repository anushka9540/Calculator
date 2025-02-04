let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = '';
let operators = ['*', '/', '+', '-'];

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const value = e.target.innerHTML;
    const lastChar = string[string.length - 1];

    if (value === '=') {
      try {
        string = eval(string);
        input.value = string;
      } catch {
        input.value = 'Error';
        string = '';
      }
    } else if (value === 'AC') {
      string = '';
      input.value = string;
    } else if (value === 'DEL') {
      string = string.substring(0, string.length - 1);
      input.value = string;
    } else if (operators.includes(value)) {
      if (string !== '' && !operators.includes(lastChar)) {
        string += value;
      } else if (string !== '' && operators.includes(lastChar)) {
        string = string.slice(0, -1) + value;
      }
      input.value = string;
    } else {
      string += value;
      input.value = string;
    }
  });
});
