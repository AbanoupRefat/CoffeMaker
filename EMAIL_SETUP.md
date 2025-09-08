# Email Setup for CoffeeCraft Website

## Overview

The CoffeeCraft website uses Supabase Edge Functions with Resend to send emails. This setup allows for:

- Order confirmation emails to customers
- Order notification emails to the business owner
- Email previews for testing

## Configuration

### 1. Environment Variables

Ensure the following environment variables are set in your `.env.local` file:

```
VITE_SUPABASE_URL="your-supabase-project-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
VITE_RESEND_API_KEY="your-resend-api-key"
VITE_OWNER_EMAIL="your-business-email"
VITE_APP_URL="your-app-url"
```

### 2. Supabase Edge Function Setup

The Supabase Edge Function is located in `supabase/functions/send-email/`. It handles:

- Processing email requests
- Formatting email content
- Sending emails via Resend API

To deploy the edge function:

```bash
npx supabase functions deploy send-email
```

### 3. Resend API Key

You need a valid Resend API key to send emails. The key should be:

- Added to your `.env.local` file as `VITE_RESEND_API_KEY`
- Added to your Supabase project secrets:

```bash
npx supabase secrets set RESEND_API_KEY=your-resend-api-key
npx supabase secrets set OWNER_EMAIL=your-business-email
```

## Usage

### Sending Emails

The `emailService.js` file provides functions for sending emails:

```javascript
import { sendOrderConfirmationEmail, sendOrderNotificationToOwner } from './lib/emailService';

// Send confirmation email to customer
await sendOrderConfirmationEmail(orderData);

// Send notification email to owner
await sendOrderNotificationToOwner(orderData);
```

### Email Preview

You can preview emails without sending them:

```javascript
import { getEmailPreview } from './lib/emailService';

// Get HTML preview of confirmation email
const confirmationHtml = getEmailPreview(orderData, 'confirmation');

// Get HTML preview of notification email
const notificationHtml = getEmailPreview(orderData, 'notification');
```

### Testing Edge Function Connection

You can test the connection to the Supabase Edge Function:

```javascript
import { testEdgeFunctionConnection } from './lib/emailService';

const isConnected = await testEdgeFunctionConnection();
console.log('Edge Function connection:', isConnected ? 'OK' : 'Failed');
```

## Troubleshooting

### Common Issues

1. **Invalid JWT Error**: Ensure your Supabase anon key is correct and up to date.

2. **Domain Not Verified**: When using a custom domain in the 'from' email address, the domain must be verified in Resend. For testing, use `onboarding@resend.dev` as the 'from' address.

3. **RESEND_API_KEY Not Configured**: Make sure the RESEND_API_KEY is set in both your `.env.local` file and Supabase secrets.

### Testing Tools

Use the provided test scripts to verify your setup:

- `test-resend.js`: Tests the Resend API key directly
- `test-edge-function.js`: Tests sending an email through the Supabase Edge Function
- `test-edge-function-simple.js`: Tests the basic connectivity to the Edge Function

## Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Supabase Edge Functions Documentation](https://supabase.com/docs/guides/functions)