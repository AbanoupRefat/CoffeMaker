import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqs = [
    {
      question: "What types of coffee beans do you offer?",
      answer: "We offer a wide variety of premium coffee beans including our signature blends. All our beans are ethically sourced and roasted to perfection."
    },
    {
      question: "How fresh are your coffee beans?",
      answer: "All our coffee beans are roasted within 7 days of shipping. We roast in small batches to ensure maximum freshness and flavor. Each package includes the roast date so you know exactly when your coffee was prepared."
    },
    {
      question: "What grind sizes do you offer?",
      answer: "We offer whole beans as well as ground coffee in various sizes: fine (espresso), and extra-fine (Turkish coffee)."
    },
    {
      question: "How should I store my coffee?",
      answer: "Store your coffee in a cool, dry place away from direct sunlight. Keep beans in an airtight container and avoid storing them in the refrigerator or freezer. For best flavor, use within 2-3 weeks of the roast date."
    },
    {
      question: "Do you offer subscriptions?",
      answer: "Yes! We offer flexible subscription plans where you can receive your favorite coffee delivered monthly, bi-weekly, or weekly. You can modify, pause, or cancel your subscription at any time through your account."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash on delivery for local orders."
    },
    {
      question: "Can I track my order?",
      answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can also track your order status by logging into your account on our website."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship within Egypt. We're working on expanding our international shipping options. Please check back soon or contact us for updates."
    },
    {
      question: "What if I'm not satisfied with my purchase?",
      answer: "We offer a 100% satisfaction guarantee. If you're not completely happy with your coffee, contact us within 30 days of purchase for a full refund or exchange. Your satisfaction is our priority."
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 coffee-text-gradient">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our coffee, orders, and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                {openItems[index] ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              {openItems[index] && (
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-card rounded-lg border border-border p-8">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@coffeecraft.com"
                className="btn-coffee px-6 py-3 rounded-lg font-semibold"
              >
                Email Support
              </a>
              <a
                href="https://wa.me/+201001246102"
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

export default FAQ;
