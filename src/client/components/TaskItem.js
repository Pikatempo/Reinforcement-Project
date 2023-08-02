import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './TaskItem.scss';

const TaskItem = ({ id, label, timeLeft, isEditing, setFunc }) => {
  const [newValue, setNewValue] = useState(label);
  const [due_date, setDue_date] = useState(label);
  const [completed, setCompleted] = useState(label);
  const [expired, setExpired] = useState(label);

  return (
    <div id={id} className="Task-List__item">
      <div className="row">
        <div className="column">
          <div className="Task-Title-Column">
            {isEditing ? (
              <>
                <input
                  onChange={(e) => {
                    return setNewValue(e.target.value);
                  }}
                  type="text"
                  value={newValue}
                />
                <button
                  onClick={() =>
                    setFunc(id, newValue, due_date, completed, expired)
                  }
                  className="save-button">
                  Save
                </button>
              </>
            ) : (
              label
            )}
          </div>
        </div>
        <div className="column">
          <div className="Time-Left-Column">
            {moment(timeLeft).endOf('day').fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  label: PropTypes.string,
};

export default TaskItem;
