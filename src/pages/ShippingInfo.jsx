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
              <li><strong>Standard Shipping:</strong> 3-7 business days</li>
              <li><strong>Express Shipping:</strong> 1-2 business days</li>

            </ul>
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

                <li>• Best consumed within 2-3 weeks</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Important Shipping Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground">

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


      </div>
    </div>
  );
};

export default ShippingInfo;
