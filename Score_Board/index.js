let count_1 = 0;
let count_2 = 0;

// player 2
let score_ele_1 = document.getElementById("score_1");

function increment1_1() {
  count_1 += 1;
  score_ele_1.textContent = count_1;
}

function increment1_2       () {
  count_1 += 2;
  score_ele_1.textContent = count_1;
}

function increment1_3() {
  count_1 += 3;
  score_ele_1.textContent = count_1;
}

function decrement_player1() {
  count_1 -= 1;
  score_ele_1.textContent = count_1;

  if (count_1 < 0) {
    score_ele_1.textContent = 0;
  }
}

// player 2
let score_ele_2 = document.getElementById("score_2");

function increment_1() {
  count_2 += 1;
  score_ele_2.textContent = count_2;
}

function increment_2() {
  count_2 += 2;
  score_ele_2.textContent = count_2;
}

function increment_3() {
  count_2 += 3;
  score_ele_2.textContent = count_2;
}

function decrement_player2() {
  count_2 -= 1;
  score_ele_2.textContent = count_2;

  if (count_2 < 0) {
    score_ele_2.textContent = 0;
  }
}

// result
let winner_review = document.getElementById("winner_review");
function winner() {
  if (score_ele_1.textContent > score_ele_2.textContent) {
    return (winner_review.textContent = `PLAYER 1 IS A WINNER`);
  } else if (score_ele_1.textContent < score_ele_2.textContent) {
    return (winner_review.textContent = `PLAYER 2 IS A WINNER`);
  } else {
    return (winner_review.textContent = `TIE`);
  }
}

// reset
function reset() {
  //player 1
  count_1 = 0;
  score_ele_1.textContent = 0;

  //player 2
  count_2 = 0;
  score_ele_2.textContent = 0;
}
