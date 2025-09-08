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

export const OrderConfirmationEmail = ({
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

  const estimatedDeliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Html>
      <Head />
      <Preview>Your CoffeeCraft Order Confirmation #{orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/logo.png`}
              width="120"
              height="40"
              alt="CoffeeCraft"
              style={logo}
            />
          </Section>
          
          {/* Hero Section */}
          <Section style={heroSection}>
            <Heading style={heading}>Order Confirmed!</Heading>
            <Text style={heroText}>Thank you for your order. We've received your order and will process it shortly.</Text>
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
                  <Text style={itemPrice}>${parseFloat(item.price).toFixed(2)}</Text>
                </Column>
              </Row>
            ))}
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

          {/* Delivery Timeline */}
          <Section style={deliverySection}>
            <Heading as="h2" style={subheading}>Delivery Timeline</Heading>
            <Text style={deliveryText}>
              Your order is being processed and will be shipped soon. Estimated delivery date: <strong>{estimatedDeliveryDate}</strong>
            </Text>
            <Row style={deliverySteps}>
              <Column style={deliveryStep}>
                <Text style={deliveryStepTitle}>Order Received</Text>
              </Column>
              <Column style={deliveryStep}>
                <Text style={deliveryStepTitle}>Processing</Text>
              </Column>
              <Column style={deliveryStep}>
                <Text style={deliveryStepTitle}>Shipping</Text>
              </Column>
              <Column style={deliveryStep}>
                <Text style={deliveryStepTitle}>Delivery</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* What's Next */}
          <Section style={section}>
            <Heading as="h2" style={subheading}>What Happens Next?</Heading>
            <Text style={paragraphText}>
              1. <strong>Order Processing:</strong> We're preparing your order for shipment.
            </Text>
            <Text style={paragraphText}>
              2. <strong>Packaging:</strong> Your coffee will be carefully packaged to maintain freshness.
            </Text>
            <Text style={paragraphText}>
              3. <strong>Shipping:</strong> Once shipped, you'll receive a tracking number via email.
            </Text>
            <Text style={paragraphText}>
              4. <strong>Delivery:</strong> Your package will arrive at your doorstep. Enjoy your coffee!
            </Text>
          </Section>

          {/* Support */}
          <Section style={supportSection}>
            <Heading as="h2" style={subheading}>Need Help?</Heading>
            <Text style={paragraphText}>
              If you have any questions about your order, please contact our customer service:
            </Text>
            <Text style={paragraphText}>
              Email: <Link href="mailto:support@coffeecraft.com" style={link}>support@coffeecraft.com</Link>
            </Text>
            <Text style={paragraphText}>
              Phone: <Link href="tel:+15551234567" style={link}>(555) 123-4567</Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} CoffeeCraft. All rights reserved.
            </Text>
            <Text style={footerText}>
              <Link href={`${baseUrl}`} style={footerLink}>Visit Our Website</Link> • 
              <Link href={`${baseUrl}/products`} style={footerLink}>Shop</Link> • 
              <Link href={`${baseUrl}/faq`} style={footerLink}>FAQ</Link>
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
};

const logo = {
  margin: '0 auto',
};

const heroSection = {
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#5A3E2B',
  color: '#ffffff',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '10px 0',
  color: '#ffffff',
};

const heroText = {
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

const addressText = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#333333',
};

const deliverySection = {
  padding: '20px',
  backgroundColor: '#f9f5f1',
};

const deliveryText = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#333333',
  marginBottom: '15px',
};

const deliverySteps = {
  textAlign: 'center',
};

const deliveryStep = {
  padding: '10px',
};

const deliveryStepTitle = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#5A3E2B',
  margin: '5px 0 0',
};

const paragraphText = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#333333',
  margin: '0 0 10px',
};

const supportSection = {
  padding: '20px',
  backgroundColor: '#f9f5f1',
};

const link = {
  color: '#5A3E2B',
  textDecoration: 'underline',
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

const footerLink = {
  color: '#ffffff',
  textDecoration: 'underline',
};

export default OrderConfirmationEmail;