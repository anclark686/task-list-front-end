import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';
import NewTaskForm from './components/NewTaskForm.js';

const App = () => {
  const baseUrl = 'http://127.0.0.1:5000/tasks';

  const [taskData, setTaskData] = useState([]);

  const taskDataConvert = (res) => {
    return res.map(taskConvert);
  };

  const taskConvert = (task) => {
    return { ...task, isComplete: task.is_complete};
  };

  const getTaskData = () => {
    axios.get(baseUrl)
    .then(res => {
      setTaskData(taskDataConvert(res.data));
    })
    .catch((err) => console.log(err));
    
  };

  useEffect(() => {
    getTaskData();
  }, []);
  
  const updateTaskData = updatedTaskData => {
    const tasks = taskData.map(task => {
      if (task.id === updatedTaskData.id) {
        return {
          ...task,
          isComplete: updateTaskData.isComplete,
        }; 
      }
      return task;
    });
    setTaskData(tasks);

    let completeOrIncomplete = updatedTaskData.isComplete;

    if (completeOrIncomplete) {
      axios
        .patch(`${baseUrl}/${updatedTaskData.id}/mark_complete`)
        .then((res) => console.log('Back end response', res.data))
        .catch((err) => console.log(err));
    } else {
      axios
        .patch(`${baseUrl}/${updatedTaskData.id}/mark_incomplete`)
        .then((res) => console.log('Back end response', res.data))
        .catch((err) => console.log(err));
    }
  };

  const onDeleteItem = id => {
    // this was surprisingly close to what I had!
    setTaskData((prev) => prev.filter((task) => task.id !== id));

    axios
      .delete(`${baseUrl}/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const addNewTaskData = newTask => {
    const newTaskList = [...taskData];
    
    newTaskList.push({
      title: newTask.title,
      description: newTask.description,
      isComplete: newTask.isComplete
    });
    setTaskData(newTaskList);
  };

  const handleSubmit = newTask => {
    axios.post(baseUrl, newTask)
    .then(res => {
      setTaskData([taskConvert(res.data.task), ...taskData]);
    })
    .catch(err => console.log(err));
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main className='container'>
        <div>
          <TaskList 
            tasks={taskData} 
            onUpdateTask={updateTaskData} 
            onDeleteItem={onDeleteItem}
          />
        </div>
        <div>
        <NewTaskForm
          addNewTaskData={addNewTaskData} 
          handleSubmit={handleSubmit}
        />
        </div>
      </main>
    </div>
  );
};

export default App;
