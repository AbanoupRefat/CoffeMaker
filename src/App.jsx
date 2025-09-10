import { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { supabase } from './lib/supabase';

// Import components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import Offers from './pages/Offers';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import ShippingInfo from './pages/ShippingInfo';
import Returns from './pages/Returns';
import Support from './pages/Support';
import Toast from './components/Toast';


// Create contexts
const CartContext = createContext();
const AuthContext = createContext();
const ToastContext = createContext();

export const useCart = () => useContext(CartContext);
export const useAuth = () => useContext(AuthContext);
export const useToast = () => useContext(ToastContext);

function App() {
  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [promocode, setPromocode] = useState(() => {
    const savedPromocode = localStorage.getItem('promocode');
    return savedPromocode ? JSON.parse(savedPromocode) : null;
  });
  
  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Save promocode to localStorage whenever it changes
  useEffect(() => {
    if (promocode) {
      localStorage.setItem('promocode', JSON.stringify(promocode));
    } else {
      localStorage.removeItem('promocode');
    }
  }, [promocode]);
  
  // Auth state
  const [user, setUser] = useState(null);
  
  // Toast state
  const [toasts, setToasts] = useState([]);

  // Cart functions
  const addToCart = (product, size = 'Medium', quantity = 1) => {
    const existingItem = cartItems.find(
      item => item.id === product.id && item.size === size
    );

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      let priceToUse = product.price; // Fallback to base price
      if (size === 'Small') {
        priceToUse = product.price_small;
      } else if (size === 'Medium') {
        priceToUse = product.price_medium;
      } else if (size === 'Large') {
        priceToUse = product.price_large;
      }
      setCartItems([...cartItems, { ...product, size, quantity, price: priceToUse }]);
    }
    
    showToast('Product added to cart!', 'success');
  };

  const removeFromCart = (productId, size) => {
    setCartItems(cartItems.filter(item => !(item.id === productId && item.size === size)));
    showToast('Product removed from cart', 'info');
  };

  const updateCartQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    
    setCartItems(cartItems.map(item =>
      item.id === productId && item.size === size
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
    setPromocode(null);
    localStorage.removeItem('cartItems');
    localStorage.removeItem('promocode');
  };

  const getCartTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    if (!promocode) return subtotal;
    
    if (promocode.discount_type === 'percentage') {
      const discountAmount = subtotal * (promocode.discount_value / 100);
      // Apply max discount cap if exists
      if (promocode.max_discount_amount && discountAmount > promocode.max_discount_amount) {
        return subtotal - promocode.max_discount_amount;
      }
      return subtotal - discountAmount;
    } else { // fixed amount
      return Math.max(0, subtotal - promocode.discount_value);
    }
  };
  
  const getDiscountAmount = () => {
    if (!promocode) return 0;
    
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    if (promocode.discount_type === 'percentage') {
      const discountAmount = subtotal * (promocode.discount_value / 100);
      // Apply max discount cap if exists
      if (promocode.max_discount_amount && discountAmount > promocode.max_discount_amount) {
        return promocode.max_discount_amount;
      }
      return discountAmount;
    } else { // fixed amount
      return Math.min(subtotal, promocode.discount_value);
    }
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  // Promocode functions
  const applyPromocode = async (code) => {
    try {
      // Check if code exists and is valid
      const { data, error } = await supabase
        .from('promocodes')
        .select('*')
        .eq('code', code)
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      
      if (!data) {
        showToast('Invalid promocode', 'error');
        return false;
      }
      
      // Check if promocode is expired
      if (data.valid_until && new Date(data.valid_until) < new Date()) {
        showToast('This promocode has expired', 'error');
        return false;
      }
      
      // Check if usage limit is reached
      if (data.usage_limit && data.used_count >= data.usage_limit) {
        showToast('This promocode has reached its usage limit', 'error');
        return false;
      }
      
      // Check minimum order amount
      const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      if (data.min_order_amount > 0 && subtotal < data.min_order_amount) {
        showToast(`This promocode requires a minimum order of EGP${data.min_order_amount}`, 'error');
        return false;
      }
      
      setPromocode(data);
      showToast(`Promocode ${code} applied successfully!`, 'success');
      return true;
    } catch (error) {
      showToast('Error applying promocode', 'error');
      return false;
    }
  };
  
  const removePromocode = () => {
    setPromocode(null);
    showToast('Promocode removed', 'info');
  };

  // Auth functions
  const signIn = async (email, password) => {
    // Placeholder auth function
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = { id: 1, name: 'John Doe', email };
      setUser(mockUser);
      showToast('Successfully signed in!', 'success');
      return { success: true };
    } catch (error) {
      showToast('Sign in failed. Please try again.', 'error');
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const signUp = async (name, email, password) => {
    // Placeholder auth function
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = { id: 1, name, email };
      setUser(mockUser);
      showToast('Account created successfully!', 'success');
      return { success: true };
    } catch (error) {
      showToast('Sign up failed. Please try again.', 'error');
      return { success: false, error: 'Email already exists' };
    }
  };

  const signOut = () => {
    setUser(null);
    showToast('Successfully signed out', 'info');
  };

  // Toast functions
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts(prev => [...prev, toast]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      <CartContext.Provider value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        promocode,
        applyPromocode,
        removePromocode,
        getDiscountAmount
      }}>
        <ToastContext.Provider value={{ showToast, removeToast }}>
          <Router>
            <div className="min-h-screen bg-background">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/orders" element={<OrderHistory />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/shipping-info" element={<ShippingInfo />} />
                  <Route path="/returns" element={<Returns />} />
                  <Route path="/support" element={<Support />} />
                </Routes>
              </main>
              
              {/* Toast notifications */}
              <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map(toast => (
                  <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(toast.id)}
                  />
                ))}
              </div>
            </div>
          </Router>
        </ToastContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;