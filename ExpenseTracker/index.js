let itemBucket = [];

function pageLoad() {
  let storedData = localStorage.getItem("Data");
  if (storedData) {
    itemBucket = JSON.parse(storedData);

    // Ab har entry ko screen par dikhayenge
    itemBucket.forEach((entry) => {
      // Refresh ke baad variables ko purana data dena taaki history() chal sake
      uName = entry[0];
      uAmount = entry[1];
      options.value = entry[2];

      // Purane calculation ko wapas zinda karna
      if (options.value.toLowerCase() === "income") {
        totalIncome += uAmount;
        userBalance += uAmount;
      } else {
        totalExpense += uAmount;
        userBalance -= uAmount;
      }

      history(); // Table row banana
    });

    balance.textContent = `₹${userBalance.toLocaleString("en-IN")}`;
    incomeAmount.textContent = `₹${totalIncome}`;
    expenseAmount.textContent = `₹${totalExpense}`;
  }
}

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
    submitButton.style.color = "#ff95a8";
    submitButton.textContent = "Add Expense";
  } else {
    submitButton.style.color = "#a8e1a8";
    submitButton.textContent = "Add Income";
  }
}

options.addEventListener("change", () => {
  amountType();
  scanner();
});

// ----------------------HISTORY----------------------

function history() {
  tableRow = document.createElement("tr");
  let entryType = options.value;
  let rowAmount = uAmount;

  let emoji = " ";
  if (entryType.toLowerCase() === "expense") {
    emoji = "📉";
  } else {
    emoji = "📈";
  }
  historyData = [uName, uAmount, emoji];

  historyData.forEach((element) => {
    let tableData = document.createElement("td");
    tableData.append(element);
    tableRow.append(tableData);
  });

  //  ****** delete row ******
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

    let rowNode = event.target.closest("tr");
    let rowIndex = Array.from(tableBody.children);
    let index = rowIndex.indexOf(rowNode);
    if (index !== -1) {
      itemBucket.splice(rowIndex, 1);
      localStorage.setItem("Data", JSON.stringify(itemBucket));
    }

    rowNode.remove();
  });

  delRow.append(delButton);
  tableRow.append(delRow);
  tableBody.append(tableRow);
}

// ----------------------LOCALSTORAGE----------------------
function storingData() {
  itemBucket.push(historyData);
  localStorage.setItem("Data", JSON.stringify(itemBucket));
}

// ----------------------SUBMISSION----------------------

submitButton.addEventListener("click", function submission(event) {
  event.preventDefault();
  if (inputValidation()) {
    amountType();
    history();
    storingData();

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

pageLoad();
