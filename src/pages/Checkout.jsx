import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useToast } from '../App';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Truck, Shield, ArrowLeft, DollarSign } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useProfile } from '../hooks/useProfile';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { profile } = useProfile();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    governorate: '',
    paymentMethod: 'cod',
    orderNotes: '',
  });

  const [governorates, setGovernorates] = useState([]);
  const [shippingFee, setShippingFee] = useState(60); // Default shipping fee

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Pre-fill form with profile data if available
  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        fullName: profile.full_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        governorate: profile.governorate || '',
      }));
    }
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
      }));
    }

    // Fetch governorates from the database
    const fetchGovernorates = async () => {
      try {
        const { data, error } = await supabase
          .from('shipping_governorates')
          .select('*')
          .eq('is_active', true)
          .order('name');

        if (error) throw error;
        setGovernorates(data || []);
      } catch (error) {
        console.error('Error fetching governorates:', error);
      }
    };

    fetchGovernorates();
  }, [profile, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update shipping fee when governorate changes
    if (name === 'governorate' && value) {
      const selectedGovernorate = governorates.find(gov => gov.id === value);
      if (selectedGovernorate) {
        setShippingFee(selectedGovernorate.shipping_fee);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.governorate) errors.governorate = 'Governorate is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    
    setLoading(true);

    try {
      // Create shipping address object
      const shippingAddress = {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
        orderNotes: formData.orderNotes
      };
      
      const total = getCartTotal();
      const shipping = shippingFee;
      const grandTotal = total + shipping;
      
      // Create order in Supabase
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user?.id || null, // Allow guest checkout
            subtotal: total,
            shipping_fee: shipping,
            total_price: grandTotal,
            status: 'pending',
            shipping_address: shippingAddress,
            payment_method: formData.paymentMethod
          }
        ])
        .select()
        .single();
      
      if (orderError) throw orderError;
      
      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        size: item.size
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) throw itemsError;
      
      // Generate order number
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
      
      showToast('Order placed successfully!', 'success');
      clearCart();
      
      // Get governorate name for display
      const selectedGovernorate = governorates.find(gov => gov.id === formData.governorate);
      const governorateName = selectedGovernorate ? selectedGovernorate.name : '';
      
      // Navigate to success page with order details
      navigate('/order-success', { 
        state: { 
          orderNumber,
          customerInfo: shippingAddress,
          orderTotal: grandTotal.toFixed(2),
          shippingFee: shipping.toFixed(2),
          governorateName
        } 
      });
    } catch (error) {
      console.error('Error processing order:', error);
      showToast('Error processing order. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to your cart before checkout</p>
          <button
            onClick={() => navigate('/products')}
            className="btn-coffee px-6 py-2 rounded-lg"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const total = getCartTotal();
  const shipping = shippingFee;
  const grandTotal = total + shipping;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-2">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
              
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Maadi, 6th of October, Nasr City"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Governorate</label>
                  <select
                    name="governorate"
                    value={formData.governorate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select a governorate</option>
                    {governorates.map(gov => (
                      <option key={gov.id} value={gov.id}>
                        {gov.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.governorate && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.governorate}</p>
                  )}
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 border border-gray-300 rounded-lg">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <label htmlFor="cod" className="flex items-center cursor-pointer">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                          <DollarSign className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">Order Notes (Optional)</label>
                  <textarea
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Special instructions for delivery"
                  />
                </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-coffee py-3 rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Place Order - ${grandTotal.toFixed(2)}`}
              </button>
            </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-border p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="flex justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.size} • Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">EGP{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>EGP{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>EGP{shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                  <span>EGP{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Orders Takes from 4 to 10 Working Days</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CreditCard className="w-4 h-4 mr-2" />
                  <span>Cash on Delivery available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

