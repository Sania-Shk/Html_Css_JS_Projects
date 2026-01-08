// -------- TIMER --------
let datetime = document.querySelector("#timer");
function timer() {
  setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();

    let format = `${hours} : ${min.toString().padStart(2, "0")} :  ${sec
      .toString()
      .padStart(2, "0")}`;

    datetime.textContent = format;
  }, 1000);
}
timer();

// -------- INPUT --------
let userinput = document.querySelector("#userInput");
let inputfield = "";
userinput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    inputfield = event.target.value;

    alert(`working on file ${inputfield}`);
  }

  if (event.key === "Tab") {
    event.preventDefault();
    prompt("Enter Your Issues : ");
    alert("Soon gonna solve it ");
  }
});

userinput.addEventListener("input", (event) => {
  event.preventDefault();
  displayingFuncs();
});

// -------- MESSAGE --------
let first = document.querySelector("#first");
let sec = document.querySelector("#second");
let third = document.querySelector("#third");
let fourth = document.querySelector("#fourth");
let fifth = document.querySelector("#fifth");

function func1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve((first.textContent = "Initializing system diagnostics "));
    }, 2000);
  });
}

function func2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        (sec.textContent = "Processing data stream from external source ")
      );
    }, 3000);
  });
}

function func3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve((third.textContent = "Analyzing complex algorithm parameters "));
    }, 1300);
  });
}

function func4() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        (fourth.textContent = "Executing command sequence: STATUS OPTIMAL ")
      );
    }, 2000);
  });
}

function func5() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        (fifth.textContent =
          "Archiving log files and clearing temporary cache ")
      );
    }, 1800);
  });
}

function blinker(element) {
  let ogElement = element.textContent;
  let dot = ".";
  let count = 0;
  let speed = 500;

  setInterval(() => {
    element.textContent = ogElement + dot.repeat(count);
    count++;
    if (count > 3) {
      count = 0;
    }
  }, speed);
}

async function main() {
  const fun1 = await func1();
  const blinkfun1 = await blinker(first);

  const fun2 = await func2();
  const blinkfun2 = await blinker(sec);

  const fun3 = await func3();
  const blinkfun3 = await blinker(third);

  const fun4 = await func4();
  const blinkfun4 = await blinker(fourth);

  const fun5 = await func5();
  const blinkfun5 = await blinker(fifth);

  return true;
}

// -------- MINI ACTIONS --------

// ------ for termianl
let terminal = document.querySelector(".terminal");
terminal.style.visibility = "hidden";
async function terminalDisplay() {
  await new Promise((resolve) => {
    setTimeout(() => {
      if (terminal.style.visibility === "hidden") {
        terminal.style.visibility = "visible";
      }
      resolve();
      alert("LOG: Secure Terminal Environment initializing.");
    }, 2000);
  });

  return true;
}

// ------ for Downloading Data
let downloading = document.querySelector(".downloadingData");
downloading.style.visibility = "hidden";
async function downloadingDisplay() {
  await new Promise((resolve) => {
    setTimeout(() => {
      if (downloading.style.visibility === "hidden") {
        downloading.style.visibility = "visible";
      }
      resolve();
      alert(
        ` CRITICAL: Incoming encrypted  ${userinput.value} data packet detected. Initiating downloading...`
      );
    }, 3000);
  });

  return true;
}

// ------ for Tracing
let tracing = document.querySelector(".tracing");
tracing.style.visibility = "hidden";
async function tracingDisplay() {
  await new Promise((resolve) => {
    setTimeout(() => {
      if (
        confirm(
          "PROTOCOL: Authorization required to initiate deep-packet tracing. Proceed?"
        ) === false
      ) {
        alert(
          "OVERRIDE: System policy requires mandatory tracing. Authorization bypassed."
        );
      }

      if (tracing.style.visibility === "hidden") {
        tracing.style.visibility = "visible";
      }
      resolve();
    }, 3900);
  });

  return true;
}

// ------ for Gifs
let monitorgif = document.querySelector(".monitorgif");
let monitortext = document.querySelector("#monitortext");
monitorgif.style.visibility = "hidden";
monitortext.style.visibility = "hidden";

let audiogif = document.querySelector(".audiogif");
let audiotext = document.querySelector("#audiotext");
audiogif.style.visibility = "hidden";
audiotext.style.visibility = "hidden";

async function monitorDisplay() {
  await new Promise((resolve) => {
    setTimeout(() => {
      if (
        confirm("UPLINK: Sync visual buffer to local monitor?") === false ||
        confirm("UPLINK: Sync visual buffer to local monitor?") === true
      ) {
        alert("NOTICE: Buffer synced via System Policy.");
        if (
          (monitorgif.style.visibility = "hidden") &&
          monitortext.style.visibility === "hidden"
        ) {
          monitorgif.style.visibility = "visible";
          monitortext.style.visibility = "visible";
          monitorgif.style.border = "1px solid #00ff00";
        }
      }
      resolve();
    }, 3000);
  });
}

async function audioDisplay() {
  await new Promise((resolve) => {
    setTimeout(() => {
      alert("LOG: Audio channel decrypted.");
      if (
        audiogif.style.visibility === "hidden" &&
        audiotext.style.visibility === "hidden"
      ) {
        audiogif.style.visibility = "visible";
        audiotext.style.visibility = "visible";
        audiogif.style.border = "1px solid #00ff00";
      }

      resolve();
    }, 3000);
  });
}

// -------- DISPLAYING ACTIONS --------
async function displayingFuncs() {
  if (userinput.value) {
    await main();
    await terminalDisplay();
    await downloadingDisplay();
    await tracingDisplay();
    await monitorDisplay();
    await audioDisplay();
  }
}
