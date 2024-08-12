import React, { useState } from 'react';
import './CustomerSupport.css';

const CustomerSupport = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState(''); // To show success or error messages

  const handleSubmit = (event) => {
    event.preventDefault();

    // Retrieve JWT token from storage (if you're storing it there)
    const jwtToken = localStorage.getItem('jwt_token');

    // Send data to the server
    fetch('http://127.0.0.1:5000/support/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`, // Add JWT token for authentication
      },
      body: JSON.stringify({
        subject: subject, // Include subject
        message: message,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit support ticket');
        }
        return response.json();
      })
      .then((data) => {
        setResponseMessage('Support ticket submitted successfully!');
        // Clear the form fields after submission
        setSubject(''); // Clear subject
        setMessage('');
      })
      .catch((error) => {
        setResponseMessage(`Error: ${error.message}`);
      });
  };

  return (
    <div className="customer-support">
      <h2>Contact Customer Support</h2>
      {responseMessage && <p>{responseMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
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
