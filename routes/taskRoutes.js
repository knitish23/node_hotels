const express = require('express');
const router = express.Router();
const taskRouter = require('./../models/Task')

// POST /api/tasks - Create a new task
router.post('/', async (req, res) => {
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
  
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  })

  //GET /api/tasks to retrieve a list of all tasks from the database
  router.get('/', async (req, res) => {
    try {
      const task = await Task.find();
      res.status(200).send(task);
    } catch (error) {
      res.status(500).send(error);
    }
  
  })

  module.exports=router;