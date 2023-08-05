import React from 'react';
import { useState } from 'react';
import './style.css';
const dog = require('../assets/dog.jpg');
import gitHubLogo from '../assets/git.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TaskList from '../client/TaskList';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    try {
      const response = await axios.post('/api/user/verifyUser', {
        username: username,
        password: password,
      });
      
      if (response.status === 200) {
        window.location.href = 'http://localhost:3030/dashboard'
      }
    } catch (error) {
      console.log('Error during login');
    }
  }

  return (
    <div className='login'>
      <div className='loginCard'>
        <div className='cardElements'>
          {/* <img src={dog} width='100px' height='100px' alt='Svelte Logo' /> */}
          <h1>Login</h1>
          <form>
            <input
              placeholder='username'
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
            <br />
            <input
              type='password'
              placeholder='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <br />
            {/* <Link to='/dashboard'> */}
            <button
              type='button'
              className='loginButton'
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </button>
            {/* </Link> */}

            <div className='oauthBox'>
              <a className='outhButton'>
                {/* <Link to='/dashboard'> */}
                <button type='button' className='loginButton'>
                  Log in with GitHub
                </button>
                {/* </Link> */}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
