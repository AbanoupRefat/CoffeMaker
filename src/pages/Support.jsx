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



      
    </div>
  );
};

export default Support;
