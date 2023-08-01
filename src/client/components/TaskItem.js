import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './TaskItem.scss';

const TaskItem = ({ label, timeLeft }) => (
  <div className="Task-List__item">
    <div className="row">
      <div className="column">
        <div className="Task-Title-Column">{label}</div>
      </div>
      <div className="column">
        <div className="Time-Left-Column">
          {moment(timeLeft).endOf('day').fromNow()}
        </div>
      </div>
    </div>
  </div>
);

TaskItem.propTypes = {
  label: PropTypes.string,
};

export default TaskItem;
