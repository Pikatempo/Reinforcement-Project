import React from 'react';
import './style.css';

const Signup = () => {
  return (
    <div className='signup'>
      <div className='loginCard'>
        <div className='cardElements'>
        <h1>SignUp</h1>
          <form>
            <input placeholder='username'></input>
            <br />
            <input placeholder='name'></input>
            <br />
            <input type='password' placeholder='password'></input>
            <br />
            <button className='loginButton'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
