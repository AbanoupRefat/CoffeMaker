import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Star, ArrowRight, Coffee, Truck, Shield, Heart, Instagram, Facebook, MessageCircle, Loader2, ShoppingCart } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { products as staticProducts, testimonials } from '../data/products';
import { useCart, useToast } from '../App';

const Home = () => {
  const { products, loading, error } = useProducts();
  
  // Use API products if available, otherwise fallback to static products
  const availableProducts = products.length > 0 ? products : staticProducts;
  const featuredProducts = availableProducts.filter(product => product.featured);
  const offerProducts = availableProducts.filter(product => product.is_offer || product.isOffer).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center hero-bg"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/src/assets/prxn5iEqjUkk.jpg')`
        }}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up">
            Craft Your Perfect
            <span className="block coffee-text-gradient text-transparent bg-clip-text">
              Coffee Experience
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 fade-in-up">
            Premium coffee beans sourced from the world's finest farms, 
            roasted to perfection for your daily ritual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up">
            <Link
              to="/products"
              className="btn-coffee px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center justify-center space-x-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/offers"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-300"
            >
              View Offers
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Hand-selected beans from the world's finest coffee regions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Fresh coffee delivered to your door within 2-3 business days</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-muted-foreground">100% satisfaction guarantee or your money back</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ethically Sourced</h3>
              <p className="text-muted-foreground">Supporting sustainable farming and fair trade practices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground">Discover our most popular coffee selections</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="ml-2">Loading products...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Error loading products: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {availableProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-coffee px-8 py-3 rounded-lg font-semibold inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      {offerProducts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Offers</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Don't miss out on these limited-time deals on our premium coffee selections.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offerProducts.map((product) => (
                <div key={product.id} className="bg-card rounded-lg shadow-sm border border-border overflow-hidden card-hover relative">
                  {(product.originalPrice || product.original_price) && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {Math.round((((product.originalPrice || product.original_price) - product.price) / (product.originalPrice || product.original_price)) * 100)}% OFF
                      </span>
                    </div>
                  )}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image_url || product.image || '/placeholder-coffee.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-red-600">${product.price}</span>
                        {(product.originalPrice || product.original_price) && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice || product.original_price}
                          </span>
                        )}
                      </div>
                      <Link
                        to={`/products/${product.id}`}
                        className="btn-coffee px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link
                to="/offers"
                className="btn-coffee px-8 py-3 rounded-lg text-lg font-semibold inline-flex items-center space-x-2"
              >
                <span>View All Offers</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Customer Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied customers who have made us their go-to coffee source.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-card rounded-lg shadow-sm border border-border p-6 card-hover">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm italic">"{testimonial.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Coffee Story</h2>
              <p className="text-lg text-muted-foreground mb-6">
                For over two decades, we've been passionate about bringing you the world's finest coffee. 
                From the misty mountains of Ethiopia to the volcanic soils of Guatemala, we source our beans 
                directly from farmers who share our commitment to quality and sustainability.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Every cup tells a story of tradition, craftsmanship, and the pursuit of perfection. 
                Join us on this journey and discover what makes our coffee truly exceptional.
              </p>
              <Link
                to="/about"
                className="btn-coffee px-6 py-3 rounded-lg font-semibold inline-flex items-center space-x-2"
              >
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="/src/assets/R8PPkbZfe6hI.jpg"
                alt="Coffee plantation"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 coffee-gradient opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 coffee-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Coffee News
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get the latest updates on new arrivals, special offers, and brewing tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Follow Our Journey</h2>
            <p className="text-xl text-muted-foreground">Stay connected for the latest updates and coffee inspiration</p>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://www.facebook.com/coffeecraft/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 coffee-gradient rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/coffeecraft/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 coffee-gradient rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://wa.me/15551234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 coffee-gradient rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 coffee-gradient rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                    <line x1="6" y1="2" x2="6" y2="4" />
                    <line x1="10" y1="2" x2="10" y2="4" />
                    <line x1="14" y1="2" x2="14" y2="4" />
                  </svg>
                </div>
                <span className="text-xl font-bold coffee-text-gradient">CoffeeMaker</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Premium coffee beans sourced from the world's finest farms, roasted to perfection for your daily ritual.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/coffeemaker.cr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="w-6 h-6" /></a>
                <a href="https://www.instagram.com/coffeemaker.cr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="w-6 h-6" /></a>
                <a href="https://www.tiktok.com/@coffeemakercr?_t=ZS-8zYoCB9yWXw&_r=1" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M15 8v8a4 4 0 0 1-4 4"/><line x1="15" y1="4" x2="15" y2="12"/></svg></a>
                <a href="https://wa.me/01001246102" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><MessageCircle className="w-6 h-6" /></a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link></li>
                <li><Link to="/offers" className="text-muted-foreground hover:text-primary transition-colors">Offers</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link to="/shipping-info" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</Link></li>
                <li><Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors">Returns</Link></li>
                <li><Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="https://www.google.com/maps/search/?api=1&query=123%20Coffee%20Street,%20Bean%20City,%20BC%2012345" target="_blank" rel="noopener noreferrer" className="hover:underline">123 Coffee Street</a></li>
                <li>Bean City, BC 12345</li>
                <li>WhatsApp: <a href="https://wa.me/01001246102" target="_blank" rel="noopener noreferrer" className="hover:underline">+01001246102</a></li>
                <li>Email: <a href="mailto:hello@coffeemaker.cr" className="hover:underline">hello@coffeemaker.cr</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 CoffeeMaker. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  
  const [selectedSize, setSelectedSize] = useState('Medium');

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation to product detail
    const priceKey = `price_${selectedSize.toLowerCase()}`;
    const selectedPrice = product[priceKey] || product.price;
    addToCart(product, selectedSize, 1, selectedPrice);
  };
  
  return (
    <div className="group bg-white rounded-lg shadow-sm border border-border hover:shadow-lg transition-all duration-300">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.image_url || product.image || '/placeholder-coffee.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-primary">
              EGP{
                selectedSize === 'Small' ? product.price_small :
                selectedSize === 'Medium' ? product.price_medium :
                selectedSize === 'Large' ? product.price_large :
                product.price // Fallback to base price if no size matches
              }
            </span>
            {product.rating && (
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-muted-foreground ml-1">
                  {product.rating}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              {['Small', 'Medium', 'Large'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded-md text-sm font-medium transition-all duration-200
                    ${selectedSize === size
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-background text-muted-foreground border-border hover:bg-muted'}
                  `}
                >
                  {size.charAt(0)}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock && !product.inStock}
            className="w-full flex items-center justify-center gap-2 btn-coffee px-3 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Home;