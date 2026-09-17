// 02-Challenge: Task Board (Unsolved Starter)
//
// Use this file to implement:
// - Task creation
// - Task rendering
// - Drag-and-drop across columns
// - Color-coding by due date using Day.js
// - Persistence with localStorage

// ===== State & Initialization =====




// Load tasks and nextId from localStorage (or use defaults)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let idArray = JSON.parse(localStorage.getItem('nextId')) || []; // {"0": "000", "1": "454", "3": "218"}
let nxtNt = []
let rnCounter = 0

let currentlyAdding = false

idArray.forEach((note) => {
    nxtNt.push(note)
    rnCounter++
});

// Utility to save tasks + nextId
function saveState() {
    /*Different functions will update 'tasks' variable, the saveState func 
    will up add nw data to local storage */
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    
    localStorage.setItem('nextId', JSON.stringify(idArray)); // return an object of active notes
                                                            // {0: 123, 1: 265...}
}                                        

// ===== Core Functions (implement these) =====

// TODO: generateTaskId()
// - Return a unique id
// - Increment nextId and persist using saveState()
function generateTaskId(t) {

    // Group tasks by the hour from when they were recieved
    // Wrk hours  1->9
    // Note #'s (100s 200s i.e 9am 10am)
    // # of notes can not exceed 899

    // Get hour 
    //if current time is outside of 9am-5pm
    //creat a random time between the work hours
    // Work hours: 9am - 5pm 
    if(t){
        const ind = tasks.indexOf(t)
        return idArray[ind]
    }

  
    

    //nextID is an object
    //{0: note#, 1: nwNote#}
    let numOfTickets = idArray.length;


    //Dont create an ntNum or append to idArray



    // Your code here
    // new note #
    let ntNum = 0;

    /*last note num should not equal new note num*/
    do{
        ntNum = Math.floor(Math.random() * 900) + 100;

        console.log(ntNum)
    }while(chkIfNtNumEx(ntNum)==true)
    
    let tArray = []
    if(t){
        tArray = [t.title, t.timestamp, t.desc]
    }else{
        tArray = ["", "", ""]
    }
    

        
    const isTicketThere = function(taskArray){
        taskArray.every((td) => {
            td!="";
            td!=undefined;
            
        })

        return taskArray
    }





    
    //get last ticket index available
    if(numOfTickets===0){
        //Allows to assign 1st ticket
        let lastInd = 1
        idArray[0] = numOfTickets+1
        
    
    }else if(t==undefined && currentlyAdding==true){
        //A ticket has already been assigned ? <y>/n
        //num of ticket creations needs to increase
        //console.log("I pushed")
        idArray.push(numOfTickets+1)
      
       
    }else if(t!=undefined && currentlyAdding==false){
        // return t.
        
        //Leave idArray alone

    }
    

    t.noteNum = "Note# " + String(idArray[numOfTickets]); 
    return idArray[numOfTickets];
    // //let ticketIndex = 0;
    // let oldNtNum = 
    // let newNoteRec = {
    //     lastInd : noteNumber
    // }
                   
    

}
// TODO: createTaskCard(task)
// - Return a jQuery element representing a task card
// - Include:
//   - Title
//   - Description
//   - Due date
//   - Delete button
// - Add a data-task-id attribute for later lookups

function chkIfNtNumEx(num){
    
    let numOfTickets = idArray.length ? idArray.length-1: ""
    //console.log(numOfTickets)
    // get last num
    //console.log(`new ids - ${idArray}`)
    //console.log(`last num - ${idArray[numofTickets ? numOfTickets-1: ""]}`)

    let isIn = idArray.includes(num);
    
    //go thru numbes in idArray see if 
    //new generated number equals any 
    //number already saved


    return isIn
    // let tickets = idArray.getItem(nextId.key())
    // idArray.getItem(String(nextId.key()))
}

function clearForm(){
    $('input[id="taskTitle"]').val('')
    $('input[id="taskDueDate"]').val('')
    $('textarea[id="taskDescription"]').val('')
}

