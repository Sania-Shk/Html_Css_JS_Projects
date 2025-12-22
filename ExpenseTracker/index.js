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
let submitButton = document.querySelector("#subtn");

function getData() {
  data_object.userName = nameInput.value;
  data_object.userAmount = amountInput.value;
  data_object.type = options.value;
}

options.addEventListener("input", getData);
nameInput.addEventListener("input", () => {
  getData();
  scanner();
});

amountInput.addEventListener("input", () => {
  getData();
  scanner();
});

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
    submitButton.disabled = true;
    return false;
  }
  if (!amountValidation()) {
    submitButton.disabled = true;
    return false;
  }

  return true;
}

// ----------------------ERROR ALERT----------------------
function errorAlert(e) {
  alert(`Error Raised! \n  ${e}`);
}

// ----------------------AMOUNT TYPE----------------------

function amountType() {
  if (options.value.toLowerCase() === "expense") {
    submitButton.style.color = "green";
    submitButton.textContent = "Add Expense";
  } else {
    submitButton.style.color = "blue";
    submitButton.textContent = "Add Income";
  }
}

options.addEventListener("change", () => {
  amountType();
  scanner();
});

// ----------------------SUBMISSION----------------------

submitButton.addEventListener("click", function submission(event) {
  event.preventDefault();

  if (inputValidation) {
    getData();

    if (options.value === "expense") {
      userBalance -= uAmount;
      console.log(userBalance);
      console.log(typeof userBalance);
    }

    if (options.value === "income") {
      userBalance += uAmount;
      console.log(userBalance);
      console.log(typeof userBalance);
    }
  }

  balance.textContent = `${"₹"}` + userBalance.toLocaleString("en-IN");
  console.log(balance);
  console.log(typeof balance);
});

function scanner() {
  const isNameFilled = nameInput.value.trim().length >= 0;
  const isAmountFilled = amountInput.value.trim().length >= 0;
  const isOptionSelected = options.value !== " " && options.value !== " ";

  if (isNameFilled && isAmountFilled && isOptionSelected) {
    submitButton.disabled = false;
    submitButton.style.opacity = "1";
    submitButton.style.cursor = "pointer";
  } else {
    submitButton.disabled = true;
    submitButton.style.opacity = "0.5";
    submitButton.style.cursor = "not-allowed";
  }
}
