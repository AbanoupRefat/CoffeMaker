const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="coffee-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Support
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Find answers to your most common questions
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
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
    </div>
  );
};

export default Support;
