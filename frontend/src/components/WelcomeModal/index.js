import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import "./WelcomeModal.css"

function WelcomeModal() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
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
    </>
  );
}

export default WelcomeModal;