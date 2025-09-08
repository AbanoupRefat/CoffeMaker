// Simple script to test Supabase Edge Function email sending

// Get Supabase configuration from environment variables or hardcode for testing
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://nnjfobczkonetmxpgnjz.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uamZvYmN6a29uZXRteHBnbmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTU4NTYsImV4cCI6MjA2OTA5MTg1Nn0.Pd1sj6sTeES_eTj5Ea75wsCVIZmIRh20NDVx0GYUkzU';

// Edge Function URL
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/send-email`;

async function testEdgeFunctionEmailSending() {
  console.log('🧪 Testing Edge Function connection...');
  console.log('Edge Function URL:', EDGE_FUNCTION_URL);
  
  try {
    console.log('Testing edge function email sending...');
    
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        orderData: {
          orderNumber: 'TEST-002',
          customerInfo: {
            name: 'Test User',
            email: '42110092.abanoup@acu.edu.eg' // Use the verified email address
          },
          items: [{ name: 'Test Coffee', price: 5.00, quantity: 1 }],
          orderTotal: '$5.00'
        },
        type: 'customer'
      }),
    });
    
    console.log('Response status:', response.status);
    const responseData = await response.json();
    console.log('Response data:', JSON.stringify(responseData, null, 2));
    
    if (response.ok && responseData.success) {
      console.log('✅ Edge Function email test passed! Email sent with ID:', responseData.messageId);
      return true;
    } else {
      console.error('❌ Edge Function email test failed:', responseData.error || 'Unknown error');
      return false;
    }
  } catch (error) {
    console.log('❌ Edge Function connection test error:', error.message);
    return false;
  }
}

// Run the test
testEdgeFunctionEmailSending();