//@ts-nocheck
var taskcontainer = document.getElementById("taskscontainer") as HTMLElement;
var taskname = document.getElementById("taskname");
var count=0;
var search=document.getElementById("search")

// var list = [
//     { name: "project1", id:"todo0"
//         },
//     { name: "project2", id:"todo1"
//          },
//     { name: "project3", id:"todo2"
//         },
//     { name: "project4", id:"todo3"
//          },
// ];
// localStorage.setItem('list', JSON.stringify(list));
function todolist(){
    let list=JSON.parse(localStorage.getItem('list'))

    console.log(list)
    return list
}
let list=todolist()
const searchfunc = (e) => {
    let typedValue = e.target.value;
    console.log(typedValue)
    const filteredItems = list.filter(item => item.name.toLowerCase().includes(typedValue.toLowerCase()));
    displayFilteredItems(filteredItems);
}
search.addEventListener("input", searchfunc);

function displayFilteredItems(filteredItems) {
    taskcontainer.innerHTML = ''; // emptying the existing tasks and filling with filtered list

    for (let listItem of filteredItems) {
        create_todoele(listItem.name);
    }
}

function deletetodoitem(todoitem){
    let todoelement=document.getElementById(todoitem)   
    taskcontainer.removeChild(todoelement)
    let elementindex = list.findIndex(function(eachitem) {
        
        if (eachitem.id === todoitem) {
          return true;
        } else {
          return false;
        }
      });
    list.splice(elementindex,1)
  
  }
  
function completed(option,todonameid,checkboxid,todoid){
    let todoname=document.getElementById(todonameid);
    let checkbox=document.getElementById(checkboxid); 
    
    // console.log(todoname.textContent)
    if (option=='Completed'){
        todoname.classList.add("namestrike")
        checkbox.checked=true;
        let reversedlist=list.slice().reverse();
        let elementindex = reversedlist.findIndex(function(eachitem) {
        
            if (eachitem.name === todoname.textContent) {
              return true;
            } else {
              return false;
            }
          });
          
          reversedlist[elementindex].completed=true
        //   console.log(list)
    }
    else{
        todoname.classList.remove("namestrike")
        checkbox.checked=false;
    }
    
}
function create_todoele(name) {
    
    console.log(count);
    let todoid="todo"+JSON.stringify(count)
    let dropdownid="dropdown"+JSON.stringify(count)
    let checkboxid="checkbox"+JSON.stringify(count)
    let todonameid="todoname"+JSON.stringify(count)
    var todocontainer = document.createElement("div");
    todocontainer.id=todoid
    todocontainer.classList.add("todocontainer");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id=checkboxid;
    var check_name=document.createElement("div")
    check_name.classList.add("checkbox_name")
    check_name.appendChild(checkbox)
    // todocontainer.appendChild(checkbox);
    var todoname = document.createElement("p");
    todoname.classList.add("todoname");
    todoname.id=todonameid
    todoname.textContent = name
    check_name.appendChild(todoname)
    todocontainer.appendChild(check_name)
    // todocontainer.appendChild(todoname);
    var dropdowncon = document.createElement("select");
    var option1 = document.createElement("option");
    option1.value = "To start";
    option1.textContent = "To start";
    dropdowncon.id=
    dropdowncon.appendChild(option1);
    var option2 = document.createElement("option");
    option2.value = "In progress";
    option2.textContent = "In Progress";
    dropdowncon.appendChild(option2)
    var option3 = document.createElement("option");
    option3.value = "Completed";
    option3.textContent = "Completed";
    dropdowncon.appendChild(option3)
    dropdowncon.classList.add("selectele")
    
    dropdowncon.onchange=(e)=>{
        let option=e.target.value
        completed(option,todonameid,checkboxid,todoid)
    }
    todocontainer.appendChild(dropdowncon)
    let buttonele=document.createElement("button")
    buttonele.textContent="x"
    buttonele.classList.add("delbutton")
    buttonele.onclick=()=>{
        deletetodoitem(todoid)
        // console.log("1st")
    }
    todocontainer.appendChild(buttonele)
    taskcontainer.appendChild(todocontainer);
    count+=1
}
function addtodo() {
    var taskname = document.getElementById("taskname");
   
    let tasks=[]
    for(let ele of list){
        tasks.push(ele.name.toLowerCase())
        // console.log(tasks)
    }
    if (tasks.indexOf(taskname.value.toLowerCase())!==-1){   //if element is not there it returns -1
        
        const reversedlist = list.slice().reverse();
        console.log(reversedlist)
        
        let elementindex = reversedlist.findIndex(function(eachitem) {
            console.log(1)
            if (eachitem.name === taskname.value) {
                console.log("working")
              return true;
            } else {
              return false;
            }
          });
        //   console.log(list[elementindex].completed,1)
        if (reversedlist[elementindex].completed==true){
            console.log("innerfunc")
            create_todoele(taskname.value);
            list.push({name:taskname.value,id:"todo"+JSON.stringify(count),completed:false})
            taskname.value = "";
        }
        else{
            alert("task already exists")
            taskname.value=""
        }

        
    }
    else if(taskname.value==''){
        alert("empty task")
    }
    else{
        create_todoele(taskname.value);
        list.push({name:taskname.value,id:"todo"+JSON.stringify(count),completed:false})
        taskname.value = "";
    }

}

for (let listitem of list){
    create_todoele(listitem.name)
}
function save(){
    localStorage.setItem('list',JSON.stringify(list))
    // console.log(list)
}