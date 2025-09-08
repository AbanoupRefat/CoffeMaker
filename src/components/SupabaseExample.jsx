// Example Component demonstrating Supabase integration
// This component shows how to use the custom Supabase hooks

import React, { useState } from 'react';
import { useSupabaseAuth, useSupabaseQuery, useSupabaseStorage } from '../hooks/useSupabase';
import { database } from '../lib/supabase';

const SupabaseExample = () => {
  const { user, loading: authLoading, signIn, signUp, signOut } = useSupabaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Example: Fetch products from database
  const { 
    data: products, 
    loading: productsLoading, 
    error: productsError,
    refetch: refetchProducts 
  } = useSupabaseQuery('products', '*', {}, []);

  // Example: Storage operations
  const { upload, uploading, getPublicUrl } = useSupabaseStorage('product-images');

  // Example: Create a new product
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: ''
  });

  const handleCreateProduct = async () => {
    try {
      const { data, error } = await database.insert('products', {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        description: newProduct.description,
        created_at: new Date().toISOString()
      });

      if (error) throw error;
      
      alert('Product created successfully!');
      setNewProduct({ name: '', price: '', description: '' });
      refetchProducts(); // Refresh the products list
    } catch (error) {
      alert('Error creating product: ' + error.message);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await upload(fileName, file);

    if (error) {
      alert('Upload failed: ' + error);
    } else {
      alert('File uploaded successfully!');
      const publicUrl = getPublicUrl(fileName);
      console.log('Public URL:', publicUrl);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading authentication...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold coffee-text-gradient">Supabase Integration Example</h1>
      
      {/* Authentication Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
        
        {user ? (
          <div className="space-y-4">
            <p className="text-green-600">✅ Signed in as: {user.email}</p>
            <button 
              onClick={signOut}
              className="btn-coffee px-4 py-2 rounded-lg"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Name (for sign up)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg"
              />
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => signIn(email, password)}
                className="btn-coffee px-4 py-2 rounded-lg"
              >
                Sign In
              </button>
              <button 
                onClick={() => signUp(email, password, { name })}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Database Operations Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-2xl font-semibold mb-4">Database Operations</h2>
        
        {/* Create Product Form */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Create New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className="px-3 py-2 border border-border rounded-lg"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              className="px-3 py-2 border border-border rounded-lg"
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              className="px-3 py-2 border border-border rounded-lg"
            />
          </div>
          <button 
            onClick={handleCreateProduct}
            className="btn-coffee px-4 py-2 rounded-lg"
          >
            Create Product
          </button>
        </div>

        {/* Products List */}
        <div>
          <h3 className="text-lg font-medium mb-3">Products from Database</h3>
          {productsLoading ? (
            <p>Loading products...</p>
          ) : productsError ? (
            <p className="text-red-600">Error: {productsError}</p>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-muted-foreground">${product.price}</p>
                  <p className="text-sm">{product.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No products found. Create one above!</p>
          )}
        </div>
      </div>

      {/* Storage Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-2xl font-semibold mb-4">File Storage</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
            />
          </div>
          {uploading && <p className="text-blue-600">Uploading...</p>}
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-muted rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Setup Instructions</h2>
        <div className="space-y-3 text-sm">
          <p><strong>1.</strong> Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">supabase.com</a></p>
          <p><strong>2.</strong> Copy your project URL and anon key from Settings → API</p>
          <p><strong>3.</strong> Create a <code className="bg-background px-2 py-1 rounded">.env.local</code> file in your project root</p>
          <p><strong>4.</strong> Add your credentials:</p>
          <pre className="bg-background p-3 rounded-lg mt-2 text-xs overflow-x-auto">
{`REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here`}
          </pre>
          <p><strong>5.</strong> Create tables in your Supabase dashboard (e.g., 'products' table)</p>
          <p><strong>6.</strong> Install Supabase client: <code className="bg-background px-2 py-1 rounded">npm install @supabase/supabase-js</code></p>
        </div>
      </div>
    </div>
  );
};

export default SupabaseExample;

