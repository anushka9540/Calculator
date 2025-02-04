let display = document.getElementById('display');
    let currentInput = '0';

    function clearDisplay() {
        currentInput = '0';
        display.innerText = currentInput;
    }

    function appendToDisplay(value) {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
        display.innerText = currentInput;
    }

    function calculate() {
        try {
            // Handle remainder operation (%) separately
            if (currentInput.includes('%')) {
                let [num1, num2] = currentInput.split('%').map(Number);
                currentInput = (num1 % num2).toString();
            } else {
                currentInput = eval(currentInput).toString();
            }
        } catch (e) {
            currentInput = 'Error';
        }
        display.innerText = currentInput;
    }