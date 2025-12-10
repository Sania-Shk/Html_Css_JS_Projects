// ---------------------------
// ELEMENTS (keep your IDs)
// ---------------------------
const user_number = document.querySelector("#number");
const user_name = document.querySelector("#name");
const user_expiry = document.querySelector("#expiry");
const user_cvc = document.querySelector("#cvc");
const raise_error = document.querySelector("#error");

const card_number_display = document.querySelector("#card_number");
const card_name_display = document.querySelector("#card_name");
const card_expiry_display = document.querySelector("#card_expiry_number");
const card_cvc_display = document.querySelector("#card_cvc_number");

const submit_Button = document.querySelector("#submit_data");
const clear_Button = document.querySelector("#clear_data");

// ---------------------------
// ERROR UI
// ---------------------------
function show_error(msg) {
  raise_error.style.visibility = "visible";
  raise_error.textContent = msg;
  return false;
}

function hide_error() {
  raise_error.style.visibility = "hidden";
  raise_error.textContent = "";
}

// ---------------------------
// PREVIEW (single function)
// ---------------------------
function preview_update() {
  card_number_display.textContent = user_number.value || "0000 0000 0000 0000";
  card_name_display.textContent = user_name.value || "name";
  card_expiry_display.textContent = user_expiry.value || "00/00";
  card_cvc_display.textContent = user_cvc.value || "000";
}

// ---------------------------
// EXPIRY FORMATTING (runs on input)
// ---------------------------
function expiry_format() {
  // keep only digits
  let digits = user_expiry.value.replace(/\D/g, "");

  // limit to 4 digits (MMYY)
  if (digits.length > 4) digits = digits.substring(0, 4);

  // insert slash after 2 digits when possible
  if (digits.length >= 3) {
    user_expiry.value = digits.substring(0, 2) + "/" + digits.substring(2);
  } else {
    user_expiry.value = digits;
  }
}

// ---------------------------
// MINI VALIDATORS (return true or call show_error)
// ---------------------------
function validate_name() {
  const v = user_name.value.trim();
  if (!v) return show_error("Name cannot be empty");
  if (v.length < 3) return show_error("Name must be at least 3 characters");
  if (/\d/.test(v)) return show_error("Name cannot contain numbers");
  return true;
}

function validate_number() {
  const v = user_number.value.trim();
  if (!v) return show_error("Card number cannot be empty");
  if (!/^\d+$/.test(v))
    return show_error("Card number must contain digits only");
  if (v.length !== 16)
    return show_error("Card number must be exactly 16 digits");
  return true;
}

function validate_expiry() {
  const v = user_expiry.value.trim();

  // exact format MM/YY
  if (!/^\d{2}\/\d{2}$/.test(v)) {
    return show_error("Expiry must be in MM/YY format");
  }

  const mm = parseInt(v.substring(0, 2), 10);
  const yy = parseInt(v.substring(3, 5), 10);

  if (isNaN(mm) || isNaN(yy)) return show_error("Invalid expiry values");
  if (mm < 1 || mm > 12) return show_error("Invalid month (01-12)");

  // get current year last two digits, current month
  const now = new Date();
  const currentYear = now.getFullYear() % 100; // last two digits
  const currentMonth = now.getMonth() + 1; // 1-12

  if (yy < currentYear) return show_error("Card expired");
  if (yy === currentYear && mm < currentMonth)
    return show_error("Card expired");

  return true;
}

function validate_cvc() {
  const v = user_cvc.value.trim();
  if (!v) return show_error("CVC cannot be empty");
  if (!/^\d+$/.test(v)) return show_error("CVC must contain digits only");
  if (v.length !== 3) return show_error("CVC must be exactly 3 digits");
  return true;
}

// ---------------------------
// MAIN VALIDATION
// ---------------------------
function validation_all() {
  hide_error();

  if (!validate_number()) return false;
  if (!validate_name()) return false;
  if (!validate_expiry()) return false;
  if (!validate_cvc()) return false;

  return true;
}

// ---------------------------
// SUBMIT & CLEAR HANDLERS
// ---------------------------
submit_Button.addEventListener("click", function (e) {
  e.preventDefault();
  hide_error();

  if (validation_all()) {
    // success behavior: show popup or alert with saved data
    alert("Form valid — saved!");
  }
});

clear_Button.addEventListener("click", function (e) {
  e.preventDefault();
  if (!confirm("Are you sure you want to clear data?")) return;

  user_name.value = "";
  user_number.value = "";
  user_expiry.value = "";
  user_cvc.value = "";

  preview_update();
  hide_error();
});

// ---------------------------
// INPUT LISTENERS
// expiry_format MUST run before preview_update for expiry input
// ---------------------------
user_name.addEventListener("input", preview_update);
user_number.addEventListener("input", preview_update);

// For expiry: first format, then update preview
user_expiry.addEventListener("input", function () {
  expiry_format();
  preview_update();
});

user_cvc.addEventListener("input", preview_update);

// Initialize preview on load
preview_update();
