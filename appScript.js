// using this appScript file in spreadSheet extention

// Handle GET request
function doGet(e) {
    return HtmlService.createHtmlOutput('Service is running')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('Access-Control-Allow-Origin', '*')
        .addMetaTag('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        .addMetaTag('Access-Control-Allow-Headers', 'Content-Type');
  }
  
  // Add this function to handle preflight OPTIONS request
  function doOptions(e) {
    return HtmlService.createHtmlOutput()
     
  }
  
  // Handle POST request
  function doPost(e) {
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      var data = JSON.parse(e.postData.contents);
      
      // Get current timestamp
      var timestamp = new Date().toLocaleString();
      
      // Append the form data to the sheet with timestamp
      sheet.appendRow([
        timestamp,
        data.name, 
        data.email, 
        data.message,
        data.phone
      ]);
      
      // Return success response
      return ContentService.createTextOutput(
        JSON.stringify({ 
          'status': 'success',
          'data': data
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
      
    } catch(error) {
      // Return error response
      return ContentService.createTextOutput(
        JSON.stringify({ 
          'status': 'error',
          'message': error.toString()
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
    }
  }
  