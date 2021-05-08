function onReady() {
    console.log('jquery loaded...keep it simple');
    //display tasks
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        displayTasks(response);
    }).catch((error) => {
        console.log('there is a problem with the GET request', error);
    });
}

function displayTasks(tasks) {
    console.log(tasks);
    let btnDel = '<button class="btn-del">Delete</button>';
    let btnComp = '<button class="btn-comp">Complete</button>';
    for (let i=0; i < tasks.length; i++) {
        $('#task-content').append(`
        <tr>
        <td>${tasks[i].task_name}</td>
        <td>${btnComp}</td>
        <td>${btnDel}</td>
        </tr>`);
    }   
}






$(onReady);