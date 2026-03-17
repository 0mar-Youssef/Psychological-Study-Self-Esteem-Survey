function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No POST data received.');
    }
    
    let sheet = SpreadsheetApp.getActiveSheet();
    if (!sheet) {
      const spreadsheetId = '1A3DXr2e1TqpPwy2YmHlTpEBqzKOu6pJy2ND_7mk0onI';
      const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      sheet = spreadsheet.getActiveSheet();
    }
    
    const data = JSON.parse(e.postData.contents);
    const timestamp = data.timestamp || new Date().toISOString();
    const scores = data.scores || {};
    
    const rowData = [
      timestamp,
      
      data.age || '',
      data.gender || '',
      data.gender_other || '',
      data.ethnicity || '',
      data.country || '',
      data.education || '',
      data.employment || '',
      data.employment_other || '',
      
      data.raised_by || '',
      data.raised_by_other || '',
      data.childhood_environment || '',
      data.adults_emotionally_available || '',
      data.comfortable_asking_help || '',
      
      data.seen_therapist || '',
      data.long_stress_periods || '',
      data.overwhelming_emotions || '',
      data.comfortable_expressing_feelings || '',
      
      data.close_friends_count || '',
      data.judged_for_mistakes || '',
      data.school_encouraged_help || '',
      data.feel_supported_today || '',
      data.rely_on_support || '',
      
      data.personality_type || '',
      data.usual_reaction || '',
      data.usual_reaction_other || '',
      data.comfortable_vulnerability || '',
      data.ashamed_needing_help || '',
      
      data.ec1 || '', data.ec2 || '', data.ec3 || '', data.ec4 || '', data.ec5 || '',
      data.ec6 || '', data.ec7 || '', data.ec8 || '', data.ec9 || '', data.ec10 || '',
      
      data.cs1 || '', data.cs2 || '', data.cs3 || '', data.cs4 || '', data.cs5 || '',
      data.cs6 || '', data.cs7 || '', data.cs8 || '', data.cs9 || '', data.cs10 || '',
      
      data.fd1 || '', data.fd2 || '', data.fd3 || '', data.fd4 || '', data.fd5 || '',
      data.fd6 || '', data.fd7 || '', data.fd8 || '', data.fd9 || '', data.fd10 || '',
      
      data.rg1 || '', data.rg2 || '', data.rg3 || '', data.rg4 || '', data.rg5 || '',
      data.rg6 || '', data.rg7 || '', data.rg8 || '', data.rg9 || '', data.rg10 || '',
      
      data.ss1 || '', data.ss2 || '', data.ss3 || '',
      
      data.rc1 || '', data.rc2 || '', data.rc3 || '', data.rc4 || '', data.rc5 || '',
      data.rc6 || '', data.rc7 || '', data.rc8 || '', data.rc9 || '', data.rc10 || '',
      
      data.consent_use_results || '',
      data.anything_else || '',
      
      data.questionsAnswered || '',
      data.adaptiveQuestionsCount || '',
      scores.shameScoreFromInitial || '',
      scores.overallAverage || '',
      scores.sections ? scores.sections.earlyChildhood || '' : '',
      scores.sections ? scores.sections.childhoodSocial || '' : '',
      scores.sections ? scores.sections.familyDynamics || '' : '',
      scores.sections ? scores.sections.recovery || '' : '',
      scores.sections ? scores.sections.supportSystems || '' : '',
      scores.sections ? scores.sections.readiness || '' : '',
      
      JSON.stringify(scores)
    ];
    
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
    .createTextOutput('Survey endpoint active. Send POST requests to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function setupHeaders() {
  try {
    let sheet = SpreadsheetApp.getActiveSheet();
    
    if (!sheet) {
      const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
      const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      sheet = spreadsheet.getActiveSheet();
    }
    
    if (!sheet) {
      throw new Error('No spreadsheet found. Please open the Google Sheet first.');
    }
  
    const headers = [
      'Timestamp',
      
      'Age',
      'Gender', 
      'Gender (Other)',
      'Ethnicity',
      'Country',
      'Education',
      'Employment',
      'Employment (Other)',
      
      'Raised By',
      'Raised By (Other)',
      'Childhood Environment',
      'Adults Emotionally Available',
      'Comfortable Asking Help (Childhood)',
      
      'Seen Therapist',
      'Long Stress Periods',
      'Overwhelming Emotions',
      'Comfortable Expressing Feelings',
      
      'Close Friends Count',
      'Judged for Mistakes',
      'School Encouraged Help',
      'Feel Supported Today',
      'Rely on Support',
      
      'Personality Type',
      'Usual Reaction',
      'Usual Reaction (Other)',
      'Comfortable with Vulnerability',
      'Ashamed Needing Help',
      
      'EC1 - Not safe expressing emotions',
      'EC2 - Adults reacted negatively',
      'EC3 - Punished for showing sadness',
      'EC4 - Uncomfortable asking caretakers',
      'EC5 - Hid problems from family',
      'EC6 - Mistakes unacceptable',
      'EC7 - Not supported when struggling',
      'EC8 - Feared judgment by family',
      'EC9 - Felt like burden',
      'EC10 - Learned not to talk about feelings',
      
      'CS1 - Not safe sharing with peers',
      'CS2 - Bullied for vulnerability',
      'CS3 - Compared self negatively',
      'CS4 - No trusted adult outside family',
      'CS5 - Hid problems from friends',
      'CS6 - Believed others stronger',
      'CS7 - Felt misunderstood by friends',
      'CS8 - Feared embarrassment at school',
      'CS9 - Kept quiet when needed help',
      'CS10 - Pressure to appear strong',
      
      'FD1 - Family no open communication',
      'FD2 - Discouraged from vulnerability',
      'FD3 - Pressure to be strong one',
      'FD4 - Family minimized problems',
      'FD5 - Feared disappointing family',
      'FD6 - Learned to solve alone',
      'FD7 - Household discouraged emotions',
      'FD8 - Responsible for keeping peace',
      'FD9 - Rarely felt understood',
      'FD10 - Family saw help as weakness',
      
      'RG1 - Still feel unsafe asking help',
      'RG2 - Vulnerability is weakness',
      'RG3 - Uncomfortable being honest',
      'RG4 - People dont care about me',
      'RG5 - Help doesnt make things better',
      'RG6 - Opening up led to negative',
      'RG7 - Avoid reaching out when overwhelmed',
      'RG8 - Risky/shameful to ask support',
      'RG9 - Not hopeful about communication',
      'RG10 - Stuck in emotional struggles',
      
      'SS1 - Negative experiences with mentors',
      'SS2 - Uncomfortable with different background',
      'SS3 - Less safe in person vs online',
      
      'RC1 - Resistant to asking help',
      'RC2 - Very critical of self',
      'RC3 - Closed to healthier coping',
      'RC4 - Dont deserve support',
      'RC5 - Afraid to share feelings',
      'RC6 - Doubt change is possible',
      'RC7 - Uncomfortable challenging silence',
      'RC8 - Professional help makes anxious',
      'RC9 - Not hopeful about relationships',
      'RC10 - Avoid understanding delay',
      
      'Consent to Use Results',
      'Anything Else (Open Response)',
      
      'Questions Answered',
      'Adaptive Questions Count',
      'Shame Score (Initial)',
      'Overall Average Score',
      'Early Childhood Score',
      'Childhood Social Score',
      'Family Dynamics Score',
      'Recovery Score',
      'Support Systems Score',
      'Readiness Score',
      
      'Full Scores JSON'
    ];
  
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
      
      sheet.setFrozenRows(1);
      
      console.log('Headers set up successfully! Total columns: ' + headers.length);
    } else {
      console.log('Sheet already has data. Clear the sheet first or create a new one.');
    }
    
  } catch (error) {
    console.error('Error in setupHeaders:', error);
    throw new Error('Failed to setup headers: ' + error.toString());
  }
}

