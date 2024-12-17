import React, { useState } from 'react';
import axios from 'axios';

const ScheduleEmailForm = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendDate, setSendDate] = useState('');
  const [sendTime, setSendTime] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combine sendDate and sendTime into a single ISO string
    const dateTime = `${sendDate}T${sendTime}`;
    
    // Make the request to the backend
    axios.post('/schedule-email', {
      recipient: recipientEmail,
      message: message,
      dateTime: dateTime,
    })
    .then((response) => {
      setSuccessMessage(response.data.message);
      setError('');
    })
    .catch((error) => {
      setError('Failed to schedule email: ' + (error.response ? error.response.data.error : error.message));
      setSuccessMessage('');
    });
  };

  return (
    <div>
      <h2>Schedule Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipientEmail">Recipient Email:</label>
          <input
            type="email"
            id="recipientEmail"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="sendDate">Send Date:</label>
          <input
            type="date"
            id="sendDate"
            value={sendDate}
            onChange={(e) => setSendDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="sendTime">Send Time:</label>
          <input
            type="time"
            id="sendTime"
            value={sendTime}
            onChange={(e) => setSendTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Schedule Email</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default ScheduleEmailForm;
