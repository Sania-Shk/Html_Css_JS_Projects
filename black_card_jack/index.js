let sum = 0;
let isAlive = false;
let has_black_jack = false;
let message = document.getElementById("msg");
let new_num = 0;

let card_number = document.getElementById("card_number");
let sum_num = document.getElementById("total");

function startGame() {
  isAlive = true;

  let num1 = Math.floor(Math.random() * (11 - 2 + 1)) + 2;
  let num2 = Math.floor(Math.random() * (11 - 2 + 1)) + 2;
  sum = num1 + num2; // action
  card_number.textContent = sum; // displaying current action
  renderGame(); // condition applied
}

// condition
function renderGame() {
  if (sum < 21) {
    message.textContent = "New Card?";
    isAlive = true;
  } else if (sum === 21) {
    message.textContent = "You got a blackjack";
    has_black_jack = true;
    isAlive = false;
  } else if (sum > 21) {
    message.textContent = "bad luck! press Restart";
    isAlive = false;
  }
}

// new card concept :
function new_card() {
  if (isAlive === true && !has_black_jack) {
    new_num = Math.floor(Math.random() * (11 - 2 + 1)) + 2;
    card_number.textContent += ` + ` + new_num;
    sum += new_num;
    sum_num.textContent = ` Sum :` + sum;
    renderGame();
  } else {
    isAlive = false;
  }
}

function restart() {
  sum = 0;
  card_number.textContent = 0;
  sum_num.textContent = null;
  isAlive = false;
  message.textContent = "Click Start to play again";
}
