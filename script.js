let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let task = document.getElementById("task");
let add = document.getElementById("add");

//Adding EventListener
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });


  //adding validation
  let formValidation = () => {
    if (textInput.value === "") {
      console.log("failure");
      msg.innerHTML = "Task cannot be blank";
    } else {
      console.log("success");
      msg.innerHTML = "";
      acceptData();

      add.setAttribute("data-bs-dismiss" ,"modal")
      add.click();
    }
   
  };
 


  //accepting data//
  let data=[];

  let acceptData=()=>{
    data.push({
        text:textInput.value,
        date: dateInput.value,
        description:textarea.value,
    });

    localStorage.setItem("data" ,JSON.stringify(data));

   console.log(data)
    createTask();
  }

  //uploading on screen//
  let createTask =()=>{
    task.innerHTML="";
    data.map((x,y)=>{
        return(
            task.innerHTML +=`
    <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
            <span class="option">
              <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"  class="fas fa-edit"></i>
              <i onClick="deleteTask(this); createTask()" class="fas fa-trash-alt"></i>
            </span>
          </div>
    
    `);
    });

    
    resetForm();
    
  };

  
  
  let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem("data",JSON.stringify(data));
    console.log(data);
  };

  let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
  
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;


    deleteTask(e);
  };

  let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
  };


  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTask();
  })();