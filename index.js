let ulEl = document.getElementById("ulEl");
let taskList = document.getElementById("task-list");
let totalSum = document.getElementById("total-price");
let spanNote = document.getElementById("notes-span");
let taskArray = [];
let count = 0;
let tasks = "";
let taskPrice = ""
let buttons = "";
let localArray = [];
let newArray = [];
let sum = 0;
let storedSum = localStorage.getItem("totalSum");
let tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));


function renderTaskList(data){
  localStorage.setItem("tasks", JSON.stringify(data));
  let storedSum = localStorage.getItem("totalSum");

  for (const task of data) {
    tasks += `<li id = "task${task.taskPrice}">
                  <div>
                  <p 
                  class = "task-name" 
                  > ${task.taskName} 
                  <span class = "delete-span" onclick = "deleteBtn(${task.id}, ${task.taskPrice})">(remove)</span>
                  <p>
                  </div>
                  <div> <p id ="task-price"><span id = "price-span">$</span>${task.taskPrice}<p></div>
              </li>`;
  }
  if (!tasksFromLocalStorage) {
    sum += Number(taskPrice);
  } else {
    sum = Number(taskPrice) + Number(storedSum);
  }

  localStorage.setItem("totalSum", sum);
  totalSum.textContent = "$" + sum;
  taskList.innerHTML = tasks;
}

function deleteBtn(event,num){
  let storedSum = localStorage.getItem("totalSum");
  tasks = ""

    taskPrice = Number(num);
    if(tasksFromLocalStorage){
      newArray = localArray.filter(elem => elem.id !== Number(event))
      localArray = newArray
      sum = Number(storedSum) - Number(2 * taskPrice)
      localStorage.setItem("totalSum", sum);
      renderTaskList(newArray)

    }else {
    newArray = taskArray.filter(elem => elem.id !== Number(event))
    taskArray = newArray; 
    sum -= Number(2 * taskPrice);
    renderTaskList(newArray)

  }
  
}


window.onload = function buttonDisplay() {

  document.querySelectorAll(".task-button").forEach((elem) => {
    elem.addEventListener("click", function () {
          processButton(elem);
          spanNote.textContent = "We accept cash, credit card, or PayPal";
    });
  });

  if (tasksFromLocalStorage) {
    localArray = tasksFromLocalStorage;
    renderTaskList(localArray)
    totalSum.textContent = "$" + storedSum;
    spanNote.textContent = "We accept cash, credit card, or PayPal";
    tasks = "";
  }

 

  function processButton(button) {
    tasks = "";
    const values = button.innerHTML.split(" ");
    const truncdValues = values.slice(16);
    let taskName = truncdValues[0] + " " + truncdValues[1].replace(":", "");
    taskPrice = truncdValues[2].replace(/[^\d.]/g, "");
    let taskLiteral = {
       id: count,
       taskName,
       taskPrice
    }
    count += 1;

    if (tasksFromLocalStorage) {
      taskArray = localArray;
    }

    if(taskArray.filter(task => task.taskName === taskName).length < 1){
      taskArray.push(taskLiteral);
    
      renderTaskList(taskArray)
    }    
  }


  

  

  document
    .getElementById("reset-button")
    .addEventListener("click", function () {
      tasks = "";
      localStorage.clear("tasks");
      localStorage.clear("totalSum");
      localStorage.clear("particular");
      taskArray = [];
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
