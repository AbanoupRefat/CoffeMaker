import React from 'react';
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

// Use import.meta.env for Vite environment variables
const baseUrl = import.meta.env?.VITE_APP_URL || 'https://coffeecraft.com';

export const OrderNotificationEmail = ({
  orderNumber,
  orderDate,
  orderTotal,
  paymentMethod,
  items = [],
  customerInfo = {},
  shippingAddress = {},
}) => {
  const formattedDate = new Date(orderDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate subtotal, tax, and shipping
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax rate

  return (
    <Html>
      <Head />
      <Preview>New Order #{orderNumber} - CoffeeCraft Admin Notification</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src={`/assets/logo.png`}
              width="120"
              height="40"
              alt="CoffeeCraft"
              style={logo}
            />
            <Heading style={adminHeading}>ADMIN NOTIFICATION</Heading>
          </Section>
          
          {/* Order Alert */}
          <Section style={alertSection}>
            <Heading style={alertHeading}>New Order Received!</Heading>
            <Text style={alertText}>A new order has been placed and requires your attention.</Text>
          </Section>

          {/* Order Info */}
          <Section style={orderInfoSection}>
            <Row>
              <Column>
                <Text style={orderInfoLabel}>Order Number:</Text>
                <Text style={orderInfoValue}>#{orderNumber}</Text>
              </Column>
              <Column>
                <Text style={orderInfoLabel}>Order Date:</Text>
                <Text style={orderInfoValue}>{formattedDate}</Text>
              </Column>
            </Row>
            <Row style={{ marginTop: '12px' }}>
              <Column>
                <Text style={orderInfoLabel}>Payment Method:</Text>
                <Text style={orderInfoValue}>{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod}</Text>
              </Column>
              <Column>
                <Text style={orderInfoLabel}>Order Total:</Text>
                <Text style={orderInfoValue}>${parseFloat(orderTotal).toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Customer Info */}
          <Section style={section}>
            <Heading as="h2" style={subheading}>Customer Information</Heading>
            <Row>
              <Column>
                <Text style={customerInfoLabel}>Name:</Text>
                <Text style={customerInfoValue}>{customerInfo.name}</Text>
              </Column>
              <Column>
                <Text style={customerInfoLabel}>Email:</Text>
                <Text style={customerInfoValue}>{customerInfo.email}</Text>
              </Column>
            </Row>
            <Row style={{ marginTop: '12px' }}>
              <Column>
                <Text style={customerInfoLabel}>Phone:</Text>
                <Text style={customerInfoValue}>{customerInfo.phone || 'Not provided'}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Shipping Address */}
          <Section style={section}>
            <Heading as="h2" style={subheading}>Shipping Address</Heading>
            <Text style={addressText}>
              {customerInfo.name}<br />
              {shippingAddress.street}<br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}<br />
              {shippingAddress.country}
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Order Items */}
          <Section style={section}>
            <Heading as="h2" style={subheading}>Order Items</Heading>
            
            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={itemImageColumn}>
                  <Img
                    src={item.image || `${baseUrl}/placeholder.png`}
                    width="80"
                    height="80"
                    alt={item.name}
                    style={itemImage}
                  />
                </Column>
                <Column style={itemDetailsColumn}>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemDetails}>Size: {item.size}</Text>
                  <Text style={itemDetails}>Quantity: {item.quantity}</Text>
                  <Text style={itemDetails}>Unit Price: ${parseFloat(item.price).toFixed(2)}</Text>
                  <Text style={itemPrice}>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
                </Column>
              </Row>
            ))}

            {/* Order Summary */}
            <Row style={summaryRow}>
              <Column style={{ width: '70%' }}>
                <Text style={summaryLabel}>Subtotal:</Text>
                <Text style={summaryLabel}>Shipping:</Text>
                <Text style={summaryLabel}>Tax (8%):</Text>
                <Text style={summaryTotal}>Total:</Text>
              </Column>
              <Column style={{ width: '30%', textAlign: 'right' }}>
                <Text style={summaryValue}>${subtotal.toFixed(2)}</Text>
                <Text style={summaryValue}>${shipping.toFixed(2)}</Text>
                <Text style={summaryValue}>${tax.toFixed(2)}</Text>
                <Text style={summaryTotalValue}>${parseFloat(orderTotal).toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          {/* Action Buttons */}
          <Section style={actionSection}>
            <Link href={`${baseUrl}/admin/orders/${orderNumber}`} style={primaryButton}>
              View Order Details
            </Link>
            <Link href={`${baseUrl}/admin/orders`} style={secondaryButton}>
              View All Orders
            </Link>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This is an automated notification from the CoffeeCraft system.
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} CoffeeCraft. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0',
  maxWidth: '600px',
};

