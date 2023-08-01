import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import {
  ActionAnimations,
  SwipeableList,
  SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { findKey, mapEntries } from '@sandstreamdev/std/object';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../store/taskState.js';
import TaskItem from './components/TaskItem';
import axios from 'axios';
import TaskSwipeContent from './components/TaskSwipeContent';

import './TaskList.scss';

const TaskList = () => {
  const dispatch = useDispatch();
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

  const deleteItemById = (id) =>
    setItems((items) => items.filter((item) => item.id !== id));

  const addItem = () =>
    setItems([...items, { id: uuidv4(), text: 'New task' }]);

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
              {items.map(({ task_id, task_name }) => (
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
                    <TaskItem label={task_name} />
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
