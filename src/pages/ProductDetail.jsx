import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Plus, Minus, Loader2 } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../contexts/AuthContext';
import { useCart, useToast } from '../App';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Medium');

  const product = products.find(p => p.id === id);



  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    if (!product) return;
    
    let selectedSizePrice = product.price;
    if (selectedSize === 'Small') {
      selectedSizePrice = product.price_small;
    } else if (selectedSize === 'Medium') {
      selectedSizePrice = product.price_medium;
    } else if (selectedSize === 'Large') {
      selectedSizePrice = product.price_large;
    }
    addToCart(product, selectedSize, quantity, selectedSizePrice);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/products')}
            className="btn-coffee px-6 py-3 rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.image_url || '/placeholder-coffee.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground">{product.description}</p>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews || 0} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="text-3xl font-bold text-primary">
              EGP{
                selectedSize === 'Small' ? product.price_small.toFixed(2) :
                selectedSize === 'Medium' ? product.price_medium.toFixed(2) :
                selectedSize === 'Large' ? product.price_large.toFixed(2) :
                product.price.toFixed(2)
              }
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Size</h3>
              <div className="flex space-x-3">
                {['Small', 'Medium', 'Large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`font-medium ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
                {product.in_stock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Action Button */}
            <div className="flex">
              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className="w-full btn-coffee px-6 py-3 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <div className="space-y-3 text-sm">
                {product.product_attributes && product.product_attributes.length > 0 ? (
                  <table className="w-full text-left table-auto">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-2">Attribute</th>
                        <th className="py-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.product_attributes.map((attr, index) => (
                        <tr key={index} className="border-b border-border last:border-b-0">
                          <td className="py-2 text-muted-foreground">{attr.attributes.name}</td>
                          <td className="py-2">{attr.value} {attr.attributes.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-muted-foreground">No additional attributes available.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-8 sm:mt-12 md:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 md:mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            {products
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <RelatedProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
          </div>
        </div>
      </div>

  );
};

const RelatedProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="group bg-white rounded-lg shadow-sm border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="aspect-square overflow-hidden rounded-t-lg">
        <img
          src={product.image_url || '/placeholder-coffee.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-2 sm:p-3 md:p-4">
        <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 truncate group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-base md:text-xl font-bold text-primary">EGP{product.price}</span>
          {product.rating && (
            <div className="flex items-center">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
              <span className="text-xs sm:text-sm text-muted-foreground ml-1">
                {product.rating}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;