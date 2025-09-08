// Supabase Configuration
// Replace these placeholders with your actual Supabase project credentials

export const supabaseConfig = {
  url: 'https://nnjfobczkonetmxpgnjz.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uamZvYmN6a29uZXRteHBnbmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTU4NTYsImV4cCI6MjA2OTA5MTg1Nn0.Pd1sj6sTeES_eTj5Ea75wsCVIZmIRh20NDVx0GYUkzU',
};

// Validate configuration
export const validateSupabaseConfig = () => {
  const { url, anonKey } = supabaseConfig;
  
  if (!url) {
    console.warn('⚠️ Supabase URL not configured.');
    return false;
  }
  
  if (!anonKey) {
    console.warn('⚠️ Supabase anon key not configured.');
    return false;
  }
  
  return true;
};

// Export individual values for convenience
export const { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY } = supabaseConfig;

