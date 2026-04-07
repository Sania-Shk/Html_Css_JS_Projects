// ----------- FETCH USER TASK ----------- :

let addTask = document.querySelector("#addTask");
let addTaskBtn = document.querySelector("#addTaskBtn");

function getTask() {
  let usertask = addTask.value.trim();
  return usertask;
}

function arrayTask() {
  let temp_Arr = getTask();
  let taskArray = [];
  taskArray.push(temp_Arr);
  return taskArray;
}

// ----------- ADD TASK INTO LIST ----------- :

let temp_li = [];
function taskList() {
  temp_li = arrayTask();
  let li = document.createElement("li");
  li.textContent = temp_li;
  let ulList = document.querySelector("#ul_TaskList").appendChild(li);

  // ----------- DEL TASK----------- :
  let delButton = document.createElement("button");
  delButton.innerText = "🗑️";
  delButton.addEventListener("click", (event) => {
    let delTask = event.target.closest("li");
    delTask.remove();
  });

  ulList.appendChild(delButton);
}

// ----------- MAIN FUNCTION ----------- :
addTaskBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getTask();
  arrayTask();
  taskList();
  addTask.value = " ";
});
