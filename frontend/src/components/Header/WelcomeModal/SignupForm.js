import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import "./WelcomeModal.css";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  // const [preSubErrState, setpreSubErrState] = useState({});
  
  // useEffect(()=> {
  //   const preSubErr = {};
  //   if (username.length >= 3 && username.length <= 60) delete preSubErr['username']
  //   else if (username.length < 3) preSubErr['username'] = "Username is too short"
  //   else if (username.length > 60) preSubErr['username'] = "Username is too long"
  //   if (email.length >= 6 && email.length <= 256) delete preSubErr['email']
  //   else if (email.length < 3) preSubErr['email'] = "Email is too short"
  //   else if (email.length > 60) preSubErr['email'] = "Email is too long"
  //   if (firstName.length >= 2 && firstName.length <= 60) delete preSubErr['firstName']
  //   else if (firstName.length < 2) preSubErr['firstName'] = "First name is too short"
  //   else if (firstName.length > 60) preSubErr['firstName'] = "First name is too long"
  //   if (lastName.length >= 2 && lastName.length <= 100) delete preSubErr['lastName']
  //   else if (lastName.length < 2) preSubErr['lastName'] = "Last name is too short"
  //   else if (lastName.length > 100) preSubErr['lastName'] = "Last name is too long"
  //   if (title.length === 0) delete preSubErr['lastName']
  //   else if (title.length >= 3 && title.length <= 30) delete preSubErr['lastName']
  //   else if (lastName.length < 3) preSubErr['lastName'] = "Last name is too short"
  //   else if (lastName.length > 60) preSubErr['lastName'] = "Last name is too long"
  //   if (password !== confirmPassword) preSubErr['password'] = "Password field must match Confirmed Password"
  //   if (password !== confirmPassword) delete preSubErr['password']
  //   setpreSubErrState(preSubErr)

  // },[email,username,firstName,lastName,title,password,confirmPassword])

  // useEffect(() => {
  //   setpreSubErrState(preSubErr)
  // },[preSubErr])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const newUser = {};
      newUser.username = username;
      newUser.firstname = firstName;
      newUser.lastname = lastName;
      newUser.email = email;
      if (title) newUser.title = title
      newUser.password = password;

      return dispatch(sessionActions.signup(newUser))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Password must match Confirm Password']);
  };

  return (
    <div className="welcome-modal" >
      <h3 className="welcome-div" >Welcome new friend!</h3>
      <div className="welcome-div" >To the ultimate site for discovering new game worlds</div>
      <form className="welcome-form" onSubmit={handleSubmit}>
        <div className="labels-inputs">
          <label>Email</label>
          <input
              className="form-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
          />
        </div>
        <div className="labels-inputs">
          <label>Username</label>
          <input
            className="form-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
          />
        </div>
        <div className="labels-inputs">
          <label>First Name</label>
          <input
            className="form-input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
          />
        </div>
        <div className="labels-inputs">
          <label>Last Name</label>
          <input
            className="form-input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
          />
        </div>
        <div className="labels-inputs">
          <label>Title</label>
          <input
          className="form-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title: CEO / Owner / Etc"
          />
        </div>
        <div className="labels-inputs">
          <label>Password</label>
          <input
          className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="labels-inputs">
          <label>Confirm Password</label>
          <input
          className="new-user-form-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <ul className="errors-list">
          {/* {preSubErrState.length > 0 && Object.values(preSubErrState).map((preError, idx) => <li key={idx}>{preError}</li>)} */}
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="d-flex">
          <button className="signup-button" type="submit">Sign Up</button>
          {/* ^ disabled={Object.keys(preSubErr).length > 0} */}
        </div>
          {/* <button className="cancel-button" onClick={() => (false)}>Cancel</button> */}

      </form>
    </div>
  );
}

export default SignupForm;