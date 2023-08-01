import React from 'react';
import PropTypes from 'prop-types';

import './TaskItem.scss';

const TaskItem = ({ label }) => (
  <div className='Task-List__item'>
    <span>{label}</span>
  </div>
);

TaskItem.propTypes = {
  label: PropTypes.string,
};

export default TaskItem;
