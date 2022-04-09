import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { login } from '../../../store/session';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import "./WelcomeModal.css";

function WelcomeModal() {
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const loginDemo = () => {
    dispatch(login({ credential: 'Demo-lition', password: 'oien' }))
  }

  return (
    <>
      <button className="nav-item" onClick={() => setShowLoginModal(true)}>Log In</button>
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm />
        </Modal>
      )}
      <button className="nav-item" onClick={() => setShowSignupModal(true)}>Sign up</button>
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <SignupForm />
        </Modal>
      )}
      <button className="nav-item" onClick={() => loginDemo()}>Demo User</button>
    </>
  );
}

export default WelcomeModal;