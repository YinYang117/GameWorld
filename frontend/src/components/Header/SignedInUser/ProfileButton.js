import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';
import './SignedInUser.css'


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => { 
      setShowMenu(false)

     };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className="user-icon-button" onClick={openMenu}> 
        <img className='user-icon' src='/images/user.png' alt="User-icon" />
        {/* <i className="fas fa-user-circle" /> */}
      </button>
        <ul className="profile-dropdown" style={{display: showMenu ? "block" : "none"}}>
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
            <li>Your Name: {user.firstname} {user.lastname}</li>
            <li>Title: {user.title ? user.title : "No title"}</li>
            <li>
              <button className="logout-button" onClick={logout}>Log Out</button>
            </li>
        </ul>
    </>
  );
}

export default ProfileButton;
