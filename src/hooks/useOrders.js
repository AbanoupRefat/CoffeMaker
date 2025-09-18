import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchOrders = async () => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Add timeout to the Supabase query
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Orders fetch timed out')), 3000); // 3 second timeout
      });
      
      const fetchPromise = supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      // Race between the fetch and the timeout
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise])
        .catch(err => {
          console.log('Orders fetch aborted:', err.message);
          return { data: [], error: { message: 'Orders fetch timed out or failed' } };
        });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const createOrder = async (orderData) => {
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    try {
      // Add timeout to the order creation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Order creation timed out')), 3000); // 3 second timeout
      });
      
      const createPromise = supabase
        .from('orders')
        .insert([
          {
            ...orderData,
            user_id: user.id
          }
        ])
        .select();
      
      // Race between the create operation and the timeout
      const { data, error } = await Promise.race([createPromise, timeoutPromise])
        .catch(err => {
          console.log('Order creation aborted:', err.message);
          return { data: null, error: { message: 'Order creation timed out or failed' } };
        });

      if (error) throw error;

      // Decrement promocode usage if used
      if (orderData.promocode_id && data) {
        // Add timeout to the promocode fetch
        const promocodeTimeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Promocode fetch timed out')), 3000); // 3 second timeout
        });
        
        const promocodePromise = supabase
          .from('promocodes')
          .select('usage_limit, used_count')
          .eq('id', orderData.promocode_id)
          .single();
        
        // Race between the promocode fetch and the timeout
        const { data: promocode, error: promocodeError } = await Promise.race([promocodePromise, promocodeTimeoutPromise])
          .catch(err => {
            console.log('Promocode fetch aborted:', err.message);
            return { data: null, error: null }; // Continue even if promocode fetch fails
          });

        if (!promocodeError && promocode && (promocode.usage_limit === null || promocode.used_count < promocode.usage_limit)) {
          // Add timeout to the promocode update
          const updateTimeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Promocode update timed out')), 3000); // 3 second timeout
          });
          
          const updatePromise = supabase
            .from('promocodes')
            .update({ used_count: promocode.used_count + 1 })
            .eq('id', orderData.promocode_id);
          
          // Race between the promocode update and the timeout
          const { error: updateError } = await Promise.race([updatePromise, updateTimeoutPromise])
            .catch(err => {
              console.log('Promocode update aborted:', err.message);
              return { error: null }; // Continue even if promocode update fails
            });

          if (updateError) console.error('Error updating promocode usage:', updateError);
        }
      }
      
      // Fetch the complete order with items - don't wait for this to complete
      fetchOrders().catch(err => console.error('Error refreshing orders:', err));
      
      return { data: data?.[0] || null, error: null };
    } catch (err) {
      console.error('Error in createOrder:', err);
      return { data: null, error: err.message };
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .eq('user_id', user?.id)
        .select();

      if (error) throw error;
      
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));
      
      return { data: data[0], error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateOrderStatus
  };
};

