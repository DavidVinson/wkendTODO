function onReady() {
    console.log('jquery loaded...keep it simple');
    getTasks();
    setButtonListeners(); 
}


//button listeners
function setButtonListeners() {
    //button adds task via POST
    $('.btn-add').on('click', addTask);
        
    //button sets task complete via PUT
    $('#task-content').on('click', '.btn-comp', (event) => {
        console.log('complete button clicked');
        completeTask(event);
    });

    //button deletes task via DELETE
    $('#task-content').on('click', '.btn-del', (event) => {
        console.log('delete button clicked');
        deleteTask(event);
    });
}


//POST call
function addTask() {
    console.log('clicked add task button');
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            task_name: $('#task-name').val()
        }
    }).then((response) => {
        // console.log(response);
        clearFields();
        getTasks()
    }).catch((error) => {
        console.log('There was a problem with adding a task', error);
    }); 
}


//GET call
function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        displayTasks(response);
    }).catch((error) => {
        console.log('there is a problem with the GET request', error);
    });
}


//PUT call
function completeTask(event) {
    let taskid = event.target.dataset.id;
    // console.log(taskid);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskid}`,
    }).then((response) => {
        // console.log(response);
        clearFields();
        getTasks()
    }).catch((error) => {
        console.log('There was a problem with completing task', error);
    }); 
}


function deleteTask(event) {
    let taskid = event.target.dataset.id;
    console.log(`task ${taskid} was removed`);
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskid}`,
    }).then((response) => {
        // console.log(response);
        clearFields();
        getTasks()
    }).catch((error) => {
        console.log('There was a problem with deleting task', error);
    }); 
}


//displays tasks on the DOM
function displayTasks(tasks) {
    console.log(tasks);
    $('#task-content').empty();
    for (let i=0; i < tasks.length; i++) {
        //make buttons to complete and delete a task
        let btnDel = `<button class="btn-del" data-id=${tasks[i].id}>Delete</button>`;
        let btnComp = `<button class="btn-comp" data-id=${tasks[i].id}>Complete</button>`;
    
        $('#task-content').append(`
        <tr>
        <td>${tasks[i].task_name}</td>
        <td>${btnComp}</td>
        <td>${btnDel}</td>
        </tr>`);
    }   
}


//clears fields on the DOM
function clearFields() {
    console.log('fields are clear');
    $('#task-name').val('');
}


$(onReady);