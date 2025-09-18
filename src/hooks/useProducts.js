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
      
      // Add ordering
      query = query.order('created_at', { ascending: false });
      
      // Add timeout to the Supabase query
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), 3000); // 3 second timeout
      });
      
      // Execute the query with timeout
      const { data, error } = await Promise.race([query, timeoutPromise])
        .catch(err => {
          console.log('Products fetch aborted:', err.message);
          // Return cached data if available, or empty array
          return { 
            data: (productsCache && productsCache[cacheKey]) ? productsCache[cacheKey] : [], 
            error: null 
          };
        });

      if (error) throw error;
      
      // Update cache only if we got new data
      if (data) {
        if (!productsCache) productsCache = {};
        productsCache[cacheKey] = data || [];
        lastFetchTime = now;
        
        setProducts(productsCache[cacheKey]);
      } else if (productsCache && productsCache[cacheKey]) {
        // Use cached data if the request failed but we have cache
        setProducts(productsCache[cacheKey]);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
      
      // Use cached data on error if available
      const cacheKey = categoryId ? `category_${categoryId}` : 'all';
      if (productsCache && productsCache[cacheKey]) {
        setProducts(productsCache[cacheKey]);
      }
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

