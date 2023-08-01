import React from 'react';
import PropTypes from 'prop-types';

import './TaskItem.scss';

const TaskItem = ({ label, timeLeft }) => (
  <div className='Task-List__item'>
    <div className='row'>
      <div className='column'>
        <div className='Task-Title-Column'>{label}</div>
      </div>
      <div className='column'>
        <div className='Time-Left-Column'>Time Left</div>
      </div>
    </div>
  </div>
);

TaskItem.propTypes = {
  label: PropTypes.string,
};

export default TaskItem;