function createNewSpreadsheet() {
  try {
    const spreadsheet = SpreadsheetApp.create('Help-Seeking Survey Responses');
    const sheet = spreadsheet.getActiveSheet();
    
    console.log('Created new spreadsheet:', spreadsheet.getUrl());
    console.log('Spreadsheet ID:', spreadsheet.getId());
    
    const headers = [
      'Timestamp',
      
      'Age',
      'Gender', 
      'Gender (Other)',
      'Ethnicity',
      'Country',
      'Education',
      'Employment',
      'Employment (Other)',
      
      'Raised By',
      'Raised By (Other)',
      'Childhood Environment',
      'Adults Emotionally Available',
      'Comfortable Asking Help (Childhood)',
      
      'Seen Therapist',
      'Long Stress Periods',
      'Overwhelming Emotions',
      'Comfortable Expressing Feelings',
      
      'Close Friends Count',
      'Judged for Mistakes',
      'School Encouraged Help',
      'Feel Supported Today',
      'Rely on Support',
      
      'Personality Type',
      'Usual Reaction',
      'Usual Reaction (Other)',
      'Comfortable with Vulnerability',
      'Ashamed Needing Help',
      
      'EC1 - Not safe expressing emotions',
      'EC2 - Adults reacted negatively',
      'EC3 - Punished for showing sadness',
      'EC4 - Uncomfortable asking caretakers',
      'EC5 - Hid problems from family',
      'EC6 - Mistakes unacceptable',
      'EC7 - Not supported when struggling',
      'EC8 - Feared judgment by family',
      'EC9 - Felt like burden',
      'EC10 - Learned not to talk about feelings',
      
      'CS1 - Not safe sharing with peers',
      'CS2 - Bullied for vulnerability',
      'CS3 - Compared self negatively',
      'CS4 - No trusted adult outside family',
      'CS5 - Hid problems from friends',
      'CS6 - Believed others stronger',
      'CS7 - Felt misunderstood by friends',
      'CS8 - Feared embarrassment at school',
      'CS9 - Kept quiet when needed help',
      'CS10 - Pressure to appear strong',
      
      'FD1 - Family no open communication',
      'FD2 - Discouraged from vulnerability',
      'FD3 - Pressure to be strong one',
      'FD4 - Family minimized problems',
      'FD5 - Feared disappointing family',
      'FD6 - Learned to solve alone',
      'FD7 - Household discouraged emotions',
      'FD8 - Responsible for keeping peace',
      'FD9 - Rarely felt understood',
      'FD10 - Family saw help as weakness',
      
      'RG1 - Still feel unsafe asking help',
      'RG2 - Vulnerability is weakness',
      'RG3 - Uncomfortable being honest',
      'RG4 - People dont care about me',
      'RG5 - Help doesnt make things better',
      'RG6 - Opening up led to negative',
      'RG7 - Avoid reaching out when overwhelmed',
      'RG8 - Risky/shameful to ask support',
      'RG9 - Not hopeful about communication',
      'RG10 - Stuck in emotional struggles',
      
      'SS1 - Negative experiences with mentors',
      'SS2 - Uncomfortable with different background',
      'SS3 - Less safe in person vs online',
      
      'RC1 - Resistant to asking help',
      'RC2 - Very critical of self',
      'RC3 - Closed to healthier coping',
      'RC4 - Dont deserve support',
      'RC5 - Afraid to share feelings',
      'RC6 - Doubt change is possible',
      'RC7 - Uncomfortable challenging silence',
      'RC8 - Professional help makes anxious',
      'RC9 - Not hopeful about relationships',
      'RC10 - Avoid understanding delay',
      
      'Consent to Use Results',
      'Anything Else (Open Response)',
      
      'Questions Answered',
      'Adaptive Questions Count',
      'Shame Score (Initial)',
      'Overall Average Score',
      'Early Childhood Score',
      'Childhood Social Score',
      'Family Dynamics Score',
      'Recovery Score',
      'Support Systems Score',
      'Readiness Score',
      
      'Full Scores JSON'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
    
    sheet.setFrozenRows(1);
    
    console.log('Spreadsheet created successfully!');
    console.log('URL:', spreadsheet.getUrl());
    console.log('IMPORTANT: Copy the Spreadsheet ID and update it in the doPost function!');
    console.log('Spreadsheet ID:', spreadsheet.getId());
    
    return spreadsheet.getUrl();
    
  } catch (error) {
    console.error('Error creating spreadsheet:', error);
    throw new Error('Failed to create spreadsheet: ' + error.toString());
  }
}
