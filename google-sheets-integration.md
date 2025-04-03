# Google Sheets Integration using Google Apps Script

Follow these steps to set up a Google Sheets endpoint that will receive registration data:

## 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Rename the first sheet to "Registrations"
3. Add the following header row:
   - RegistrationID
   - Name
   - Email
   - Phone
   - Organization
   - EventName
   - EventDate
   - EventTime
   - EventLocation
   - RegistrationDate
   - AdditionalInfo

## 2. Create a Google Apps Script

1. In your Google Sheet, click on **Extensions** > **Apps Script**
2. Replace the default code with this script:

```javascript
// Google Apps Script to receive event registration data
function doPost(e) {
  try {
    // Get the sheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Registrations");
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Add event-specific sheet if it doesn't exist
    var eventName = data.eventName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 25);
    var eventSheet = ss.getSheetByName(eventName);
    
    if (!eventSheet) {
      eventSheet = ss.insertSheet(eventName);
      // Add headers to the new sheet
      eventSheet.appendRow([
        "RegistrationID", 
        "Name", 
        "Email", 
        "Phone", 
        "Organization", 
        "EventName", 
        "EventDate", 
        "EventTime", 
        "EventLocation", 
        "RegistrationDate",
        "AdditionalInfo"
      ]);
    }
    
    // Current date and time for registration timestamp
    var registrationDate = new Date().toISOString();
    
    // Add data to both sheets
    var rowData = [
      data.registrationId,
      data.name,
      data.email,
      data.phone,
      data.organization,
      data.eventName,
      data.eventDate,
      data.eventTime,
      data.eventLocation,
      registrationDate,
      data.additionalInfo || ""
    ];
    
    sheet.appendRow(rowData);
    eventSheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'success': true,
      'registrationId': data.registrationId
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error and return error response
    console.error("Error processing request: " + error);
    return ContentService.createTextOutput(JSON.stringify({
      'success': false,
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the sheet is accessible
function testAccess() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Registrations");
  Logger.log("Sheet name: " + sheet.getName());
}
```

3. Save the script by clicking the disk icon or pressing Ctrl+S

## 3. Deploy as a Web App

1. Click on **Deploy** > **New deployment**
2. Select type: **Web app**
3. Fill in the following:
   - Description: "NexHub Event Registration"
   - Execute as: "Me"
   - Who has access: "Anyone" (This allows your application to send data without authentication)
4. Click "Deploy"
5. Copy the "Web app URL" that appears - you'll need this in your server code

## 4. Test the Web App

You can test your deployment using a tool like Postman or curl:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"registrationId":"TEST-123","name":"Test User","email":"test@example.com","phone":"1234567890","organization":"Test Org","eventName":"Test Event","eventDate":"2023-01-01","eventTime":"10:00 AM","eventLocation":"Test Location"}' \
  https://script.google.com/macros/s/AKfycbziD9oGcyKFNgYVzLIytrBNCxLgIXLQAprDYm3GvwgUQgIfD99pe1BEjCFWx0-ODry6Rw/exec
```

Replace `YOUR_WEB_APP_URL` with the URL you copied in step 3. 