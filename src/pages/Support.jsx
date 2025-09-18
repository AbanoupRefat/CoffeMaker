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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp Support</h3>
              <p className="text-muted-foreground mb-2"><a href="https://wa.me/+201001246102" target="_blank" rel="noopener noreferrer" className="hover:underline">+201001246102</a></p>
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instagram</h3>
              <p className="text-muted-foreground mb-2"><a href="https://www.instagram.com/coffeemaker.cr" target="_blank" rel="noopener noreferrer" className="hover:underline">@coffeemaker.cr</a></p>
              <p className="text-sm text-muted-foreground">Follow us for updates</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Facebook</h3>
              <p className="text-muted-foreground mb-2"><a href="https://www.facebook.com/coffeemaker.cr" target="_blank" rel="noopener noreferrer" className="hover:underline">coffeemaker.cr</a></p>
              <p className="text-sm text-muted-foreground">Message us anytime</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
                  <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                  <path d="M15 8v8a4 4 0 0 1-4 4"/>
                  <line x1="15" y1="4" x2="15" y2="12"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">TikTok</h3>
              <p className="text-muted-foreground mb-2"><a href="https://www.tiktok.com/@coffeemakercr?_t=ZS-8zYoCB9yWXw&_r=1" target="_blank" rel="noopener noreferrer" className="hover:underline">@coffeemakercr</a></p>
              <p className="text-sm text-muted-foreground">Watch our latest videos</p>
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
                We offer free standard shipping on orders over $50, which typically takes 3-7 business days. 
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

      
    </div>
  );
};

export default Support;
