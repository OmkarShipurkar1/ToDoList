import { addTask } from "./home.js";
import { todos, createTodo } from "./todo.js";
export let projects = [];
export let projectBtns = [];

const addProjectDOM = `
    <div class="addp">
        <input type="text" id="projectName" placeholder="Enter Project Name" required><br>

        <button class="btn2 closeProject">

        <span class="material-symbols-outlined">cancel</span>
        </button>
        <button class="btn2 addProject" type="submit">  
            <span class="material-symbols-outlined"> add </span>
        </button>
    </div>
`;

export let no = 0;

export function closeProject() {
  document.querySelector(".projectArea").innerHTML = "";
}

export function createProject(name) {
  const projectBtn = document.createElement("button");
  projectBtn.classList.add("btn");
  projectBtn.innerHTML = `<span class="material-symbols-outlined">
tag
</span> ${name}`;
  projectBtn.classList.add("btn3");

  if (document.querySelector("body").classList.contains("dark")) {
    projectBtn.classList.add("darkBtn");
    console.log("its too working");
  }

  document.querySelector(".projectBtns").append(projectBtn);

  projectBtn.addEventListener("click", () => {
    document.querySelector("#content").innerHTML = `
        <section class="projects">
        <h1 class="prName">${name} <button class="btn2" id="delProject">Delete Project</button>
        </h1>
        <div class="taskArea"></div>
        <div class="todoArea"></div>
<button class="btn add">
        <span class="material-symbols-outlined"> add_circle </span>Add Task
      </button>
<!--         <div class="info">
         <h3>What do you need to get done today?</h3>
         <p>
 By default, tasks added here will be due today. Click + to add a task.
         </p>
         </div> -->
    </section>
      `;

    if (document.querySelector("body").classList.contains("dark")) {
      document.querySelector(".add").classList.add("darkBtn");
    }
    document.querySelector("#delProject").addEventListener("click", () => {
      projectBtn.remove();

      for (let i = 0; i < todos.length; i++) {
        if (todos[i].project === name) {
          todos.splice(i, 1);
        }
      }

      for (let i = 0; i < projects.length; i++) {
        if (projects[i] === name) {
          projects.splice(i, 1);
          console.log(projects);
          localStorage.setItem("project", JSON.stringify(projects));
        }
      }

      console.log(projects);
      if (todos.length !== 0) {
        if (todos[0].project === name) {
          todos.splice(0, 1);
        } else if (todos[todos.length - 1].project === name) {
          todos.splice(todos.length - 1, 1);
        }
      }
      localStorage.setItem("todos", JSON.stringify(todos));
      document.querySelector("#content").innerHTML = "You Deleted This Project";
    });

    no = name;

    document.querySelector(".add").addEventListener("click", addTask);
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].project === name) {
        createTodo(todos[i]);
      }
    }
  });

  projectBtns.push(projectBtn);
}

export function addProject() {
  document.querySelector(".projectArea").innerHTML = addProjectDOM;

  if (document.querySelector("body").classList.contains("dark")) {
    console.log("helo");
    document.querySelector(".closeProject").classList.toggle("darkBtn");
    document.querySelector(".addProject").classList.toggle("darkBtn");
    document.querySelector("#projectName").classList.toggle("darkBtn");
  }

  document.querySelector(".closeProject").addEventListener("click", () => {
    closeProject();
  });

  document.querySelector(".addProject").addEventListener("click", () => {
    const name = document.querySelector("#projectName").value;
    if (name === "") {
      alert("enter the project name");
    } else {
      projects.push(name);
      localStorage.setItem("project", JSON.stringify(projects));
      createProject(name);
      document.querySelector(".projectArea").innerHTML = "";
    }
  });
}
