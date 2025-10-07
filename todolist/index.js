const inputbox = document.getElementById("inputbox");
const tasklist = document.querySelector(".tasklist");
const todolist = document.querySelector(".todolist");
const pomodoro =  document.querySelector(".pomodoro")


const toggleBtn = document.getElementById("toggleTodo");
const sidebar = document.getElementById("todoSidebar");
const inputBox = document.getElementById("inputbox");
const taskList = document.getElementById("tasklist");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

// Add Task Function
function addtask() {
    const taskText = inputBox.value.trim();
    if (taskText === "") return;

    const task = document.createElement("div");
    task.className = "taskitem";

    const text = document.createElement("span");
    text.textContent = taskText;

    const check = document.createElement("button");
    check.className = "checkBox";
    check.onclick = () => check.classList.toggle("checked");

    task.appendChild(text);
    task.appendChild(check);

    taskList.appendChild(task);
    inputBox.value = "";
}

/*function addtask(){
    if (inputbox.value == ''){
        alert("Task cannot be empty!")
    } 
    else{
        newTaskDiv = document.createElement('div');
        checkBox = document.createElement('button');
        tasklist.append(newTaskDiv);
        newTaskDiv.classList.add('taskitem');
        newTaskDiv.innerHTML = `<p>${inputbox.value}</p>`;
        newTaskDiv.append(checkBox)
        checkBox.classList.add('checkBox')
        let span = document.createElement("span")
        span.innerHTML = "\u00d7"
        newTaskDiv.prepend(span)

        newTaskDiv.addEventListener("click", function(e) {
            if (e.target.tagName === "BUTTON"){
                e.target.classList.toggle("checked");
                console.log(e.target.classList)
                saveData();
            }
      
            else if (e.target.tagName ==="SPAN"){
                e.target.parentElement.remove();
                saveData();
            }
        })
    } 

    inputbox.value = '';
    saveData();
};*/


const draggableDiv = document.querySelectorAll(".draggable")

let offsetX = 0;
let offsetY = 0;
let mouseX = 0;
let mouseY = 0;
isMouseDown = false;

draggableDiv.forEach(drag =>{
    drag.addEventListener('mousedown', (e)=>{
        isMouseDown = true;
        offsetX = drag.offsetLeft - e.clientX;
        offsetY = drag.offsetTop - e.clientY;
    })
    drag.addEventListener('mousemove', (e) =>{
        if(!isMouseDown) return;
        e.preventDefault();
        mouseX = e.clientX + offsetX;
        mouseY = e.clientY + offsetY;
        drag.style.left = mouseX+'px'
        drag.style.top = mouseY+'px'
        saveData();
    })
    drag.addEventListener('mouseup', (e)=>{
        isMouseDown = false;
    })
})

const hour = document.querySelector(".hour")
const minute = document.querySelector(".minute")
const second = document.querySelector(".second")
minute.value = 20


let countdownId = null;

function startTimer() {
  // don’t start a second interval if one is already running
  if (countdownId !== null) return;

  countdownId = setInterval(() => {
    let h = +hour.value   || 0;
    let m = +minute.value || 0;
    let s = +second.value || 0;

    if (h === 0 && m === 0 && s === 0) {
      pauseTimer();               // stop the interval
      alert("Time's up!");
      return;
    }

    if (s === 0) {
      if (m === 0) {
        h--; m = 59; s = 59;
      } else {
        m--; s = 59;
      }
    } else {
      s--;
    }

    hour.value = h;
    minute.value = m;
    second.value = s;
  }, 1000);
}

function pauseTimer() {
  if (countdownId !== null) {
    clearInterval(countdownId);   // stop the running interval
    countdownId = null;           // mark “no timer running”
  }
}



function todolistbtn() {
    if (todolist.style.display === "none") {
        todolist.style.display = "block"; // Show the div
    } else {
        todolist.style.display = "none"; // Hide the div
    }
    console.log(todolist.style.display)
    saveData()
}


const goBtn = document.getElementById("go");
const notebook = document.getElementById("notebook");
const closeBtn = document.getElementById("close-notebook");
const highlightToggle = document.getElementById("highlight-toggle");
const content = document.getElementById("notebook-content");

let highlightMode = false;

// Open notebook
goBtn.addEventListener("click", () => {
  notebook.classList.add("open");
});

// Close notebook
closeBtn.addEventListener("click", () => {
  notebook.classList.remove("open");
});

// Toggle highlighter mode
highlightToggle.addEventListener("click", () => {
  highlightMode = !highlightMode;
  highlightToggle.style.color = highlightMode ? "#ffb84d" : "inherit";
});

// Highlight selected text
content.addEventListener("mouseup", () => {
  if (!highlightMode) return;

  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  if (selection.toString().length > 0) {
    const span = document.createElement("span");
    span.classList.add("highlighted");
    range.surroundContents(span);
    selection.removeAllRanges();
  }
});


// 🎧 Spotify Embed Loader
document.getElementById("loadSpotify").addEventListener("click", () => {
  const input = document.getElementById("spotifyLink").value.trim();
  const container = document.getElementById("spotifyPlayerContainer");

  if (!input) {
    container.innerHTML = "<p style='color:#999;'>Please paste a Spotify playlist link.</p>";
    return;
  }

  try {
    // Extract playlist ID from the URL
    const match = input.match(/playlist\/([a-zA-Z0-9]+)/);
    if (!match) {
      container.innerHTML = "<p style='color:#e56;'>Invalid Spotify playlist link.</p>";
      return;
    }

    const playlistId = match[1];
    const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;

    // Replace content with the iframe
    container.innerHTML = `
      <iframe style="border-radius:12px"
        src="${embedUrl}"
        width="100%" height="152" frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"></iframe>
    `;
  } catch (e) {
    container.innerHTML = "<p style='color:#e56;'>Something went wrong loading the playlist.</p>";
  }
});





function saveData(){
    localStorage.setItem("data", tasklist.innerHTML)
    localStorage.setItem("todolistdisplay", todolist.style.display)
}

function showTask(){
    tasklist.innerHTML = localStorage.getItem("data")
    todolist.style.display = localStorage.getItem("todolistdisplay")

    const taskitems = document.querySelectorAll(".taskitem");
    taskitems.forEach(task => {
        task.addEventListener("click", function(e) {
            if (e.target.tagName === "BUTTON") {
                e.target.classList.toggle("checked")
                console.log(e.target.classList)
                saveData();
            } else if (e.target.tagName === "SPAN") {
                e.target.parentElement.remove();
                saveData();
            }
        });
    });
}

showTask();