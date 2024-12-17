import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import backgroundImage from "../assets/story.jpeg"; // Import the image

const ComposeMail = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [sendTime, setSendTime] = useState("");
  const [message, setMessage] = useState(""); // Tracks the Quill editor's value
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailScheduled, setIsEmailScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipientEmail || !sendDate || !sendTime || !message.trim()) {
      setErrorMessage("Please fill in all fields!");
      return;
    }

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
      const response = await fetch("https://backend--ybri.onrender.com/schedule-email", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setErrorMessage("");
        setScheduledTime(combinedSendDateTime.toLocaleString());
        setIsEmailScheduled(true);
      } else {
        setErrorMessage(result.message || "Error scheduling email.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while scheduling the email.");
    }
  };

  const handleInspireMe = () => {
    // Valid HTML for React Quill
    const inspirationalMessage = `
      <p><strong>Dear Future Me,</strong></p>
      <p>Remember, the journey you are on is worth it.</p>
      <p>Stay strong, stay positive, and always believe in yourself!</p> 
    `;
    setMessage(inspirationalMessage); // Update Quill editor with the message
  };

  return (
    <div
      style={{
        ...styles.pageContainer,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={styles.container}>
        {isEmailScheduled ? (
          <div style={styles.confirmation}>
            <h2>Your email has been scheduled!</h2>
            <p>
              Your email will be sent to <strong>{recipientEmail}</strong> at{" "}
              <strong>{scheduledTime}</strong>.
            </p>
            <p>Thank you for using our service!</p>
          </div>
        ) : (
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

            <label style={styles.label}>Message</label>
            <div style={styles.messageContainer}>
              <ReactQuill
                value={message} // Bind message state to Quill editor
                onChange={setMessage} // Update state on content change
                placeholder="Write your message here..."
                style={styles.editor}
              />
            </div>

            {/* Inspire Me Button */}
            <div style={styles.inspireButtonContainer}>
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
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    color: "#333",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
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
  messageContainer: {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  editor: {
    height: "200px",
    fontSize: "1rem",
    backgroundColor: "#fff",
  },
  inspireButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1rem", // Add space between editor and the button
  },
  inspireButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  submitButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#000",
    color: "#fff",
    fontSize: "1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  errorMessage: {
    marginTop: "1rem",
    color: "red",
    fontSize: "1rem",
  },
  confirmation: {
    textAlign: "center",
    marginTop: "2rem",
    fontSize: "1.2rem",
    color: "#000",
  },
};

export default ComposeMail;
