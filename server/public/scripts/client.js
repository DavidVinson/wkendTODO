function onReady() {
    console.log('jquery loaded...keep it simple');
    getTasks();
    setButtonListeners(); 
}


//button listeners
function setButtonListeners() {
    //button adds task via POST
    $('.btn-add').on('click', (event) => {
        fieldValidation();
    });

    //button sets task complete via PUT
    $('#task-content').on('click', '.btn-comp', (event) => {
        console.log('complete button clicked');
        // $(event.target).closest('tr').addClass('green');
        completeTask(event);
    });

    //button deletes task via DELETE
    $('#task-content').on('click', '.btn-del', (event) => {
        console.log('delete button clicked');
        deleteTask(event);
    });
}


//validate user input
function fieldValidation(event) {
    if (!$('#task-name').val()) {
        console.log('empty field');
        $('#task-name').addClass('red-border');
    }
    else {
        addTask();
        clearFields();
        $('#task-name').removeClass('red-border');
    }
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
        displayCount(response);
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
        getTasks();
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
        getTasks();
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
        let rowStatus = '';
        if (tasks[i].isComp) {
            rowStatus = 'table-success'; //bootstrap class
        }
        else {
            rowStatus = 'table-secondary'; //bootstrap class
        }

        //append to the DOM
        $('#task-content').append(`
        <tr class="${rowStatus} .col-md-4">
        <td>${tasks[i].task_name}</td>
        <td>${btnComp}</td>
        <td>${btnDel}</td>
        </tr>`);
    }   
}


//display counters
function displayCount(tasks) {
    //tasks = [ {task}, {task} ]
    // console.log(tasks);
    $('.count-content span').empty();
    let compCnt = 0;
    let readyCnt = 0;
    let totalCnt = tasks.length;
    
    for (let i=0; i < tasks.length; i++) {
        //check for count of completed tasks
        if (tasks[i].isComp) {
            compCnt += 1;
            totalCnt -= 1;
        }
        else {
            readyCnt += 1;
        }
    }
    if (totalCnt === 0) {
        $('#total-count').text(`WINNER`).removeClass('circle-border');
    }
    else {
        //update the counts to the DOM
        $('#total-count').text(`${totalCnt}`).addClass('circle-border');
        //the below could be used for additiona count info
        // $('#ready-count').text(`${readyCnt}`).addClass('circle-border');
        // $('#comp-count').text(`${compCnt}`).addClass('circle-border');
    }
}


//clears fields on the DOM
function clearFields() {
    console.log('fields are clear');
    $('#task-name').val('');
}


$(onReady);