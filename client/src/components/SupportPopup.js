import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Adjust the path as necessary
import { getToken } from '../utils'; // Import the getToken utility function
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SupportPopup.css'; // Import the CSS file

const SupportPopup = ({ onClose }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { authData, setAuthData } = useContext(AuthContext); // Get authData from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check if the authentication token is present in the context
    if (!authData.token) {
      // Retrieve token from localStorage if not available in context
      const tokenFromLocalStorage = getToken();
      if (tokenFromLocalStorage) {
        setAuthData(prevData => ({ ...prevData, token: tokenFromLocalStorage }));
      } else {
        console.error('No authentication token found.');
      }
    }
  }, [authData.token, setAuthData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure user is authenticated
    if (!authData.token) {
      alert('User not authenticated.');
      return;
    }

    try {
      // Submit the support ticket
      await axios.post('https://recipe-app-0i3m.onrender.com/support/tickets', 
        { subject, message }, 
        {
          headers: {
            Authorization: `Bearer ${authData.token}` // Attach the JWT token
          }
        }
      );
      alert('Support ticket submitted successfully!');
      // Clear the form fields after submission
      setSubject('');
      setMessage('');
      if (onClose) onClose(); // Call onClose to close the popup
      navigate('/recipes'); // Redirect to RecipesPage
    } catch (error) {
      console.error('Error submitting support ticket:', error);

      if (error.response) {
        // Display specific error message from server response if available
        switch (error.response.status) {
          case 400:
            alert('Please provide both subject and message.');
            break;
          case 404:
            alert('User not found.');
            break;
          default:
            alert('There was an error submitting your support ticket.');
        }
      } else {
        // Handle network errors
        alert('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="support-popup">
      <h2>Support</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SupportPopup;
