# Email Integration Guide for Coffee Website

## Overview

This guide provides instructions on how to implement email functionality for order confirmations and notifications in the Coffee Website application. Currently, the application includes placeholder email functions that simulate sending emails but don't actually send them.

## Current Implementation

The current implementation includes:

1. Placeholder email service functions in `src/lib/emailService.js`
2. Integration with the order confirmation process
3. UI elements for email status and manual resending

## Recommended Email Service Providers

Here are some recommended email service providers you can integrate with:

### 1. SendGrid

**Pros:**
- Free tier with 100 emails/day
- Comprehensive API and libraries
- Good deliverability rates
- Email templates and analytics

**Integration Steps:**

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Install the SendGrid library:
   ```bash
   npm install @sendgrid/mail
   ```
3. Update the `emailService.js` file:
   ```javascript
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   
   export const sendOrderConfirmationEmail = async (orderData) => {
     const msg = {
       to: orderData.customerInfo.email,
       from: 'your-verified-sender@yourdomain.com',
       subject: `Order Confirmation #${orderData.orderNumber}`,
       text: `Thank you for your order #${orderData.orderNumber}. Your total is $${orderData.orderTotal}.`,
       html: `<p>Thank you for your order <strong>#${orderData.orderNumber}</strong>.</p>
              <p>Your total is <strong>$${orderData.orderTotal}</strong>.</p>`,
     };
     
     return sgMail.send(msg);
   };
   ```

### 2. Mailgun

**Pros:**
- Free tier with flexible pricing
- Simple API
- Good for transactional emails
- Email validation services

**Integration Steps:**

1. Sign up at [Mailgun](https://www.mailgun.com/)
2. Install the Mailgun library:
   ```bash
   npm install mailgun-js
   ```
3. Update the `emailService.js` file:
   ```javascript
   import mailgun from 'mailgun-js';
   
   const mg = mailgun({
     apiKey: process.env.MAILGUN_API_KEY,
     domain: process.env.MAILGUN_DOMAIN,
   });
   
   export const sendOrderConfirmationEmail = async (orderData) => {
     const data = {
       from: 'Coffee Shop <noreply@yourdomain.com>',
       to: orderData.customerInfo.email,
       subject: `Order Confirmation #${orderData.orderNumber}`,
       text: `Thank you for your order #${orderData.orderNumber}. Your total is $${orderData.orderTotal}.`,
       html: `<p>Thank you for your order <strong>#${orderData.orderNumber}</strong>.</p>
              <p>Your total is <strong>$${orderData.orderTotal}</strong>.</p>`,
     };
     
     return new Promise((resolve, reject) => {
       mg.messages().send(data, (error, body) => {
         if (error) reject(error);
         else resolve(body);
       });
     });
   };
   ```

### 3. AWS SES (Simple Email Service)

**Pros:**
- Very cost-effective
- High deliverability
- Integrates well with other AWS services
- Good for high-volume sending

**Integration Steps:**

1. Set up an [AWS account](https://aws.amazon.com/) and configure SES
2. Install the AWS SDK:
   ```bash
   npm install aws-sdk
   ```
3. Update the `emailService.js` file:
   ```javascript
   import AWS from 'aws-sdk';
   
   AWS.config.update({
     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
     region: process.env.AWS_REGION,
   });
   
   const ses = new AWS.SES({ apiVersion: '2010-12-01' });
   
   export const sendOrderConfirmationEmail = async (orderData) => {
     const params = {
       Source: 'noreply@yourdomain.com',
       Destination: {
         ToAddresses: [orderData.customerInfo.email],
       },
       Message: {
         Subject: {
           Data: `Order Confirmation #${orderData.orderNumber}`,
         },
         Body: {
           Text: {
             Data: `Thank you for your order #${orderData.orderNumber}. Your total is $${orderData.orderTotal}.`,
           },
           Html: {
             Data: `<p>Thank you for your order <strong>#${orderData.orderNumber}</strong>.</p>
                    <p>Your total is <strong>$${orderData.orderTotal}</strong>.</p>`,
           },
         },
       },
     };
     
     return ses.sendEmail(params).promise();
   };
   ```

## Email Templates

For a better user experience, consider creating HTML email templates for:

1. **Order Confirmation** - Sent to customers after placing an order
2. **Order Notification** - Sent to business owners when a new order is placed
3. **Shipping Confirmation** - Sent when an order is shipped
4. **Delivery Confirmation** - Sent when an order is delivered

## Security Considerations

1. **API Keys**: Never store API keys in your frontend code. Use environment variables and server-side code.
2. **Email Validation**: Always validate email addresses before sending.
3. **Rate Limiting**: Implement rate limiting to prevent abuse.
4. **Unsubscribe Links**: Include unsubscribe links in marketing emails.

## Testing Email Integration

Before going to production:

1. Use test/sandbox environments provided by email services
2. Send test emails to yourself first
3. Check spam folder to ensure deliverability
4. Verify all links and images in the emails work correctly

## Implementation Checklist

- [ ] Choose an email service provider
- [ ] Set up an account and get API keys
- [ ] Install necessary libraries
- [ ] Update the `emailService.js` file with actual implementation
- [ ] Create email templates
- [ ] Test email sending functionality
- [ ] Monitor email deliverability and open rates

## Conclusion

Implementing a proper email service is crucial for providing a good user experience and keeping customers informed about their orders. Choose the provider that best fits your needs and budget, and ensure you follow best practices for email deliverability and security.