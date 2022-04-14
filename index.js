let button = [
  (one = {
    name: "Wash Car",
    price: 10,
    state: false,
  }),
  (two = {
    name: "Mow Lawn",
    price: 20,
    state: false,
  }),
  (three = {
    name: "Pull Weeds",
    price: 30,
    state: false,
  }),
];

let buttonList = [
  {
    id: "task-button1",
  },
  {
    id: "task-button2",
  },
  {
    id: "task-button3",
  },
];

let ulEl = document.getElementById("ulEl");
let taskList = document.getElementById("task-list");
let totalSum = document.getElementById("total-price");
let spanNote = document.getElementById("notes-span");
let taskArray = [];
let elemArray = [];
let tasks = "";
let buttons = "";
let localArray = [];
let sum = 0;
const setBtnIDToLocalStorage = (button) => {
  localStorage.setItem(button, true);

  document.getElementById(button).setAttribute("disabled", true);
};
const isBtnDisabled = (button) => {
  if (localStorage.getItem(button)) {
    document.getElementById(button).setAttribute("disabled", true);
  }
};

window.onload = function buttonDisplay() {
  //   for (let i = 0; i < button.length; i++) {
  //     buttons += `<li><button class = "task-button" id = "task-button${i + 1}">${
  //       button[i].name
  //     }:  $${button[i].price}</button></li>`;
  //   }
  //   ulEl.innerHTML = buttons;

  // const buttonList = button
  //   .map((button, i) => {
  //     return `<li><button class = "task-button" >${button.name}:  $${button.price}</button></li>`;
  //   })
  //   .join("");
  // ulEl.innerHTML = buttonList;

  let particular = JSON.parse(localStorage.getItem("particular"));

  document.querySelectorAll(".task-button").forEach((elem) => {
    isBtnDisabled(elem.id);
    elem.addEventListener("click", function () {
      if (particular == null || !particular.includes(elem)) {
        if (elemArray == null || !elemArray.includes(elem)) {
          processButton(elem);
          spanNote.textContent = "We accept cash, credit card, or PayPal";
        }
        elemArray.push(elem);
        setBtnIDToLocalStorage(elem.id);
        console.log(elem, "elem");

        localStorage.setItem("particular", JSON.stringify(elemArray));
      }
    });
  });

  function processButton(button) {
    tasks = "";
    const values = button.innerHTML.split(" ");
    let taskName = values[0] + " " + values[1].replace(":", "");
    let taskPrice = values[3].replace(/[^\d.]/g, "");
    let taskLiteral = `<li>
                                <div><p class = "task-name" id = "task">${taskName} <span class = "delete-span">(remove)</span><p></div>
                                <div> <p id ="task-price"><span id = "price-span">$</span>${taskPrice}<p></div>
                              </li>`;

    if (tasksFromLocalStorage) {
      taskArray = localArray;
    }

    taskArray.push(taskLiteral);
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    let storedSum = localStorage.getItem("totalSum");

    if (!tasksFromLocalStorage) {
      for (let i = 0; i < taskArray.length; i++) {
        tasks += taskArray[i];
      }
      sum += Number(taskPrice);
    } else {
      for (let i = 0; i < localArray.length; i++) {
        tasks += localArray[i];
      }
      sum = Number(taskPrice) + Number(storedSum);
    }

    // sum = Number(taskPrice) + storedSum
    localStorage.setItem("totalSum", sum);
    totalSum.textContent = "$" + sum;
    taskList.innerHTML = tasks;
  }

  let tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
  let storedSum = localStorage.getItem("totalSum");

  if (tasksFromLocalStorage) {
    localArray = tasksFromLocalStorage;
    for (let i = 0; i < localArray.length; i++) {
      tasks += localArray[i];
    }
    taskList.innerHTML = tasks;
    totalSum.textContent = "$" + storedSum;
    spanNote.textContent = "We accept cash, credit card, or PayPal";
    tasks = "";
  }

  document
    .getElementById("reset-button")
    .addEventListener("click", function () {
      tasks = "";
      localStorage.clear("tasks");
      localStorage.clear("totalSum");
      localStorage.clear("particular");
      taskArray = [];
      elemArray = [];
      localArray = [];
      taskList.innerHTML = "";
      spanNote.textContent = "";
      sum = 0;
      totalSum.textContent = "$0";
      document.querySelectorAll(".task-button").forEach((elem) => {
        elem.disabled = false;
      });
    });
};
