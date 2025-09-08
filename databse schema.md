# Supabase Integration Setup Guide

This guide will help you integrate Supabase with your CoffeeMaker React application.

## 📋 Prerequisites

- A Supabase account (free at [supabase.com](https://supabase.com))
- Node.js and npm/pnpm installed
- Basic knowledge of React and JavaScript

## 🚀 Quick Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: CoffeeMaker (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
5. Click "Create new project"

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project-id.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 3. Configure Environment Variables

1. In your project root, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Install Supabase Client

```bash
npm install @supabase/supabase-js
# or
pnpm add @supabase/supabase-js
```

### 5. Restart Your Development Server

```bash
npm run dev
# or
pnpm run dev
```

## 🗄️ Database Setup

### Create Tables

In your Supabase dashboard, go to **Table Editor** and create the following tables:

#### Products Table
```sql
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Orders Table
```sql
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Order Items Table
```sql
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id),
  product_id BIGINT REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  size TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS)

Enable RLS for security:

```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin write)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Orders policies (users can only see their own orders)
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );
```

## 🔐 Authentication Setup

### Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Auth Providers**, ensure **Email** is enabled
3. Configure email templates if needed

### Enable Social Authentication (Optional)

1. Go to **Authentication** → **Settings** → **Auth Providers**
2. Enable providers like Google, GitHub, etc.
3. Add your OAuth app credentials

## 📁 File Structure

The Supabase integration is organized as follows:

```
src/
├── config/
│   └── supabase.js          # Supabase configuration
├── lib/
│   └── supabase.js          # Supabase client and helpers
├── hooks/
│   └── useSupabase.js       # Custom React hooks
├── components/
│   └── SupabaseExample.jsx  # Example component
└── .env.example             # Environment variables template
```

## 🎯 Usage Examples

### Authentication

```jsx
import { useSupabaseAuth } from './hooks/useSupabase';

function MyComponent() {
  const { user, signIn, signUp, signOut } = useSupabaseAuth();

  const handleSignIn = async () => {
    const { data, error } = await signIn('user@example.com', 'password');
    if (error) console.error('Sign in error:', error);
  };

  return (
    <div>
      {user ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
}
```

### Database Operations

```jsx
import { useSupabaseQuery } from './hooks/useSupabase';
import { database } from './lib/supabase';

function ProductList() {
  const { data: products, loading, error } = useSupabaseQuery('products');

  const addProduct = async () => {
    const { data, error } = await database.insert('products', {
      name: 'New Coffee',
      price: 19.99,
      description: 'Delicious coffee'
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products?.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Real-time Subscriptions

```jsx
import { useSupabaseSubscription } from './hooks/useSupabase';

function RealtimeOrders() {
  useSupabaseSubscription('orders', (payload) => {
    console.log('Order updated:', payload);
    // Handle real-time updates
  });

  return <div>Listening for order updates...</div>;
}
```

## 🔧 Advanced Configuration

### Custom Policies

Create more complex RLS policies:

```sql
-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Admin-only access to certain tables
CREATE POLICY "Only admins can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );
```

### Storage Buckets

1. Go to **Storage** in Supabase dashboard
2. Create buckets for different file types:
   - `product-images` - for product photos
   - `user-avatars` - for user profile pictures
3. Set up storage policies

## 🚨 Security Best Practices

1. **Never expose service role key** in client-side code
2. **Use Row Level Security** for all tables
3. **Validate data** on both client and server side
4. **Use environment variables** for sensitive configuration
5. **Implement proper error handling**
6. **Regularly update dependencies**

## 🐛 Troubleshooting

### Common Issues

1. **"Supabase not configured" error**
   - Check your `.env.local` file
   - Ensure environment variables are correctly named
   - Restart your development server

2. **Authentication not working**
   - Verify your Supabase URL and anon key
   - Check if email authentication is enabled
   - Look for CORS issues in browser console

3. **Database queries failing**
   - Check Row Level Security policies
   - Verify table names and column names
   - Ensure user has proper permissions

4. **Real-time not working**
   - Check if real-time is enabled for your table
   - Verify your subscription filters
   - Look for network connectivity issues

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## 📚 Additional Resources

- [Supabase React Tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-react)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)
- [Storage Guide](https://supabase.com/docs/guides/storage)

---

Happy coding with Supabase! ☕️

