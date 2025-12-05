let count = 0;
let countEL = document.getElementById("count");

function increment() {
  count += 1;
  countEL.innerText = count;
}

function decrement() {
  count -= 1;
  countEL.innerText = count;
}

function save() {
  let save_num = count + " - ";
  save_ele.innerHTML += save_num;
}

function reset() {
  count = 0;
  countEL.innerText = 0;
}
