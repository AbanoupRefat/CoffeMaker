import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, Tag, X } from 'lucide-react';
import { useCart } from '../App';

const Cart = () => {
  const { cartItems, updateCartQuantity, removeFromCart, getCartTotal, promocode, applyPromocode, removePromocode, getDiscountAmount } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const handleQuantityChange = (productId, size, newQuantity) => {
    updateCartQuantity(productId, size, newQuantity);
  };

  const handleRemoveItem = (productId, size) => {
    removeFromCart(productId, size);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any coffee to your cart yet. 
              Start shopping to fill it up with delicious coffee!
            </p>
            <Link
              to="/products"
              className="btn-coffee px-8 py-3 rounded-lg font-semibold inline-flex items-center space-x-2"
            >
              <span>Start Shopping</span>
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="bg-card rounded-lg border border-border p-3 sm:p-4 md:p-6">
                  <div className="flex flex-col gap-2">
                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-3 md:mb-4">
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1">{item.name}</h3>
                          <p className="text-muted-foreground text-xs sm:text-sm mb-1 sm:mb-2">Size: {item.size}</p>
                          <p className="text-muted-foreground text-xs sm:text-sm">{item.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-base sm:text-lg font-bold">EGP {item.price}</div>
                          {item.originalPrice && (
                            <div className="text-xs sm:text-sm text-muted-foreground line-through">
                              EGP{item.originalPrice}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <span className="text-xs sm:text-sm font-medium">Qty:</span>
                          <div className="flex items-center border border-border rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1 sm:p-1.5 md:p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-sm sm:text-base font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                              className="p-1 sm:p-1.5 md:p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id, item.size)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1 sm:p-1.5 md:p-2"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-muted-foreground">Item Total:</span>
                          <span className="text-sm sm:text-base font-semibold">EGP{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-3 sm:p-4 md:p-6 sticky top-8">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 md:mb-6">Order Summary</h2>
              
              <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-3 sm:mb-4 md:mb-6">
                {/* Promocode Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Promocode</label>
                  {promocode ? (
                    <div className="flex items-center justify-between bg-muted p-2 rounded-lg">
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-2 text-primary" />
                        <span className="text-sm font-medium">{promocode.code}</span>
                        {promocode.discount_type === 'percentage' ? (
                          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            {promocode.discount_value}% OFF
                          </span>
                        ) : (
                          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            EGP{promocode.discount_value} OFF
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={removePromocode}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Enter promocode"
                        className="flex-1 px-3 py-2 border border-border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <button
                        onClick={async () => {
                          if (!promoInput.trim()) return;
                          setIsApplyingPromo(true);
                          await applyPromocode(promoInput.trim());
                          setIsApplyingPromo(false);
                        }}
                        disabled={isApplyingPromo || !promoInput.trim()}
                        className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isApplyingPromo ? 'Applying...' : 'Apply'}
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-sm sm:text-base">
                    EGP{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
                
                {promocode && (
                  <div className="flex justify-between text-primary">
                    <span className="text-xs sm:text-sm flex items-center">
                      <Tag className="w-3 h-3 mr-1" />
                      Discount ({promocode.code})
                    </span>
                    <span className="text-sm sm:text-base">-EGP{getDiscountAmount().toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-muted-foreground">Shipping</span>
                  <span className="text-amber-600 text-xs sm:text-sm italic">Added at checkout</span>
                </div>
                
                <div className="border-t border-border pt-2 sm:pt-3 md:pt-4">
                  <div className="flex justify-between text-base sm:text-lg font-semibold">
                    <span>Subtotal</span>
                    <span>EGP{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 sm:mt-2">
                    Shipping fees will be calculated at checkout based on your governorate
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full btn-coffee px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-semibold text-center block text-sm sm:text-base"
              >
                Proceed to Checkout
              </Link>

              {/* Security Notice */}
              <div className="mt-2 sm:mt-3 md:mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  🔒 Secure checkout with SSL encryption
                </p>
              </div>

              {/* Payment Methods */}
              <div className="mt-3 sm:mt-4 md:mt-6 pt-3 sm:pt-4 md:pt-6 border-t border-border">
                <h3 className="text-sm sm:text-base font-medium mb-1 sm:mb-2">Payment Methods</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Only cash Available
                </p>
               
              </div>

              {/* Estimated Delivery */}
              <div className="mt-3 sm:mt-4 md:mt-6 pt-3 sm:pt-4 md:pt-6 border-t border-border">
                <h3 className="text-sm sm:text-base font-medium mb-1 sm:mb-2">Estimated Delivery</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  📦 7-10 business days
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  🚚 Available shipping Any Place In Egypt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

