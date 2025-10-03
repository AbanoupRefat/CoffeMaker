import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut, History, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { AuthModal } from './auth/AuthModal';
import { useCart } from '../App';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const { getCartItemCount } = useCart();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Offers', path: '/offers' },
    { name: 'About Us', path: '/about' },
    { name: 'Support', path: '/support' },
  ];

  const handleSignOut = async () => {
    try {
      // Call signOut and ignore any network errors
      await signOut();
      // Always close the dropdown regardless of API success/failure
      setIsAccountDropdownOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
      // Still close the dropdown even if there's an error
      setIsAccountDropdownOpen(false);
    }
  };

  const handleSignIn = () => {
    setIsAuthModalOpen(true);
    setIsAccountDropdownOpen(false);
  };

  // Get display name for user
  const getDisplayName = () => {
    if (profile?.full_name) {
      return profile.full_name;
    }
    if (user?.email) {
      // Extract name from email (before @)
      return user.email.split('@')[0];
    }
    return 'User';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAccountDropdownOpen && !event.target.closest('.account-dropdown')) {
        setIsAccountDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountDropdownOpen]);
  
  // Handle navbar scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = prevScrollPos < currentScrollPos;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      
      // Only update visibility when scrolling more than 10px
      if (Math.abs(prevScrollPos - currentScrollPos) > 10) {
        setVisible(!isScrollingDown || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <nav className={`bg-white shadow-sm border-b border-border fixed w-full top-0 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                <img src="/assets/472560073_122126366918632004_6920547193601916595_n.jpg" alt="CoffeeMaker Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-primary">CoffeeMaker</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path
                      ? 'text-primary border-b-2 border-primary pb-1'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              </Link>

              {/* Account Dropdown */}
              <div className="relative account-dropdown">
                <button
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                  className="flex items-center space-x-1 px-2 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium hidden sm:inline">
                    {user ? getDisplayName() : 'Account'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isAccountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-50">
                    {user ? (
                      // Signed in dropdown
                      <>
                        <div className="p-3 border-b border-border">
                          <p className="font-medium text-sm">{getDisplayName()}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
                            onClick={() => setIsAccountDropdownOpen(false)}
                          >
                            <User className="w-4 h-4" />
                            <span>Edit Profile</span>
                          </Link>
                          <Link
                            to="/orders"
                            className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
                            onClick={() => setIsAccountDropdownOpen(false)}
                          >
                            <History className="w-4 h-4" />
                            <span>Order History</span>
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      // Not signed in dropdown
                      <div className="py-1">
                        <button
                          onClick={handleSignIn}
                          className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Sign In</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors ml-1 flex-shrink-0"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border">
              <div className="py-2 space-y-1">
                {navItems.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.path}
                    className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-muted rounded-lg ${
                      location.pathname === item.path
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;