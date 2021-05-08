function onReady() {
    console.log('jquery loaded...keep it simple');
    getTasks();
    setButtonListeners();

    
}

//button listeners
function setButtonListeners() {
    //button to add task
    $('.btn-add').on('click', (event) => {
        console.log('clicked add task button');
    });

    $('#task-content').on('click', '.btn-comp', (event) => {
        console.log('complete button clicked');
    });

    $('#task-content').on('click', '.btn-del', (event) => {
        console.log('delete button clicked');
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

//displays tasks on the DOM
function displayTasks(tasks) {
    console.log(tasks);
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







$(onReady);