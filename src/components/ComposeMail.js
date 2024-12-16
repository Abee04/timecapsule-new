import React, { useState } from "react";

// Custom Toolbar for Quill Editor (Removed, as we no longer use ReactQuill)
const CustomToolbar = () => (
  <div id="toolbar">
    {/* This part can be removed, as it is no longer needed */}
  </div>
);

const ComposeMail = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [sendTime, setSendTime] = useState("");
  const [message, setMessage] = useState("");
  const [scheduledTime, setScheduledTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipientEmail || !sendDate || !sendTime || !message.trim()) {
      setErrorMessage("Please fill in all fields!");
      return;
    }

    // Combine date and time into a Date object
    const combinedSendDateTime = new Date(`${sendDate}T${sendTime}:00`);

    if (combinedSendDateTime <= new Date()) {
      setErrorMessage("Scheduled time must be in the future!");
      return;
    }

    try {
      // Make POST request to backend API
      const response = await fetch("http://localhost:5000/schedule-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: recipientEmail,
          subject: "Your Future Email",
          body: message,
          sendDate: sendDate,
          sendTime: sendTime,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setScheduledTime(combinedSendDateTime);
        setErrorMessage("");  // Clear any previous error messages
        alert(`Email scheduled to ${recipientEmail} at ${combinedSendDateTime.toLocaleString()}`);
      } else {
        setErrorMessage(result.message || "Error scheduling email.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while scheduling the email.");
    }

    // Clear form after submission
    setRecipientEmail("");
    setSendDate("");
    setSendTime("");
    setMessage("");
  };

  const handleInspireMe = () => {
    setMessage(
      "Dear Future Me, Remember, you are capable of achieving great things!"
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Future Message</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Recipient Email */}
        <div style={styles.field}>
          <label style={styles.label}>Recipient Email</label>
          <input
            type="email"
            placeholder="Enter recipient's email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {/* Date */}
        <div style={styles.field}>
          <label style={styles.label}>Send Date</label>
          <input
            type="date"
            value={sendDate}
            onChange={(e) => setSendDate(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {/* Time */}
        <div style={styles.field}>
          <label style={styles.label}>Send Time</label>
          <input
            type="time"
            value={sendTime}
            onChange={(e) => setSendTime(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {/* Message (Plain Text) */}
        <div style={styles.field}>
          <label style={styles.label}>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            style={styles.input}
            required
          />
          <button
            type="button"
            onClick={handleInspireMe}
            style={styles.inspireButton}
          >
            Inspire Me!
          </button>
        </div>

        {/* Submit */}
        <button type="submit" style={styles.submitButton}>
          Schedule Email
        </button>
      </form>

      {/* Error Message */}
      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

      {/* Confirmation */}
      {scheduledTime && (
        <div style={styles.confirmation}>
          Your email is scheduled for:{" "}
          <strong>{scheduledTime.toLocaleString()}</strong>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    textAlign: 'left',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  inspireButton: {
    padding: '0.5rem 1rem',
    background: 'transparent',
    border: '1px solid #000',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#000',
  },
  submitButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  errorMessage: {
    marginTop: '1rem',
    color: 'red',
    fontSize: '1rem',
  },
  confirmation: {
    marginTop: '1rem',
    fontSize: '1.1rem',
    color: '#28a745',
  },
};

export default ComposeMail;
