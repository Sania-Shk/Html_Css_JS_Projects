// ---------- Fetching Input ----------
let Sname = document.querySelector("#Sname");
let Seatno = document.querySelector("#Seatno");
let english = document.querySelector("#english");
let math = document.querySelector("#math");
let science = document.querySelector("#science");
let chemistry = document.querySelector("#chemistry");
let physics = document.querySelector("#physics");
let socialSci = document.querySelector("#socialSci");
let addbtn = document.querySelector("#addbtn");

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

// ---------- Error Alert ----------
function errorRaised(e) {
  alert(`Error Raised! \n ${e}`);
}

// ----------Validation----------
function nameValidation() {
  let vName = Sname.value.trim();
  if (!vName) return false;
  if (vName.length <= 3) return false;
  if (/\d/.test(vName)) return false;

  return true;
}

function numberValidation(value) {
  let rawvalue = value.trim();
  if (!rawvalue) return false;
  if (/[a-zA-Z]/.test(rawvalue)) return false;
  return true;
}

function Validation() {
  // Checks everything and returns one final true/false
  if (!nameValidation()) return false;
  if (!numberValidation(Seatno.value)) return false;
  if (!numberValidation(english.value)) return false;
  if (!numberValidation(math.value)) return false;
  if (!numberValidation(science.value)) return false;
  if (!numberValidation(chemistry.value)) return false;
  if (!numberValidation(physics.value)) return false;
  if (!numberValidation(socialSci.value)) return false;

  return true;
}

// ----------Status----------

function onStatus(event) {
  if (Validation()) {
    addbtn.disabled = false;
    addbtn.style.color = "green";
  } else {
    addbtn.disabled = true;
    addbtn.style.color = "red";
  }
}

Sname.addEventListener("input", onStatus);
Seatno.addEventListener("input", onStatus);
english.addEventListener("input", onStatus);
math.addEventListener("input", onStatus);
science.addEventListener("input", onStatus);
chemistry.addEventListener("input", onStatus);
physics.addEventListener("input", onStatus);
socialSci.addEventListener("input", onStatus);

// ---------- Add Details ----------
addbtn.addEventListener("click", (event) => {
  event.preventDefault();
  userInput();

  if (Validation()) {
    console.log(studentObject);
    alert("form valid - saved!");
  } else {
    errorRaised("Please fix the red fields before saving.");
  }
});
