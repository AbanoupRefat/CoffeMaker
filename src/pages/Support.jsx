import { Mail, Phone, MessageCircle, Clock, MapPin } from 'lucide-react';

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="coffee-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Customer Support
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            We're here to help you with any questions or concerns
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
              <p className="text-muted-foreground mb-2">1-800-COFFEE-1</p>
              <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-2">support@coffeemaker.com</p>
              <p className="text-sm text-muted-foreground">Response within 24 hours</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-2">Available on website</p>
              <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <h3 className="text-lg font-semibold mb-2">How long does shipping take?</h3>
              <p className="text-muted-foreground">
                We offer free standard shipping on orders over $50, which typically takes 3-5 business days. 
                Express shipping options are available for faster delivery.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <h3 className="text-lg font-semibold mb-2">What is your return policy?</h3>
              <p className="text-muted-foreground">
                We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, 
                you can return it for a full refund or exchange.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <h3 className="text-lg font-semibold mb-2">How do you ensure coffee freshness?</h3>
              <p className="text-muted-foreground">
                All our coffee is roasted to order and shipped within 24 hours of roasting. 
                We use one-way valve bags to preserve freshness during shipping.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <h3 className="text-lg font-semibold mb-2">Do you offer subscriptions?</h3>
              <p className="text-muted-foreground">
                Yes! We offer flexible subscription plans that deliver fresh coffee to your door 
                at your preferred frequency, with a 10% discount on all subscription orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Business Hours</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <Clock className="w-12 h-12 coffee-gradient rounded-full p-2 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <MapPin className="w-12 h-12 coffee-gradient rounded-full p-2 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-4">Headquarters</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>123 Coffee Street</p>
                <p>Bean City, BC 12345</p>
                <p>United States</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
