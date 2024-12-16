import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import timeImage from '../assets/time1.jpg'; // Ensure this path is correct

const Write = () => {
  const location = useLocation();
  const { message } = location.state || {}; // Retrieve any message passed from another component

  const [recipientEmail, setRecipientEmail] = useState('');
  const [sendDate, setSendDate] = useState('');
  const [sendTime, setSendTime] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!recipientEmail || !sendDate || !sendTime) {
      alert('Please fill out all fields!');
      return;
    }

    const combinedSendDate = new Date(`${sendDate}T${sendTime}:00`);

    if (combinedSendDate <= new Date()) {
      alert('Send date and time must be in the future.');
      return;
    }

    setIsLoading(true); // Start loading indicator

    try {
      // Send data to the backend
      const response = await axios.post('http://localhost:5000/schedule-email', {
        recipient: recipientEmail,
        message: message || 'Default message content', // Use default message if not provided
        dateTime: combinedSendDate.toISOString(),
      });

      alert(response.data.message); // Show success message
      setRecipientEmail('');
      setSendDate('');
      setSendTime('');
    } catch (error) {
      console.error('Error scheduling email:', error);
      alert(`Failed to schedule email: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={{ ...styles.background, backgroundImage: `url(${timeImage})` }}></div>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Get Started</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="recipient-email">Recipient's Email</label>
            <input
              id="recipient-email"
              type="email"
              placeholder="Enter recipient's email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              required
              style={styles.input}
              aria-label="Recipient's Email"
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="send-date">Send Date</label>
            <input
              id="send-date"
              type="date"
              value={sendDate}
              onChange={(e) => setSendDate(e.target.value)}
              required
              style={styles.input}
              aria-label="Send Date"
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="send-time">Send Time</label>
            <input
              id="send-time"
              type="time"
              value={sendTime}
              onChange={(e) => setSendTime(e.target.value)}
              required
              style={styles.input}
              aria-label="Send Time"
            />
          </div>
          <button
            type="submit"
            style={{ ...styles.button, backgroundColor: isLoading ? '#ccc' : '#000' }}
            aria-label="Schedule Letter"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? 'Scheduling...' : 'Schedule Letter'}
          </button>
        </form>
      </div>
    </div>
  );
};

// CSS-in-JS styles
const styles = {
  pageContainer: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(10px)', // Make the background less distracting
    zIndex: -1,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slight transparency for better contrast
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    zIndex: 1,
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    fontWeight: '600',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  field: {
    textAlign: 'left',
  },
  label: {
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: '#444',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '0.75rem',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Write;
