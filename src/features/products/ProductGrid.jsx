import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Chip,
  Rating,
  Tooltip,
  Fade
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  FavoriteBorder as FavoriteIcon,
  Favorite as FavoriteFilledIcon,
  ShoppingCart as CartIcon,
  Visibility as ViewIcon,
  Star as StarIcon,
  AccessTime as ClockIcon,
  LocalShipping as ShippingIcon,
  Whatshot as FireIcon,
  FlashOn as LightningIcon
} from '@mui/icons-material';
import { colors, shadows, transitions } from '../../theme/designTokens';

export default function ProductGrid({ 
  products = [], 
  onAddToCart, 
  viewMode = 'grid',
  loading = false 
}) {
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      const newQuantities = { ...quantities };
      delete newQuantities[productId];
      setQuantities(newQuantities);
    } else {
      setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
    }
  };

  const getDeliveryTime = (product) => {
    // Generate consistent delivery time based on product ID
    const seed = product.productID || 1;
    const baseTime = 12;
    const variation = (seed * 7) % 6; // 0-5 mins variation, consistent per product
    return baseTime + variation;
  };

  const getStockLevel = (product) => {
    // Generate consistent stock level based on product ID
    const seed = product.productID || 1;
    return ((seed * 13) % 20) + 1; // 1-20, consistent per product
  };

  const isLowStock = (stockLevel) => stockLevel <= 5;
  const isPopular = (product) => {
    // Generate consistent popularity based on product ID
    const seed = product.productID || 1;
    return (seed * 11) % 10 < 3; // 30% chance, consistent per product
  };

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const getGridCols = () => {
    switch (viewMode) {
      case 'list': return { xs: 1 };
      case 'compact': return { xs: 2, sm: 3, md: 4, lg: 6 };
      default: return { xs: 1, sm: 2, md: 3, lg: 4 };
    }
  };

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(8)].map((_, index) => (
          <Grid item key={index} {...getGridCols()}>
            <Card sx={{ borderRadius: 3 }}>
              <Box sx={{ 
                height: 200,
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'loading 1.5s infinite',
                '@keyframes loading': {
                  '0%': { backgroundPosition: '200% 0' },
                  '100%': { backgroundPosition: '-200% 0' }
                }
              }} />
              <CardContent>
                <Box sx={{ height: 24, backgroundColor: '#f0f0f0', borderRadius: 1, mb: 1 }} />
                <Box sx={{ height: 16, backgroundColor: '#f0f0f0', borderRadius: 1, width: '60%', mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ height: 20, backgroundColor: '#f0f0f0', borderRadius: 1, width: '40%' }} />
                  <Box sx={{ width: 40, height: 40, backgroundColor: '#f0f0f0', borderRadius: '50%' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!products.length) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 8,
        border: '2px dashed #e5e7eb',
        borderRadius: 3,
        backgroundColor: '#f9fafb'
      }}>
        <CartIcon sx={{ fontSize: 64, color: '#9ca3af', mb: 2 }} />
        <Typography variant="h5" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
          No Products Found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Try adjusting your search or filter criteria
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product, index) => (
        <Grid item key={product.productID} {...getGridCols()}>
          <Fade in={true} timeout={300 + index * 100}>
            <Card
              onClick={() => navigate(`/product/${product.productID}`)}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: { xs: 2, sm: 3 },
                border: `1px solid ${colors.gray[200]}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': {
                  transform: { xs: 'none', sm: 'translateY(-8px)' },
                  boxShadow: { xs: '0 4px 12px rgba(0,0,0,0.1)', sm: '0 12px 40px rgba(0,0,0,0.15)' },
                  borderColor: '#2563eb',
                  borderTop: '2px solid #2563eb'
                }
              }}
              onMouseEnter={() => setHoveredProduct(product.productID)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                {product.productImg && product.productImg !== 'false' && product.productImg !== '' ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.productImg}
                    alt={`${product.productName} - ₹${product.productPrice}`}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    sx={{
                      objectFit: 'cover',
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: hoveredProduct === product.productID ? 'scale(1.08)' : 'scale(1)',
                    }}
                  />
                ) : null}
                <Box sx={{
                  height: 200,
                  display: (!product.productImg || product.productImg === 'false' || product.productImg === '') ? 'flex' : 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f3f4f6',
                  fontSize: '4rem',
                  color: '#9ca3af'
                }}>
                  📦
                </Box>
                


                {/* Delivery Time Badge */}
                <Chip
                  icon={<ClockIcon sx={{ fontSize: 14 }} />}
                  label={`${getDeliveryTime(product)} mins`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    backgroundColor: '#10b981',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                  }}
                />

                {/* Urgency Indicators */}
                <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {isLowStock(getStockLevel(product)) && (
                    <Chip
                      icon={<FireIcon sx={{ fontSize: 12 }} />}
                      label={`Only ${getStockLevel(product)} left!`}
                      size="small"
                      sx={{
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        height: '20px',
                        animation: 'pulse 2s infinite'
                      }}
                    />
                  )}
                  {isPopular(product) && (
                    <Chip
                      icon={<LightningIcon sx={{ fontSize: 12 }} />}
                      label="Popular"
                      size="small"
                      sx={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        height: '20px'
                      }}
                    />
                  )}
                </Box>

                {/* Quick View Button */}
                {hoveredProduct === product.productID && (
                  <Fade in={true}>
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        backgroundColor: 'rgba(16, 185, 129, 0.9)',
                        color: 'white',
                        '&:hover': { backgroundColor: '#10b981' }
                      }}
                    >
                      <ViewIcon />
                    </IconButton>
                  </Fade>
                )}
              </Box>

              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 1,
                    color: '#111827',
                    fontSize: '1rem',
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {product.productName}
                </Typography>

                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {product.productDescription || 'Fresh and high quality product'}
                </Typography>

                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating 
                    value={4.5} 
                    precision={0.5} 
                    size="small" 
                    readOnly 
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    (4.5) 124 reviews
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700,
                        color: '#10b981',
                        fontSize: '1.4rem'
                      }}
                    >
                      ₹{product.productPrice}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280', display: 'flex', alignItems: 'center' }}>
                      <ShippingIcon sx={{ fontSize: 12, mr: 0.5 }} />
                      Free delivery
                    </Typography>
                  </Box>
                  
                  {/* Quick Add Controls */}
                  {quantities[product.productID] ? (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      bgcolor: '#f3f4f6',
                      borderRadius: '12px',
                      border: '2px solid #10b981'
                    }}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(product.productID, quantities[product.productID] - 1);
                        }}
                        sx={{
                          color: '#10b981',
                          width: 32,
                          height: 32,
                          '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.1)' }
                        }}
                      >
                        <RemoveIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <Typography sx={{ 
                        mx: 1.5, 
                        fontWeight: 700, 
                        color: '#10b981',
                        minWidth: 20,
                        textAlign: 'center'
                      }}>
                        {quantities[product.productID]}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(product.productID, quantities[product.productID] + 1);
                          onAddToCart?.(product);
                        }}
                        sx={{
                          color: '#10b981',
                          width: 32,
                          height: 32,
                          '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.1)' }
                        }}
                      >
                        <AddIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      disabled={product.stockQuantity === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(product.productID, 1);
                        onAddToCart?.(product);
                      }}
                      aria-label={`Add ${product.productName} to cart`}
                      sx={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #059669, #047857)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)',
                        },
                        '&:disabled': {
                          background: '#d1d5db',
                          color: '#9ca3af'
                        }
                      }}
                    >
                      ADD
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      ))}
    </Grid>
  );
}