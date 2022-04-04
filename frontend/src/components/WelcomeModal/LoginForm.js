import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return ( <Redirect to="/" /> );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className="welcome-modal">
      <h2 className="welcome-div" >Welcome Back!</h2>
      <div className="welcome-div" >Log in here so that you can dive deeper into your favorite Game World</div>
      <form className="welcome-form" onSubmit={handleSubmit}>
        <div className="labels-inputs">  
          <label> Username or Email </label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="credential"
            required
          />
        </div>
        <div className="labels-inputs">  
          <label> Password </label>
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
          />
        </div>
        <ul className="errors-list">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;