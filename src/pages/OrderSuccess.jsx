import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Coffee, ArrowRight } from 'lucide-react';
import { useToast } from '../App';



const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const orderData = location.state;



  useEffect(() => {
    // Redirect to home if no order data
    if (!orderData) {
      navigate('/');
      return;
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const { orderId, customerInfo, orderTotal, shippingFee, governorateName } = orderData;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thank you for your order! We've received your coffee order and it's being prepared with care.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-card rounded-lg border border-border p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-mono font-semibold">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span>Cash on Delivery</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-semibold mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>EGP{(parseFloat(orderTotal) - parseFloat(shippingFee || 60)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Shipping ({governorateName || 'Standard'})</span>
                    <span>EGP{parseFloat(shippingFee || 60).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 font-semibold">
                    <span>Total</span>
                    <span>EGP{orderTotal}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <div className="text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">{customerInfo.fullName}</p>
                <p>{customerInfo.address}</p>
                <p>{customerInfo.city}, {customerInfo.postalCode}</p>
                <p>{customerInfo.phone}</p>
                <p>{customerInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Order Notes */}
          {customerInfo.orderNotes && (
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-semibold mb-2">Order Notes</h3>
              <p className="text-muted-foreground">{customerInfo.orderNotes}</p>
            </div>
          )}
        </div>

        {/* What's Next */}
        <div className="bg-muted/30 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">What Happens Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Order Processing</h3>
              <p className="text-sm text-muted-foreground">
                We're carefully preparing your coffee order with our premium beans
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Packaging</h3>
              <p className="text-sm text-muted-foreground">
                Your coffee will be freshly packaged to preserve its quality and aroma
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Your order will be delivered from 7-10 business days
              </p>
            </div>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Estimated Delivery</h3>
              <p className="text-muted-foreground">
                3-7 business days
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                <Link to="/orders" className="text-primary hover:underline">
                  Track your order in order history
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <Link
            to="/orders"
            className="btn-coffee px-8 py-3 rounded-lg font-semibold inline-flex items-center justify-center space-x-2"
          >
            <span>View Order History</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/products"
            className="btn-coffee px-8 py-3 rounded-lg font-semibold inline-flex items-center justify-center space-x-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button
            onClick={() => window.print()}
            className="bg-white border border-border px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
          >
            Print Order Details
          </button>
        </div>


      </div>


    </div>
  );
};

export default OrderSuccess;

