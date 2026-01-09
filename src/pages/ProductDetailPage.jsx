import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Rating,
  Chip,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  IconButton,
  Badge
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Home as HomeIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../features/cart/CartContext';
import { useToast } from '../components/common/ToastProvider';
import ProductReviews from '../features/products/ProductReviews';
import apiService from '../services/apiService';
import { colors } from '../theme/designTokens';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    loadProductData();
  }, [productId]);

  const loadProductData = async () => {
    try {
      setLoading(true);
      const [productData, categoriesData] = await Promise.all([
        apiService.getProductById(productId),
        apiService.getCategories()
      ]);
      
      setProduct(productData);
      const categoryData = categoriesData.find(cat => cat.categoryID === productData.categoryID);
      setCategory(categoryData);
    } catch (error) {
      console.error('Failed to load product:', error);
      showToast('Failed to load product details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showToast(`Added ${quantity} ${product.productName} to cart`, 'success');
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Product not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb', py: 3 }}>
      <Container maxWidth="lg">
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
          {category && (
            <Link
              color="inherit"
              href={`/category/${category.categoryID}`}
              sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#6b7280' }}
              onClick={(e) => { e.preventDefault(); navigate(`/category/${category.categoryID}`); }}
            >
              <CategoryIcon sx={{ mr: 0.5 }} fontSize="small" />
              {category.categoryName}
            </Link>
          )}
          <Typography color="text.primary" sx={{ color: '#111827' }}>
            {product.productName}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
              {product.productImg && product.productImg !== 'false' ? (
                <img
                  src={product.productImg}
                  alt={product.productName}
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    borderRadius: '12px'
                  }}
                />
              ) : (
                <Box sx={{ 
                  width: '100%', 
                  height: '400px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: '#f3f4f6',
                  borderRadius: 3,
                  fontSize: '4rem'
                }}>
                  📦
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ pl: { md: 2 } }}>
              {/* Product Name & Category */}
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#111827' }}>
                {product.productName}
              </Typography>
              
              {category && (
                <Chip
                  label={category.categoryName}
                  size="small"
                  sx={{ mb: 2, bgcolor: colors.primary[100], color: colors.primary[500] }}
                />
              )}

              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Rating value={4.2} readOnly precision={0.1} />
                <Typography variant="body2" color="text.secondary">
                  (4.2) • 156 reviews
                </Typography>
              </Box>

              {/* Price */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 600, color: colors.primary[500], mb: 1 }}>
                  ₹{product.productPrice}
                </Typography>
                {product.productPrice > 150 && (
                  <Typography variant="h6" sx={{ 
                    textDecoration: 'line-through', 
                    color: '#9ca3af',
                    display: 'inline',
                    mr: 2
                  }}>
                    ₹{Math.round(product.productPrice * 1.2)}
                  </Typography>
                )}
                <Chip 
                  label="⏱️ 12 MINS" 
                  size="small" 
                  sx={{ bgcolor: '#dcfce7', color: '#16a34a', fontWeight: 600 }}
                />
              </Box>

              {/* Quantity & Stock */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Quantity
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: 2 }}>
                    <IconButton onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ px: 2, minWidth: 40, textAlign: 'center' }}>
                      {quantity}
                    </Typography>
                    <IconButton onClick={() => handleQuantityChange(1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  
                  {product.isInStock ? (
                    <Chip label="In Stock" color="success" size="small" />
                  ) : (
                    <Chip label="Out of Stock" color="error" size="small" />
                  )}
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CartIcon />}
                  onClick={handleAddToCart}
                  disabled={!product.isInStock}
                  sx={{
                    flex: 1,
                    bgcolor: colors.primary[500],
                    '&:hover': { bgcolor: colors.primary[600] },
                    py: 1.5
                  }}
                >
                  Add to Cart
                </Button>
                
                <IconButton
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  sx={{ 
                    border: '1px solid #d1d5db',
                    borderRadius: 2,
                    p: 1.5
                  }}
                >
                  {isWishlisted ? (
                    <FavoriteIcon sx={{ color: colors.error[500] }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Box>

              {/* Product Description */}
              <Paper sx={{ p: 3, borderRadius: 2, bgcolor: '#f8fafc' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                  Product Details
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#4b5563' }}>
                  {product.productQty && (
                    <>Quantity: {product.productQty}<br /></>
                  )}
                  High-quality {product.productName.toLowerCase()} perfect for your daily needs. 
                  Fresh and delivered within 12 minutes to your doorstep.
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Reviews Section */}
        <ProductReviews productId={productId} />
      </Container>
    </Box>
  );
}