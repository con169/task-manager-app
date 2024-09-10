import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  // Fetch tasks from the backend API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:3000/tasks')
      .then(response => {
        setTasks(response.data);  // Update the tasks state with the fetched data
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  // Handle form submission for creating a new task
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the page from refreshing
    if (taskName) {
      axios.post('http://localhost:3000/tasks', { name: taskName })
        .then(response => {
          setTasks([...tasks, response.data]);  // Add the new task to the state
          setTaskName('');  // Clear the input field
        })
        .catch(error => {
          console.error('Error creating task:', error);
        });
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>

      {/* Task Creation Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.name} - {task.completed ? "Completed" : "Incomplete"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
