import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPopup from '../LoginPopup'; 
import RegisterPopup from '../RegisterPopup';  

const HomepageNavbar = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  const handleOpenLogin = () => setShowLoginPopup(true);
  const handleCloseLogin = () => setShowLoginPopup(false);
  const handleOpenRegister = () => setShowRegisterPopup(true);
  const handleCloseRegister = () => setShowRegisterPopup(false);

  // Handle opening LoginPopup from RegisterPopup
  const handleRegisterSuccess = () => {
    handleCloseRegister(); // Close the RegisterPopup
    handleOpenLogin(); // Open the LoginPopup
  };

  return (
    <nav>
      <div className="logo">Recipe Haven</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <span onClick={handleOpenLogin} className="nav-item">Login</span>
        <span onClick={handleOpenRegister} className="nav-item">Register</span>
      </div>
      {showLoginPopup && <LoginPopup onClose={handleCloseLogin} />}
      {showRegisterPopup && (
        <RegisterPopup
          onClose={handleCloseRegister}
          onRegisterSuccess={handleRegisterSuccess} // Pass the callback
        />
      )}
    </nav>
  );
}

export default HomepageNavbar;
