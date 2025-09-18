import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Cache for products data
let productsCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration

export const useProducts = (categoryId = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async (forceRefresh = false, categoryId = null) => {
    try {
      // Check if we have cached data and it's still valid
      const now = Date.now();
      const cacheKey = categoryId ? `category_${categoryId}` : 'all';
      
      if (!forceRefresh && productsCache && productsCache[cacheKey] && (now - lastFetchTime < CACHE_DURATION)) {
        setProducts(productsCache[cacheKey]);
        setLoading(false);
        return;
      }

      setLoading(true);
      // Start building the query
      let query = supabase
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
        `);
        
      // Add category filter if provided
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }
      
      // Execute the query with ordering
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      
      // Update cache
      if (!productsCache) productsCache = {};
      productsCache[cacheKey] = data || [];
      lastFetchTime = now;
      
      setProducts(productsCache[cacheKey]);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Immediately use cache if available
    const cacheKey = categoryId ? `category_${categoryId}` : 'all';
    if (productsCache && productsCache[cacheKey]) {
      setProducts(productsCache[cacheKey]);
      setLoading(false);
    }
    
    // Always fetch to ensure data is up-to-date
    fetchProducts(false, categoryId);
  }, [categoryId]);

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

