# EmailJS Setup Instructions

Your contact form is now ready to send emails! Follow these steps to configure EmailJS:

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email
5. **Copy the Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use the following template:

**Template Name:** Contact Form

**Subject:** New Contact Form Message: {{subject}}

**Content:**
```
You have received a new message from your portfolio website.

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. **Copy the Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key**
3. **Copy the Public Key**

## Step 5: Update script.js

Open `script.js` and replace these values at the top of the file:

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key
```

Replace:
- `YOUR_SERVICE_ID` with the Service ID from Step 2
- `YOUR_TEMPLATE_ID` with the Template ID from Step 3
- `YOUR_PUBLIC_KEY` with the Public Key from Step 4

## Step 6: Test the Form

1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your email inbox for the message!

## Troubleshooting

- **"Please configure EmailJS credentials"**: Make sure you've updated all three values in script.js
- **Email not received**: Check your spam folder and verify your email service is properly connected in EmailJS
- **Error sending**: Check the browser console (F12) for detailed error messages

## Security Note

The Public Key is safe to use in client-side code. EmailJS handles the security on their end. Never share your Private Key or API keys publicly.

---

That's it! Your contact form is now fully functional. 🎉


