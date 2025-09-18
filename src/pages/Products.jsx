import { useState, useMemo } from 'react';
import { Search, Filter, Star, ChevronDown, Loader2, Eye, ShoppingCart } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart, useToast } from '../App';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { products, loading, error } = useProducts();
  const productsPerPage = 8;

  // Extract categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    return ['All', ...uniqueCategories];
  }, [products]);

  // Filter + Sort
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return (b.reviews || 0) - (a.reviews || 0);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading products: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-coffee px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="coffee-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Premium Coffee Collection</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Discover our carefully curated selection of the world's finest coffee beans
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search coffee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
              {/* Category Filter */}
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  {selectedCategory}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isFilterOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white border border-border rounded-lg shadow-lg z-10 min-w-[150px]">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsFilterOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors ${
                          selectedCategory === category ? 'bg-primary/10 text-primary' : ''
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="popularity">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {currentProducts.length} of {filteredAndSortedProducts.length} products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {currentProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 border border-border rounded-lg ${
                      currentPage === i + 1 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('Medium');

  const handleViewDetails = (e) => {
    e.preventDefault();
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const priceKey = `price_${selectedSize.toLowerCase()}`;
    const selectedPrice = product[priceKey] || product.price;
    addToCart(product, selectedSize, 1, selectedPrice);
  };

  const handleSizeChange = (size, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm border border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="aspect-square overflow-hidden cursor-pointer" onClick={handleViewDetails}>
        <img
          src={product.image_url || '/placeholder-coffee.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3 md:p-4 space-y-2">
        <h3
          className="font-semibold text-sm sm:text-base md:text-lg group-hover:text-primary transition-colors cursor-pointer line-clamp-2"
          onClick={handleViewDetails}
        >
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        {/* Category */}
        {product.category && (
          <div className="flex flex-wrap gap-1">
            <span className="inline-block bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs">
              {product.category}
            </span>
          </div>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground">({product.reviews || 0})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-base md:text-lg font-bold text-primary">
            EGP{
              selectedSize === 'Small' ? product.price_small :
              selectedSize === 'Medium' ? product.price_medium :
              selectedSize === 'Large' ? product.price_large :
              product.price_medium // Fallback to medium if selectedSize is not recognized
            }
          </span>
        </div>

        {/* Size Selection */}
        <div className="flex items-center justify-center gap-1">
          {['Small', 'Medium', 'Large'].map((size) => (
            <button
              key={size}
              onClick={(e) => handleSizeChange(size, e)}
              className={`flex-1 px-2 py-1 border rounded-md text-xs font-medium transition-all duration-200
                ${selectedSize === size
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-background text-muted-foreground border-border hover:bg-muted'}
              `}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleViewDetails}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">View</span>
          </button>
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock}
            className="flex-1 flex items-center justify-center gap-1 btn-coffee px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg disabled:opacity-50"
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;