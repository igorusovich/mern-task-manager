const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find()
  res.json(tasks)
})

// Add a task
router.post('/', async (req, res) => {
  const task = new Task({ title: req.body.title })
  await task.save()
  res.json(task)
})

// Update a task
router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  res.json(task)
})

// Delete a task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.send('Task deleted')
})

module.exports = router
