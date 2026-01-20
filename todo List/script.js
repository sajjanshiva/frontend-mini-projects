const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMsg = document.getElementById("emptyMsg");

function updateEmptyMsg() {
  emptyMsg.style.display =
    taskList.children.length === 0 ? "block" : "none";
}

function addTask() {
  if (input.value === "") {
    alert("Please enter a task");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `${input.value} <button>X</button>`;

  li.querySelector("button").onclick = function () {
    this.parentElement.remove();   // 🔑 simplest delete
    updateEmptyMsg();
  };

  taskList.appendChild(li);
  input.value = "";
  updateEmptyMsg();
}
