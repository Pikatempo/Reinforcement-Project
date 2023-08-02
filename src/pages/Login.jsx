import React from 'react';
import './style.css';
const dog = require('../assets/dog.jpg');
import gitHubLogo from '../assets/git.png';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='login'>
      <div className='loginCard'>
        <div className='cardElements'>
          {/* <img src={dog} width='100px' height='100px' alt='Svelte Logo' /> */}
          <h1>Login</h1>
          <form>
            <input placeholder='username'></input>
            <br />
            <input type='password' placeholder='password'></input>
            <br />
            <Link to='/dashboard'>
              <button className='loginButton'>Login</button>
            </Link>

            <div className='oauthBox'>
              <a className='outhButton'>
                <Link to='/dashboard'>
                  <button className='loginButton'>Log in with GitHub</button>
                </Link>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
