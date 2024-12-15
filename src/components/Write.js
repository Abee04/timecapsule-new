import React, { useState } from 'react';
import axios from 'axios';

const Write = () => {
  const [message, setMessage] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are properly filled
    if (!recipientEmail || !message || !scheduledTime) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('YOUR_BACKEND_API_ENDPOINT', {
        senderEmail: 'user@example.com', // Replace with actual logged-in user email
        recipientEmail: recipientEmail,
        message: message,
        scheduledTime: scheduledTime
      });
      console.log('Email sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            placeholder="Recipient's email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Message: </label>
          <textarea
            placeholder="Write your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <label>Scheduled Date and Time: </label>
          <input
            type="datetime-local"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default Write;
