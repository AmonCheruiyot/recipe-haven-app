import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://recipe-app-0i3m.onrender.com/login', { 
        username: email,
        password 
      });

      // Extract necessary data from the response
      const { identity, access_token, is_admin } = response.data;

      // Save token, user data, and is_admin status in auth context and localStorage
      setAuthData({ user: identity, token: access_token, isAdmin: is_admin });
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('is_admin', is_admin);

      alert('Login successful!');
      setEmail('');
      setPassword('');
      onClose();

      // Redirect based on admin status
      if (is_admin) {
        navigate("/admin");  // Redirect to admin page
      } else {
        navigate("/recipes");  // Redirect to recipes page
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed, please check your credentials and try again.');
    }
  };

  return (
    <div className="login-popup">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default LoginPopup;
