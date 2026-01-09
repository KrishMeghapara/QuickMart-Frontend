import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Typography, Fade, Alert, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../features/cart/CartContext";
import ProductCarousel from "../features/products/ProductCarousel";
import ProductGrid from "../features/products/ProductGrid";
import { PageSkeleton } from "../components/common/LoadingStates";
import RetryComponent from "../components/common/RetryComponent";
import ModernHero from "../layouts/ModernHero";
import SmartCategoryNav from "../features/products/SmartCategoryNav";
import SmartSearchResults from "../features/products/SmartSearchResults";

import apiService from "../services/apiService";
import { withCache } from "../utils/cache";
import "./HomePage.css";

export default function HomePage({ searchQuery, searchResults, onFilterApply }) {
  const [localCategories, setLocalCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('carousel');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const resultsRef = React.useRef(null);

  // Mock data for trending items
  const trendingInArea = [
    { id: 1, name: 'Ice Cream - Amul', price: 120, image: '', orders: 45, deliveryTime: 8 },
    { id: 2, name: 'Cold Drinks - Coca Cola', price: 40, image: '', orders: 38, deliveryTime: 10 },
    { id: 3, name: 'Chips - Lays', price: 20, image: '', orders: 52, deliveryTime: 12 },
    { id: 4, name: 'Chocolate - Dairy Milk', price: 85, image: '', orders: 29, deliveryTime: 15 }
  ];

  const handleFilterApply = async (filters) => {
    try {
      console.log('HomePage: Applying filters:', filters);
      const products = await apiService.filterProducts(filters);
      console.log('HomePage: Filtered products:', products);
      setFilteredProducts(products);
      setShowFilters(true);
    } catch (error) {
      console.error('Filter failed:', error);
    }
  };

  useEffect(() => {
    if (onFilterApply) {
      onFilterApply.current = handleFilterApply;
    }
  }, [onFilterApply]);

  // Auto-scroll to results when search query changes
  useEffect(() => {
    if (searchQuery && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
      }, 100);
    }
  }, [searchQuery]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        console.log('Loading categories...');
        const loadedCategories = await withCache(apiService.getCategories.bind(apiService), 'categories')();
        console.log('Categories loaded:', loadedCategories);
        setLocalCategories(loadedCategories);
        
        const prods = {};
        await Promise.all(
          loadedCategories.map(async cat => {
            try {
              console.log(`Loading products for category ${cat.categoryID}...`);
              const products = await withCache(apiService.getProductsByCategory.bind(apiService), 'products', 2 * 60 * 1000)(cat.categoryID);
              console.log(`Products for category ${cat.categoryID}:`, products);
              prods[cat.categoryID] = products;
            } catch (error) {
              console.error(`Failed to load products for category ${cat.categoryID}:`, error);
              prods[cat.categoryID] = [];
            }
          })
        );
        setCategoryProducts(prods);
      } catch (error) {
        console.error('Failed to load categories:', error);
        setError(error.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Box className="main-bg" sx={{ minHeight: '100vh', width: '100vw' }}>
        <PageSkeleton />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="main-bg" sx={{ minHeight: '100vh', width: '100vw', p: 3 }}>
        <RetryComponent
          error={{ message: error }}
          onRetry={() => window.location.reload()}
          title="Failed to load products"
          description="We couldn't load the product catalog. Please try again."
        />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: '#f8fafc' }}>
      <ModernHero />
      {/* Smart Category Navigation */}
      <Container maxWidth="xl">
        <SmartCategoryNav categories={localCategories} />
      </Container>



      {/* Trending in Your Area */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>
            🔥 Trending in Rajkot
          </Typography>
          <Typography variant="body2" sx={{ color: '#ef4444', fontWeight: 600 }}>
            Hot right now
          </Typography>
        </Box>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, 
          gap: 2, 
          mb: 6 
        }}>
          {trendingInArea.map((item, index) => (
            <Fade in={true} timeout={500 + index * 100} key={item.id}>
              <Box sx={{
                p: 2,
                bgcolor: 'white',
                borderRadius: 2,
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)',
                  borderColor: '#ef4444'
                }
              }}>
                <Chip
                  label={`${item.orders} ordered today`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: '#ef4444',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    height: '18px'
                  }}
                />
                <Box sx={{ 
                  height: 60, 
                  bgcolor: '#f3f4f6', 
                  borderRadius: 1, 
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  🔥
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 0.5, color: '#111827' }}>
                  {item.name}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ color: '#10b981', fontWeight: 700, fontSize: '0.9rem' }}>
                    ₹{item.price}
                  </Typography>
                  <Typography sx={{ color: '#6b7280', fontSize: '0.75rem' }}>
                    {item.deliveryTime} mins
                  </Typography>
                </Box>
              </Box>
            </Fade>
          ))}
        </Box>
      </Container>



      <Container maxWidth="xl" sx={{ py: 2 }} id="products-section" ref={resultsRef}>
            {showFilters ? (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Filtered Products ({filteredProducts.length})
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel')}
                sx={{ borderColor: 'var(--brand)', color: 'var(--brand)' }}
              >
                {viewMode === 'carousel' ? 'Grid View' : 'Carousel View'}
              </Button>
            </Box>
            {viewMode === 'grid' ? (
              <ProductGrid
                products={filteredProducts}
                onAddToCart={addToCart}
                viewMode="grid"
              />
            ) : (
              <ProductCarousel
                products={filteredProducts}
                categoryName="Filtered Results"
                onAddToCart={addToCart}
                showSeeAll={false}
              />
            )}
          </Box>
        ) : searchQuery ? (
              <SmartSearchResults
                searchQuery={searchQuery}
                results={searchResults}
                onAddToCart={addToCart}
                loading={false}
              />
            ) : (
              localCategories.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h5" color="text.secondary">
                    No categories found
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    Please check your database connection and ensure categories are available.
                  </Typography>
                </Box>
              ) : (
                localCategories.map((cat, index) => (
                  <Fade in={true} timeout={600 + index * 200} key={cat.categoryID}>
                    <Box sx={{ mb: 6 }}>
                      <ProductCarousel
                        products={categoryProducts[cat.categoryID] || []}
                        categoryName={cat.categoryName}
                        onAddToCart={addToCart}
                        onSeeAll={() => navigate(`/category/${cat.categoryID}`)}
                      />
                    </Box>
                  </Fade>
                ))
              )
            )}

      </Container>
    </Box>
  );
} 