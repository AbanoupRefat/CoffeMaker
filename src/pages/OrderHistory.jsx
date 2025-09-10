
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useOrders } from "../hooks/useOrders";

const OrderHistory = () => {
  const { orders, loading } = useOrders();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-border p-6">
          <h1 className="text-3xl font-bold mb-6">Order History</h1>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No orders found.</p>
              <Link to="/products" className="btn-coffee px-6 py-2 rounded-lg">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">
                      Order #<span className="font-mono text-sm"> {order.id.slice(0, 8)}</span>
                      <p className="text-xs text-muted-foreground">For mobile tracking: {order.id.slice(0, 8)}</p>
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  {order.order_items && order.order_items.length > 0 && (
                    <p className="text-sm text-muted-foreground mb-2">
                      Items: {order.order_items[0].product_name}
                      {order.order_items.length > 1 && ` and ${order.order_items.length - 1} more`}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                    <span className="font-medium text-primary">
                      EGP{order.total_price}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Total: EGP{order.total_price}</p>
                    <p>Items: {order.order_items ? order.order_items.length : 0}</p>
                    <p>Status: {order.status}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="font-semibold mb-2">Order Items:</h4>
                    <ul className="space-y-2">
                      {order.order_items && order.order_items.map(item => (
                        <li key={item.id} className="flex justify-between text-sm text-muted-foreground">
                          <span>{item.product_name} (x{item.quantity})</span>
                          <span>EGP{(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;