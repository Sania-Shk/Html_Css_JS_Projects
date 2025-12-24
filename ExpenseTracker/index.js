// ----------------------DECLARATION----------------------
let data_object = {
  userName: " ",
  userAmount: null,
  type: " ",
};

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
let uName = "";
let balance = document.querySelector("#money"); // for display
let uAmount; // for conversion
let userBalance = 0; // calc
let expenseAmount = document.querySelector("#loss_display"); // for exp_display
let incomeAmount = document.querySelector("#profit_display"); // for inc_display
let totalIncome = 0;
let totalExpense = 0;
let options = document.querySelector("#sources");
let submitButton = document.querySelector("#subtn");
let tableBody = document.querySelector("#tableBody");
let tableRow = document.querySelector("#tableRow");
let count = 1; // for
let historyData = [];

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
  uName = nameInput.value.trim();
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
  if (inputValidation()) {
    amountType();
    history();

    if (options.value.toLowerCase() === "expense") {
      totalExpense += uAmount;
      userBalance -= uAmount;
    } else {
      totalIncome += uAmount;
      userBalance += uAmount;
    }

    balance.textContent = `₹${userBalance.toLocaleString("en-IN")}`;
    incomeAmount.textContent = `₹${totalIncome}`;
    expenseAmount.textContent = `₹${totalExpense}`;
    return true;
  } else {
    return false;
  }
});

function scanner() {
  const isNameFilled = nameInput.value.trim().length >= 0;
  const isAmountFilled = amountInput.value.trim().length >= 0;
  const isOptionSelected = options.value !== " " && options.value !== " ";

  if (isNameFilled && isAmountFilled && isOptionSelected) {
    submitButton.disabled = false;
    submitButton.style.opacity = "1";
    submitButton.style.cursor = "pointer ";
  } else {
    submitButton.disabled = true;
    submitButton.style.opacity = "0.5";
    submitButton.style.cursor = "not-allowed";
  }
}

// ----------------------HISTORY----------------------

function history() {
  //  ****** declaration  ******:
  tableRow = document.createElement("tr");
  let entryType = options.value;
  let rowAmount = uAmount;
  historyData = [uName, uAmount, options.value];

  historyData.forEach((element) => {
    let tableData = document.createElement("td");
    tableData.append(element);
    tableRow.append(tableData);
  });

  // / ****** delete row ******
  let delRow = document.createElement("td");
  let delButton = document.createElement("button");
  delButton.innerText = "🗑️";

  // --- del workspace
  delButton.addEventListener("click", (event) => {
    if (entryType === "income") {
      totalIncome -= rowAmount;
      userBalance -= rowAmount;
    } else {
      totalExpense -= rowAmount;
      userBalance += rowAmount;
    }
    balance.textContent = `₹${rowAmount.toLocaleString("en-IN")}`;
    incomeAmount.textContent = `₹${totalIncome}`;
    expenseAmount.textContent = `₹${totalExpense}`;

    event.target.closest("tr").remove(); // row del
  });

  delRow.append(delButton);
  tableRow.append(delRow);
  tableBody.append(tableRow);
}
