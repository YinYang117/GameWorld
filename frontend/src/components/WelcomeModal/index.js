import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import "./WelcomeModal.css"

function LoginFormModal() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowLoginModal(true)}>Log In</button>
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm />
        </Modal>
      )}
      <button onClick={() => setShowSignupModal(true)}>Sign up</button>
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;