function appendCards(taskInMemory){
    

    let $newL;
    let $todoCard;
    let tsk = {
        title: "",
        timestamp: "",
        desc: "",
        noteNum: ""
    }


    
        const $divCard = $('<div>', {
        // id:    `note-${idArray.length+1}`, // needs to be a variable
        // id:'todo-ul-list',
        class: 'card ',
        width: '18rem',
        'data-taskState': ''
        
  });


    //create a new list element with data
    // if taskStatus = todo 
    // put task info in todofield
    // $('#todo-cards').append('<ul>')

   //if num of tickets idArray.length > 0
   //create a div element that will hold 
   //the note information of the 

    let noteIDclass = `note-${idArray.length ? String(idArray.length) : "0" }`
    //console.log(noteIDclass)
    // if(idArray.length<1 || localStorage.length==0){    
    //     console.log("empty")
    //     $newL = $('<div>', {
    //         id:    `note-${idArray.length+1}`, // needs to be a variable
    //         class: 'card ',
    //         width: '18rem',
    //     });
    // }else{
    //     console.log("something is here")
    //     let clLookup = "#"+noteIDclass
    //     $newL = $(clLookup)
    //     //We'll need to append to this element in
    //     //the function below
    // }
    

   
  
    //$('#lane-todo').disableSelection();
    // console.log(noteIDclass)
    // console.log($newL)
    //console.log($('#todo-cards').children()[0])
    //console.log(newL.html())
    

    


    //This div-card will hold the note
    //will need to differentiate the cards so
    //that the createTaskCard method will not append
    //to a ul that already has content
    //let idCounter = 0       ...idCounter++

  
    const $divCdHeader = $('<div>', { 
        class: 'crd-header'
  });

    const $divBody = $('<div>', {
       
        class: 'card-body',
    });

    let titleField = $('input[id="taskTitle"]').val()
    let tskDueDateField = $('input[id="taskDueDate"]').val()
    let tskDesc = $('#taskDescription').val()
    let ntHeader = ""


    //Getting same note # or creating a new note #
    let ccounter =0;
    if(taskInMemory){
        tasks.forEach(function(){
            // let x = y.values()
            if(taskInMemory.notenumber==tasks[ccounter].notenumber){
                tsk.title = taskInMemory.notenumber
            }

            // rnConter = x.indexOf(taskInMemory);
            // ntHeader = "Note #" + rnCounter
            ccounter++
        });
        // let ccounter = 0;
        // tasks.forEach(function(ttask){
        //     if(ttask==tasks[ccounter].notenumber)
        //     ccounter++
        // })
     
        
        //tsk.title = taskInMemory.titleField;
        tsk.timestamp = taskInMemory.tskDueDateField;
        tsk.desc = taskInMemory.tskDesc;

    }else{
        ntHeader = "Note #" + rnCounter;
        tsk.title = ntHeader;
        tsk.timestamp = tskDueDateField;
        tsk.desc = tskDesc;
       
    }



   




    //let ntHeader = "Note #" + generateTaskId(taskInMemory);
    $divCdHeader.append(`<h5 class="card-title" style="width: fit-content">${tsk.title}</h5>`)
    $divCdHeader.append(`<h6 class="card-subtitle mb-2 text-muted card-datetime">${tsk.timestamp}</h6>`)
    

    $divBody.append($divCdHeader)
    $divBody.append(`<p class="card-text ">${tsk.desc}</p>`)
    $divCard.append($divBody)
    return $divCard
    
}



// - Use Day.js to color-code:
//   - If task is not in "done":
//     - Add a warning style if due soon / today
//     - Add an overdue style if past due

function createTaskCard(task) {
    //clearForm()
    // Your code here
    /*
    Gather details from the new task modal
    */
   let chk = idArray.length;
    let titleField; 
    let tskDueDateField;
    let tskDesc;
    let $cardToShow;
    let notenumber;

    $newL = $('<li>', {
        id:    `note-${idArray.length+1}`, // needs to be a variable
        // id:'todo-ul-list',
        class: 'card ',
        width: '18rem',
        style: 'margin-top: 10px',
        
    });



    //represents a object that contains
    //{title: "", timestamp: "", desc: ""...}   
    //console.log(`task - ${task.keys}`)

    if(task){   

        titleField = task.title
        tskDueDateField = task.timestamp
        tskDesc = task.desc

        $cardToShow = appendCards(task)



        if(titleField && tskDueDateField && tskDesc){
            console.log("refresh")// site is refreshing
        }
        
    }else{
        
        titleField = $('input[id="taskTitle"]').val()
        tskDueDateField = $('input[id="taskDueDate"]').val()
        tskDesc = $('#taskDescription').val()
        notenumber = "Note# " + String(chk+1)


        $cardToShow = appendCards()
    }


    
    //saveState() was ran earlier in method
    //array in lc storage has gained

    $todoCard = $('#todo-list');
    $progressCard = $('#prg-list');
    $doneCard = $('#dne-list');
   
    
    if(task==undefined && currentlyAdding==true){  // Creating first note after delting or starting
        //grab to do card
        let todoState = "Todo"
        idArray.push(rnCounter)
        //console.log('first')
        $newL.append($cardToShow)
        $todoCard.append($newL)
    
        tasks.push({titleField, tskDueDateField, tskDesc, notenumber, taskState: todoState})
    }else if(task!=undefined && currentlyAdding!=true){   // refreshing 
        //console.log('second')+
        let targetNumber = task.notenumber.split("#")[1]

        // go thru ul find this child
        //$('')
        let targetChild;
        let verfiedState = task.taskState

        $newL.append($cardToShow)
        // $newL.insertAfter($('#todo-cards ul'))
        //$todoCard.append($newL)
        //tasks.push(tsk)
        //idArray.push(rnCounter)

        switch(verfiedState){
            case "Todo":
                $todoCard.append($newL)
                break;
            case "InProgress":
                             
                $progressCard.append($newL)
                break;
            case "Done":
                $doneCard.append($newL)
                break;
        }

        
    }else{
        
    }
    $todoCard.append($newL)
    
    //newL.append(`<li>${titleField}</li>`)
    // newL.append(`<li>${tskDueDateField}</li>`)
    // newL.append(`<li>${tskDesc}</li>`)
    // console.log()
    // console.log(`tasks - ${JSON.stringify(tasks)}`)
    saveState();
    clearForm()


}

