// ---------- Fetching Input ----------
let Sname = document.querySelector("#Sname");
let Seatno = document.querySelector("#Seatno");
let english = document.querySelector("#english");
let math = document.querySelector("#math");
let science = document.querySelector("#science");
let chemistry = document.querySelector("#chemistry");
let physics = document.querySelector("#physics");
let socialSci = document.querySelector("#socialSci");

let studentObject = {
  name: "",
  seatno: null,
  english: null,
  math: null,
  science: null,
  chemistry: null,
  physics: null,
  socialSci: null,
};

function userInput() {
  studentObject.name = Sname.value;
  studentObject.seatno = Seatno.value;
  studentObject.english = english.value;
  studentObject.math = math.value;
  studentObject.science = science.value;
  studentObject.chemistry = chemistry.value;
  studentObject.physics = physics.value;
  studentObject.socialSci = socialSci.value;
}

Sname.addEventListener("input", userInput);
Seatno.addEventListener("input", userInput);
english.addEventListener("input", userInput);
math.addEventListener("input", userInput);
science.addEventListener("input", userInput);
chemistry.addEventListener("input", userInput);
physics.addEventListener("input", userInput);
socialSci.addEventListener("input", userInput);

// ----------Validation----------

function nameValidation() {
  let vName = Sname.value.trim();
  if (!vName) return errorRaised("Name cannot be empty");
  if (vName.length > 3)
    return errorRaised("Name must be atleast more than a 3 characters");
  if (/\d/.test(vName)) return errorRaised("Name cannot contain numbers");

  return true;
}

function numberValidation(value) {
  let rawvalue = value.replace(/\D/g, "");
  if (!rawvalue) return errorRaised("Number cannot be empty");
  if (rawvalue.length > 3)
    return errorRaised("Number must be atleast more than a 2 characters");
  if (!/^\d+$/.test(vName))
    return errorRaised("Number cannot contain Alphabets");

  return true;
}

// ---------- Error Alert ----------
function errorRaised(e) {
  alert(`Error Raised! \n ${e}`);
}

