#!/usr/bin/env node

/**
 * Command-line interface for testing email functionality
 * 
 * Usage:
 *   node test-email-cli.js [command]
 * 
 * Commands:
 *   test-connection   Test connection to the Supabase Edge Function
 *   preview-customer  Generate a preview of the customer email
 *   preview-owner     Generate a preview of the owner email
 *   send-customer     Send a test email to a customer
 *   send-owner        Send a test email to the owner
 *   send-both         Send test emails to both customer and owner
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

// Set up import.meta.env for compatibility with emailService.js
globalThis.import = globalThis.import || {};
globalThis.import.meta = globalThis.import.meta || {};
globalThis.import.meta.env = globalThis.import.meta.env || {};

// Copy environment variables to import.meta.env
Object.keys(process.env).forEach(key => {
  if (key.startsWith('VITE_')) {
    globalThis.import.meta.env[key] = process.env[key];
  }
});

// Log the environment variables that will be used
console.log('Setting up environment variables for emailService.js:');
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Not set');
console.log('VITE_RESEND_API_KEY:', process.env.VITE_RESEND_API_KEY ? '✓ Set' : '✗ Not set');
console.log('VITE_OWNER_EMAIL:', process.env.VITE_OWNER_EMAIL);
console.log('VITE_APP_URL:', process.env.VITE_APP_URL);
console.log('');

// Import emailService after setting up environment variables
import {
  testEdgeFunctionConnection,
  sendOrderConfirmationEmail,
  sendOrderNotificationToOwner,
  getEmailPreview
} from './src/lib/emailService.js';

// Get environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const RESEND_API_KEY = process.env.VITE_RESEND_API_KEY;
const OWNER_EMAIL = process.env.VITE_OWNER_EMAIL;
const APP_URL = process.env.VITE_APP_URL;

// Log environment variables (without sensitive values)
console.log('Environment variables loaded:');
console.log('- SUPABASE_URL:', SUPABASE_URL ? '✓ Set' : '✗ Not set');
console.log('- SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? '✓ Set' : '✗ Not set');
console.log('- RESEND_API_KEY:', RESEND_API_KEY ? '✓ Set' : '✗ Not set');
console.log('- OWNER_EMAIL:', OWNER_EMAIL);
console.log('- APP_URL:', APP_URL);
console.log('');

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
    const result = await testEdgeFunctionConnection();
    console.log('Connection test result:', result);
    return result;
  },
  
  'preview-customer': async () => {
    console.log('Generating customer email preview...');
    const html = await getEmailPreview(sampleOrderData, 'confirmation');
    console.log('Preview generated! HTML length:', html.length);
    console.log('\nTo view the preview in a browser, run:');
    console.log('node open-email-preview.js');
    return true;
  },
  
  'preview-owner': async () => {
    console.log('Generating owner email preview...');
    const html = await getEmailPreview(sampleOrderData, 'notification');
    console.log('Preview generated! HTML length:', html.length);
    console.log('\nTo view the preview in a browser, run:');
    console.log('node open-email-preview.js');
    return true;
  },
  
  'send-customer': async () => {
    console.log('Sending test email to customer...');
    try {
      const result = await sendOrderConfirmationEmail(sampleOrderData);
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
      
      // Uncomment this in production with a verified domain
      // const result = await sendOrderNotificationToOwner(sampleOrderData);
      // console.log('Owner email sent successfully!', result);
      // return true;
    } catch (error) {
      console.error('Failed to send owner email:', error.message);
      return false;
    }
  },
  
  'send-both': async () => {
    console.log('Sending test emails to both customer and owner...');
    const customerResult = await commands['send-customer']();
    console.log('');
    const ownerResult = await commands['send-owner']();
    return customerResult && ownerResult;
  }
};

// Main function
async function main() {
  const command = process.argv[2];
  
  if (!command) {
    console.log('Please specify a command:');
    console.log('  node test-email-cli.js [command]');
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