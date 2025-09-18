import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Cache for categories data
let categoriesCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async (forceRefresh = false) => {
    try {
      // Check if we have cached data and it's still valid
      const now = Date.now();
      if (!forceRefresh && categoriesCache && (now - lastFetchTime < CACHE_DURATION)) {
        setCategories(categoriesCache);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      
      // Update cache
      categoriesCache = data || [];
      lastFetchTime = now;
      
      setCategories(categoriesCache);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Immediately use cache if available
    if (categoriesCache) {
      setCategories(categoriesCache);
      setLoading(false);
    }
    
    // Always fetch to ensure data is up-to-date
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories
  };
};