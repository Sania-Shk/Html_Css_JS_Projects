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
let clearbtn = document.querySelector("#clearbtn");
let fileInput = document.querySelector("#fileUpload");
let userlabel = document.querySelector("#labelimg");
let studentObject = {
  name: "",
  seatno: null,
  english: 0,
  math: 0,
  science: 0,
  chemistry: 0,
  physics: 0,
  socialSci: 0,
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
  if (!nameValidation(Seatno.value)) return false;
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
    addbtn.style.color = "maroon";
  }
  ablebtn();
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
    ablebtn();
    // displayInput();
    studentSaves();
    ranker();

    console.log(studentObject);

    ((Sname.value = ""),
      (Seatno.value = ""),
      (english.value = ""),
      (math.value = ""),
      (science.value = ""),
      (chemistry.value = ""),
      (physics.value = ""),
      (socialSci.value = ""));

    onStatus();
  } else {
    errorRaised("Invalid Submission");
  }
});

// ----------Clear Detail ----------
clearbtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (confirm("Are you sure you want to clear data?")) {
    ((Sname.value = ""),
      (Seatno.value = ""),
      (english.value = ""),
      (math.value = ""),
      (science.value = ""),
      (chemistry.value = ""),
      (physics.value = ""),
      (socialSci.value = ""));
  }

  onStatus();
});

// ----------Image Upload----------
function ablebtn() {
  if (!fileInput || !userlabel) return;

  if (Validation()) {
    fileInput.disabled = false;
    userlabel.style.opacity = "1";
    userlabel.style.cursor = "pointer";
    userlabel.style.pointerEvents = "auto";
  } else {
    fileInput.disabled = true;
    userlabel.style.opacity = "0.5";
    userlabel.style.cursor = "not-allowed";
    userlabel.style.pointerEvents = "none";
  }
}

// ----------Grading----------

function studentGrading() {
  let subjects = [
    Number(studentObject.english),
    Number(studentObject.math),
    Number(studentObject.science),
    Number(studentObject.chemistry),
    Number(studentObject.physics),
    Number(studentObject.socialSci),
  ];

  let totalMarks = 0;
  let percentage = 0;
  let grade = "";

  subjects.forEach((element) => {
    totalMarks += element;
  });

  percentage = totalMarks / subjects.length;
  if (percentage % 1 !== 0) {
    percentage = percentage.toFixed(2);
  }

  if (percentage >= 35) {
    grade = "pass";
  } else {
    grade = "fail";
  }

  return { totalMarks, percentage, grade };
}

// ----------Displaying Input in the Table----------
let tableRow = document.querySelector("#trow");
let tableBody = document.querySelector("#tbody");
function displayInput() {
  let tableRow = document.createElement("tr");
  let result = studentGrading();
  let variables = [
    Seatno.value,
    Sname.value,
    result.totalMarks,
    result.percentage,
    result.grade,
  ];

  let file = fileInput.files[0];
  let imgsrc;
  if (!file) {
    imgsrc = "Images/defaultProfile.jpeg";
  } else {
    imgsrc = URL.createObjectURL(file);
  }

  variables.forEach((element) => {
    let tableData = document.createElement("td");
    tableData.append(element);
    tableRow.append(tableData);
  });

  //  ****** delete row ******
  let delElement = document.createElement("td");
  let delButton = document.createElement("button");
  delButton.innerText = "🗑️";

  delButton.addEventListener("click", (event) => {
    let delrow = event.target.closest("tr");
    delrow.remove();
  });

  delElement.append(delButton);
  tableRow.append(delElement);
  tableBody.append(tableRow);

  return {
    studentSeat: Seatno.value,
    studentName: Sname.value,
    studentTotalMarks: result.totalMarks,
    studentPercentage: result.percentage,
    studentGrade: result.grade,
    studentimg: imgsrc,
  };
}

// ----------Class Ranker--------
let student = []; // array for student
function studentSaves() {
  let studentDetail = displayInput();
  student.push(studentDetail);
}

function ranker() {
  let studentRanker = [...student].sort((a, b) => {
    return b.studentTotalMarks - a.studentTotalMarks;
  });

  const top_tier = studentRanker.slice(0, 3);
  console.clear();

  let rankerCards = document.querySelectorAll(".ranker");
  top_tier.forEach((element, index) => {
    let card = rankerCards[index];
    if (card) {
      card.querySelector(".img-rank").src = element.studentimg; // Set the uploaded image
      card.querySelector(".rank-name").innerText = element.studentName;
      card.querySelector(".rank-seat").innerText = element.studentSeat;
    }
  });
}

//  ----------Displaying Found Student--------
let foundProfile = document.querySelector(".profilePicture");
let foundName = document.querySelector("#searchName");
let foundSeatno = document.querySelector("#searchSeatno");
let foundPercentage = document.querySelector("#searchPer");
let foundGrade = document.querySelector("#searchGrade");

//  ----------Searching Student--------
let searchInput = document.querySelector("#searchInput");
let searchbtn = document.querySelector("#searchBtn");

function searchStudent(nameInput) {
  let foundStudent = student.find(
    (studentsname) =>
      studentsname.studentName.toLowerCase() === nameInput.toLowerCase(),
  );

  if (foundStudent) {
    console.table(foundStudent);
    foundProfile.src = foundStudent.studentimg;
    foundName.textContent = foundStudent.studentName;
    foundSeatno.textContent = foundStudent.studentSeat;
    foundPercentage.textContent = foundStudent.studentPercentage;
    foundGrade.textContent = foundStudent.studentGrade;
  } else {
    alert("Not Exist");
  }
}

searchbtn.addEventListener("click", (event) => {
  event.preventDefault();
  let nameInput = searchInput.value.trim();
  searchStudent(nameInput);
});
