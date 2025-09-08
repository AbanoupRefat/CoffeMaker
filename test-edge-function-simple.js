// Simple script to test Supabase Edge Function connection with minimal data

// Get Supabase configuration from environment variables or hardcode for testing
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://nnjfobczkonetmxpgnjz.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uamZvYmN6a29uZXRteHBnbmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTU4NTYsImV4cCI6MjA2OTA5MTg1Nn0.Pd1sj6sTeES_eTj5Ea75wsCVIZmIRh20NDVx0GYUkzU';

// Edge Function URL
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/send-email`;

async function testEdgeFunctionSimple() {
  console.log('🧪 Testing Edge Function with simple request...');
  console.log('Edge Function URL:', EDGE_FUNCTION_URL);
  
  try {
    console.log('Sending simple GET request to Edge Function...');
    
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    console.log('Response status:', response.status);
    
    const responseText = await response.text();
    console.log('Response text:', responseText);

    if (response.ok) {
      console.log('✅ Edge Function simple test passed!');
      return true;
    } else {
      console.log('❌ Edge Function simple test failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Edge Function simple test error:', error.message);
    return false;
  }
}

// Run the test
testEdgeFunctionSimple();