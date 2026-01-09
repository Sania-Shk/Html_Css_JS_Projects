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
  seatno: "",
  english: "",
  math: "",
  science: "",
  chemistry: "",
  physics: "",
  socialSci: "",
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
  0;
}

Sname.addEventListener("input", userInput());
Seatno.addEventListener("input", userInput());
english.addEventListener("input", userInput());
math.addEventListener("input", userInput());
science.addEventListener("input", userInput());
chemistry.addEventListener("input", userInput());
physics.addEventListener("input", userInput());
socialSci.addEventListener("input", userInput());

// ----testing
let addbtn = document.querySelector("#addbtn");
addbtn.addEventListener("click", (event) => {
  event.preventDefault();
  userInput();
  console.log(studentObject);
});

// ---------- Input Validation ----------
// ------ Student Name :
function nameValidation() {
  let Sname = Sname.value.trim();
  if (!Sname) return errorAlert("Name cannot be empty");
  if (Sname.length < 3) return errorAlert("Name must be at least 3 characters");
  if (/\d/.test(Sname)) return errorAlert("Name cannot contain numbers");

  return true;
}

// ------ Student Name :
function seatValidation(e) {
  let demo = e.value.trim();
  if (!demo) return errorAlert("number cannot be empty");
  if (demo.length > 1) return errorAlert("number must be atleast 2 digits");
  if (/[a-zA-Z]/.test(demo))
    return errorAlert("Numbers must contain digits only");

  return true;
}

// ---------- Error Alert ----------
function errorAlert(e) {
  alert(`Error Raised! \n ${e}`);
}
