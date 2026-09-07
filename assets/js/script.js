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
let nextId = JSON.parse(localStorage.getItem('nextId')) || []; // {"0": "000", "1": "454", "3": "218"}

// Utility to save tasks + nextId
function saveState() {
    /*Different functions will update 'tasks' variable, the saveState func 
    will up add nw data to local storage */
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    
    localStorage.setItem('nextId', JSON.stringify(nextId)); // return an object of active notes
                                                            // {0: 123, 1: 265...}
}                                        

// ===== Core Functions (implement these) =====

// TODO: generateTaskId()
// - Return a unique id
// - Increment nextId and persist using saveState()
function generateTaskId() {

    // Group tasks by the hour from when they were recieved
    // Wrk hours  1->9
    // Note #'s (100s 200s i.e 9am 10am)
    // # of notes can not exceed 899

    // Get hour 
    //if current time is outside of 9am-5pm
    //creat a random time between the work hours
    // Work hours: 9am - 5pm 

    //nextID is an object
    //{0: note#, 1: nwNote#}
    let numOfTickets = nextId.length;

    // Your code here
    // new note #
    let ntNum = 0;

    /*last note num should not equal new note num*/
    do{
        ntNum = Math.floor(Math.random() * 900) + 100;

        console.log(ntNum)
    }while(chkIfNtNumEx(ntNum)==true)
    
    //get last ticket index available
    if(numOfTickets===0){
        //Allows to assign 1st ticket
        let lastInd = 1
        nextId[0] = ntNum
    
    }else{
        //A ticket has already been assigned ? <y>/n
        //num of ticket creations needs to increase
        nextId.push(ntNum)
       
    }
   
    saveState();
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
    
    let numOfTickets = nextId.length
    
    // get last num
    console.log(`new ids - ${nextId}`)
    console.log(`last num - ${nextId[numOfTickets-1]}`)

    let isIn = nextId.includes(num);
    
    //go thru numbes in nextId see if 
    //new generated number equals any 
    //number already saved


    return isIn
    // let tickets = nextId.getItem(nextId.key())
    // nextId.getItem(String(nextId.key()))
}




// - Use Day.js to color-code:
//   - If task is not in "done":
//     - Add a warning style if due soon / today
//     - Add an overdue style if past due

function createTaskCard(task) {
    // Your code here
    /*
    Gather details from the new task modal
    */
    let titleField = $('input[id="taskTitle"]').val()
    let tskDueDateField = $('input[id="taskDueDate"]').val()
    let tskDesc = $('textarea[id="taskDescription"]').val()

    //create a new list element with data
    // if taskStatus = todo 
    // put task info in todofield
    $('#todo-cards').append('<ul>')
    let newL = $('#todo-cards ul')
    //console.log($('#todo-cards').children()[0])
    newL.addClass('classCard')



    newL.append(`<li>${titleField}</li>`)
    newL.append(`<li>${tskDueDateField}</li>`)
    newL.append(`<li>${tskDesc}</li>`)

}

//(IMPORTANT IMPORTANT IMPORTANT)
// TODO: renderTaskList()
// - Clear all lane containers (#todo-cards, #in-progress-cards, #done-cards)
// - Loop through tasks array
// - For each task, create a card and append it to the correct lane
// - After rendering, make task cards draggable with jQuery UI
function renderTaskList() {
    // Your code here
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
    createTaskCard("p");

    //close modal
    //$('#taskModal').hide();
    $('#taskModal').style.display = "none"
    //document.activeElement.focus()
}

// TODO: handleDeleteTask(event)
// - Get the task id from the clicked button (data-task-id)
// - Remove that task from tasks array
// - Save and re-render
function handleDeleteTask(event) {
    // Your code here
    localStorage.clear();


}

// TODO: handleDrop(event, ui)
// - Get the task id from the dragged card
// - Determine the new status from the lane's dataset/status or id
// - Update the task's status in the tasks arraydj
// - Save and re-render
function handleDrop(event, ui) {
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

    // Make lanes droppable
    // TODO: configure droppable to accept task cards and use handleDrop
    $('.lane-body').droppable({
        // accept: '.task-card',
        // drop: handleDrop,
    });

    //what is stringify
    


    generateTaskId();
    //chkIfNtNumEx();
    //handleDeleteTask();
    //createTaskCard("p")


});

// NOTE:
// - You are encouraged to use Day.js for ALL date logic.
// - You may adjust “due soon” rules, as long as they’re clearly implemented.
