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
      
      // Add timeout to the Supabase query
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Categories fetch timed out')), 3000); // 3 second timeout
      });
      
      const fetchPromise = supabase
        .from('categories')
        .select('*')
        .order('name');
      
      // Race between the fetch and the timeout
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise])
        .catch(err => {
          console.log('Categories fetch aborted:', err.message);
          // Return cached data if available, or empty array
          return { 
            data: categoriesCache || [], 
            error: null 
          };
        });

      if (error) throw error;
      
      // Update cache only if we got new data
      if (data) {
        categoriesCache = data || [];
        lastFetchTime = now;
        
        setCategories(categoriesCache);
      } else if (categoriesCache) {
        // Use cached data if the request failed but we have cache
        setCategories(categoriesCache);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching categories:', err);
      
      // Use cached data on error if available
      if (categoriesCache) {
        setCategories(categoriesCache);
      }
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