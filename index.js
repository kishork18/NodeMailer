const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors'); // Import the 'cors' middleware


const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON data
app.use(bodyParser.json());

app.use(cors());


// Serve the HTML form (you can add this part if needed)

// Handle POST request for sending emails
app.post('/send-email', async (req, res) => {
    const { email, contact, message } = req.body;

    // Create a transporter with your email SMTP settings
    const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., 'Gmail'
        auth: {
            user: 'kishorkamble589@gmail.com',
            pass: process.env.gmail_api_key, // Replace with the actual password
        },
    });

    // Email data
    const mailOptions = {
        from: email, // Use the sender's email address
        to: 'kishorkamble589@gmail.com', // Replace with your recipient's email
        subject: 'Contact Form Submission',
        text: `Email: ${email}\nContact: ${contact}\nMessage: ${message}`,
    };

    try {
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
