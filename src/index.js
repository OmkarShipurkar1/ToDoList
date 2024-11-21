import { home, addTask } from "./home.js";
import { addProject, createProject, projects, projectBtns } from "./project.js";
import { todos, createTodo } from "./todo.js";
import { elements } from "./selectors.js";

// const content = document.querySelector("#content");
//

elements.mainContent.innerHTML = home;
document.querySelector(".add").addEventListener("click", addTask);
document.querySelector(".addTsk").addEventListener("click", addTask);

elements.themeBtn.addEventListener("click", () => {
  elements.body.classList.toggle("dark");
  elements.button1.classList.toggle("darkBtn");
  elements.inboxBtn.classList.toggle("darkBtn");
  elements.addProjectBtn.classList.toggle("darkBtn2");
  elements.button2.classList.toggle("darkBtn");
  elements.projectArea.innerHTML = "";
  document.querySelector(".add").classList.toggle("darkBtn");
  let btn3s = document.querySelectorAll(".btn3");
  if (elements.projectButtons.childElementCount !== 0) {
    console.log("working");
    for (let i = 0; i < btn3s.length; i++) {
      btn3s[i].classList.toggle("darkBtn");
    }
  }

  let inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("darkBtn");
  }

  let deleteBtns = document.querySelectorAll(".del");
  let viewBtns = document.querySelectorAll(".view");
  if (document.querySelector(".taskArea").childElementCount !== 0) {
    for (let i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].classList.toggle("darkBtn");
      viewBtns[i].classList.toggle("darkBtn");
    }
  }
  if (document.querySelector(".add").classList.contains("dark")) {
    document.querySelector(".add").remove("darkBtn");
  }

  if (
    document.querySelector(".todoArea").childElementCount !== 0 &&
    !document.querySelector(".todo").classList.contains("hidden")
  ) {
    document.querySelector(".todo").classList.add("hidden");
    document.querySelector(".add").classList.remove("hidden");
  }

  if (document.querySelector(".details").childElementCount !== 0) {
    if (!document.querySelector(".modal").classList.contains("hidden")) {
      document.querySelector(".modal").classList.add("hidden");
    }
  }
});

document.querySelector("#home").addEventListener("click", function () {
  console.log(todos);
  content.innerHTML = home;
  for (let i = 0; i < todos.length; i++) {
    createTodo(todos[i]);
  }
  document.querySelector(".add").addEventListener("click", addTask);

  if (elements.body.classList.contains("dark")) {
    document.querySelector(".add").classList.add("darkBtn");
  }
});

elements.addProjectBtn.addEventListener("click", () => {
  addProject();
});

let size = localStorage.getItem("project");
const obj = JSON.parse(size);

console.log(obj);

for (let i = 0; i < obj.length; i++) {
  projects.push(obj[i]);
  createProject(obj[i]);
}

let size2 = localStorage.getItem("todos");
const obj2 = JSON.parse(size2);

console.log(obj2);

for (let i = 0; i < obj2.length; i++) {
  todos.push(obj2[i]);
  createTodo(todos[i]);
}
