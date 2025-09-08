import { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

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
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  
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
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
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
        getCartItemCount
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