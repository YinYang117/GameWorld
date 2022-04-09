import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WelcomeModal from './WelcomeModal'
import SignedInUser from './SignedInUser'
import './Header.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  if (sessionUser) {sessionLinks = (<SignedInUser />)} 
  else sessionLinks = ( <WelcomeModal /> );

  return (
    <div className="header-container">
      <div className="logo-container">
        <img className="logo-gameworld" src="/images/joystick.png" alt="GameWorld Icon" />
      </div>
      <nav className="nav-container">
        <NavLink className="home-link" to="/"><i className="fa-solid fa-house" >Home</i></NavLink>
        <div>
          {sessionLinks}
        </div>
      </nav>
    </div>
      );
}

export default Navigation;