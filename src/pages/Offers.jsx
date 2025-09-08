import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Tag, Loader2 } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';

const Offers = () => {
  const { products, loading, error } = useProducts();
  const [sortBy, setSortBy] = useState('discount');

  // Filter products that have offers
  const offerProducts = useMemo(() => {
    return products.filter(product => product.is_offer);
  }, [products]);

  const sortedOfferProducts = useMemo(() => {
    const sorted = [...offerProducts];
    
    sorted.sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          const discountA = a.original_price ? ((a.original_price - a.price) / a.original_price) * 100 : 0;
          const discountB = b.original_price ? ((b.original_price - b.price) / b.original_price) * 100 : 0;
          return discountB - discountA;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    
    return sorted;
  }, [offerProducts, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading offers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading offers: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-coffee px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="coffee-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Special Offers
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Limited time deals on our premium coffee collection
          </p>
          <div className="flex items-center justify-center space-x-2 text-lg">
            <Clock className="w-5 h-5" />
            <span>Hurry! Offers end soon</span>
          </div>
        </div>
      </section>

      {/* Offers Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {sortedOfferProducts.length} Special Offers Available
            </h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="discount">Highest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Offers Grid */}
          {sortedOfferProducts.length === 0 ? (
            <div className="text-center py-12">
              <Tag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No offers available</h3>
              <p className="text-muted-foreground mb-6">
                Check back soon for amazing deals on premium coffee!
              </p>
              <Link
                to="/products"
                className="btn-coffee px-6 py-3 rounded-lg font-semibold"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedOfferProducts.map((product) => (
                <OfferCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don't Miss Out!
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            These exclusive offers won't last long. Stock up on your favorite coffee today.
          </p>
          <Link
            to="/products"
            className="btn-coffee px-8 py-4 rounded-lg text-lg font-semibold"
          >
            Shop All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

const OfferCard = ({ product }) => {
  const discountPercentage = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;
  
  const savings = product.original_price ? product.original_price - product.price : 0;

  return (
    <div className="group relative bg-white rounded-lg shadow-sm border border-border hover:shadow-lg transition-all duration-300">
      {/* Discount Badge */}
      <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
        {discountPercentage}% OFF
      </div>

      {/* Savings Badge */}
      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium z-10">
        Save ${savings.toFixed(2)}
      </div>

      <Link to={`/products/${product.id}`} className="block">
        {/* Image */}
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.image_url || '/placeholder-coffee.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {product.description}
          </p>
          
          {/* Category */}
          <span className="inline-block bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs mb-4">
            {product.category}
          </span>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">
                ${product.price}
              </span>
              {product.original_price && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.original_price}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-green-600 font-medium">
                You save ${savings.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">
                {discountPercentage}% off
              </div>
            </div>
          </div>

          {/* Stock status */}
          <div className="mt-4">
            {product.in_stock ? (
              <span className="text-green-600 text-sm font-medium">✓ In Stock</span>
            ) : (
              <span className="text-red-600 text-sm font-medium">✗ Out of Stock</span>
            )}
          </div>

          {/* Urgency indicator */}
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 text-red-700">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Limited time offer!</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Offers;

