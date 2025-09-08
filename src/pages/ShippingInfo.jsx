import { Truck, Clock, MapPin, Package } from 'lucide-react';

const ShippingInfo = () => {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 coffee-text-gradient">Shipping Information</h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our shipping policies and delivery options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center mb-4">
              <Truck className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-xl font-semibold">Delivery Options</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li><strong>Standard Shipping:</strong> 3-5 business days</li>
              <li><strong>Express Shipping:</strong> 1-2 business days</li>
              <li><strong>Overnight Shipping:</strong> Next business day</li>
              <li><strong>Local Delivery:</strong> Same day (select areas)</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-xl font-semibold">Processing Time</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li><strong>Regular Orders:</strong> 1-2 business days</li>
              <li><strong>Custom Blends:</strong> 2-3 business days</li>
              <li><strong>Bulk Orders:</strong> 3-5 business days</li>
              <li><strong>Gift Sets:</strong> 1-2 business days</li>
            </ul>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-8 mb-8">
          <div className="flex items-center mb-6">
            <MapPin className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-2xl font-semibold">Shipping Zones & Rates</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Zone</th>
                  <th className="text-left py-3 px-4 font-semibold">Standard</th>
                  <th className="text-left py-3 px-4 font-semibold">Express</th>
                  <th className="text-left py-3 px-4 font-semibold">Overnight</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-3 px-4">Local (50 miles)</td>
                  <td className="py-3 px-4">Free over $50</td>
                  <td className="py-3 px-4">$9.99</td>
                  <td className="py-3 px-4">$19.99</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">Regional (State)</td>
                  <td className="py-3 px-4">$5.99</td>
                  <td className="py-3 px-4">$12.99</td>
                  <td className="py-3 px-4">$24.99</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">National (US)</td>
                  <td className="py-3 px-4">$8.99</td>
                  <td className="py-3 px-4">$16.99</td>
                  <td className="py-3 px-4">$29.99</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Canada</td>
                  <td className="py-3 px-4">$15.99</td>
                  <td className="py-3 px-4">$25.99</td>
                  <td className="py-3 px-4">Not Available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-8 mb-8">
          <div className="flex items-center mb-6">
            <Package className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-2xl font-semibold">Packaging & Freshness</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Our Packaging Promise</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Vacuum-sealed bags with one-way valves</li>
                <li>• Eco-friendly, recyclable materials</li>
                <li>• Protective packaging to prevent damage</li>
                <li>• Roast date clearly marked on every bag</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Freshness Guarantee</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Roasted within 7 days of shipping</li>
                <li>• Small batch roasting for optimal quality</li>
                <li>• Nitrogen flushed for extended freshness</li>
                <li>• Best consumed within 2-3 weeks</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Important Shipping Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Order Cutoff Times</h3>
              <p>Orders placed before 2 PM EST ship the same day (Monday-Friday)</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Weekend Orders</h3>
              <p>Orders placed on weekends will be processed on the next business day</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Holiday Shipping</h3>
              <p>Shipping may be delayed during major holidays. Check our holiday schedule for details</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Weather Delays</h3>
              <p>Severe weather conditions may cause shipping delays beyond our control</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-card rounded-lg border border-border p-8">
            <h2 className="text-2xl font-bold mb-4">Need Help with Shipping?</h2>
            <p className="text-muted-foreground mb-6">
              Have questions about your order or need to make changes? Contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@coffeecraft.com"
                className="btn-coffee px-6 py-3 rounded-lg font-semibold"
              >
                Email Support
              </a>
              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
