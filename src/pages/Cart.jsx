import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../App';

const Cart = () => {
  const { cartItems, updateCartQuantity, removeFromCart, getCartTotal } = useCart();

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="bg-card rounded-lg border border-border p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                          <p className="text-muted-foreground text-sm mb-2">Size: {item.size}</p>
                          <p className="text-muted-foreground text-sm">{item.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">EGP {item.price}</div>
                          {item.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              EGP{item.originalPrice}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium">Quantity:</span>
                          <div className="flex items-center border border-border rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                              className="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id, item.size)}
                          className="text-red-500 hover:text-red-700 transition-colors p-2"
                          title="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Item Total:</span>
                          <span className="font-semibold">EGP{(item.price * item.quantity).toFixed(2)}</span>
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
            <div className="bg-card rounded-lg border border-border p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>EGP{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-amber-600 text-sm italic">Added at checkout</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Subtotal</span>
                    <span>EGP{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Shipping fees will be calculated at checkout based on your governorate
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full btn-coffee px-6 py-3 rounded-lg font-semibold text-center block"
              >
                Proceed to Checkout
              </Link>

              {/* Security Notice */}
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  🔒 Secure checkout with SSL encryption
                </p>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium mb-2">Payment Methods</h3>
                <p className="text-sm text-muted-foreground">
                  Only cash Available
                </p>
               
              </div>

              {/* Estimated Delivery */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium mb-2">Estimated Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  📦 2-3 business days
                </p>
                <p className="text-sm text-muted-foreground">
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

