const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//endpoints

router.post('/', (req, res) => {
    //route to a new task
    console.log(req.body);
    // console.log(req.params);
    
    let task = req.body;
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
    console.log('get tasks here');
    const queryText = `SELECT * FROM "tasks";`;
    pool.query(queryText)
    .then((result) => {
        console.log(result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('Something went wrong', error);
        res.sendStatus(500);
    })
});


//export router to be mounted in server.js
module.exports = router;