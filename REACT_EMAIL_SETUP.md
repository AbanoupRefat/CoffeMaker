# React Email with Resend Integration Guide

## Overview

This project uses [React Email](https://react.email/) for creating beautiful, responsive email templates and [Resend](https://resend.com/) for sending emails. This document provides instructions on how to set up and use this integration.

## Setup

### 1. Install Dependencies

The following packages are required for the React Email and Resend integration:

```bash
pnpm add @react-email/components @react-email/render resend
```

### 2. Configure Environment Variables

Create a `.env` file in the root of your project with the following variables:

```
VITE_RESEND_API_KEY=your_resend_api_key
VITE_OWNER_EMAIL=owner@yourdomain.com
```

Replace `your_resend_api_key` with your actual Resend API key, which you can obtain from the [Resend dashboard](https://resend.com/dashboard).

### 3. Email Templates

Email templates are created using React components and are located in the `src/lib/emails` directory:

- `OrderConfirmationEmail.jsx`: Template for customer order confirmation emails
- `OrderNotificationEmail.jsx`: Template for business owner order notification emails

## Usage

### Sending Emails

The `emailService.js` file provides functions for sending emails:

```javascript
import { sendOrderConfirmationEmail, sendOrderNotificationToOwner } from './lib/emailService';

// Send order confirmation email to customer
await sendOrderConfirmationEmail(orderData);

// Send order notification to business owner
await sendOrderNotificationToOwner(orderData);
```

### Previewing Emails

You can preview email templates before sending them:

```javascript
import { getEmailPreview } from './lib/emailService';

// Get HTML preview of order confirmation email
const confirmationHtml = getEmailPreview(orderData, 'confirmation');

// Get HTML preview of order notification email
const notificationHtml = getEmailPreview(orderData, 'notification');
```

### Development Mode

In development mode or when Resend is not configured, the email service will simulate sending emails and log the content to the console.

## Email Data Structure

The `orderData` object should have the following structure:

```javascript
const orderData = {
  orderNumber: 'ORD12345',
  orderDate: new Date().toISOString(),
  orderTotal: 49.99,
  paymentMethod: 'cod', // 'cod' for Cash on Delivery
  customerInfo: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    fullName: 'John Doe',
    address: '123 Main St',
    city: 'New York',
    postalCode: '10001',
  },
  shippingAddress: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA',
  },
  items: [
    {
      id: 1,
      name: 'Colombian Coffee',
      quantity: 2,
      price: 19.99,
      size: '250g',
    },
    // More items...
  ],
  orderNotes: 'Please leave at the front door.',
};
```

## Production Considerations

1. **API Key Security**: Never commit your Resend API key to version control. Always use environment variables.

2. **Error Handling**: Implement robust error handling for email sending failures.

3. **Email Verification**: Consider implementing email verification to ensure valid email addresses.

4. **Rate Limiting**: Be aware of Resend's rate limits for your plan.

5. **Testing**: Test email delivery across different email clients and devices.

## Troubleshooting

- **Emails not sending**: Check that your Resend API key is correct and that you have sufficient credits.

- **Template rendering issues**: Ensure that your React Email components are properly structured and that all required data is provided.

- **Browser console errors**: Look for errors in the browser console that might indicate issues with the email service.

## Resources

- [React Email Documentation](https://react.email/docs/introduction)
- [Resend Documentation](https://resend.com/docs/introduction)
- [React Email Components](https://react.email/docs/components/html)