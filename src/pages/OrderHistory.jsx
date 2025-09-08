import { Loader2 } from "lucide-react";
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
              <a href="/products" className="btn-coffee px-6 py-2 rounded-lg">
                Start Shopping
              </a>
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
                      Order #{order.id.slice(0, 8)}
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
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                    <span className="font-medium text-primary">
                      ${order.total_price}
                    </span>
                  </div>
                  {order.order_items && order.order_items.length > 0 && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      {order.order_items.length} item(s)
                    </div>
                  )}
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