import { projects } from "./project.js";

export class Todo {
  constructor(title, desc, dueDate, priority, project) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    // this.status = status === 1? "not completed" : "completed" ;
  }
}

export let todos = [];

export const todoDOM = `
    <div class="todo">
        <input id="title" placeholder="Task name" required><br>
        <input id="desc" type="textbox" placeholder="Description" required></br>
        <label>select Date</label>
        <input id="dueDate" type="date" placeholder="Today" required>

        <label>Select Priority: </label>
        <select id="myDropdown" placeholder="priority">
            <option value="high">High</option>
            <option value="medium">Medium </option>
            <option value="low">Low </option>
        </select><br>


        <hr>
        <div class="below">
        <select id="projectsSel">
            <option value="inbox"># Inbox</option>
        </select>

        <div class="btns">
        <button id="btn" class="btn2 cancel">Cancel</button>
        <button  type="submit" id="add" class="btn2">Add Task</button>
        </div>
        </div>
    </div>
`;

export const createTodo = function (Todo) {
  const card = document.createElement("div");

  const checkbox = document.createElement("input");
  checkbox.classList.add("box");
  checkbox.type = "checkbox";

  const h1 = document.createElement("p");
  h1.append(checkbox);
  h1.append(Todo.title);

  card.append(h1);
  card.classList.add("card");

  const deleteOption = document.createElement("button");
  deleteOption.classList.add("btn2");
  deleteOption.classList.add("del");
  const viewOption = document.createElement("button");
  viewOption.classList.add("btn2");
  viewOption.classList.add("view");
  if (document.querySelector("body").classList.contains("dark")) {
    deleteOption.classList.add("darkBtn");
    viewOption.classList.add("darkBtn");
  }
  deleteOption.innerHTML = `<span class="material-symbols-outlined">
delete
</span>`;
  viewOption.innerHTML = `<span class="material-symbols-outlined">
visibility
</span>`;

  const div = document.createElement("div");
  div.append(viewOption);
  div.append(deleteOption);

  card.append(div);

  const cardModal = createCard(Todo);
  document.querySelector(".taskArea").append(card);

  viewOption.addEventListener("click", () => {
    document.querySelector(".details").classList.remove("hidden");
    document.querySelector(".details").innerHTML = cardModal;

    if (Todo.desc === "") {
      document.querySelector("#descModal").classList.add("hidden");
    }

    if (Todo.dueDate === "") {
      document.querySelector("#dueDateModal").classList.add("hidden");
    }

    if (document.querySelector("body").classList.contains("dark")) {
      document.querySelector(".modal").classList.toggle("darkModal");
    }

    document.querySelector(".remove").addEventListener("click", () => {
      document.querySelector(".details").classList.add("hidden");
    });
  });

  checkbox.addEventListener("click", () => {
    h1.classList.toggle("done");
  });

  deleteOption.addEventListener("click", () => {
    card.remove();

    let pos = todos.indexOf(Todo.title) + 1;
    console.log(Todo.title);
    console.log(pos);
    todos.splice(pos, pos + 1);
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));

    document.querySelector(".details").innerHTML = "";
  });
};

export function add() {
  const taskName = document.querySelector("#title").value;
  const taskDescription = document.querySelector("#desc").value;
  const taskDate = document.querySelector("#dueDate").value;
  const taskPriority = document.querySelector("#myDropdown").value;
  const project = document.querySelector("#projectsSel").value;

  const todo = new Todo(
    taskName,
    taskDescription,
    taskDate,
    taskPriority,
    project
  );

  if (taskName === "") {
    alert("Enter the task Name");
  } else {
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    createTodo(todo);
    document.querySelector(".add").classList.remove("hidden");
    document.querySelector(".todo").classList.add("hidden");
  }
}

const createCard = function (Todo) {
  return `
    <div class="modal">
      <h1>${Todo.title}
      <button class="btn2 remove">x</button>
      </h1>
      <h2 id="descModal">Description: ${Todo.desc}</h2>
      <h2>project: ${Todo.project}</h2>
      <h2 id="dueDateModal">DueDate: ${Todo.dueDate}</h2>
      <h2>Priority: ${Todo.priority}</h2>

    </div>
  `;
};
