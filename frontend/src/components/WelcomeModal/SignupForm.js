import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-modal" >
      <h3 className="welcome-div" >Welcome new friend!</h3>
      <div className="welcome-div" >To the ultimate site for discovering new game worlds</div>
      <form className="signup-form" onSubmit={handleSubmit}>
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
          className="form-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="sec-qs">
          <label>Your Custom Security Question</label>
        </div>
        <div className="sec-qs">
        <input
          className="form-input"
            type="security-question"
            value={securityQuestion}
            onChange={(e) => setSecurityQuestion(e.target.value)}
            placeholder="Fav Color / High School"
          />
        </div>
        <div className="sec-qs">
          <label>Security Question Answer</label>
        </div>
        <div className="sec-qs">
        <input
          className="form-input"
            type="security-question-answer"
            value={securityQuestionAnswer}
            onChange={(e) => setSecurityQuestionAnswer(e.target.value)}
            placeholder="CaSe SeNsiTive Answer"
          />
        </div>
        <button type="submit">Sign Up</button>
        <ul className="errors-list">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </form>
    </div>
  );
}

export default SignupForm;