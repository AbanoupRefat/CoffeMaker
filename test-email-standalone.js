#!/usr/bin/env node

/**
 * Standalone script for testing email functionality
 * This script doesn't rely on the emailService.js module
 * 
 * Usage:
 *   node test-email-standalone.js [command]
 * 
 * Commands:
 *   test-connection   Test connection to the Supabase Edge Function
 *   send-customer     Send a test email to a customer
 *   send-owner        Send a test email to the owner
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
const envFilePath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envFilePath, 'utf-8');

// Parse .env file and set environment variables
const envVars = {};
envContent.split('\n').forEach(line => {
  const trimmedLine = line.trim();
  if (trimmedLine && !trimmedLine.startsWith('#')) {
    const matchResult = trimmedLine.match(/^([^=]+)=(.*)$/);
    if (matchResult) {
      const key = matchResult[1].trim();
      let value = matchResult[2].trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith('\'') && value.endsWith('\'')))
      {
        value = value.substring(1, value.length - 1);
      }
      
      process.env[key] = value;
      envVars[key] = value;
    }
  }
});

// Get Supabase configuration from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const RESEND_API_KEY = process.env.VITE_RESEND_API_KEY;
const OWNER_EMAIL = process.env.VITE_OWNER_EMAIL;

// Log environment variables (without sensitive values)
console.log('Environment variables loaded:');
console.log('- SUPABASE_URL:', SUPABASE_URL ? '✓ Set' : '✗ Not set');
console.log('- SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? '✓ Set' : '✗ Not set');
console.log('- RESEND_API_KEY:', RESEND_API_KEY ? '✓ Set' : '✗ Not set');
console.log('- OWNER_EMAIL:', OWNER_EMAIL);
console.log('');

// Supabase Edge Function URL
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/send-email`;
console.log('Edge Function URL:', EDGE_FUNCTION_URL);

// Sample order data for testing
const sampleOrderData = {
  orderNumber: 'ORD-' + Math.floor(Math.random() * 10000),
  orderDate: new Date().toISOString(),
  orderTotal: 42.99,
  items: [
    {
      id: 1,
      name: 'Ethiopian Yirgacheffe',
      price: 18.99,
      quantity: 1,
      options: {
        grind: 'Whole Bean',
        size: '12 oz'
      }
    },
    {
      id: 2,
      name: 'Colombia Supremo',
      price: 16.99,
      quantity: 1,
      options: {
        grind: 'Espresso',
        size: '12 oz'
      }
    },
    {
      id: 3,
      name: 'Shipping',
      price: 7.01,
      quantity: 1
    }
  ],
  customerInfo: {
    fullName: 'John Doe',
    name: 'John Doe', // Added for compatibility with both formats
    email: '42110092.abanoup@acu.edu.eg', // Replace with your test email
    phone: '555-123-4567',
    address: '123 Coffee St',
    city: 'Seattle',
    state: 'WA',
    postalCode: '98101',
    orderNotes: 'Please leave at the front door.'
  }
};

// Command handlers
const commands = {
  'test-connection': async () => {
    console.log('Testing connection to Supabase Edge Function...');
    try {
      // Make a simple GET request to the Edge Function
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Edge Function connection test passed!', result);
        return true;
      } else {
        console.log('Edge Function connection test failed:', response.status);
        const errorText = await response.text();
        console.log('Error response:', errorText);
        return false;
      }
    } catch (error) {
      console.log('Edge Function connection test error:', error.message);
      return false;
    }
  },
  
  'send-customer': async () => {
    console.log('Sending test email to customer...');
    try {
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          orderData: sampleOrderData,
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

      console.log('Customer email sent successfully!', result);
      return true;
    } catch (error) {
      console.error('Failed to send customer email:', error.message);
      return false;
    }
  },
  
  'send-owner': async () => {
    console.log('Sending test email to owner...');
    try {
      // In test mode, Resend only allows sending to the verified email address
      // We'll simulate the owner email instead of actually sending it
      console.log('⚠️ SIMULATION MODE: In test mode, we cannot send to the owner email');
      console.log('⚠️ This is because Resend only allows sending to verified emails in test mode');
      console.log('⚠️ In a production environment with a verified domain, this would work correctly');
      console.log('\nSimulating owner email for order:', sampleOrderData.orderNumber);
      console.log('To:', OWNER_EMAIL);
      console.log('Subject:', `New Order #${sampleOrderData.orderNumber} - CoffeeCraft Admin Notification`);
      console.log('\nOrder Details:');
      console.log('- Customer:', sampleOrderData.customerInfo.fullName);
      console.log('- Email:', sampleOrderData.customerInfo.email);
      console.log('- Total:', `$${sampleOrderData.orderTotal.toFixed(2)}`);
      console.log('- Items:', sampleOrderData.items.length);
      
      // Return success for simulation
      return true;
    } catch (error) {
      console.error('Failed to send owner email:', error.message);
      return false;
    }
  }
};

// Main function
async function main() {
  const command = process.argv[2];
  
  if (!command) {
    console.log('Please specify a command:');
    console.log('  node test-email-standalone.js [command]');
    console.log('\nAvailable commands:');
    Object.keys(commands).forEach(cmd => console.log(`  ${cmd}`));
    process.exit(1);
  }
  
  if (!commands[command]) {
    console.error(`Unknown command: ${command}`);
    console.log('Available commands:');
    Object.keys(commands).forEach(cmd => console.log(`  ${cmd}`));
    process.exit(1);
  }
  
  try {
    const success = await commands[command]();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();