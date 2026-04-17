// ****************************** RIGHT PANEL ******************************

// ----------- DATE AND GREETING----------- :
let headingDate = document.querySelector("#date_time");
const now = new Date();
const month = now.toLocaleString("default", { month: "long" });
const date = now.getDate();
let format = `${month} ${date}`;
headingDate.textContent = format;

let greetingMsg = document.querySelector("#greetingMsg");

let hours = now.getHours();
if (hours >= 5 && hours < 12) {
  greetingMsg.textContent = "Good Morning!";
} else if (hours >= 12 && hours < 17) {
  greetingMsg.textContent = "Good Afternoon!";
} else if (hours >= 17 && hours < 21) {
  greetingMsg.textContent = "Good Evening!";
} else {
  greetingMsg.textContent = "Good Night!";
}

// ----------- FETCH USER TASK ----------- :

let addTask = document.querySelector("#addTask");
let addTaskBtn = document.querySelector("#addTaskBtn");

function getTask() {
  let usertask = addTask.value.trim();
  // event.target.reset();
  return usertask;
}

function arrayTask() {
  let temp_Arr = getTask();
  let taskArray = [];
  taskArray.push(temp_Arr);
  return taskArray;
}

// ----------- ADD TASK INTO LIST ----------- :

function taskList(value, container) {
  let li = document.createElement("li");

  // if (typeof value === Object) {
  //   li.textContent = value.Task;
  // } else {
  //   li.textContent = value;
  // }
  li.textContent = value.Task;
  if (value.isComplete === true) {
    li.style.color = "grey";
    li.style.textDecoration = "line-through";
  } else {
    li.style.textDecoration = "none";
    li.style.color = "white";
  }

  if (value.isPriority === true) {
    li.style.border = "1px solid #a16f59";
    li.style.boxShadow = "0px 0px 20px hsl(303, 79%, 35%) ";
  } else {
    li.style.color = "white";
  }
  let ulList = document.querySelector("#ul_TaskList").appendChild(li);
  if (container) {
    container.appendChild(li);
  }

  // ----------- DEL TASK----------- :
  let delButton = document.createElement("button");
  let delicon = document.createElement("img");
  delicon.setAttribute(
    "src",
    "assets/delete_19dp_666666_FILL0_wght400_GRAD0_opsz20.png",
  );
  delButton.appendChild(delicon);

  delButton.addEventListener("click", () => {
    let retrieve = JSON.parse(localStorage.getItem("Data")) ?? [];
    let updatedTask = retrieve.filter((del) => {
      return del.id !== value.id;
    });
    localStorage.setItem("Data", JSON.stringify(updatedTask));
    displayHistory();
  });

  // ----------- Completed TASK----------- :
  let CompletedButton = document.createElement("INPUT");
  CompletedButton.textContent = CompletedButton.setAttribute(
    "type",
    "checkbox",
  );
  CompletedButton.checked = value.isComplete;

  CompletedButton.addEventListener("click", () => {
    let retrieve = JSON.parse(localStorage.getItem("Data")) ?? [];
    let Completed = retrieve.find((item) => {
      return item.Task === value.Task;
    });

    if (Completed) {
      Completed.isComplete = !Completed.isComplete;
    }

    localStorage.setItem("Data", JSON.stringify(retrieve));
    displayHistory();
  });

  // ----------- Priority  TASK----------- :
  let PriorityButton = document.createElement("button");
  let priorityIcon = document.createElement("img");
  priorityIcon.setAttribute(
    "src",
    "assets/star_shine_19dp_666666_FILL0_wght400_GRAD0_opsz20.png",
  );
  PriorityButton.appendChild(priorityIcon);

  PriorityButton.addEventListener("click", () => {
    let retrieve = JSON.parse(localStorage.getItem("Data")) ?? [];
    let prioritise = retrieve.find((item_Value) => {
      return item_Value.Task === value.Task;
    });

    if (prioritise) {
      prioritise.isPriority = !prioritise.isPriority;
    }

    localStorage.setItem("Data", JSON.stringify(retrieve));
    displayHistory();
  });

  if (!container) {
    ulList.appendChild(CompletedButton);
    ulList.appendChild(PriorityButton);
    ulList.appendChild(delButton);
  }
}

// ----------- MAIN FUNCTION ----------- :
addTaskBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getTask();
  arrayTask();

  // taskList(); we are calling inside the display function, no need to call here!

  // ----------- LOCAL STORAGE ----------- :

  let retrieve = JSON.parse(localStorage.getItem("Data")) ?? [];
  retrieve.push({
    id: Date.now(),
    Task: addTask.value,
    isPriority: false,
    isComplete: false,
  });
  localStorage.setItem("Data", JSON.stringify(retrieve));
  displayHistory();

  return (addTask.value = "");
});

function displayHistory() {
  let ulList = document.querySelector("#ul_TaskList");
  ulList.innerHTML = ""; // this will erase the old task
  let retrieve = JSON.parse(localStorage.getItem("Data")) ?? [];
  console.log(retrieve);
  retrieve.forEach((element) => {
    taskList(element);
  });
}
displayHistory();

// ****************************** LEFT PANEL ******************************

function showTask(type) {
  let container = document.querySelector("#displayList");

  container.innerHTML = ""; // this will erase the old task

  let retrieve = JSON.parse(localStorage.getItem("Data")) ?? [];
  filteredTask = [];

  if (type === "completedTask") {
    filteredTask = retrieve.filter((item) => {
      return item.isComplete === true;
    });
  } else if (type === "priorityTask") {
    filteredTask = retrieve.filter((item) => {
      return item.isPriority === true;
    });
  } else if (type === "pendingTask") {
    filteredTask = retrieve.filter((item) => {
      return item.isComplete === false;
    });
  }

  filteredTask.forEach((element) => {
    taskList(element, container);
  });
}
