import React from 'react';
import './style.css';
const dog = require('../assets/dog.jpg');
const gitHubLogo = require('../assets/github.svg');

const Login = () => {
  return (
    <div className='login'>
      <img src={dog} width='100px' height='100px' alt='Svelte Logo' />
      <h1>Login</h1>
      <form>
        <input placeholder='username'></input>
        <br />
        <input type='password' placeholder='password'></input>
        <br />
        <button className='loginButton'>Login</button>

        <div className='oauthBox'>
          <a className='outhButton'>
            <button className='loginButton'>
              Log in with GitHub
              <img src={gitHubLogo} alt='gitHub Logo' />
            </button>
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
