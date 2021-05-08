const express = require('express');
const taskRouter = require('./routes/taskRouter.js');

const app = express();
app.use(express.urlencoded({extended: true}));

app.use('/tasks', taskRouter);

// Serve back static files by default
app.use(express.static('server/public'))

// Start listening for requests on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});