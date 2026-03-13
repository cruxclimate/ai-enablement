/**
 * Crux AI Quiz — Google Apps Script
 *
 * HOW TO SET UP:
 * 1. Open your Google Sheet (create a new one if needed)
 * 2. Click Extensions → Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Click Save (floppy disk icon)
 * 5. Click Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy → copy the Web app URL
 * 7. Paste that URL into index.html where it says YOUR_APPS_SCRIPT_URL_HERE
 *
 * IMPORTANT: Each time you edit this script you must create a NEW deployment
 * (not update the existing one) for changes to take effect.
 */

const SHEET_NAME = 'Responses'; // Change if you want a different tab name

function doPost(e) {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    var data  = JSON.parse(e.postData.contents);

    // Write header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Email', 'Score', 'Out Of', 'Passed',
        'Q1', 'Q2', 'Q3', 'Q4', 'Q5',
        'Q6', 'Q7', 'Q8', 'Q9', 'Q10',
        'Open Feedback'
      ]);
      // Bold the header row
      sheet.getRange(1, 1, 1, 16).setFontWeight('bold');
    }

    sheet.appendRow([
      data.timestamp    || new Date().toISOString(),
      data.email        || '',
      data.score        || 0,
      data.outOf        || 10,
      data.passed       || 'No',
      data.Q1  || '—', data.Q2  || '—', data.Q3  || '—',
      data.Q4  || '—', data.Q5  || '—', data.Q6  || '—',
      data.Q7  || '—', data.Q8  || '—', data.Q9  || '—',
      data.Q10 || '—',
      data.openFeedback || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: test this function manually from the Apps Script editor
// to confirm your sheet connection works before deploying.
function testSheet() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  Logger.log('Sheet found: ' + sheet.getName() + ' | Rows: ' + sheet.getLastRow());
}
