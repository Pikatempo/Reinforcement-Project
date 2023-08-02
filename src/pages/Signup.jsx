import React from 'react';
import './style.css';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submitProfile(e) {
    await axios.post('/api/user/signup/', {
      name: name,
      username: username,
      password: password,
    });
    window.location.reload();
  }
  return (
    <div className='signup'>
      <div className='loginCard'>
        <div className='cardElements'>
          <h1>SignUp</h1>
          <form>
            <input
              placeholder='username'
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
            <br />
            <input
              placeholder='name'
              onChange={(e) => {
                setName(e.target.value);
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
            <button
              type='button'
              className='loginButton'
              onClick={(e) => submitProfile(e)}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
