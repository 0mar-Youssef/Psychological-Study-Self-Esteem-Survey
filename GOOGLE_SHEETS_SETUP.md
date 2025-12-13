# Google Sheets Setup for Help-Seeking Survey

## Quick Setup

### Step 1: Create the Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click **New Project**
3. Delete the default code
4. Copy and paste the entire contents of `google-apps-script.js` from this repo
5. Click **Save** (Ctrl+S) and name it "Help-Seeking Survey Script"

### Step 2: Create the Spreadsheet

1. In the Apps Script editor, click the **Run** dropdown
2. Select `createNewSpreadsheet`
3. Click **Run**
4. Grant permissions when prompted (click "Advanced" → "Go to project (unsafe)" → "Allow")
5. Check the **Execution log** - it will show:
   - The spreadsheet URL
   - The spreadsheet ID
6. **Copy the Spreadsheet ID** (it looks like `1A3DXr2e1TqpPwy2YmHlTpEBqzKOu6pJy2ND_7mk0onI`)

### Step 3: Update the Script with Your Spreadsheet ID

1. In the script, find `YOUR_SPREADSHEET_ID_HERE` (appears twice)
2. Replace it with your actual Spreadsheet ID
3. Save the script

### Step 4: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon → Select **Web app**
3. Set:
   - Description: "Help-Seeking Survey v1"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/ABC123.../exec`)

### Step 5: Update the Survey App

1. Open `src/App.jsx`
2. Find the `saveToGoogleSheets` function
3. Replace the `scriptUrl` with your new Web app URL:

```javascript
const scriptUrl = 'YOUR_WEB_APP_URL_HERE';
```

4. Save and redeploy your survey

## Column Structure

The spreadsheet will have these columns:

| # | Column | Description |
|---|--------|-------------|
| 1 | Timestamp | When response was submitted |
| 2-9 | Demographics | Age, Gender, Ethnicity, Country, Education, Employment |
| 10-14 | Family & Upbringing | Who raised them, childhood environment, caregiver availability |
| 15-18 | Health & Mental Health | Therapist history, stress periods, emotional struggles |
| 19-23 | Social & Environmental | Friends count, felt judged, school environment, support |
| 24-28 | Personality & Coping | Personality type, reactions, vulnerability, shame |
| 29-38 | Early Childhood (EC1-EC10) | Childhood emotional experiences |
| 39-48 | Childhood Social (CS1-CS10) | Peer relationships and school experiences |
| 49-58 | Family Dynamics (FD1-FD10) | Family communication and expectations |
| 59-68 | Recovery (RG1-RG10) | Current emotional safety and beliefs |
| 69-71 | Support Systems (SS1-SS3) | Experiences with mentors/counselors |
| 72-81 | Readiness (RC1-RC10) | Openness to change and self-compassion |
| 82-83 | Final Questions | Consent and open response |
| 84-93 | Scores | Calculated scores and metadata |
| 94 | Full Scores JSON | Complete scoring data as JSON |

## Understanding the Scores

- **Shame Score (Initial)**: Calculated from Part 1 answers (0-25+ range). Higher = more shame indicators
- **Section Scores**: Average Likert responses (1-4) for each section. Higher = more agreement with negative statements
- **Overall Average**: Mean of all follow-up question responses
- **Adaptive Questions Count**: How many follow-up questions were shown (10-35)

## Troubleshooting

### "No POST data received" error
- This is normal when testing from the browser
- Data should come from the survey form, not direct browser access

### Permissions issues
- Make sure "Who has access" is set to "Anyone"
- You may need to re-authorize after making changes

### Data not appearing
1. Check the Execution log in Apps Script for errors
2. Verify the Web app URL is correct in your React app
3. Make sure the spreadsheet ID is correct in the script

### Need to clear and restart?
1. Delete all rows in the spreadsheet (except headers)
2. Or run `createNewSpreadsheet()` again for a fresh sheet
