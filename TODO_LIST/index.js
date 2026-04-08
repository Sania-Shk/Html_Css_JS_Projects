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

  ulList.appendChild(delButton);
}

// ----------- MAIN FUNCTION ----------- :
addTaskBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getTask();
  arrayTask();

  // taskList(); we are calling in the display function, no need to call here

  // ----------- LOCAL STORAGE ----------- :

  let retrieve = JSON.parse(localStorage.getItem("Data")) ?? [];
  retrieve.push({ Task: addTask.value });
  localStorage.setItem("Data", JSON.stringify(retrieve));
  displayHistory();
  return (addTask.value = "");
});

function displayHistory() {
  let ulList = document.querySelector("#ul_TaskList");
  ulList.innerHTML = ""; // th erase the old task
  let retrieve = JSON.parse(localStorage.getItem("Data")) ?? [];
  retrieve.forEach((element) => {
    taskList(element);
  });
}
displayHistory();
