import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import './TaskList.css';

const TaskList = ({ tasks, onUpdateTask, onDeleteItem }) => {
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          isComplete={task.isComplete}
          onUpdateTask={onUpdateTask}
          onDeleteItem={onDeleteItem}
        />
      );
    });
  };
  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool,
    })
  ).isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired
};

export default TaskList;
