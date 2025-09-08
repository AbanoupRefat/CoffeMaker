import { RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Returns = () => {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 coffee-text-gradient">Returns & Exchanges</h1>
          <p className="text-lg text-muted-foreground">
            We want you to love your coffee. If you're not satisfied, we're here to help.
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border p-8 mb-8">
          <div className="flex items-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-semibold">Our 100% Satisfaction Guarantee</h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            At CoffeeCraft, we stand behind the quality of our products. If you're not completely satisfied 
            with your purchase, we'll make it right with a full refund or exchange within 30 days of purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center mb-4">
              <RotateCcw className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-xl font-semibold">Return Policy</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li><strong>Time Limit:</strong> 30 days from purchase date</li>
              <li><strong>Condition:</strong> Unopened packages preferred</li>
              <li><strong>Refund:</strong> Full refund to original payment method</li>
              <li><strong>Processing:</strong> 3-5 business days after receipt</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-8 h-8 text-orange-500 mr-3" />
              <h2 className="text-xl font-semibold">Exchange Policy</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li><strong>Different Blend:</strong> Exchange for any other product</li>
              <li><strong>Grind Size:</strong> Wrong grind? We'll exchange it</li>
              <li><strong>Damaged Items:</strong> Immediate replacement</li>
              <li><strong>Shipping:</strong> Free exchange shipping</li>
            </ul>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">How to Return or Exchange</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-muted-foreground text-sm">
                Email us at hello@coffeecraft.com or WhatsApp us with your order number and reason for return.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Return Label</h3>
              <p className="text-muted-foreground text-sm">
                We'll send you a prepaid return shipping label and instructions within 24 hours.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Ship & Receive</h3>
              <p className="text-muted-foreground text-sm">
                Pack the item securely, attach the label, and drop it off. Your refund or exchange will be processed upon receipt.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Return Conditions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold">Acceptable Returns</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Unopened coffee packages</li>
                <li>• Defective or damaged products</li>
                <li>• Wrong item shipped</li>
                <li>• Coffee equipment and accessories</li>
                <li>• Gift sets and bundles</li>
              </ul>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <XCircle className="w-6 h-6 text-red-600 mr-2" />
                <h3 className="text-lg font-semibold">Non-Returnable Items</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Opened coffee packages (unless defective)</li>
                <li>• Custom blends (unless our error)</li>
                <li>• Perishable items past expiration</li>
                <li>• Digital gift cards</li>
                <li>• Items damaged by misuse</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Special Circumstances</h2>
          
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Quality Issues</h3>
              <p>If you receive coffee that doesn't meet our quality standards, we'll replace it immediately at no cost to you, even if the package has been opened.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Shipping Damage</h3>
              <p>Items damaged during shipping will be replaced immediately. Please take photos of the damaged package and contact us within 48 hours of delivery.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Wrong Order</h3>
              <p>If we sent you the wrong item, we'll send the correct product immediately and provide a prepaid return label for the incorrect item.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-card rounded-lg border border-border p-8">
            <h2 className="text-2xl font-bold mb-4">Need to Start a Return?</h2>
            <p className="text-muted-foreground mb-6">
              Our customer service team is ready to help you with your return or exchange.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@coffeecraft.com?subject=Return Request"
                className="btn-coffee px-6 py-3 rounded-lg font-semibold"
              >
                Email Return Request
              </a>
              <a
                href="https://wa.me/15551234567?text=Hi, I need help with a return"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
              >
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;
