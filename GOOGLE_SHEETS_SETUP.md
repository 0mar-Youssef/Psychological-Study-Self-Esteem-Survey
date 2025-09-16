# Google Sheets Integration Setup

## Step 1: Create Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the contents of `google-apps-script.js`
4. Save the project (Ctrl+S or Cmd+S)

## Step 2: Set Up Your Google Sheet

1. Open your Google Sheet: [https://docs.google.com/spreadsheets/d/1A3DXr2e1TqpPwy2YmHlTpEBqzKOu6pJy2ND_7mk0onI/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1A3DXr2e1TqpPwy2YmHlTpEBqzKOu6pJy2ND_7mk0onI/edit?usp=sharing)
2. In Google Apps Script, run the `setupHeaders()` function once to create column headers
3. This will add all the necessary column headers for your survey data

## Step 3: Deploy as Web App

1. In Google Apps Script, click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following:
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click "Deploy"
5. Copy the Web App URL (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

## Step 4: Update Your Survey App

1. Open `src/App.jsx`
2. Find the line: `const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';`
3. Replace `YOUR_SCRIPT_ID` with your actual script ID from the deployment URL

## Step 5: Test the Integration

1. Run your survey app: `npm run dev`
2. Fill out the survey completely
3. Submit the form
4. Check your Google Sheet - you should see a new row with the survey data

## Data Structure

The Google Sheet will have the following columns:
- **Demographics**: Age, Gender, Year, GPA, Major, Living Situation, Caregiver, Closeness
- **Parenting Styles**: 12 questions (3 per style: Authoritative, Authoritarian, Permissive, Uninvolved)
- **Self-Esteem**: 10 questions (Rosenberg Scale)
- **Stress & Coping**: 6 questions (3 stress + 3 coping)

## Scoring Notes

- **Reverse-coded items** are marked with (R) in the headers
- **Likert scales**: 1-5 (Strongly disagree → Strongly agree)
- **Frequency scales**: 1-5 (Never → Very often)
- **Closeness scale**: 1-5 (Not close → Very close)

## Troubleshooting

- If data isn't appearing, check the browser console for errors
- Make sure the Google Apps Script is deployed with "Anyone" access
- Verify the script URL is correct in your App.jsx file
- Check that the `setupHeaders()` function was run successfully
