const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//endpoints

router.post('/', (req, res) => {
    //route to a new task
    console.log(req.body);
    // console.log(req.params);
    
    let task = req.body;
    // let taskid = req.params.id;
    let queryText = `INSERT INTO "tasks" ("task_name")
    VALUES ($1);`;
    pool.query(queryText, [task.task_name])
    .then((result) => {
        console.log(result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`the error: ${error}`);
        res.sendStatus(500);
    })
});

router.get('/', (req, res) => {
    // console.log('get tasks here');
    const queryText = `SELECT * FROM "tasks" ORDER BY "isComp" DESC, "completed_at" DESC;`;
    pool.query(queryText)
    .then((result) => {
        // console.log(result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('Something went wrong', error);
        res.sendStatus(500);
    })
});

router.put('/:id', (req, res) => {
    //route to a update a task
    //expected object:  { id: '4' }
    // console.log(req.body);
    console.log(req.params);
    
    // let task = req.body;
    let taskid = req.params.id;
    let queryText = `UPDATE "tasks" SET "isComp"=TRUE, "completed_at"=CURRENT_TIMESTAMP
    WHERE "id"=$1;`;
    pool.query(queryText, [taskid])
    .then((result) => {
        // console.log(result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`the error: ${error}`);
        res.sendStatus(500);
    })
});

router.delete('/:id', (req, res) => {
    //route to delete a task
    //expected object:  { id: '4' }
    // console.log(req.body);
    console.log(req.params);
    
    // let task = req.body;
    let taskid = req.params.id;
    let queryText = `DELETE FROM "tasks" WHERE "id"=$1;`;
    pool.query(queryText, [taskid])
    .then((result) => {
        // console.log(result);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`the error: ${error}`);
        res.sendStatus(500);
    })
});





//export router to be mounted in server.js
module.exports = router;