import { Instagram, Facebook, Phone, Mail, Play } from 'lucide-react';
import { useEffect, useRef } from 'react';

const AboutUs = () => {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  useEffect(() => {
    // Auto-play videos when component mounts
    const playVideos = () => {
      if (video1Ref.current) {
        video1Ref.current.play().catch(console.log);
      }
      if (video2Ref.current) {
        video2Ref.current.play().catch(console.log);
      }
    };

    // Small delay to ensure videos are loaded
    const timer = setTimeout(playVideos, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section with Video */}
        <div className="relative bg-cover bg-center rounded-lg shadow-lg mb-12 overflow-hidden"
             style={{ height: '400px' }}>
          {/* Video Background Placeholder */}
          <video
            ref={video1Ref}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            poster="/src/assets/CjVYOAcHTJl4.jpg"
          >
            {/* Placeholder video sources - replace with actual video URLs */}
            <source src="/videos/coffee-shop-hero.mp4" type="video/mp4" />
            <source src="/videos/coffee-shop-hero.webm" type="video/webm" />
            {/* Fallback for browsers that don't support video */}
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white text-center coffee-text-shadow">About CoffeeCraft</h1>
          </div>
          
          {/* Video placeholder indicator */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
            <Play className="w-3 h-3" />
            <span>Video</span>
          </div>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 coffee-text-gradient">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              CoffeeCraft was born out of a profound passion for exceptional coffee and a desire to share the world's finest beans with fellow enthusiasts. Our journey began in a small roastery, fueled by the belief that every cup of coffee should be an experience, a moment of pure enjoyment and discovery.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We meticulously source our beans from sustainable farms across the globe, partnering with growers who share our commitment to quality and ethical practices. Each batch is roasted with precision, unlocking unique flavors and aromas that tell the story of its origin. From the vibrant acidity of Ethiopian Yirgacheffe to the rich, chocolatey notes of Colombian Supremo, we invite you to explore the diverse world of coffee with us.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 coffee-text-gradient">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Our mission is simple: to provide an unparalleled coffee experience, from bean to cup. We are dedicated to delivering not just coffee, but a commitment to quality, sustainability, and community. We believe in fostering a deeper appreciation for coffee by educating our customers and offering a curated selection that caters to every palate.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond the brew, CoffeeCraft is about connection. It's about the conversations sparked over a warm mug, the quiet moments of reflection, and the shared joy of a perfectly crafted beverage. Join us in celebrating the art and science of coffee, and let us help you craft your perfect coffee experience, every single day.
            </p>
          </div>
        </div>

        {/* Coffee Process Video Section */}
        <div className="bg-card rounded-lg border border-border p-8 shadow-sm mb-12">
          <h2 className="text-3xl font-bold mb-6 coffee-text-gradient text-center">Our Coffee Process</h2>
          <div className="relative rounded-lg overflow-hidden" style={{ height: '300px' }}>
            <video
              ref={video2Ref}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              poster="/src/assets/47T7WzjzBmiZ.jpg"
            >
              {/* Placeholder video sources - replace with actual video URLs */}
              <source src="/videos/coffee-process.mp4" type="video/mp4" />
              <source src="/videos/coffee-process.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video overlay with text */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2 coffee-text-shadow">From Bean to Cup</h3>
                <p className="text-lg coffee-text-shadow">Watch our meticulous coffee roasting process</p>
              </div>
            </div>
            
            {/* Video placeholder indicator */}
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
              <Play className="w-3 h-3" />
              <span>Process Video</span>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-4">
            Experience the artistry behind every cup of CoffeeCraft coffee
          </p>
        </div>

        {/* Social Media and Contact */}
        <div className="bg-card rounded-lg border border-border p-8 shadow-sm text-center">
          <h2 className="text-3xl font-bold mb-6 coffee-text-gradient">Connect With Us</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We love hearing from our customers! Reach out to us through our social media channels or directly via phone and email.
          </p>
          <div className="flex justify-center space-x-8 mb-8">
            <a href="https://www.instagram.com/coffeecraft/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-10 h-10" />
              <span className="block mt-2 text-sm font-medium">Instagram</span>
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-10 h-10" />
              <span className="block mt-2 text-sm font-medium">WhatsApp</span>
            </a>
            <a href="https://www.facebook.com/coffeecraft/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="w-10 h-10" />
              <span className="block mt-2 text-sm font-medium">Facebook</span>
            </a>
            <a href="mailto:info@coffeecraft.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-10 h-10" />
              <span className="block mt-2 text-sm font-medium">Email</span>
            </a>
          </div>
          <div className="text-muted-foreground">
            <p className="mb-2">📞 Phone: +1 (555) 123-4567</p>
            <p>📧 Email: info@coffeecraft.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

