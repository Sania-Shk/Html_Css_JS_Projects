// ----------------------DECLARATION----------------------
let data_object = {
  userName: " ",
  userAmount: null,
};

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");

function getData() {
  data_object.userName = nameInput.value;
  data_object.userAmount = amountInput.value;
}

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
  let uAmount = Number(rawValue);
  if (!rawValue) return errorAlert("Amount cannot be empty");
  if (/[a-zA-z]/.test(uAmount))
    return errorAlert("Amount must contain digits only");
  if (uAmount.length <= 0) return errorAlert("Amount must be greater than 0");

  return true;
}

function inputValidation() {
  if (!nameValidation()) return false;
  if (!amountValidation()) return false;

  return true;
}

// ----------------------AMOUNT TYPE----------------------

// ----------------------ERROR ALERT----------------------
function errorAlert(e) {
  alert(`Error Raised! \n  ${e}`);
}

// ----------------------FOR TESTING----------------------
let testButton = document.querySelector("#test");
testButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (inputValidation()) {
    testButton.style.color = "green"; // Success par green
    alert("✅ Everything is correct!");
    console.log("Final Data:", data_object);
  } else {
    testButton.style.color = "red"; // Fail par red
  }
});
