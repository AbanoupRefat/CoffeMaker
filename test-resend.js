// Simple script to test Resend API key
import { Resend } from 'resend';

// Get API key from environment variable or hardcode for testing only
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_ay5Y6g3P_JZU8arQYfsvCrYwRavK3iB2R';

// Initialize Resend
const resend = new Resend(RESEND_API_KEY);

async function testResendApiKey() {
  console.log('Testing Resend API key...');
  
  try {
    // Try to send a test email
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use Resend's test email address
      to: '42110092.abanoup@acu.edu.eg', // Use the email address shown in the error message
      subject: 'Test Email from Coffee Website',
      html: '<p>This is a test email to verify the Resend API key is working.</p>',
    });
    
    if (error) {
      console.error('❌ Error testing Resend API key:', error);
      return false;
    }
    
    console.log('✅ Resend API key is valid! Email sent with ID:', data.id);
    return true;
  } catch (error) {
    console.error('❌ Exception testing Resend API key:', error.message);
    return false;
  }
}

// Run the test
testResendApiKey();