//(IMPORTANT IMPORTANT IMPORTANT)
// TODO: renderTaskList()
// - Clear all lane containers (#todo-cards, #in-progress-cards, #done-cards)
// - Loop through tasks array
// - For each task, create a card and append it to the correct lane
// - After rendering, make task cards draggable with jQuery UI
function renderTaskList() {
    // Your code here
    let rndrAmt = idArray.length;
   

    //add tenary that will determine if rncounter should increase
    //const ifTicMd = rnCounter===idArray.length ? 
   //createTaskCard()
        console.log(`rnCounter - ${rnCounter}, idArrayLen - ${idArray.length}`)
        //Get all stored tasks
        for(let xx=0; xx<rndrAmt; xx++){
            //console.log(tasks[xx])
            
            //  console.log("end")
            createTaskCard(tasks[xx])

        }
     
}

// TODO: handleAddTask(event)
// - Prevent default form submission (no refresh)
// - Read values from #taskTitle, #taskDescription, #taskDueDate
// - Validate: if missing, you can show a message or just return

// - Create a new task object with:
//   - id from generateTaskId() (object?) string
//   - title, description, dueDate
//   - status: 'to-do'
// - Push to tasks array, save, re-render
// - Reset the form and close the modal (just clr it)
function handleAddTask(event) {
    // Your code here
    //last focus = document.activeElement
    event.preventDefault();
    
     rnCounter++
    currentlyAdding = true
    //createTaskCard({title: "Note #711", timestamp: "2026-09-11", desc: "This is a test"});
    createTaskCard();




    //close modal
    //$('#taskModal').hide();
    
    //document.activeElement.focus()
}

// TODO: handleDeleteTask(event)./;/
// - Get the task id from the clicked button (data-task-id)
// - Remove that task from tasks array
// - Save and re-render
function handleDeleteTask(event) {
    // Your code here
    rnCounter = 0
    localStorage.clear();
    

}

// TODO: handleDrop(event, ui)
// - Get the task id from the dragged card
// - Determine the new status from the lane's dataset/status or id
// - Update the task's status in the tasks array
// - Save and re-render
function handleDrop(event, ui) {

    let targetEl = event.target

    console.log(targetEl.getAttribute('taskState'))

    // Your code here
}

// ===== Document Ready =====

$(function () {
    // Show current date in header using Day.js
    $('#ent-date').text(dayjs().format('[Today:] dddd, MMM D, YYYY'));

    // Initialize datepicker for due date
    // Hint: keep format consistent and use it in your parsing
    $('#taskDueDate').datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: 0,
    });

    // Render tasks on load (will do nothing until you implement renderTaskList)
    renderTaskList();

    // Form submit handler
    $('#taskForm').on('submit', handleAddTask);

    console.log("main running")
    
    //$('.classCard').draggable();
    
    $('#resetButton').on('click', handleDeleteTask)
    
    // Make lanes droppable
    // TODO: configure droppable to accept task cards and use handleDrop
    $('.connectedSortable').sortable({
        connectWith: ".connectedSortable",
       // accept: '.card-body',
        drop: handleDrop,
        placeholder: "ui-state-highlight",
        
        //grid: [5, 5],
    }).disableSelection();

    $("#prg-list").on("sortreceive", function(event, ui) {
        let targetEl = event.target
        console.log(targetEl.children[0].children[0])
        //targetEl.attr('data-taskState', 'InProgress')
       //renderTaskList()
    });

    //generateTaskId();
    //chkIfNtNumEx();
    //handleDeleteTask();
    //createTaskCard("p")


});

// NOTE:
// - You are encouraged to use Day.js for ALL date logic.
// - You may adjust “due soon” rules, as long as they’re clearly implemented.
