

const display_bar = document.getElementById("display_bar");

//set up the number pad within the number pad div
const number_pad_cont = document.getElementById("number_pad_cont");

digits = [1,2,3,4,5,6,7,8,9,0]
function create_num_pad(array, num_spaces_on_row) {
    for(let pos=0; pos <= array.length;) {
        let row_cont = document.createElement("div");
        row_cont.setAttribute("class", "row_cont");
        number_pad_cont.appendChild(row_cont);

        for(let spaces=1; spaces <=num_spaces_on_row;) {
            let button = document.createElement("div");
            let button_id = array[pos]+'button';
            button.setAttribute("id", button_id);
            button.setAttribute("class", "button");
            button.onclick = () => push_button(button_id);
            button.innerText=array[pos];
            row_cont.appendChild(button);
            spaces ++
            pos ++
            if(pos >= array.length) {break;}
        }
        if(pos >= array.length) {break;}
        spaces=1;
    };
};
create_num_pad(digits, 3);

//record button presses in the bar
function push_button(button_id) {
    button = document.getElementById(button_id);
    const text = button.innerText;
    display_bar.innerText+=text;
};
//load in side buttons
operators = ['^', '*','/', '+', '-', '.', '(', ')']
const side_button_cont = document.getElementById("side_button_cont")
function operator_buttons(array, num_spaces_on_column) {
    for(let pos=0; pos < array.length;){
        let column_cont = document.createElement("div");
        column_cont.setAttribute("class", "column_cont");
        side_button_cont.appendChild(column_cont);
        for(let spaces=1; spaces <=num_spaces_on_column;){
            let button = document.createElement("div");
            let button_id = array[pos]+'button';
            button.setAttribute("id", button_id);
            button.setAttribute("class", "button");
            button.onclick = () => push_button(button_id);
            button.innerText=array[pos];
            column_cont.appendChild(button);
            spaces++;
            pos++;
            if(pos >= array.length) {break;}
        }
        if(pos >= array.length) {break;}
        spaces=1;
    }
};

operator_buttons(operators, 4);


//backspace button
backspace_button = document.getElementById("backspace_button");
backspace_button.onclick =() => push_backspace();

function push_backspace() {
    let target_char = display_bar.innerText.length;
    display_bar.innerText = display_bar.innerText.replace(display_bar.innerText[target_char-1], "");
};

//clear button
clear_button = document.getElementById("clear_button");
clear_button.onclick =() => push_clear();
function push_clear() {
    display_bar.innerText = "";
};

//add equal/computation button
compute_button = document.getElementById("compute_button");
compute_button.onclick = () => parse_expression();

function parse_expression() {
    let expression = display_bar.innerText;
    let start_par =[];
    let end_par =[];
    const operators = ['+', '-', '*', '/', '(', ')', '^']
    for(i=0; i<expression.length; i++) {
        char = expression.charAt(i);
        if(char == '('){start_par.push(i);
            let charAfter = expression.charAt(i+1)
            if(operators.includes(charAfter)) {alert('Syntax Error. Please check your statement.'); return}
        }
        if(char ==')'){end_par.push(i);
            let charBefore = expression.charAt(i-1)
            if(operators.includes(charBefore)) {alert('Syntax Error. Please check your statement.'); return}
        };
    };
    // make sure each parentheses is closed
    if(start_par.length != end_par.length) {alert('You forget to open/close your parentheses!'); return}

    else if(start_par.length>0) {const matches = expression.match(/\((.*?)\)/g);
    const inner_exp = matches ? matches.map(match => match.slice(1, -1)) : [];
    for(let i=0; i< inner_exp.length; i++) {let result=evaluate_expression(inner_exp[i]);
         expression = expression.replace(/\(.*?\)/, result);
    };
    };
    result = evaluate_expression(expression);
    display_bar.innerText = result;
};

function evaluate_expression(expression) {
    let expression_numbers = expression.match(/(\d+(\.\d+)?)/g)
    let expression_operators = expression.replace(/[0-9.]/g,'');
    expression_operators = expression_operators.split("")
    const numbers = []
    for(num in expression_numbers) {float=parseFloat(expression_numbers[num]); numbers.push(float)};
    let result = numbers[0]
    if(expression_operators.includes('^')) {
        for(let i=0; i< expression_operators.length;i++) {
        operator = expression_operators[i];
        if(operator=='^' && numbers.length>2){numbers[i] = numbers[i]**numbers[i+1];
        numbers.splice(i+1, 1);
        expression_operators.splice(i, 1);
            i--;}
        else if(operator=='^'&&numbers.length==2){result=numbers[0]**numbers[1]};
        };
    }
    if(expression_operators.includes('*') || expression_operators.includes('/')) {
        for(let i=0; i< expression_operators.length;i++) {
        operator = expression_operators[i];
        if(operator==='*' && numbers.length>2){
            numbers[i] = numbers[i]*numbers[i+1];
            numbers.splice(i+1, 1);
            expression_operators.splice(i, 1);
            i--;}
            
        else if(operator==='/' && numbers.length>2){
            if(numbers[i+1]==0){alert('Divide by zero much?'); return ''};
            numbers[i] = numbers[i]/numbers[i+1];
            numbers.splice(i+1, 1);
            expression_operators.splice(i, 1);
            i--;}
            
        else if(operator==='*'&&numbers.length==2){result=numbers[0]*numbers[1];}
        
        else if(operator==='/'&&numbers.length==2){if(numbers[i+1]==0){alert('Divide by zero much?'); return ''};
        result=numbers[0]/numbers[1];}
        }
    };

    if(expression_operators.includes('+') || expression_operators.includes('-')) {
    for(let i=0; i< expression_operators.length;i++) {
      operator = expression_operators[i];
      if(operator==='+' && numbers.length>2){
        numbers[i] = numbers[i]+numbers[i+1];
        numbers.splice(i+1, 1);
        expression_operators.splice(i, 1);
        i--;}
        
      else if(operator==='-' && numbers.length>2){
        numbers[i] = numbers[i]-numbers[i+1];
        numbers.splice(i+1, 1);
        expression_operators.splice(i, 1);
        i--;}
        
      else if(operator==='+'&&numbers.length==2){result=numbers[0]+numbers[1];}
      
      else if(operator==='-'&&numbers.length==2){result=numbers[0]-numbers[1];}
    }
  };
  result = Number.parseFloat(result).toFixed(3)
  return result
}