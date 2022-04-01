import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import WelcomeModal from '../WelcomeModal'
import './Header.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const loginHandle = () => {
    
  }

  let sessionLinks;
  if (sessionUser) { // logged in user
    sessionLinks = (
      <>
        <div>Welcome {sessionUser.username}</div>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else { // logged out or not registered
    sessionLinks = (
      <>
        <button className="login-button">Login</button>
        <button className="signup-button">Sign Up</button>
      </>
    );
  }

  return (
    <div className="header-container">
      <div className="logo-container">
        <span>GW Logo</span>
      </div>
      <nav className="nav-container">
        <div>
          <NavLink exact to="/">MainPageLink</NavLink>
        </div>
        <div>
          {isLoaded && sessionLinks}
        </div>
      </nav>
    </div>
      );
}

export default Navigation;