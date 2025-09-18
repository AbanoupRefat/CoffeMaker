// Custom React Hook for Supabase Integration
// This hook provides easy access to Supabase functionality in React components

import { useState, useEffect, useCallback } from 'react';
import { auth, database, realtime, storage } from '../lib/supabase';

/**
 * Custom hook for Supabase authentication
 */
export const useSupabaseAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get initial user
    const getInitialUser = async () => {
      try {
        const { user, error } = await auth.getCurrentUser();
        if (error) throw error;
        setUser(user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getInitialUser();

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = useCallback(async (email, password, userData = {}) => {
    setLoading(true);
    setError(null);
    try {
      // Add timeout to the auth operation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Sign up request timed out')), 3000); // 3 second timeout
      });
      
      const authPromise = auth.signUp(email, password, userData);
      
      // Race between the auth operation and the timeout
      const { data, error } = await Promise.race([authPromise, timeoutPromise])
        .catch(err => {
          console.log('Sign up aborted:', err.message);
          return { data: null, error: { message: 'Sign up request timed out or failed' } };
        });
        
      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err.message);
      return { data: null, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Add timeout to the auth operation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Sign in request timed out')), 3000); // 3 second timeout
      });
      
      const authPromise = auth.signIn(email, password);
      
      // Race between the auth operation and the timeout
      const { data, error } = await Promise.race([authPromise, timeoutPromise])
        .catch(err => {
          console.log('Sign in aborted:', err.message);
          return { data: null, error: { message: 'Sign in request timed out or failed' } };
        });
        
      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err.message);
      return { data: null, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Add timeout to the auth operation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          // Even if signOut times out, we want to clear the user state locally
          setError('Sign out timed out, but local session cleared');
          setLoading(false);
          reject(new Error('Sign out request timed out'));
        }, 3000); // 3 second timeout
      });
      
      const authPromise = auth.signOut();
      
      // Race between the auth operation and the timeout
      const { error } = await Promise.race([authPromise, timeoutPromise])
        .catch(err => {
          console.log('Sign out aborted:', err.message);
          return { error: null }; // Return success even if timed out
        });
        
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut
  };
};

/**
 * Custom hook for Supabase database operations
 */
export const useSupabaseQuery = (table, columns = '*', filters = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await database.select(table, columns, filters);
      if (error) throw error;
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [table, columns, JSON.stringify(filters), ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch
  };
};

/**
 * Custom hook for Supabase real-time subscriptions
 */
export const useSupabaseSubscription = (table, callback, filters = {}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    let channel = null;

    try {
      channel = realtime.subscribe(table, callback, filters);
      setIsSubscribed(true);
    } catch (err) {
      console.error('Subscription error:', err);
      setIsSubscribed(false);
    }

    return () => {
      if (channel) {
        realtime.unsubscribe(channel);
        setIsSubscribed(false);
      }
    };
  }, [table, callback, JSON.stringify(filters)]);

  return { isSubscribed };
};

/**
 * Custom hook for Supabase storage operations
 */
export const useSupabaseStorage = (bucket) => {
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);

  const upload = useCallback(async (path, file) => {
    setUploading(true);
    setError(null);
    try {
      const { data, error } = await storage.upload(bucket, path, file);
      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err.message);
      return { data: null, error: err.message };
    } finally {
      setUploading(false);
    }
  }, [bucket]);

  const download = useCallback(async (path) => {
    setDownloading(true);
    setError(null);
    try {
      const { data, error } = await storage.download(bucket, path);
      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err.message);
      return { data: null, error: err.message };
    } finally {
      setDownloading(false);
    }
  }, [bucket]);

  const getPublicUrl = useCallback((path) => {
    try {
      return storage.getPublicUrl(bucket, path);
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, [bucket]);

  return {
    upload,
    download,
    getPublicUrl,
    uploading,
    downloading,
    error
  };
};

