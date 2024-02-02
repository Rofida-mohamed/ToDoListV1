//for id
let i=0;

let todo =[
];

let enterBtn = document.querySelector('#adbtn');
let tsktextinout =document.querySelector('#entsk');
let tasksdiv = document.querySelector('.tasks');


let lastTapTime = 0;



//add to list
function addlist (tasktxt){
    let str = tasktxt;
    task = {
        id:i++,
        name:str,
        status:false
    }
    todo.push(task);
    addtasktopage(todo);
    
}





//add task
enterBtn.addEventListener("click",function(){
    if (tsktextinout.value!==''){
        addlist(tsktextinout.value);
        tsktextinout.value="";
    }
})

tsktextinout.addEventListener("keypress", (e)=>{
    if (e.key === 'Enter') {
        if (tsktextinout.value!==''){
            addlist(tsktextinout.value);
            tsktextinout.value="";
        }
      }
} )

//remove from list
function deleteTaskWith(taskId) {
    
    todo = todo.filter((task) => task.id != taskId);
  }



// Initialize Hammer.js for the tasksdiv
const hammer = new Hammer(tasksdiv);

function addTaskDiv(task) {
    let tskdiv = document.createElement("li");

    if (task.status) {
        tskdiv.className = "done";
    }
    tskdiv.dataset.id = task.id;

    tskdiv.innerText = task.name;

    tasksdiv.appendChild(tskdiv);

    tskdiv.addEventListener("click", function () {
        if (task.status) {
            task.status = false;
            tskdiv.className = null;
        } else {
            task.status = true;
            tskdiv.className = "done";
        }
    });

    tskdiv.addEventListener("dblclick", function () {
        deleteTaskWith(task.id);
        tskdiv.remove();
    });
}

function addtasktopage(todo) {
    tasksdiv.innerHTML = '';
    todo.forEach((task) => {
        addTaskDiv(task);
    });
}

hammer.on('tap', function (e) {
    let currentTime = new Date().getTime();
    const timeBetweenTaps = 400; // 400ms

    if (currentTime - lastTapTime < timeBetweenTaps) {
        // Double tap detected
        let taskId = e.target.dataset.id;
        deleteTaskWith(taskId);
        e.target.remove();
    }

    lastTapTime = currentTime;
});

