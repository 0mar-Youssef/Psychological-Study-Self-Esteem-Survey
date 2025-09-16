// Google Apps Script for Google Sheets Integration
// Copy this code into Google Apps Script (script.google.com) and deploy as web app

function doPost(e) {
  try {
    // Check if this is a valid POST request with data
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No POST data received. This function should be called via HTTP POST from the survey.');
    }
    
    // Get the active spreadsheet - try active first, then specific ID
    let sheet = SpreadsheetApp.getActiveSheet();
    if (!sheet) {
      const spreadsheetId = '1A3DXr2e1TqpPwy2YmHlTpEBqzKOu6pJy2ND_7mk0onI';
      const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      sheet = spreadsheet.getActiveSheet();
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const timestamp = data.timestamp || new Date().toISOString();
    const scores = data.scores || {};
    
    // Prepare the row data for 38-question survey
    const rowData = [
      timestamp,
      // Demographics (5 questions)
      data.age || '',
      data.gender || '',
      data.major || '',
      data.gpa || '',
      data.livingWithParents || '',
      
      // Sector Questions (6 questions)
      data.family_influence || '',
      data.academic_pressure || '',
      data.social_support || '',
      data.financial_stress || '',
      data.personal_confidence || '',
      data.stress_management || '',
      
      // Parenting Style Questions (8 questions)
      data.p1 || '', // My parents explained why they made rules
      data.p2 || '', // My parents balanced rules with kindness
      data.p3 || '', // My parents expected me to obey without asking questions
      data.p4 || '', // My parents often said 'Do it because I said so'
      data.p5 || '', // My parents let me do almost anything I wanted
      data.p6 || '', // My parents rarely said 'no' to me
      data.p7 || '', // My parents seemed like they didn't care what I did
      data.p8 || '', // I often felt alone at home
      
      // Self-Esteem Questions (9 questions)
      data.se1 || '', // I feel proud of myself most of the time
      data.se2 || '', // I feel confident trying new activities
      data.se3 || '', // I feel comfortable making decisions on my own
      data.se4 || '', // I believe I can reach my goals
      data.se5 || '', // I feel accepted by family and friends
      data.se6 || '', // I sometimes doubt my abilities (reverse)
      data.se7 || '', // I feel secure about my future
      data.se8 || '', // I feel happy with who I are
      data.se9 || '', // I feel like my life has purpose
      
      // Social Learning Questions (8 questions)
      data.sl1 || '', // I learn by watching how others solve problems
      data.sl2 || '', // I believe failure is a chance to learn
      data.sl3 || '', // I try to copy positive ways people deal with challenges
      data.sl4 || '', // I believe effort matters more than luck
      data.sl5 || '', // I stay calm when I see others staying calm in tough situations
      data.sl6 || '', // I feel capable of improving my skills with practice
      data.sl7 || '', // I keep trying until I succeed
      data.sl8 || '', // I believe I can succeed even after failing
      
      // Final Assessment Questions (2 questions)
      data.stress_scale || '', // On a scale from 1-10, how stressed are you
      data.confidence_scale || '', // On a scale from 1-10, how confident are you
      data.self_esteem_perception || '', // Do you believe you have low or high self-esteem
      
      // Consent Question (1 question)
      data.consent || '',
      
      // Calculated Scores
      scores.parenting ? scores.parenting.authoritative || '' : '',
      scores.parenting ? scores.parenting.authoritarian || '' : '',
      scores.parenting ? scores.parenting.permissive || '' : '',
      scores.parenting ? scores.parenting.uninvolved || '' : '',
      scores.parenting ? scores.parenting.dominant || '' : '',
      scores.selfEsteem || '',
      scores.socialLearning || '',
      scores.stressLevel || '',
      scores.confidenceLevel || '',
      scores.selfEsteemPerception || '',
      
      // Full scores as JSON for advanced analysis
      JSON.stringify(scores)
    ];
    
    // Add the row to the sheet
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Data saved successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false, 
        error: error.toString(),
        message: 'Failed to save data'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Survey data collection endpoint is active. Send POST requests to submit survey data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Test function - run this to test the script without POST data
function testScript() {
  console.log('Google Apps Script is working correctly!');
  console.log('To test the doPost function, submit a survey from your website.');
  return 'Script test completed successfully';
}

// Function to set up the sheet headers (run this once after creating your spreadsheet)
function setupHeaders() {
  try {
    // Try to get the active sheet first
    let sheet = SpreadsheetApp.getActiveSheet();
    
    // If no active sheet, try to use the specific spreadsheet ID
    if (!sheet) {
      console.log('No active sheet found, trying specific spreadsheet...');
      const spreadsheetId = '1A3DXr2e1TqpPwy2YmHlTpEBqzKOu6pJy2ND_7mk0onI';
      const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      sheet = spreadsheet.getActiveSheet();
    }
    
    if (!sheet) {
      throw new Error('No spreadsheet found. Please open the Google Sheet first.');
    }
  
    const headers = [
    'Timestamp',
    
    // Demographics (5 questions)
    'Age',
    'Gender', 
    'Major',
    'GPA',
    'Living with Parents',
    
    // Sector Questions (6 questions)
    'Family Influence',
    'Academic Pressure', 
    'Social Support',
    'Financial Stress',
    'Personal Confidence',
    'Stress Management',
    
    // Parenting Style Questions (8 questions)
    'P1 - Parents explained rules',
    'P2 - Parents balanced rules with kindness',
    'P3 - Expected obedience without questions', 
    'P4 - Parents said "because I said so"',
    'P5 - Parents let me do anything',
    'P6 - Parents rarely said no',
    'P7 - Parents seemed not to care',
    'P8 - Often felt alone at home',
    
    // Self-Esteem Questions (9 questions)
    'SE1 - Feel proud of myself',
    'SE2 - Confident trying new activities',
    'SE3 - Comfortable making decisions',
    'SE4 - Believe I can reach goals',
    'SE5 - Feel accepted by family/friends',
    'SE6 - Sometimes doubt abilities (R)',
    'SE7 - Feel secure about future',
    'SE8 - Happy with who I am',
    'SE9 - Life has purpose',
    
    // Social Learning Questions (8 questions)
    'SL1 - Learn by watching others',
    'SL2 - Failure is chance to learn',
    'SL3 - Copy positive ways to deal with challenges',
    'SL4 - Effort matters more than luck',
    'SL5 - Stay calm when others stay calm',
    'SL6 - Capable of improving skills',
    'SL7 - Keep trying until succeed',
    'SL8 - Can succeed even after failing',
    
    // Final Assessment Questions (2 questions)
    'Stress Scale (1-10)',
    'Confidence Scale (1-10)',
    'Self-Esteem Perception (low/high)',
    
    // Consent
    'Consent for Quotes',
    
    // Calculated Scores
    'Authoritative Score',
    'Authoritarian Score',
    'Permissive Score', 
    'Uninvolved Score',
    'Dominant Parenting Style',
    'Self-Esteem Score',
    'Social Learning Score',
    'Stress Level',
    'Confidence Level',
    'Self-Esteem Perception',
    
    // Full Data JSON
    'Full Scores JSON'
  ];
  
  // Only set headers if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
    
    console.log('Headers set up successfully!');
  } else {
    console.log('Sheet already has data. Headers not modified.');
  }
  
  } catch (error) {
    console.error('Error in setupHeaders:', error);
    throw new Error('Failed to setup headers: ' + error.toString() + 
      '\n\nMake sure you have:\n' +
      '1. Created a Google Sheet\n' + 
      '2. Opened the Google Sheet in another tab\n' +
      '3. Run this function while the sheet is active\n' +
      '\nAlternatively, run createNewSpreadsheet() to create a new one automatically.');
  }
}

// Alternative function to create a new spreadsheet with headers
function createNewSpreadsheet() {
  try {
    // Create a new spreadsheet
    const spreadsheet = SpreadsheetApp.create('Survey Responses - Parenting Styles Research');
    const sheet = spreadsheet.getActiveSheet();
    
    console.log('Created new spreadsheet:', spreadsheet.getUrl());
    
    const headers = [
      'Timestamp',
      
      // Demographics (5 questions)
      'Age',
      'Gender', 
      'Major',
      'GPA',
      'Living with Parents',
      
      // Sector Questions (6 questions)
      'Family Influence',
      'Academic Pressure', 
      'Social Support',
      'Financial Stress',
      'Personal Confidence',
      'Stress Management',
      
      // Parenting Style Questions (8 questions)
      'P1 - Parents explained rules',
      'P2 - Parents balanced rules with kindness',
      'P3 - Expected obedience without questions', 
      'P4 - Parents said "because I said so"',
      'P5 - Parents let me do anything',
      'P6 - Parents rarely said no',
      'P7 - Parents seemed not to care',
      'P8 - Often felt alone at home',
      
      // Self-Esteem Questions (9 questions)
      'SE1 - Feel proud of myself',
      'SE2 - Confident trying new activities',
      'SE3 - Comfortable making decisions',
      'SE4 - Believe I can reach goals',
      'SE5 - Feel accepted by family/friends',
      'SE6 - Sometimes doubt abilities (R)',
      'SE7 - Feel secure about future',
      'SE8 - Happy with who I am',
      'SE9 - Life has purpose',
      
      // Social Learning Questions (8 questions)
      'SL1 - Learn by watching others',
      'SL2 - Failure is chance to learn',
      'SL3 - Copy positive ways to deal with challenges',
      'SL4 - Effort matters more than luck',
      'SL5 - Stay calm when others stay calm',
      'SL6 - Capable of improving skills',
      'SL7 - Keep trying until succeed',
      'SL8 - Can succeed even after failing',
      
      // Final Assessment Questions (2 questions)
      'Stress Scale (1-10)',
      'Confidence Scale (1-10)',
      'Self-Esteem Perception (low/high)',
      
      // Consent
      'Consent for Quotes',
      
      // Calculated Scores
      'Authoritative Score',
      'Authoritarian Score',
      'Permissive Score', 
      'Uninvolved Score',
      'Dominant Parenting Style',
      'Self-Esteem Score',
      'Social Learning Score',
      'Stress Level',
      'Confidence Level',
      'Self-Esteem Perception',
      
      // Full Data JSON
      'Full Scores JSON'
    ];
    
    // Set headers
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
    
    console.log('Spreadsheet created successfully!');
    console.log('URL:', spreadsheet.getUrl());
    console.log('Copy this URL and open it to view your data collection sheet.');
    
    return spreadsheet.getUrl();
    
  } catch (error) {
    console.error('Error creating spreadsheet:', error);
    throw new Error('Failed to create spreadsheet: ' + error.toString());
  }
}