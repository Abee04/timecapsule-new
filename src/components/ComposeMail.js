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

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Ensure all fields are populated
  if (!recipientEmail || !sendDate || !sendTime || !message.trim()) {
    alert("Please fill in all fields!");
    return;
  }

  // Format sendDate as YYYY-MM-DD (it already is, so no change here)
  const formattedDate = sendDate;  // The input type="date" provides YYYY-MM-DD format

  // Ensure sendTime is in HH:mm format (this should already be the case with input type="time")
  const formattedTime = sendTime;  // Directly use the sendTime value

  // Combine date and time into a single Date object
  const combinedSendDateTime = new Date(`${formattedDate}T${formattedTime}`);

  // Check if the scheduled time is in the future
  if (combinedSendDateTime <= new Date()) {
    alert("Scheduled time must be in the future!");
    return;
  }

  // Debugging: Log the data being sent to the backend
  console.log({
    recipientEmail: recipientEmail,
    subject: "Future Mail", // You can adjust the subject here
    message: message,
    sendDate: formattedDate,  // Send the formatted date
    sendTime: formattedTime,  // Send the formatted time
  });

  try {
    const response = await fetch("/schedule-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipientEmail: recipientEmail,
        subject: "Future Mail",
        message: message,
        sendDate: formattedDate,
        sendTime: formattedTime,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(`Email scheduled successfully to ${recipientEmail} at ${combinedSendDateTime.toLocaleString()}`);
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error scheduling email:", error);
    alert("Failed to schedule the email. Please try again.");
  }
};


  const handleInspireMe = () => {
    setMessage(
      "<p><strong>Dear Future Me,</strong></p><p>Remember, you are capable of achieving great things!</p>"
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Future Mail</h2>
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
        <label style={styles.label}>Message</label>
        <div style={styles.editorContainer}>
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
    padding: "2rem",
    maxWidth: "800px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    textAlign: "left",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  editorContainer: {
    position: "relative",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
  },
  editor: {
    height: "200px",
    fontSize: "1rem",
  },
  inspireButton: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    padding: "0.5rem 1rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  submitButton: {
    padding: "1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  confirmation: {
    marginTop: "1.5rem",
    fontSize: "1.2rem",
    color: "#333",
  },
};

export default ComposeMail;
