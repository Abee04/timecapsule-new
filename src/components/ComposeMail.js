import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Custom Toolbar for Quill Editor
const CustomToolbar = () => (
  <div id="toolbar">
    {/* Headings */}
    <span className="ql-formats">
      <select className="ql-header" defaultValue="">
        <option value="">Normal</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
      </select>
    </span>
    {/* Font Families */}
    <span className="ql-formats">
      <select className="ql-font" defaultValue="">
        <option value="sans-serif">Sans Serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
      </select>
    </span>
    {/* Formatting */}
    <span className="ql-formats">
      <button className="ql-bold" title="Bold"></button>
      <button className="ql-italic" title="Italic"></button>
      <button className="ql-underline" title="Underline"></button>
    </span>
    {/* Lists */}
    <span className="ql-formats">
      <button className="ql-list" value="ordered" title="Ordered List"></button>
      <button className="ql-list" value="bullet" title="Bullet List"></button>
    </span>
    {/* Alignment */}
    <span className="ql-formats">
      <select className="ql-align" defaultValue="">
        <option value=""></option>
        <option value="center">Center</option>
        <option value="right">Right</option>
        <option value="justify">Justify</option>
      </select>
    </span>
    {/* Color */}
    <span className="ql-formats">
      <select className="ql-color" title="Text Color"></select>
      <select className="ql-background" title="Background Color"></select>
    </span>
    {/* Link & Image */}
    <span className="ql-formats">
      <button className="ql-link" title="Add Link"></button>
      <button className="ql-image" title="Add Image"></button>
    </span>
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
      "<p><strong>Dear Future Me,</strong></p><p>Remember, you are capable of achieving great things!</p>"
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

        {/* Message */}
        <div style={styles.editorContainer}>
          <label style={styles.label}>Message</label>
          <CustomToolbar />
          <ReactQuill
            value={message}
            onChange={setMessage}
            modules={ComposeMail.modules}
            formats={ComposeMail.formats}
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

// Quill Modules & Formats
ComposeMail.modules = {
  toolbar: { container: "#toolbar" },
};

ComposeMail.formats = [
  "header",
  "font",
  "bold",
  "italic",
  "underline",
  "list",
  "align",
  "color",
  "background",
  "link",
  "image",
];

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
  editorContainer: {
    position: 'relative',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
  },
  editor: {
    height: '200px',
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
    marginTop: '1rem',
    fontSize: '1.1rem',
    color: '#28a745',
  },
};

export default ComposeMail;
