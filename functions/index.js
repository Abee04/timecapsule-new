const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configure your static sender email
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email provider
  auth: {
    user: 'abinayadev04@gmail.com', // your email
    pass: '#2017anjuabhi', // or use app password if 2FA is enabled
  },
});

// Firebase function to send email
exports.scheduleEmail = functions.https.onRequest((req, res) => {
  const { recipientEmail, sendDate, sendTime, message } = req.body;

  if (!recipientEmail || !sendDate || !sendTime || !message) {
    return res.status(400).send('All fields are required');
  }

  const sendDateTime = new Date(`${sendDate}T${sendTime}:00`);

  if (sendDateTime <= new Date()) {
    return res.status(400).send('Scheduled time must be in the future');
  }

  // Schedule the email
  const emailData = {
    from: 'abinayadev04@gmail.com',
    to: recipientEmail,
    subject: 'Scheduled Email',
    html: message,
  };

  // Use setTimeout to schedule email at the specific time
  const delay = sendDateTime.getTime() - Date.now();

  setTimeout(() => {
    transporter.sendMail(emailData, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email scheduled successfully');
      }
    });
  }, delay);

  res.status(200).send(`Email scheduled to send at ${sendDateTime.toLocaleString()}`);
});
