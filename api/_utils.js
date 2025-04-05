const axios = require('axios');
const nodemailer = require('nodemailer');
const QRCode = require('qrcode');

// Function to save registration to Google Sheets using Google Apps Script
async function saveToSpreadsheet(registrationData) {
  try {
    console.log('Sending data to Google Apps Script:', JSON.stringify(registrationData));
    console.log('Using URL:', process.env.GOOGLE_SCRIPT_URL);
    
    if (!process.env.GOOGLE_SCRIPT_URL) {
      console.error('GOOGLE_SCRIPT_URL is not defined in environment variables');
      return false;
    }
    
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
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
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

// Get an email transporter
function getEmailTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL || 'noreply.nexhub@gmail.com',
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false // Helps with some Vercel deployment issues
    }
  });
}

// CORS Headers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
}

module.exports = {
  saveToSpreadsheet,
  generateQRCode,
  getEmailTransporter,
  setCorsHeaders
}; 