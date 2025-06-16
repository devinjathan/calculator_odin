// Calculator JS
currentInput = '';
let ls = '';
let rs = '';
let op = null;
// call to perform operations
function operate(op, x, y){
    x = parseFloat(x);
    y = parseFloat(y);
    let ans;
    switch(op) {
        case '+':
            ans = add(x, y);
            break;
        case '-':
             ans = sub(x, y);
             break;
        case '*':
            ans = multiply(x, y);
            break;
        case '/':
            ans = divide(x, y);
            break;
        default:
            break;
    }
    return Math.round((ans + Number.EPSILON) * 1e10) / 1e10;
}

function add(x, y){return x + y;}
function sub(x, y){return x - y;}
function multiply(x, y){return x * y;}
function divide(x, y){return x / y;}



// Display
const screen = document.getElementById('screen');
const displayButton = document.querySelectorAll('.button');
displayButton.forEach(button => {
    button.addEventListener('click', () => {
        // is an operator

        if(['+', '-', '*', '/'].includes(button.textContent)){
            // error check
            if(ls === ''){return;}
            const lastChar = screen.textContent.slice(-1);
            if (['+', '-', '*', '/'].includes(lastChar)) {
                // Replace last operator on screen
                screen.textContent = screen.textContent.slice(0, -1) + button.textContent;
                op = button.textContent;
                return;
            }
            if(ls !== '' && rs !== ''){
                ls = operate(op, ls, rs);
                rs = '';
                screen.textContent = ls;
            }
            op = button.textContent;
        }else{
            if(op == null){
                ls += button.textContent;
            }else{
                rs += button.textContent;
            }

        }
        screen.textContent += button.textContent;
    });
})

// EQ button
const EQ = document.querySelectorAll('.eqbutton');
EQ.forEach(button => {
    button.addEventListener('click', () => {
        if(ls !== '' && rs !== ''){
            ls = operate(op, ls, rs);
            rs = '';
            op = null;
            screen.textContent = ls;
        }else{
            screen.textContent = 'ERROR';
            ls = '';
            rs = '';
            op = null;
        }
    })
})

// AC button
const Clear = document.querySelectorAll('.clearButton');
Clear.forEach(button => {
    button.addEventListener('click', () => {
        screen.textContent = '';
        ls = '';
        rs = '';
        op = null;
    })
})







