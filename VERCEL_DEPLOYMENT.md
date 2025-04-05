# Deploying NexHub Community to Vercel

This guide provides instructions for deploying your NexHub Community website to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your code pushed to a GitHub, GitLab, or Bitbucket repository

## Step 1: Configure Environment Variables

Before deploying, you need to set up these environment variables in Vercel:

1. **SMTP_EMAIL**: Your email address for sending emails (e.g., noreply.nexhub@gmail.com)
2. **SMTP_PASSWORD**: Your email password or app password for Gmail
3. **GOOGLE_SCRIPT_URL**: The URL to your Google Apps Script (if using Google Sheets)
4. **VITE_API_URL**: Your production domain (e.g., https://nexhubcommunity.vercel.app)

## Step 2: Deploy to Vercel

1. Log in to your Vercel account
2. Click "New Project"
3. Import your repository
4. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add the environment variables from Step 1
6. Click "Deploy"

## Step 3: Verify API Endpoints

After deployment:

1. Visit your deployed site
2. Click the "API Status" link in the footer
3. Verify the API connection status
4. Test both recruitment and registration endpoints

## Troubleshooting

If you encounter issues:

1. **API Connection Errors**: Check that environment variables are correctly set in Vercel
2. **CORS Issues**: Verify that the API origin matches your domain
3. **Email Sending Fails**: Ensure SMTP settings are correct and the email account allows app access
4. **Functions Timing Out**: Vercel serverless functions have a timeout limit (10-15 seconds), ensure operations complete quickly

## Maintenance

To update your deployment:

1. Push changes to your repository
2. Vercel will automatically rebuild and deploy

## Important Notes

- The API routes are serverless functions with execution time limits
- For production, consider restricting CORS to your specific domain instead of `*`
- Gmail users: Create an App Password rather than using your account password
- Large files or long-running processes may not work well in serverless functions

For additional help, refer to the [Vercel documentation](https://vercel.com/docs).