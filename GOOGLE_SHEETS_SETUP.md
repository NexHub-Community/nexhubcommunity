# Setting Up Google Sheets Integration for NexHub Community

This guide will help you set up Google Sheets integration to store both event registration data and team application data from your NexHub Community website.

## Prerequisites

- A Google account
- Access to Google Drive and Google Sheets
- Basic understanding of Google Apps Script

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Rename the spreadsheet to "NexHub Community Data" (or any name you prefer)
3. Create two sheets (tabs) in the spreadsheet:
   - Rename "Sheet1" to "EventRegistrations"
   - Create a new sheet named "TeamApplications"

## Step 2: Set Up Google Apps Script

1. While in your spreadsheet, click on "Extensions" > "Apps Script"
2. This will open the Google Apps Script editor in a new tab
3. Delete any code in the editor and paste the entire contents of the `google-apps-script.js` file from this repository
4. Update the `SPREADSHEET_ID` variable with your Google Sheet ID
   - You can find this ID in the URL of your spreadsheet: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit`

## Step 3: Test the Script

1. In the Apps Script editor, click on the "Select function" dropdown near the play button
2. Select `testSaveEventRegistration` and click the play button to run it
3. Accept any permissions that are requested
4. Check your EventRegistrations sheet to see if test data was added
5. Similarly, run the `testSaveTeamApplication` function and check the TeamApplications sheet

## Step 4: Deploy as a Web App

1. In the Apps Script editor, click on "Deploy" > "New deployment"
2. Select "Web app" as the deployment type
3. Configure the deployment:
   - Description: "NexHub Community Data API"
   - Execute as: "Me"
   - Who has access: "Anyone, even anonymous"
4. Click "Deploy"
5. Copy the Web URL that is generated (you'll need this for your application's .env file)

## Step 5: Update Environment Variables

1. Open the `.env` file in your NexHub Community application
2. Update the `GOOGLE_SCRIPT_URL` variable with the Web URL you copied in the previous step:
   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/your-deployment-id/exec

   
   https://script.google.com/macros/s/AKfycbww9skEbqpukn3O8WagJHfAOwoXuRlaSOedTa2UJZn4Z_BpxZFWfrV197yOYn2MbZ0/exec
   ```

## Notes on Data Storage

### Event Registration Data

Event registration data will be stored with the following columns:
- Registration ID
- Name
- Email
- Phone
- Organization
- Event ID
- Event Name
- Event Date
- Event Time
- Event Location
- Additional Info
- Registration Date
- Timestamp

### Team Application Data

Team application data will be stored with the following columns:
- Application ID
- Full Name
- Email
- Phone
- Portfolio/GitHub Link
- Role
- Experience
- Message
- Application Date
- Status
- Timestamp

## Troubleshooting

If you encounter issues with the integration:

1. Check the server logs for any errors related to the Google Sheets API calls
2. Ensure that your Google Apps Script is deployed correctly and accessible
3. Verify that you've set the correct URL in your `.env` file
4. Check that the Google Sheet has the correct tabs/sheets named exactly as specified

For file uploads (like resumes), you would need to implement a separate storage solution, as Google Apps Script has limitations with file handling. 