let expression = document.getElementById("expression");
let result = document.getElementById("result");

let first_num = null;
let second_num = null;
let operate = null;

// function to add number :
function adding_number(input) {
  result.textContent += input;

  if (result.textContent.length > 5) {
    result.style.fontSize = "2.5rem";
  } else {
    result.style.fontSize = "3.5rem";
  }
}

// function to add operation:

function operation(input_operation) {
  first_num = Number(result.textContent);
  operate = input_operation;
  expression.textContent = first_num + " " + operate;
  result.textContent = "";
}

// function to add second number + condition:
function output_number() {
  second_num = Number(result.textContent);
  let answer;
  try {
    switch (operate) {
      case "+":
        answer = first_num + second_num;
        break;
      case "-":
        answer = first_num - second_num;
        break;
      case "*":
        answer = first_num * second_num;
        break;
      case "/":
        answer = first_num / second_num;
        break;
    }

    if (answer % 1 !== 0) {
      answer = answer.toFixed(3);
    }

    expression.textContent = `${first_num} ${operate} ${second_num}`;
    result.textContent = answer;
  } catch (error) {
    result.textContent = "ERROR";
  }
}

// function to clear the elements
function clear_number() {
  expression.textContent = "";
  result.textContent = "";
}
