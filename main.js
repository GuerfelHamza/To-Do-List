var todoList = [];
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");

addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);

document.addEventListener("click", (e) => {
  if (
    e.target.className.split(" ")[0] == "complete" ||
    e.target.className.split(" ")[0] == "ci"
  ) {
    completeTodo(e);
  }
  if (
    e.target.className.split(" ")[0] == "delete" ||
    e.target.className.split(" ")[0] == "di"
  ) {
    deleteTodo(e);
  }
  if (
    e.target.className.split(" ")[0] == "edit" ||
    e.target.className.split(" ")[0] == "ei"
  ) {
    editTodo(e);
  }
});

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    add();
  }
});

function update() {
  comdoList = todoList.filter((ele) => ele.complete);
  remList = todoList.filter((ele) => !ele.complete);
}

function add() {
  var value = todoInput.value.trim();
  if (value === "") {
    alert("😮 Task cannot be empty");
    return;
  }
  todoList.push({
    task: value,
    id: Date.now().toString(),
    complete: false,
  });

  todoInput.value = "";
  update();
  addinmain(todoList);
}

function addinmain(todoList) {
  allTodos.innerHTML = "";
  todoList.forEach((element) => {
    var x = `<li id=${element.id} class="todo-item">
      <p id="task-${element.id}" class="${element.complete ? "line" : ""}">
        ${element.task}
      </p>
      <div class="todo-actions">
        <button class="complete btn btn-success">
          <i class="ci bx bx-check bx-sm"></i>
        </button>
        <button class="edit btn btn-edit">
          <i class="ei bx bx-edit bx-sm"></i>
        </button>
        <button class="delete btn btn-error">
          <i class="di bx bx-trash bx-sm"></i>
        </button>
      </div>
    </li>`;
    allTodos.innerHTML += x;
  });
}

function deleteTodo(e) {
  var deleted = e.target.closest("li").getAttribute("id");
  todoList = todoList.filter((ele) => ele.id != deleted);
  update();
  addinmain(todoList);
}

function completeTodo(e) {
  var completed = e.target.closest("li").getAttribute("id");
  todoList.forEach((obj) => {
    if (obj.id == completed) {
      obj.complete = !obj.complete;
    }
  });
  update();
  addinmain(todoList);
}

function editTodo(e) {
  var li = e.target.closest("li");
  var taskId = li.getAttribute("id");
  var taskObj = todoList.find((t) => t.id == taskId);

  var taskP = li.querySelector("p");

  // Si déjà en mode édition, sauvegarde
  if (taskP.querySelector("input")) {
    var newValue = taskP.querySelector("input").value.trim();
    if (newValue !== "") {
      taskObj.task = newValue;
    }
    addinmain(todoList);
    return;
  }

  // Sinon passe en mode édition
  taskP.innerHTML = `<input type="text" value="${taskObj.task}" id="edit-${taskId}" class="input-edit">`;
  var inputEdit = document.getElementById(`edit-${taskId}`);
  inputEdit.focus();

  // Valider avec Enter
  inputEdit.addEventListener("keypress", (ev) => {
    if (ev.key === "Enter") {
      var newValue = inputEdit.value.trim();
      if (newValue !== "") {
        taskObj.task = newValue;
      }
      addinmain(todoList);
    }
  });
}

// Delete All tasks
function deleteAll() {
  if (todoList.length === 0) {
    alert("😶 No tasks to delete");
    return;
  }
  todoList = [];
  update();
  addinmain(todoList);
}

// Delete only completed tasks
function deleteS() {
  let before = todoList.length;
  todoList = todoList.filter((ele) => !ele.complete);
  if (before === todoList.length) {
    alert("😶 No completed tasks to delete");
  }
  update();
  addinmain(todoList);
}
