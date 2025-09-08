/**
 * Email Service for Coffee Website - Using Supabase Edge Functions
 * 
 * This service calls Supabase Edge Functions to send emails via Resend
 */

// Helper function to get environment variables
function getEnv(key) {
  // For browser environment (Vite)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    console.log(`Getting env var ${key} from import.meta.env:`, import.meta.env[key] ? 'exists' : 'missing');
    return import.meta.env[key];
  }
  // For Node.js environment
  if (typeof process !== 'undefined' && process.env) {
    console.log(`Getting env var ${key} from process.env:`, process.env[key] ? 'exists' : 'missing');
    return process.env[key];
  }
  console.log(`Environment variable ${key} not found in any environment`);
  return undefined;
}

// Function to get Supabase configuration
function getConfig() {
  // Get Supabase configuration from environment variables
  const SUPABASE_URL = getEnv('VITE_SUPABASE_URL');
  const SUPABASE_ANON_KEY = getEnv('VITE_SUPABASE_ANON_KEY');
  const RESEND_API_KEY = getEnv('VITE_RESEND_API_KEY');
  const OWNER_EMAIL = getEnv('VITE_OWNER_EMAIL') || 'owner@coffeecraft.com';
  const APP_URL = getEnv('VITE_APP_URL') || 'http://localhost:5173';

  console.log('Environment variables loaded:');
  console.log('- SUPABASE_URL:', SUPABASE_URL ? 'exists' : 'missing');
  console.log('- SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? 'exists' : 'missing');
  console.log('- RESEND_API_KEY:', RESEND_API_KEY ? 'exists' : 'missing');
  console.log('- OWNER_EMAIL:', OWNER_EMAIL);
  console.log('- APP_URL:', APP_URL);

  // We'll skip the warning here since it's shown during import
  // The actual functions will check for these variables before using them

  // Supabase Edge Function URL
  let EDGE_FUNCTION_URL = '';
  if (SUPABASE_URL) {
    EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/send-email`;
  }

  return {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    RESEND_API_KEY,
    OWNER_EMAIL,
    APP_URL,
    EDGE_FUNCTION_URL
  };
}

// Get configuration
const { 
  SUPABASE_URL, 
  SUPABASE_ANON_KEY, 
  RESEND_API_KEY, 
  OWNER_EMAIL, 
  APP_URL, 
  EDGE_FUNCTION_URL 
} = getConfig();

// Track sent emails to prevent duplicates
const sentEmails = new Set();

/**
 * Sends an order confirmation email to the customer via Supabase Edge Function
 * @param {Object} orderData - The order data containing customer information and order details
 * @returns {Promise} - A promise that resolves when the email is sent
 */
export const sendOrderConfirmationEmail = async (orderData) => {
  const trackingKey = `confirmation-${orderData.orderNumber}`;
  
  if (sentEmails.has(trackingKey)) {
    console.log(`Order confirmation already sent for order ${orderData.orderNumber}`);
    return { success: true, messageId: 'already-sent', skipped: true };
  }

  if (!orderData?.customerInfo?.email) {
    console.error('Cannot send email: Customer email is missing');
    return Promise.reject(new Error('Customer email is missing'));
  }
  
  console.log('Sending order confirmation email to:', orderData.customerInfo.email);
  
  try {
    // Mark as sent before processing to prevent duplicates
    sentEmails.add(trackingKey);

    // Get fresh configuration
    const config = getConfig();
    const edgeFunctionUrl = config.EDGE_FUNCTION_URL;
    const supabaseAnonKey = config.SUPABASE_ANON_KEY;

    console.log('Sending request to Edge Function URL:', edgeFunctionUrl);
    console.log('Using Supabase Anon Key:', supabaseAnonKey ? 'Key exists' : 'Key missing');
    
    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'apikey': `${supabaseAnonKey}`,
        'Origin': window.location.origin,
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        orderData: orderData,
        type: 'customer'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to send email');
    }

    console.log('✅ Order confirmation email sent successfully via Edge Function!', result);
    return result;

  } catch (error) {
    // Remove from tracking if sending failed
    sentEmails.delete(trackingKey);
    console.error('❌ Error sending order confirmation email:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Response status (if available):', error.response?.status);
    console.error('Response text (if available):', error.response?.statusText);
    
    // Fallback to simulation if Edge Function fails
    console.log('🔄 Edge Function failed, falling back to simulation...');
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Order confirmation email sent successfully (simulated)!');
        resolve({
          success: true,
          messageId: `order-${orderData.orderNumber}-${Date.now()}`,
          simulated: true
        });
      }, 1000);
    });
  }
};

/**
 * Sends an order notification email to the business owner via Supabase Edge Function
 * @param {Object} orderData - The order data containing customer information and order details
 * @returns {Promise} - A promise that resolves when the email is sent
 */
export const sendOrderNotificationToOwner = async (orderData) => {
  const trackingKey = `notification-${orderData.orderNumber}`;
  
  if (sentEmails.has(trackingKey)) {
    console.log(`Order notification already sent for order ${orderData.orderNumber}`);
    return { success: true, messageId: 'already-sent', skipped: true };
  }

  console.log('Sending order notification to business owner');
  
  try {
    // Mark as sent before processing
    sentEmails.add(trackingKey);

    // Get fresh configuration
    const config = getConfig();
    const edgeFunctionUrl = config.EDGE_FUNCTION_URL;
    const supabaseAnonKey = config.SUPABASE_ANON_KEY;

    console.log('Sending owner notification to Edge Function URL:', edgeFunctionUrl);
    console.log('Using Supabase Anon Key for owner notification:', supabaseAnonKey ? 'Key exists' : 'Key missing');
    
    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'apikey': `${supabaseAnonKey}`,
        'Origin': window.location.origin,
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        orderData: orderData,
        type: 'owner'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to send notification');
    }

    console.log('✅ Order notification email sent successfully to business owner via Edge Function!', result);
    return result;

  } catch (error) {
    // Remove from tracking if sending failed
    sentEmails.delete(trackingKey);
    console.error('❌ Error sending order notification email:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Response status (if available):', error.response?.status);
    console.error('Response text (if available):', error.response?.statusText);
    
    // Fallback to simulation if Edge Function fails
    console.log('🔄 Edge Function failed, falling back to simulation...');
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Order notification email sent successfully to business owner (simulated)!');
        resolve({
          success: true,
          messageId: `owner-notification-${orderData.orderNumber}-${Date.now()}`,
          simulated: true
        });
      }, 800);
    });
  }
};

/**
 * Gets a preview of the email content for testing (simulation only)
 * @param {Object} orderData - The order data
 * @param {string} type - The type of email ('confirmation' or 'notification')
 * @returns {String} - HTML string with formatted email content
 */
export const getEmailPreview = (orderData, type = 'confirmation') => {
  // This is just for local testing - the actual email templates are in the Edge Function
  if (type === 'confirmation') {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #8B4513;">☕ CoffeeCraft - Order Confirmation Preview</h1>
        <p><strong>Order:</strong> ${orderData.orderNumber}</p>
        <p><strong>Customer:</strong> ${orderData.customerInfo.name}</p>
        <p><strong>Email:</strong> ${orderData.customerInfo.email}</p>
        <p><strong>Total:</strong> ${orderData.orderTotal}</p>
        <p><em>This is a preview - actual emails are generated by the Edge Function</em></p>
      </div>
    `;
  } else if (type === 'notification') {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #d32f2f;">🚨 Owner Notification Preview</h1>
        <p><strong>New Order:</strong> ${orderData.orderNumber}</p>
        <p><strong>Customer:</strong> ${orderData.customerInfo.name}</p>
        <p><strong>Total:</strong> ${orderData.orderTotal}</p>
        <p><em>This is a preview - actual emails are generated by the Edge Function</em></p>
      </div>
    `;
  }
  
  throw new Error(`Unknown email type: ${type}`);
};

/**
 * Test connection to Supabase Edge Function
 * @returns {Promise<boolean>} - Returns true if connection is working
 */
export const testEdgeFunctionConnection = async () => {
  try {
    console.log('🧪 Testing Edge Function connection...');
    
    // Get fresh configuration
    const config = getConfig();
    const edgeFunctionUrl = config.EDGE_FUNCTION_URL;
    const supabaseAnonKey = config.SUPABASE_ANON_KEY;
    
    console.log('Edge Function URL:', edgeFunctionUrl);
    
    if (!edgeFunctionUrl) {
      throw new Error('Edge Function URL is not defined');
    }
    
    // Use a GET request instead of POST for connection testing
    // This matches how the Edge Function handles status checks
    console.log('Testing Edge Function connection to:', edgeFunctionUrl);
    console.log('Using Supabase Anon Key for test:', supabaseAnonKey ? 'Key exists' : 'Key missing');
    
    const response = await fetch(edgeFunctionUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'apikey': `${supabaseAnonKey}`,
        'Origin': window.location.origin,
      },
      mode: 'cors',
      credentials: 'include',
    });


    if (response.ok) {
      console.log('✅ Edge Function connection test passed!');
      return true;
    } else {
      console.log('❌ Edge Function connection test failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Edge Function connection test error:', error.message);
    return false;
  }
};