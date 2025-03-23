import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  // Fetch tasks
  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks').then(res => setTasks(res.data))
  }, [])

  // Add task
  const addTask = () => {
    if (!title.trim()) return
    axios
      .post('http://localhost:5000/api/tasks', { title })
      .then(res => setTasks([...tasks, res.data]))
    setTitle('')
  }

  // Toggle task completion
  const toggleTask = (id, completed) => {
    axios
      .put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed })
      .then(res =>
        setTasks(tasks.map(task => (task._id === id ? res.data : task)))
      )
  }

  // Delete task
  const deleteTask = id => {
    axios
      .delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
  }

  // Handle Enter key press
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="task-form">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className="task-item">
            <input
              required
              type="checkbox"
              className="task-checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task._id, task.completed)}
            />
            <span
              className={`task-title ${task.completed ? 'task-completed' : ''}`}
            >
              {task.title}
            </span>
            <button className="delete-btn" onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
