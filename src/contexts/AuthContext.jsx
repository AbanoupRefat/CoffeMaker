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
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { data, error };
    }

    // If sign-up is successful, insert or update the user's profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          full_name: fullName,
          phone: phone,
          address: address,
        });

      if (profileError) {
        console.error('Error upserting profile:', profileError);
        return { data: null, error: profileError.message };
      }
    }

    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
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

