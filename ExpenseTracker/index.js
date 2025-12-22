// ----------------------DECLARATION----------------------
let data_object = {
  userName: " ",
  userAmount: null,
  type: " ",
};

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
let uAmount;
let balance = document.querySelector("#money");
let userBalance = 0;
let options = document.querySelector("#sources");
let submitButton;

function getData() {
  data_object.userName = nameInput.value;
  data_object.userAmount = amountInput.value;
  data_object.type = options.value;
}

options.addEventListener("input", getData);
nameInput.addEventListener("input", getData);
amountInput.addEventListener("input", getData);

// ----------------------INPUT VALIDATION----------------------

function nameValidation() {
  let uName = nameInput.value.trim();
  if (!uName) return errorAlert("Name cannot be empty");
  if (uName.length < 3) return errorAlert("Name must be at least 3 characters");
  if (/\d/.test(uName)) return errorAlert("Name cannot contains Number's");

  return true;
}

function amountValidation() {
  let rawValue = amountInput.value.trim();
  uAmount = Number(rawValue);
  if (!rawValue) return errorAlert("Amount cannot be empty");
  if (/[a-zA-z]/.test(uAmount))
    return errorAlert("Amount must contain digits only");
  if (uAmount <= 0) return errorAlert("Amount must be greater than 0");

  return true;
}

function inputValidation() {
  if (!nameValidation()) {
    issubmit = false;
    return false;
  }
  if (!amountValidation()) {
    issubmit = false;
    return false;
  }

  return true;
}

// ----------------------ERROR ALERT----------------------
function errorAlert(e) {
  alert(`Error Raised! \n  ${e}`);
}

// ----------------------FOR TESTING----------------------
// testButton = document.querySelector("#test");
// testButton.addEventListener("click", (event) => {
//   event.preventDefault();
//   if (inputValidation()) {
//     testButton.style.color = "green"; // Success par green
//     userBalance += uAmount;
//     balance.textContent = `${"₹"}` + userBalance.toLocaleString("en-IN");
//   } else {
//     testButton.style.color = "red"; // Fail par red
//   }
// });

submitButton = document
  .querySelector("#subtn")
  .addEventListener("click", (event) => {
    event.preventDefault();
    issubmit = true;
  });