const header = {
  padding: '20px',
  textAlign: 'center',
};

const logo = {
  margin: '0 auto',
};

const adminHeading = {
  fontSize: '12px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: '#666666',
  margin: '10px 0 0',
};

const alertSection = {
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#5A3E2B',
  color: '#ffffff',
};

const alertHeading = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '10px 0',
  color: '#ffffff',
};

const alertText = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#ffffff',
};

const orderInfoSection = {
  padding: '20px',
  backgroundColor: '#f9f5f1',
};

const orderInfoLabel = {
  fontSize: '14px',
  color: '#666666',
  margin: '0',
};

const orderInfoValue = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#333333',
  margin: '4px 0 0',
};

const section = {
  padding: '20px',
};

const subheading = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 15px',
  color: '#5A3E2B',
};

const divider = {
  borderTop: '1px solid #e6ebf1',
  margin: '0',
};

const customerInfoLabel = {
  fontSize: '14px',
  color: '#666666',
  margin: '0',
};

const customerInfoValue = {
  fontSize: '16px',
  color: '#333333',
  margin: '4px 0 0',
};

const addressText = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#333333',
};

const itemRow = {
  marginBottom: '15px',
};

const itemImageColumn = {
  width: '80px',
  verticalAlign: 'top',
};

const itemImage = {
  borderRadius: '4px',
  border: '1px solid #e6ebf1',
};

const itemDetailsColumn = {
  paddingLeft: '15px',
  verticalAlign: 'top',
};

const itemName = {
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 5px',
  color: '#333333',
};

const itemDetails = {
  fontSize: '14px',
  color: '#666666',
  margin: '0 0 3px',
};

const itemPrice = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#333333',
  margin: '5px 0 0',
};

const summaryRow = {
  marginTop: '20px',
  padding: '15px',
  backgroundColor: '#f9f5f1',
  borderRadius: '4px',
};

const summaryLabel = {
  fontSize: '14px',
  color: '#666666',
  margin: '0 0 5px',
  textAlign: 'right',
};

const summaryValue = {
  fontSize: '14px',
  color: '#333333',
  margin: '0 0 5px',
};

const summaryTotal = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#333333',
  margin: '10px 0 0',
  textAlign: 'right',
};

const summaryTotalValue = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#333333',
  margin: '10px 0 0',
};

const actionSection = {
  padding: '20px',
  textAlign: 'center',
};

const primaryButton = {
  backgroundColor: '#5A3E2B',
  color: '#ffffff',
  padding: '12px 20px',
  borderRadius: '4px',
  fontWeight: 'bold',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '0 10px',
};

const secondaryButton = {
  backgroundColor: '#f9f5f1',
  color: '#5A3E2B',
  padding: '12px 20px',
  borderRadius: '4px',
  fontWeight: 'bold',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '0 10px',
  border: '1px solid #5A3E2B',
};

const footer = {
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#333333',
  color: '#ffffff',
};

const footerText = {
  fontSize: '12px',
  color: '#ffffff',
  margin: '5px 0',
};

export default OrderNotificationEmail;