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
      const { data, error } = await supabase
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
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            ...orderData,
            user_id: user.id
          }
        ])
        .select();

      if (error) throw error;

      // Decrement promocode usage if used
      if (orderData.promocode_id) {
        const { data: promocode, error: promocodeError } = await supabase
          .from('promocodes')
          .select('usage_limit, used_count')
          .eq('id', orderData.promocode_id)
          .single();

        if (promocodeError) throw promocodeError;

        if (promocode && (promocode.usage_limit === null || promocode.used_count < promocode.usage_limit)) {
          const { error: updateError } = await supabase
            .from('promocodes')
            .update({ used_count: promocode.used_count + 1 })
            .eq('id', orderData.promocode_id);

          if (updateError) console.error('Error updating promocode usage:', updateError);
        }
      }
      
      // Fetch the complete order with items
      await fetchOrders();
      
      return { data: data[0], error: null };
    } catch (err) {
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

