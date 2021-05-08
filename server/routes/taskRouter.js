const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//endpoints

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