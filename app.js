//load up DOM
document.addEventListener("DOMContentLoaded", function (e) {
  //load all DOM elements needed
  const listItems = document.getElementById("task-list");
  const myTaskInput = document.getElementById("my-task");
  const addBtn = document.getElementById("btn");
  const message = document.getElementById("message");
  loadTasks(); // load tasks from localStorage

  //   add motivational message to users for completing their tasks
  function createMessage() {
    message.innerText = "";
    const msg = document.createElement("p");
    msg.innerText = `Great Job! You've Completed a Task!`;
    message.appendChild(msg);
  }

  // adds a new task item

  function addTask() {
    const task = myTaskInput.value.trim();
    if (!task) {
      alert("Please Enter a Task");
      return;
    } else {
      generateTask(task);
      myTaskInput.value = "";
      saveTasks();
    }
  }
  //  initiate event when add button is clicked
  addBtn.addEventListener("click", addTask);
  //  creates a list item task to add to ul element
  function generateTask(task) {
    const listItem = document.createElement("li");
    listItem.classList.add("li-input");
    listItem.innerText = task;
    const removeButton = document.createElement("button");
    const editButton = document.createElement("button");
    removeButton.innerHTML = `<i class="fa-solid fa-square-minus"></i>`;
    removeButton.classList.add("remove");
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editButton.classList.add("edit");
    listItem.append(removeButton);
    listItem.append(editButton);
    listItems.append(listItem);

    // generate a remove button event listener
    removeButton.addEventListener("click", function (e) {
      listItems.removeChild(listItem);
      saveTasks();
      createMessage();
    });
    // generate an edit button event listener
    listItem.querySelector(".edit").addEventListener("click", function (e) {
      listItems.removeChild(listItem);
      addTask();
    });
    message.innerText = "";
  }
  // save tasks to localStorage
  function saveTasks() {
    let tasks = [];
    listItems.querySelectorAll("li").forEach(function (item) {
      tasks.push(item.innerText.trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  // load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(generateTask);
  }
});
