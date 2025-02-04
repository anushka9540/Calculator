let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let operators = ["*", "/", "+", "-"];

// Safe evaluation function
function safeEval(expression) 
{
    try 
    {
        return new Function('return ' + expression)();
    } 
    catch (error) 
    {
        return "Error";
    }
}

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerHTML;
        const lastChar = string[string.length - 1];

        if (value === '=') 
        {
            const result = safeEval(string);
            string = result === "Error" ? "" : result.toString();
            input.value = result;
        } 
        else if (value === 'AC') 
        {
            string = "";
            input.value = string;
        } 
        else if (value === 'DEL') 
        {
            string = string.slice(0, -1);
            input.value = string;
        } 
        // Allow '-' at the start but restrict other operators
        else if (operators.includes(value)) 
        {
            if (string === "") 
            {
                if (value === "-") 
                {
                    string += value;  // Allow '-' at the start
                }
            } 
            else if (!operators.includes(lastChar)) 
            {
                string += value;  // Add operator if last char is not an operator
            } 
            else 
            {
                string = string.slice(0, -1) + value;  // Replace the last operator
            }
            input.value = string;
        } 
        // Handle decimal point (.) - allow only one per number segment
        else if (value === '.') 
        {
            // Find the current number segment after the last operator
            const lastOperatorIndex = Math.max(
                string.lastIndexOf('+'),
                string.lastIndexOf('-'),
                string.lastIndexOf('*'),
                string.lastIndexOf('/')
            );

            const currentNumber = string.slice(lastOperatorIndex + 1);

            // Allow '.' only if it's not already present in the current number
            if (!currentNumber.includes('.')) 
            {
                // Prevent starting with '.' without a leading zero
                if (currentNumber === "") 
                {
                    string += "0.";
                } 
                else 
                {
                    string += value;
                }
                input.value = string;
            }
        } 
        // Handle numbers
        else 
        {
            string += value;
            input.value = string;
        }
    });
});
