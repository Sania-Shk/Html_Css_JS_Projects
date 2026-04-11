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

function taskList(value) {
  let li = document.createElement("li");

  // if (typeof value === Object) {
  //   li.textContent = value.Task;
  // } else {
  //   li.textContent = value;
  // }
  li.textContent = value.Task;
  if (value.iscomplete === true) {
    li.style.textDecoration = "line-through";
  } else {
    li.style.textDecoration = "none";
  }

  if (value.isPriority === true) {
    li.style.color = "yellow";
  } else {
    li.style.color = "black";
  }

  let ulList = document.querySelector("#ul_TaskList").appendChild(li);

  // ----------- DEL TASK----------- :
  let delButton = document.createElement("button");
  delButton.innerText = "🗑️";
  delButton.addEventListener("click", () => {
    let retrieve = JSON.parse(localStorage.getItem("Data")) ?? [];
    let updatedTask = retrieve.filter((del) => {
      return del.Task !== value.Task;
    });
    localStorage.setItem("Data", JSON.stringify(updatedTask));
    displayHistory();
  });

  // ----------- Completed TASK----------- :
  let CompletedButton = document.createElement("button");
  CompletedButton.textContent = "✔️";
  CompletedButton.addEventListener("click", () => {
    let retrieve = JSON.parse(localStorage.getItem("Data")) ?? [];
    let Completed = retrieve.find((item) => {
      return item.Task === value.Task;
    });

    if (Completed) {
      Completed.iscomplete = !Completed.iscomplete;
    }

    localStorage.setItem("Data", JSON.stringify(retrieve));
    displayHistory();
  });

  // ----------- Priority  TASK----------- :
  let PriorityButton = document.createElement("button");
  PriorityButton.textContent = "⭐";
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

  ulList.appendChild(delButton);
  ulList.appendChild(CompletedButton);
  ulList.appendChild(PriorityButton);
}

// ----------- MAIN FUNCTION ----------- :
addTaskBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getTask();
  arrayTask();

  // taskList(); we are calling inside the display function, no need to call here!

  // ----------- LOCAL STORAGE ----------- :

  let retrieve = JSON.parse(localStorage.getItem("Data")) ?? [];
  retrieve.push({ Task: addTask.value });
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
