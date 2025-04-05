/**
 * Google Apps Script to save NexHub Community data to Google Sheets
 * This script should be deployed as a web app in Google Apps Script
 * 
 * To set up:
 * 1. Create a new Google Sheet with two tabs/sheets:
 *    - "EventRegistrations" - for event registration data
 *    - "TeamApplications" - for recruitment/join team data
 * 
 * 2. Go to script.google.com and create a new project
 * 3. Paste this script into the editor
 * 4. Update the SPREADSHEET_ID with your Google Sheet ID
 * 5. Deploy as a web app, setting access to "Anyone, even anonymous"
 * 6. Copy the web app URL and set it as GOOGLE_SCRIPT_URL in your .env file
 */

// Your Google Sheet ID - replace with your actual spreadsheet ID
// It's the long string in the URL of your Google Sheet
// Example: https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_SHEET_ID/edit
const SPREADSHEET_ID = '1U4B3AIFOGobQexp1g1-r1Au-QI0PPoTScWmWRz35s8k';

// Sheet names
const EVENT_REGISTRATIONS_SHEET = 'EventRegistrations';
const TEAM_APPLICATIONS_SHEET = 'TeamApplications';

/**
 * Main entry point for the web app
 * Receives data via POST request and saves it to the appropriate sheet
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.parameter.data);
    console.log('Received data:', data);
    
    // Determine the sheet to save to ebased on dataType flag
    if (data.dataType === 'recruitment') {
      saveTeamApplication(data);
    } else {
      saveEventRegistration(data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error('Error processing request:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error: ' + error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Save event registration data to the EventRegistrations sheet
 */
function saveEventRegistration(data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(EVENT_REGISTRATIONS_SHEET);
  
  // Define headers if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Registration ID',
      'Name',
      'Email',
      'Phone',
      'Organization',
      'Event ID',
      'Event Name',
      'Event Date',
      'Event Time',
      'Event Location',
      'Additional Info',
      'Registration Date',
      'Timestamp'
    ]);
  }
  
  // Append the registration data
  sheet.appendRow([
    data.registrationId,
    data.name,
    data.email,
    data.phone || '',
    data.organization || '',
    data.eventId,
    data.eventName,
    data.eventDate,
    data.eventTime,
    data.eventLocation,
    data.additionalInfo || '',
    data.registrationDate,
    new Date().toISOString()
  ]);
}

/**
 * Save team application data to the TeamApplications sheet
 */
function saveTeamApplication(data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(TEAM_APPLICATIONS_SHEET);
  
  // Define headers if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Application ID',
      'Full Name',
      'Email',
      'Phone',
      'Portfolio/GitHub Link',
      'Role',
      'Experience',
      'Message',
      'Application Date',
      'Status',
      'Timestamp'
    ]);
  }
  
  // Append the application data
  sheet.appendRow([
    data.applicationId,
    data.fullName,
    data.email,
    data.phone,
    data.portfolioLink,
    data.role,
    data.experience,
    data.message,
    data.applicationDate,
    data.status,
    new Date().toISOString()
  ]);
}

/**
 * Test function to verify the script is working
 * Can be run directly from the Apps Script editor
 */
function testSaveEventRegistration() {
  const testData = {
    registrationId: 'TEST-101',
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    organization: 'Test Org',
    eventId: '1',
    eventName: 'Test Event',
    eventDate: '2024-06-01',
    eventTime: '14:00-16:00',
    eventLocation: 'Online',
    additionalInfo: 'This is a test',
    registrationDate: new Date().toISOString()
  };
  
  saveEventRegistration(testData);
  console.log('Test event registration data saved');
}

/**
 * Test function to verify team application saving
 */
function testSaveTeamApplication() {
  const testData = {
    applicationId: 'NX-TEAM-123456',
    fullName: 'Test Applicant',
    email: 'applicant@example.com',
    phone: '9876543210',
    portfolioLink: 'https://github.com/testuser',
    role: 'Developer',
    experience: 'Intermediate',
    message: 'I would love to join the team because...',
    applicationDate: new Date().toISOString(),
    status: 'Pending Review',
    dataType: 'recruitment'
  };
  
  saveTeamApplication(testData);
  console.log('Test team application data saved');
}

/**
 * Simple GET handler for testing the deployment
 */
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'NexHub Community Data API is running'
  })).setMimeType(ContentService.MimeType.JSON);
} 