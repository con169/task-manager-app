import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend API
  useEffect(() => {
    axios.get('http://localhost:3000/tasks')
      .then(response => {
        setTasks(response.data);  // Update the tasks state with the fetched data
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
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
