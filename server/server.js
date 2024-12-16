const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const emailQueue = []; // Temporary array to store scheduled emails

// Endpoint to schedule an email
app.post("/schedule-email", (req, res) => {
  const { recipient, subject, body, sendDate, sendTime } = req.body;

  // Validate inputs
  if (!recipient || !sendDate || !sendTime || !body) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Combine the date and time into a full Date object
  const sendDateTime = new Date(`${sendDate}T${sendTime}:00`);
  
  // Check if the scheduled time is in the future
  if (sendDateTime <= new Date()) {
    return res.status(400).json({ message: "Scheduled time must be in the future!" });
  }

  // Add email to the queue for sending later
  emailQueue.push({ recipient, subject, body, sendDateTime });
  res.status(200).json({ message: "Email scheduled successfully" });
});

// Function to send emails using Nodemailer
const sendEmail = (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tmadhumitha24@gmail.com",       // Replace with your email
      pass: "xwnf ghxe irzj zrtc",       // Use Gmail App Password
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com", // Replace with your email
    to: email.recipient,
    subject: email.subject || "Scheduled Email",
    text: email.body, // Plain text body for the email
  };

  // Send the email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// Cron job to send emails at the correct time
cron.schedule("* * * * *", () => {
  const now = new Date();

  // Loop through the queue and check for emails to send
  emailQueue.forEach((email, index) => {
    if (email.sendDateTime <= now) {
      sendEmail(email); // Send the email
      emailQueue.splice(index, 1); // Remove sent email from the queue
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
