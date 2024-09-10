import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:3000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName) {
      axios.post('http://localhost:3000/tasks', { name: taskName })
        .then(response => {
          setTasks([...tasks, response.data]);
          setTaskName('');
        })
        .catch(error => {
          console.error('Error creating task:', error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const handleComplete = (id, completed) => {
    axios.patch(`http://localhost:3000/tasks/${id}`, { completed })
      .then(response => {
        const updatedTasks = tasks.map(task =>
          task._id === id ? { ...task, completed: response.data.completed } : task
        );
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  return (
    <div>
      <h1>Task Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.name} - {task.completed ? "Completed" : "Incomplete"}
            <button onClick={() => handleComplete(task._id, !task.completed)}>
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
