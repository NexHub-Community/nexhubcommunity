# Setting Up EmailJS for Contact Form

To receive contact form submissions in your email (nexhubcommunity@gmail.com), follow these steps to set up EmailJS:

## Step 1: Create an EmailJS Account

1. Go to [EmailJS website](https://www.emailjs.com/) and sign up for a free account
2. The free tier allows 200 emails per month, which should be sufficient for most small websites

## Step 2: Add Your Email Service

1. In the EmailJS dashboard, go to "Email Services" and click "Add New Service"
2. Select "Gmail" as your service provider
3. Connect your nexhubcommunity@gmail.com account
4. Give your service a name (e.g., "NexHub Contact")
5. Note the Service ID - you'll need this later

## Step 3: Create an Email Template

1. Go to "Email Templates" and click "Create New Template"
2. Design your email template. Here's a simple example:

**Subject:**
```
New Contact Form Submission from {{name}}
```

**Content:**
```
You have received a new contact message from your website:

Name: {{name}}
Email: {{email}}

Message:
{{message}}

Sent from the NexHub contact form.
```

3. Save the template and note the Template ID

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your Public Key

## Step 5: Update Your Code

Replace the placeholders in your Contact.tsx file with the actual values:

```jsx
const EMAILJS_SERVICE_ID = "service_94gphsi"; 
const EMAILJS_TEMPLATE_ID = "template_xv4m93o"; 
const EMAILJS_PUBLIC_KEY = "Le9S-6w4iJqYvhb3O";
```

## Testing

Once you've set up EmailJS, test your contact form by filling it out and submitting it. You should receive an email at nexhubcommunity@gmail.com with the form data.

## Security Note

The EmailJS public key is designed to be used in client-side code. However, be aware that your monthly email quota could be abused if someone discovers these keys. For production applications with higher security requirements, consider implementing a server-side solution. 