import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import backgroundImage from '../assets/Story.jpg'; 

// Custom Toolbar for Quill Editor
const CustomToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <button className="ql-image" title="Add Image"></button>
    </span>
  </div>
);

const ComposeMail = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [sendTime, setSendTime] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailScheduled, setIsEmailScheduled] = useState(false); // Track whether the email is scheduled
  const [scheduledTime, setScheduledTime] = useState(""); // Store scheduled time

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

    const formData = new FormData();
    formData.append("recipient", recipientEmail);
    formData.append("subject", "Your Future Email");
    formData.append("body", message);
    formData.append("sendDate", sendDate);
    formData.append("sendTime", sendTime);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:5000/schedule-email", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setErrorMessage(""); // Clear any previous error messages
        setScheduledTime(combinedSendDateTime.toLocaleString()); // Set the scheduled time
        setIsEmailScheduled(true); // Show confirmation message
      } else {
        setErrorMessage(result.message || "Error scheduling email.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while scheduling the email.");
    }
  };

  const handleInspireMe = () => {
    setMessage(
      "<p><strong>Dear Future Me,</strong></p><p>Remember, you are capable of achieving great things!</p>"
    );
  };

  return (
    <div style={styles.container}>
      {isEmailScheduled ? (
        // If the email is successfully scheduled, show a confirmation message
        <div style={styles.confirmation}>
          <h2>Your email has been scheduled!</h2>
          <p>
            Your email will be sent to <strong>{recipientEmail}</strong> at{" "}
            <strong>{scheduledTime}</strong>.
          </p>
          <p>Thank you for using our service!</p>
        </div>
      ) : (
        // If email is not yet scheduled, show the form
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>Your Future Message</h2>

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

          <div style={styles.editorContainer}>
            <label style={styles.label}>Message</label>
            <CustomToolbar />
            <ReactQuill
              value={message}
              onChange={setMessage}
              placeholder="Write your message here..."
              style={styles.editor}
            />
            <button
              type="button"
              onClick={handleInspireMe}
              style={styles.inspireButton}
            >
              Inspire Me!
            </button>
          </div>

          {/* Image Upload */}
          <div style={styles.field}>
            <label style={styles.label}>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Schedule Email
          </button>

          {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url(${backgroundImage})`,  // Apply background image to the container
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensure the container takes up the full viewport height
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#333',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    textAlign: 'left',
    marginTop: '1rem',
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
  editorContainer: {
    position: 'relative',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '20px',
  },
  editor: {
    height: '150px',
    fontSize: '1rem',
  },
  inspireButton: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
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
    position: 'fixed', // Cover the entire viewport
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(background)', // Add the background image
    backgroundSize: 'cover', // Make the image cover the entire screen
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white', // Text color
    fontSize: '1.2rem',
    padding: '2rem',
    zIndex: 9999, // Ensure it stays on top
  }
  
}


export default ComposeMail;
