import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Star, ArrowRight, Coffee, Truck, Shield, Heart, Instagram, Facebook, MessageCircle, Loader2, ShoppingCart, Eye } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { testimonials } from '../data/products';
import { useCart, useToast } from '../App';

const Home = () => {
  const { products, loading, error } = useProducts();
  
  // Only use API products
  const featuredProducts = products.filter(product => product.featured);
  const offerProducts = products.filter(product => product.is_offer || product.isOffer).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative flex items-center justify-center hero-bg min-h-[600px] py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://github.com/AbanoupRefat/CoffeMaker/blob/main/src/assets/Gemini_Generated_Image_t1kxc3t1kxc3t1kx.png?raw=true')`,
          backgroundPosition: '85% center',
          backgroundSize: 'cover'
        }}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 fade-in-up">
              <span className="block text-white text-3xl md:text-5xl">
                Coffee Maker
              </span>
              <span className="block coffee-text-gradient text-3xl md:text-5xl">
                Charcoal roasted
              </span>
            </h1>
          <p dir="rtl" className="text-white text-xl font-bold leading-relaxed mt-4 max-w-2xl mb-8">
              استمتع بأول تجربة
              قهوة محمصة عالفحم في مصر
            </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up mt-4">
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
          <div className="flex flex-wrap justify-center gap-8" >
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Hand-selected beans from the world's finest coffee regions</p>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {products.slice(0, 4).map((product) => (
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {offerProducts.map((product) => (
                <div key={product.id} className="bg-card rounded-lg shadow-sm border border-border overflow-hidden card-hover relative">
                  {(product.originalPrice || product.original_price) && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
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
                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
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
                  <div className="mb-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                  </div>
                  <p dir="rtl" className="text-muted-foreground text-sm italic">"{testimonial.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Coffee Story Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img
              src="https://github.com/AbanoupRefat/CoffeMaker/blob/main/src/assets/Gemini_Generated_Image_t1kxc3t1kxc3t1kx.png?raw=true"
              alt="Our Coffee Story"
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">قصة قهوتنا</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              قصتنا بدأت مع أول حبوب قهوة لامست نار الفحم، لتخرج بطعم أصيل ورائحة تحفظ سرّ الأجداد. نحن الأوائل في التحميص على الفحم، نمنح كل فنجان نكهة قوية وذكرى لا تُنسى
            </p>
            <Link
              to="/about"
              className="btn-coffee px-8 py-3 rounded-lg font-semibold inline-flex items-center space-x-2 mt-4"
            >
              <span>Read More</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold coffee-text-gradient">About Us</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Premium coffee beans sourced from the world's finest farms, roasted to perfection for your daily ritual.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/coffeemaker.cr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="w-6 h-6" /></a>
                <a href="https://www.instagram.com/coffeemaker.cr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="w-6 h-6" /></a>
                <a href="https://www.tiktok.com/@coffeemakercr?_t=ZS-8zYoCB9yWXw&_r=1" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M15 8v8a4 4 0 0 1-4 4"/><line x1="15" y1="4" x2="15" y2="12"/></svg></a>
                <a href="https://wa.me/+201001246102" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><MessageCircle className="w-6 h-6" /></a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link></li>
                <li><Link to="/offers" className="text-muted-foreground hover:text-primary transition-colors">Offers</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link to="/shipping-info" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</Link></li>

                <li><Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</Link></li>
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
  
  const [selectedSize, setSelectedSize] = useState('100g');

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation to product detail
    e.stopPropagation(); // Stop event bubbling
    let actualSize = '';
    if (selectedSize === '50g') actualSize = 'small';
    else if (selectedSize === '100g') actualSize = 'medium';
    else if (selectedSize === '200g') actualSize = 'large';
    
    const priceKey = `price_${actualSize}`;
    const selectedPrice = product[priceKey] || product.price;
    addToCart(product, selectedSize, 1, selectedPrice);
  };

  const handleSizeChange = (size, e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event bubbling to prevent navigation
    setSelectedSize(size);
  };
  
  return (
    <div className="group bg-white rounded-lg shadow-sm border border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image_url || product.image || '/placeholder-coffee.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-2 sm:p-3 md:p-4 space-y-2">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          
          {/* Price and Rating */}
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base md:text-lg font-bold text-primary">
              EGP{
                selectedSize === '50g' ? product.price_small :
                selectedSize === '100g' ? product.price_medium :
                selectedSize === '200g' ? product.price_large :
                product.price // Fallback to base price if no size matches
              }
            </span>
            {product.rating && (
              <div className="flex items-center">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                <span className="text-xs sm:text-sm text-muted-foreground ml-1">
                  {product.rating}
                </span>
              </div>
            )}
          </div>
          
          {/* Size Selection - Prevent navigation */}
          <div className="flex flex-wrap items-center justify-center gap-1">
            {['50g', '100g', '200g'].map((size) => (
              <button
                key={size}
                onClick={(e) => handleSizeChange(size, e)}
                className={`flex-1 min-w-[60px] px-2 py-1 border rounded-md text-xs font-medium transition-all duration-200
                  ${selectedSize === size
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background text-muted-foreground border-border hover:bg-muted'}
                `}
              >
                {size}
              </button>
            ))}
          </div>
          
          {/* Add to Cart Button - Prevent navigation */}
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock && !product.inStock}
            className="w-full flex items-center justify-center gap-2 btn-coffee px-3 py-2 rounded-lg disabled:opacity-50 text-sm font-medium"
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
