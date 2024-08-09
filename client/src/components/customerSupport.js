import React, { useState } from 'react';
import './CustomerSupport.css'; 

const CustomerSupport = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send data to the server)
    console.log('User:', username);
    console.log('Message:', message);

    // Clear the form fields after submission
    setUsername('');
    setMessage('');
  };

  return (
    <div className="customer-support">
      <h2>Contact Customer Support</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomerSupport;
