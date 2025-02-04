let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let operators = ["*", "/", "+", "-"];


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
       
        else if (operators.includes(value)) 
        {
            if (string === "") 
            {
                if (value === "-") 
                {
                    string += value; 
                }
            } 
            else if (!operators.includes(lastChar)) 
            {
                string += value;  
            } 
            else 
            {
                string = string.slice(0, -1) + value;  
            }
            input.value = string;
        } 
       
        else if (value === '.') 
        {
           
            const lastOperatorIndex = Math.max(
                string.lastIndexOf('+'),
                string.lastIndexOf('-'),
                string.lastIndexOf('*'),
                string.lastIndexOf('/')
            );

            const currentNumber = string.slice(lastOperatorIndex + 1);

          
            if (!currentNumber.includes('.')) 
            {
               
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
      
        else 
        {
            string += value;
            input.value = string;
        }
    });
});
