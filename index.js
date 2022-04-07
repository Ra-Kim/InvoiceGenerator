let button = [
    one ={
    name: "Wash Car",
    price: 10
    },
    two={
    name : "Mow Lawn",
    price: 20
    },
    three = {
    name: "Pull Weeds",
    price: 30
    }
]

window.onload = function buttonDisplay(){
    let ulEl = document.getElementById("ulEl")
    let taskList = document.getElementById("task-list")
    let totalSum = document.getElementById("total-price")
    let spanNote = document.getElementById("notes-span")
    let taskArray = []
    let tasks = ""
    let buttons=""
    let localArray =[]
    let sum = 0
    for(let i =0; i<button.length;i++){
        buttons += `<li><button class = "task-button" id = "task-button${i+1}">${button[i].name}:  $${button[i].price}</button></li>`
    }
    ulEl.innerHTML=buttons

    let tasksFromLocalStorage = JSON.parse( localStorage.getItem("tasks") )

    function renderTask(){
        if (tasksFromLocalStorage){
            localArray=tasksFromLocalStorage
            for(let i =0; i<localArray.length;i++){
              tasks += localArray[i]
          }
          taskList.innerHTML = tasks
          }
    }

    

    document.querySelectorAll(".task-button").forEach(elem =>{
        elem.addEventListener("click", function(){
            processButton(elem)
            spanNote.textContent = "We accept cash, credit card, or PayPal"
        })
        
        function processButton(button) {
            button.disabled = true;
            tasks = ""
            const values = button.innerHTML.split(" ");
            let taskName = values[0] +" "+ values[1].replace(":",'')
            let taskPrice = values[3].replace ( /[^\d.]/g, '' )
            let taskLiteral = `<li>
                                <div><p class = "task-name" id = "task">${taskName} <span class = "delete-span">(remove)</span><p></div>
                                <div> <p id ="task-price"><span id = "price-span">$</span>${taskPrice}<p></div>
                              </li>`
            taskArray.push(taskLiteral)
            localStorage.setItem("tasks", JSON.stringify(taskArray) )
            tasksFromLocalStorage = JSON.parse( localStorage.getItem("tasks") )
            if (tasksFromLocalStorage){
              localArray=tasksFromLocalStorage
            }
                for(let i =0; i<localArray.length;i++){
                    tasks += localArray[i]
                }
            sum += Number(taskPrice)
            totalSum.textContent = "$" + sum
            taskList.innerHTML = tasks
        }
    })

    document.getElementById("reset-button").addEventListener("click", function(){
        localStorage.clear()
        taskArray = []
        taskList.innerHTML = ""
        spanNote.textContent = ""
        sum = 0
        totalSum.textContent = "$0"
        document.querySelectorAll(".task-button").forEach(elem =>{
                elem.disabled = false
        })
    })
    
}




