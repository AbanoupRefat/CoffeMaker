// This script demonstrates how to use the email functionality

import { sendOrderConfirmationEmail, sendOrderNotificationToOwner, getEmailPreview, testEdgeFunctionConnection } from './src/lib/emailService.js';

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
    email: '42110092.abanoup@acu.edu.eg', // Replace with your test email
    phone: '555-123-4567',
    address: '123 Coffee St',
    city: 'Seattle',
    state: 'WA',
    postalCode: '98101',
    orderNotes: 'Please leave at the front door.'
  }
};

// Main function to demonstrate email functionality
async function demonstrateEmailFunctionality() {
  console.log('Testing email functionality...');
  
  // 1. Test Edge Function Connection
  console.log('\n1. Testing Edge Function connection...');
  try {
    const connectionResult = await testEdgeFunctionConnection();
    console.log('Edge Function connection test result:', connectionResult);
  } catch (error) {
    console.error('Edge Function connection test failed:', error.message);
  }
  
  // 2. Generate Email Preview
  console.log('\n2. Generating email previews...');
  try {
    const customerEmailHtml = getEmailPreview(sampleOrderData, 'confirmation');
    console.log('Customer email preview generated successfully!');
    console.log('Preview length:', customerEmailHtml.length, 'characters');
    
    const ownerEmailHtml = getEmailPreview(sampleOrderData, 'notification');
    console.log('Owner email preview generated successfully!');
    console.log('Preview length:', ownerEmailHtml.length, 'characters');
  } catch (error) {
    console.error('Email preview generation failed:', error.message);
  }
  
  // 3. Send Customer Confirmation Email
  console.log('\n3. Sending customer confirmation email...');
  try {
    const customerEmailResult = await sendOrderConfirmationEmail(sampleOrderData);
    console.log('Customer email sent successfully!', customerEmailResult);
  } catch (error) {
    console.error('Customer email sending failed:', error.message);
  }
  
  // 4. Send Owner Notification Email
  console.log('\n4. Sending owner notification email...');
  try {
    const ownerEmailResult = await sendOrderNotificationToOwner(sampleOrderData);
    console.log('Owner email sent successfully!', ownerEmailResult);
  } catch (error) {
    console.error('Owner email sending failed:', error.message);
  }
  
  console.log('\nEmail functionality demonstration completed!');
}

// Run the demonstration
demonstrateEmailFunctionality().catch(error => {
  console.error('Demonstration failed:', error);
});
