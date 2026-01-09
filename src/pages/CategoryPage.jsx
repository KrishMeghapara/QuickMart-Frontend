import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  ButtonGroup,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Breadcrumbs,
  Link,
  Paper,
  Slider,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import {
  GridView as GridIcon,
  ViewList as ListIcon,
  ViewModule as CompactIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Home as HomeIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import ProductGrid from '../features/products/ProductGrid';
import { useCart } from '../features/cart/CartContext';
import apiService from '../services/apiService';
import { colors } from '../theme/designTokens';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name_asc');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadCategoryData();
  }, [categoryId]);

  const loadCategoryData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        apiService.getProductsByCategory(categoryId),
        apiService.getCategories()
      ]);
      
      setProducts(productsData);
      const categoryData = categoriesData.find(cat => cat.categoryID == categoryId);
      setCategory(categoryData);
    } catch (error) {
      console.error('Failed to load category data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];
    
    // Price filter
    filtered = filtered.filter(p => 
      p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1]
    );
    
    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter(p => p.stockQuantity > 0);
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc': return a.productPrice - b.productPrice;
        case 'price_desc': return b.productPrice - a.productPrice;
        case 'name_desc': return b.productName.localeCompare(a.productName);
        default: return a.productName.localeCompare(b.productName);
      }
    });
    
    return filtered;
  };

  const filteredProducts = applyFilters();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb', py: 3 }}>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            color="inherit"
            href="/"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#6b7280' }}
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', color: '#111827' }}>
            <CategoryIcon sx={{ mr: 0.5 }} fontSize="small" />
            {category?.categoryName || 'Category'}
          </Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 600, 
            mb: 1,
            color: '#111827'
          }}>
            {category?.categoryName || 'Products'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {filteredProducts.length} products found
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Filters Sidebar */}
          <Paper sx={{ 
            width: 280, 
            p: 3, 
            height: 'fit-content',
            borderRadius: 3,
            border: '1px solid #e5e7eb',
            display: { xs: showFilters ? 'block' : 'none', md: 'block' }
          }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#111827' }}>
              Filters
            </Typography>

            {/* Price Range */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: '#374151', fontWeight: 600 }}>
                Price Range
              </Typography>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                sx={{ color: colors.primary[500] }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">₹{priceRange[0]}</Typography>
                <Typography variant="caption" color="text.secondary">₹{priceRange[1]}</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Stock Filter */}
            <FormControlLabel
              control={
                <Switch
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: colors.primary[500] } }}
                />
              }
              label="In Stock Only"
              sx={{ '& .MuiFormControlLabel-label': { color: '#374151', fontWeight: 500 } }}
            />
          </Paper>

          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            {/* Toolbar */}
            <Paper sx={{ 
              p: 2, 
              mb: 3, 
              borderRadius: 2,
              border: '1px solid #e5e7eb',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={() => setShowFilters(!showFilters)}
                  sx={{ 
                    display: { md: 'none' },
                    borderColor: colors.primary[500],
                    color: colors.primary[500]
                  }}
                >
                  Filters
                </Button>
                
                <Chip 
                  label={`${filteredProducts.length} Products`}
                  sx={{ 
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    fontWeight: 600
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* Sort */}
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{ 
                      '& .MuiSelect-select': { color: '#111827' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d1d5db' }
                    }}
                  >
                    <MenuItem value="name_asc">Name A-Z</MenuItem>
                    <MenuItem value="name_desc">Name Z-A</MenuItem>
                    <MenuItem value="price_asc">Price Low-High</MenuItem>
                    <MenuItem value="price_desc">Price High-Low</MenuItem>
                  </Select>
                </FormControl>

                {/* View Mode */}
                <ButtonGroup size="small">
                  <Button
                    variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('grid')}
                    sx={{ 
                      backgroundColor: viewMode === 'grid' ? colors.primary[500] : 'transparent',
                      borderColor: colors.primary[500],
                      color: viewMode === 'grid' ? 'white' : colors.primary[500]
                    }}
                  >
                    <GridIcon />
                  </Button>
                  <Button
                    variant={viewMode === 'compact' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('compact')}
                    sx={{ 
                      backgroundColor: viewMode === 'compact' ? colors.primary[500] : 'transparent',
                      borderColor: colors.primary[500],
                      color: viewMode === 'compact' ? 'white' : colors.primary[500]
                    }}
                  >
                    <CompactIcon />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('list')}
                    sx={{ 
                      backgroundColor: viewMode === 'list' ? colors.primary[500] : 'transparent',
                      borderColor: colors.primary[500],
                      color: viewMode === 'list' ? 'white' : colors.primary[500]
                    }}
                  >
                    <ListIcon />
                  </Button>
                </ButtonGroup>
              </Box>
            </Paper>

            {/* Products Grid */}
            <ProductGrid
              products={filteredProducts}
              onAddToCart={addToCart}
              viewMode={viewMode}
              loading={loading}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}