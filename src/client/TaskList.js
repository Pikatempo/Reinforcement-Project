import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import {
  ActionAnimations,
  SwipeableList,
  SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import TaskItem from './components/TaskItem';
import axios from 'axios';
import TaskSwipeContent from './components/TaskSwipeContent';

import './TaskList.scss';

const TaskList = () => {
  const [contentAnimation, setContentAnimation] = useState(
    ActionAnimations.REMOVE
  );
  const [listAnimations, setListAnimations] = useState(true);

  const loadData = async () => {
    const res = await axios.get('/api/task');

    if (res.status === 200) {
      const data = await res.data;
      return data;
    }
  };

  const [items, setItems] = useState([]);

  useEffect(async () => {
    const tasks = await loadData();
    setItems(tasks);
  }, []);

  const deleteItemById = async (id) => {
    const delData = async (id) => {
      const res = await axios.delete('/api/task/' + id);
      if (res.status === 200) {
        const data = await res.data;
        return data;
      }
    };
    const result = await delData(id);
    if (result === 'success!') {
      setItems((items) => items.filter((item) => item.task_id !== id));
    }
  };

  const postItem = async (task) => {
    const addData = async () => {
      const res = await axios({
        method: 'post',
        url: '/api/task/',
        data: {
          task_name: task.task_name,
          due_date: '2023-12-02T05:00:00.000Z',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        const data = await res.data;
        return data;
      }
    };

    const result = await delData(id);
    if (result === 'success!') {
      setItems((items) => items.filter((item) => item.task_id !== id));
    }
  };

  const addItem = () => {
    setItems([...items, { task_id: -1, task_name: 'New task', isNew: true }]);
  };
  const saveNewItem = (id, task_name, due_date, completed, expired) => {
    setItems(
      items.map((item) =>
        item.task_id === id
          ? { ...item, task_name, due_date, completed, expired, isNew: false }
          : item
      )
    );
  };

  const swipeRightOptions = (id) => ({
    content: <TaskSwipeContent label="Edit" position="left" />,
    actionAnimation: contentAnimation,
    action: () => deleteItemById(id),
  });
  const swipeLeftOptions = (id) => ({
    content: <TaskSwipeContent label="Delete" position="right" />,
    actionAnimation: contentAnimation,
    action: () => deleteItemById(id),
  });
  const handleChangeActionAnimation = ({ target: { value } }) =>
    setContentAnimation(ActionAnimations[value]);

  const handleChangeListAnimations = ({ target: { value } }) =>
    setListAnimations(value === 'true');

  const threshold = 0.33;
  const transitionTimeout = 2500;

  return (
    <>
      <button className="page__button" onClick={addItem}>
        Add task
      </button>
      <span className="page__action--title">
        {/* Swipe to delete (trigger threshold: {threshold}) */}
      </span>
      <div className="animations-swipeable-list__container">
        <SwipeableList threshold={threshold}>
          {({
            className,
            scrollStartThreshold,
            swipeStartThreshold,
            threshold,
          }) => (
            <TransitionGroup
              className={className}
              enter={listAnimations}
              exit={listAnimations}>
              {items.map(({ task_id, task_name, due_date, isNew }) => (
                <CSSTransition
                  classNames="my-node"
                  key={task_id}
                  timeout={transitionTimeout}>
                  <SwipeableListItem
                    key={task_id}
                    scrollStartThreshold={scrollStartThreshold}
                    swipeLeft={swipeLeftOptions(task_id)}
                    swipeRight={swipeRightOptions(task_id)}
                    swipeStartThreshold={swipeStartThreshold}
                    threshold={threshold}>
                    <TaskItem
                      id={task_id}
                      label={task_name}
                      timeLeft={due_date}
                      isEditing={isNew}
                      setFunc={saveNewItem}
                    />
                  </SwipeableListItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
        </SwipeableList>
      </div>

      {/* <div className='animations__switcher-row'>
        <span>Item content animation:</span>
        <select
          className='page__select animations__switcher'
          value={findKey((value) => value === contentAnimation)(
            ActionAnimations
          )}
          onChange={handleChangeActionAnimation}
        >
          {mapEntries((value, key) => (
            <option key={key} value={key}>
              {value.description}
            </option>
          ))(ActionAnimations)}
        </select>
      </div>
      <div>
        <span>List content animations:</span>
        <select
          className='page__select animations__switcher'
          value={listAnimations}
          onChange={handleChangeListAnimations}
        >
          <option value='true'>ON</option>
          <option value='false'>OFF</option>
        </select>
      </div> */}
    </>
  );
};

export default TaskList;
