import React, { useState } from 'react';
import PropTypes from 'prop-types';


import './Task.css';



const Task = ({ id, title, description, isComplete, onUpdateTask, onDeleteItem }) => {
  const [complete, setComplete] = useState(isComplete);
  const [isChecked, setIsChecked] = useState(isComplete);
  const [showDescription, setShowDescription] = useState(false);

  let buttonClass = complete ? 'tasks__item__toggle--completed' : '';

  const toggleIsComplete = () => {
    const updatedTask = {
      id: id,
      title: title,
      isComplete: !complete
    };
    setComplete(!complete);
    setIsChecked(!isChecked);
    onUpdateTask(updatedTask);
    setIsChecked(!isChecked);
  };

  const toggleShowDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="task-container">
      <li className="tasks__item">
        <button className={`tasks__item__toggle ${buttonClass}`}>{title}</button>
        <button className="more button" onClick={(toggleShowDescription)}> + </button>
        <button className="tasks__item__edit button" onClick={toggleIsComplete}>
          <input type="checkbox" name="edit" className="task-checkbox" checked={isChecked} onChange={() => !isChecked}/>
        </button>
        <button className="tasks__item__remove button" onClick={e => onDeleteItem(id)}>x</button>
      </li>
      <li className={showDescription ? 'description' : 'none'}>{showDescription ? description : null}</li>
    </div>
  );
};

Task.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default Task;