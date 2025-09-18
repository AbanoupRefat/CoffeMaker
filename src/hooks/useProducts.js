import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Cache for products data
let productsCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async (forceRefresh = false) => {
    try {
      // Check if we have cached data and it's still valid
      const now = Date.now();
      if (!forceRefresh && productsCache && (now - lastFetchTime < CACHE_DURATION)) {
        setProducts(productsCache);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_attributes!left (
            attribute_id,
            value,
            attributes!inner (name, unit)
          ),
          price_small,
          price_medium,
          price_large
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Update cache
      productsCache = data || [];
      lastFetchTime = now;
      
      setProducts(productsCache);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Immediately use cache if available
    if (productsCache) {
      setProducts(productsCache);
      setLoading(false);
    }
    
    // Always fetch to ensure data is up-to-date
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();

      if (error) throw error;
      
      // Update local state and cache
      const newProducts = [data[0], ...products];
      setProducts(newProducts);
      productsCache = newProducts;
      
      return { data: data[0], error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      
      // Update local state and cache
      const newProducts = products.map(p => p.id === id ? data[0] : p);
      setProducts(newProducts);
      productsCache = newProducts;
      
      return { data: data[0], error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update local state and cache
      const newProducts = products.filter(p => p.id !== id);
      setProducts(newProducts);
      productsCache = newProducts;
      
      return { error: null };
    } catch (err) {
      return { error: err.message };
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
  };
};

