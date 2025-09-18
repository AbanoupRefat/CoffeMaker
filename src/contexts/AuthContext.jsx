import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        // Add timeout to the session fetch
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            setLoading(false); // Ensure loading is set to false even on timeout
            reject(new Error('Session fetch timed out'));
          }, 3000); // 3 second timeout
        });
        
        const sessionPromise = supabase.auth.getSession();
        
        // Race between the session fetch and the timeout
        const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise])
          .catch(err => {
            console.log('Session fetch aborted:', err.message);
            return { data: { session: null } };
          });
          
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Error fetching session:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, profileData) => {
    const { full_name: fullName, phone, address } = profileData;
    
    try {
      // Add timeout to the auth operation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Sign up request timed out')), 3000); // 3 second timeout
      });
      
      const authPromise = supabase.auth.signUp({
        email,
        password,
      });
      
      // Race between the auth operation and the timeout
      const { data, error } = await Promise.race([authPromise, timeoutPromise])
        .catch(err => {
          console.log('Sign up aborted:', err.message);
          return { data: null, error: { message: 'Sign up request timed out or failed' } };
        });

      if (error) {
        return { data, error };
      }

      // If sign-up is successful, insert or update the user's profile
      if (data?.user) {
        // Add timeout to the profile operation
        const profileTimeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Profile update timed out')), 3000); // 3 second timeout
        });
        
        const profilePromise = supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            full_name: fullName,
            phone: phone,
            address: address,
          });
        
        const { error: profileError } = await Promise.race([profilePromise, profileTimeoutPromise])
          .catch(err => {
            console.log('Profile update aborted:', err.message);
            return { error: { message: 'Profile update timed out or failed' } };
          });

        if (profileError) {
          console.error('Error upserting profile:', profileError);
          // Still return successful signup even if profile update fails
          return { data, error: null };
        }
      }

      return { data, error };
    } catch (err) {
      console.error('Error during sign up:', err);
      return { data: null, error: { message: err.message } };
    }
  };

  const signIn = async (email, password) => {
    try {
      // Add timeout to the auth operation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Sign in request timed out')), 3000); // 3 second timeout
      });
      
      const authPromise = supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      // Race between the auth operation and the timeout
      const { data, error } = await Promise.race([authPromise, timeoutPromise])
        .catch(err => {
          console.log('Sign in aborted:', err.message);
          return { data: null, error: { message: 'Sign in request timed out or failed' } };
        });
      
      return { data, error };
    } catch (err) {
      console.error('Error during sign in:', err);
      return { data: null, error: { message: err.message } };
    }
  };

  const signOut = async () => {
    try {
      // Try with local scope first to avoid network errors
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      
      // Even if there's an error, we want to clear the user state
      // This ensures the UI updates correctly even if the API call fails
      setUser(null);
      
      // Clear any local storage items related to auth
      localStorage.removeItem('supabase.auth.token');
      
      return { error: null }; // Return null error to indicate success to the UI
    } catch (error) {
      console.error('Error during sign out:', error);
      // Force clear user state even if there was an error with Supabase
      setUser(null);
      return { error: null }; // Return null error to indicate success to the UI
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

