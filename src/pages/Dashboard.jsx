import React from 'react';
import TaskList from '../client/TaskList';

const Dashboard = () => {

  // console.log(sessionStorage.getItem('info'))
  return (
    <div>
      <h1>Dashboard Page</h1>
      <TaskList/>
    </div>
  );
};

export default Dashboard;