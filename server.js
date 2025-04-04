const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const QRCode = require('qrcode');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(bodyParser.json());

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'dist')));

// Function to save registration to Google Sheets using Google Apps Script
async function saveToSpreadsheet(registrationData) {
  try {
    console.log('Sending data to Google Apps Script:', JSON.stringify(registrationData));
    console.log('Using URL:', process.env.GOOGLE_SCRIPT_URL);
    
    // Convert JSON to form-urlencoded which works better with Google Apps Script
    const params = new URLSearchParams();
    params.append('data', JSON.stringify(registrationData));
    
    // Send POST request to Google Apps Script Web App
    const response = await axios({
      method: 'post',
      url: process.env.GOOGLE_SCRIPT_URL,
      data: params.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      maxRedirects: 5, // Allow redirects
    });
    
    console.log('Google Sheets response:', response.data);
    return true;
  } catch (error) {
    console.error('Error saving to spreadsheet:', error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from Google Apps Script');
    }
    return false;
  }
}

// Generate QR code
async function generateQRCode(text) {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error('Error generating QR code:', err);
    return null;
  }
}

// API endpoint for sending emails
app.post('/api/send-registration-email', async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { name, email, phone, organization, eventId, eventName, eventDate, eventTime, eventLocation, additionalInfo } = req.body;
    
    // Validate required fields
    if (!name || !email || !eventName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Create registration ID
    const registrationId = `NEX-${eventId}-${Date.now().toString().slice(-6)}`;
    
    // Generate QR code with registration details
    const qrCodeDataURL = await generateQRCode(JSON.stringify({
      registrationId,
      name,
      eventName,
      eventDate,
      eventTime
    }));
    
    // Save registration to spreadsheet
    const registrationData = {
      registrationId,
      name,
      email,
      phone,
      organization,
      eventId,
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      additionalInfo,
      registrationDate: new Date().toISOString()
    };
    
    try {
      // Try to save to spreadsheet but don't fail the whole request if it doesn't work
      const spreadsheetSaved = await saveToSpreadsheet(registrationData);
      if (!spreadsheetSaved) {
        console.warn('Failed to save to spreadsheet, but will continue with email sending');
      }
    } catch (sheetError) {
      console.error('Error in spreadsheet save (continuing):', sheetError);
    }
    
    try {
      // Configure transporter
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_EMAIL || 'noreply.nexhub@gmail.com',
          pass: process.env.SMTP_PASSWORD,
        },
      });

      // Email content
      const mailOptions = {
        from: `"NexHub Community" <${process.env.SMTP_EMAIL || 'noreply.nexhub@gmail.com'}>`,
        to: email,
        subject: `Registration Confirmation for ${eventName}`,
        html: `
          <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
            <h1>Registration Confirmation</h1>
            <p>Hello ${name},</p>
            <p>Thank you for registering for <strong>${eventName}</strong>. Your registration has been confirmed.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p><strong>Event:</strong> ${eventName}</p>
              <p><strong>Date:</strong> ${eventDate}</p>
              <p><strong>Time:</strong> ${eventTime}</p>
              <p><strong>Location:</strong> ${eventLocation}</p>
              <p><strong>Registration ID:</strong> ${registrationId}</p>
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
              <p><strong>Your QR Code Hall Ticket</strong></p>
              <p>Please present this QR code at the event entrance</p>
              <img src="${qrCodeDataURL}" alt="QR Code" style="width: 200px; height: 200px;"/>
            </div>
            
            <p>We're looking forward to seeing you at the event!</p>
            <p>Best regards,<br>NexHub Community Team</p>
          </div>
        `,
      };

      console.log('Attempting to send email to:', email);
      
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      
      // Success response
      res.status(200).json({ 
        success: true, 
        message: 'Registration confirmation email sent successfully',
        registrationId: registrationId
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      
      // If email fails but we have the registration data, still return success
      // but with a flag indicating email failed
      res.status(200).json({ 
        success: true, 
        emailSent: false,
        message: 'Registration completed but email delivery failed. Please contact support.',
        registrationId: registrationId
      });
    }
  } catch (error) {
    console.error('Error in registration process:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Registration failed. Please try again or contact support.', 
      error: error.message 
    });
  }
});

// Handle all other routes for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 