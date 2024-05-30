const express = require('express')
const app = express()
const db = require('./db')


const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const Task = require('./models/Task')

app.get('/', function (req, res) {
  res.send('Welcome to our Hotels')
})

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const taskRoutes = require('./routes/taskRoutes');

// use the router
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);
app.use('/api/task', taskRoutes);
app.listen(3000, () => {
  console.log("Listing on port 3000");
})