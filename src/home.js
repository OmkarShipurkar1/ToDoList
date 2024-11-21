import "./styles.css";
import { add, todoDOM } from "./todo.js";
import { projects, no } from "./project.js";

export const home = `
    <section class="home">
        <h1 class="prName">Today</h1>

        <div class="taskArea"></div>
        <div class="todoArea"></div>
        <button class="btn add">
        <span class="material-symbols-outlined"> add_circle </span>Add Task
      </button>
<!--        <div class="info">
        <h3>What do you need to get done today?</h3>
        <p>
By default, tasks added here will be due today. Click + to add a task.
        </p>
        </div> -->
    </section>
`;

export function addTask() {
  // document.querySelector(".info").classList.add("hidden");
  document.querySelector(".todoArea").innerHTML = todoDOM;
  let inputs = document.querySelectorAll("input");
  if (
    !document.querySelector(".todo").classList.contains("hidden") &&
    document.querySelector("body").classList.contains("dark")
  ) {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.toggle("darkBtn");
    }
    document.querySelector("#projectsSel").classList.add("darkBtn");
    document.querySelector("#btn").classList.add("darkBtn");
    document.querySelector("#add").classList.add("darkBtn");
  }
  document.querySelector(".cancel").addEventListener("click", cancelTask);
  document.querySelector(".add").classList.add("hidden");

  document.querySelector("#add").addEventListener("click", add);

  for (let i = 0; i < projects.length; i++) {
    const opt = document.createElement("option");
    opt.value = projects[i];
    opt.innerText = "# " + projects[i];
    document.querySelector("#projectsSel").append(opt);
  }

  let pos = projects.indexOf(no) + 1;

  let isHome = false;

  document.querySelector("#home").addEventListener("click", () => {
    isHome = true;
  });

  if (isHome) {
    document.querySelector("#projectsSel").options[0].selected = true;
  } else {
    document.querySelector("#projectsSel").options[pos].selected = true;
  }
}

export function cancelTask() {
  document.querySelector(".todo").classList.add("hidden");
  document.querySelector(".add").classList.remove("hidden");
}
