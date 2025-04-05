const { saveToSpreadsheet, getEmailTransporter, setCorsHeaders } = require('./_utils');

export default async function handler(req, res) {
  // Set CORS headers
  setCorsHeaders(res);
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  
  try {
    console.log('Recruitment application received:', req.body);
    const { fullName, email, phone, portfolio, role, experience, message } = req.body;
    
    // Validate required fields
    if (!fullName || !email || !role) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Create application ID
    const applicationId = `NEX-APP-${Date.now().toString().slice(-6)}`;
    
    // Save application to spreadsheet
    const applicationData = {
      applicationId,
      fullName,
      email,
      phone,
      portfolio,
      role,
      experience,
      message,
      applicationDate: new Date().toISOString(),
      status: 'Pending Review'
    };
    
    try {
      // Try to save to spreadsheet
      const spreadsheetSaved = await saveToSpreadsheet(applicationData);
      if (!spreadsheetSaved) {
        console.warn('Failed to save to spreadsheet, but will continue with confirmation email');
      }
    } catch (sheetError) {
      console.error('Error in spreadsheet save (continuing):', sheetError);
    }
    
    try {
      // Get transporter
      const transporter = getEmailTransporter();

      // Applicant confirmation email
      const applicantMailOptions = {
        from: `"NexHub Community" <${process.env.SMTP_EMAIL || 'noreply.nexhub@gmail.com'}>`,
        to: email,
        subject: `Application Confirmation - NexHub Team`,
        html: `
          <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
            <h1>Application Received</h1>
            <p>Hello ${fullName},</p>
            <p>Thank you for applying to join the NexHub team as a <strong>${role}</strong>. We've received your application.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p><strong>Application ID:</strong> ${applicationId}</p>
              <p><strong>Role:</strong> ${role}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <p>Our team will review your application and get back to you soon. If you have any questions, please feel free to contact us.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>This is an automated email. Please do not reply.</p>
              <p>© NexHub Community. All rights reserved.</p>
            </div>
          </div>
        `
      };

      // Team notification email (optional, can be enabled if needed)
      const teamMailOptions = {
        from: `"NexHub Applications" <${process.env.SMTP_EMAIL || 'noreply.nexhub@gmail.com'}>`,
        to: process.env.TEAM_EMAIL || process.env.SMTP_EMAIL || 'noreply.nexhub@gmail.com',
        subject: `New Team Application: ${role}`,
        html: `
          <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
            <h1>New Team Application</h1>
            <p>A new application has been submitted for the ${role} position.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Portfolio:</strong> ${portfolio || 'Not provided'}</p>
              <p><strong>Role:</strong> ${role}</p>
              <p><strong>Experience:</strong> ${experience}</p>
              <p><strong>Message:</strong> ${message}</p>
              <p><strong>Application ID:</strong> ${applicationId}</p>
            </div>
          </div>
        `
      };

      // Send the confirmation email to applicant
      const applicantInfo = await transporter.sendMail(applicantMailOptions);
      console.log('Applicant confirmation email sent:', applicantInfo.messageId);
      
      // Optionally send notification to team (uncomment if needed)
      /*
      const teamInfo = await transporter.sendMail(teamMailOptions);
      console.log('Team notification email sent:', teamInfo.messageId);
      */
      
      // Return success response
      return res.status(200).json({
        success: true,
        message: 'Application submitted successfully',
        applicationId,
        emailSent: true
      });
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // If email fails but we saved to spreadsheet, return partial success
      return res.status(200).json({
        success: true,
        message: 'Application submitted but confirmation email failed',
        applicationId,
        emailSent: false,
        emailError: emailError.message
      });
    }
  } catch (error) {
    console.error('Recruitment application error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing application',
      error: error.message
    });
  }
} 