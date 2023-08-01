import React from 'react';
import PropTypes from 'prop-types';

import './TaskSwipeContent.scss';

const TaskSwipeContent = ({ label, position }) => (
  <div className={`TaskSwipe__item-content-${position}`}>
    <span>{label}</span>
  </div>
);

TaskSwipeContent.propTypes = {
  label: PropTypes.string,
  position: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default TaskSwipeContent;
