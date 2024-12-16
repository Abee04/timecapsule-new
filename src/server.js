const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

const app = express();
app.use(bodyParser.json());

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service provider (e.g., Gmail, Outlook)
  auth: {
    user: "your_email@gmail.com", // Replace with your email
    pass: "your_email_password", // Replace with your email password or app password
  },
});

// Endpoint to Schedule an Email
app.post("/schedule-email", (req, res) => {
  const { recipientEmail, subject, message, sendDate, sendTime } = req.body;

  // Validate Request
  if (!recipientEmail || !subject || !message || !sendDate || !sendTime) {
    return res.status(400).json({ error: "Please provide all required fields!" });
  }

  // Combine Date and Time
  const scheduleDate = new Date(`${sendDate}T${sendTime}`);
  if (scheduleDate <= new Date()) {
    return res.status(400).json({ error: "Scheduled time must be in the future!" });
  }

  // Schedule the Email
  schedule.scheduleJob(scheduleDate, () => {
    transporter.sendMail(
      {
        from: "your_email@gmail.com", // Replace with your email
        to: recipientEmail,
        subject: subject,
        html: message,
      },
      (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent successfully:", info.response);
        }
      }
    );
  });

  res.status(200).json({
    message: `Email scheduled to ${recipientEmail} at ${scheduleDate.toLocaleString()}`,
  });
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
