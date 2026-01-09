import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Fade,
  IconButton
} from '@mui/material';
import {
  AccessTime as ClockIcon,
  TrendingUp as TrendingIcon,
  LocalOffer as OfferIcon,
  FlashOn as FlashIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Add as AddIcon
} from '@mui/icons-material';

export default function SmartSearchResults({ 
  searchQuery, 
  results = [], 
  onAddToCart,
  loading = false 
}) {
  const [sortBy, setSortBy] = useState('relevance');
  const [filterBy, setFilterBy] = useState('all');

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'delivery_time', label: 'Fastest Delivery' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Items', count: results.length },
    { value: 'under_10_mins', label: 'Under 10 mins', count: Math.floor(results.length * 0.3) },
    { value: 'under_15_mins', label: 'Under 15 mins', count: Math.floor(results.length * 0.7) },
    { value: 'offers', label: 'On Offer', count: Math.floor(results.length * 0.2) }
  ];

  const getDeliveryTime = (product) => {
    // Generate consistent delivery time based on product ID
    const seed = product.productID || 1;
    return ((seed * 7) % 10) + 8; // 8-18 mins, consistent per product
  };

  const hasOffer = (product) => {
    // Generate consistent offer status based on product ID
    const seed = product.productID || 1;
    return (seed * 17) % 10 < 2; // 20% chance, consistent per product
  };

  const isPopular = (product) => {
    // Generate consistent popularity based on product ID
    const seed = product.productID || 1;
    return (seed * 11) % 10 < 3; // 30% chance, consistent per product
  };

  if (loading) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#6b7280' }}>
          🔍 Searching for "{searchQuery}"...
        </Typography>
        <Grid container spacing={2}>
          {[...Array(8)].map((_, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Card sx={{ borderRadius: 2 }}>
                <Box sx={{ 
                  height: 120,
                  bgcolor: '#f3f4f6',
                  animation: 'pulse 1.5s infinite'
                }} />
                <CardContent>
                  <Box sx={{ height: 16, bgcolor: '#f3f4f6', borderRadius: 1, mb: 1 }} />
                  <Box sx={{ height: 12, bgcolor: '#f3f4f6', borderRadius: 1, width: '60%' }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (results.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#6b7280' }}>
          🔍 No results for "{searchQuery}"
        </Typography>
        <Typography sx={{ color: '#9ca3af', mb: 4 }}>
          Try searching for milk, bread, eggs, or browse categories
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
          {['Milk', 'Bread', 'Eggs', 'Bananas', 'Onions'].map((suggestion) => (
            <Chip
              key={suggestion}
              label={suggestion}
              clickable
              sx={{
                bgcolor: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'rgba(16, 185, 129, 0.2)'
                }
              }}
            />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      {/* Search Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>
          🔍 Results for "{searchQuery}"
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography sx={{ color: '#6b7280' }}>
            {results.length} items found
          </Typography>
          <Chip
            icon={<FlashIcon sx={{ fontSize: 14 }} />}
            label="All delivered in 20 mins"
            size="small"
            sx={{
              bgcolor: '#10b981',
              color: 'white',
              fontWeight: 600
            }}
          />
        </Box>

        {/* Filters and Sort */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          alignItems: 'center',
          overflowX: 'auto',
          pb: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 'fit-content' }}>
            <FilterIcon sx={{ color: '#6b7280', fontSize: 20 }} />
            <Typography sx={{ color: '#6b7280', fontWeight: 600, fontSize: '0.9rem' }}>
              Filter:
            </Typography>
          </Box>
          {filterOptions.map((option) => (
            <Chip
              key={option.value}
              label={`${option.label} (${option.count})`}
              clickable
              variant={filterBy === option.value ? 'filled' : 'outlined'}
              onClick={() => setFilterBy(option.value)}
              sx={{
                bgcolor: filterBy === option.value ? '#10b981' : 'transparent',
                color: filterBy === option.value ? 'white' : '#6b7280',
                borderColor: '#10b981',
                fontWeight: 600,
                fontSize: '0.8rem',
                '&:hover': {
                  bgcolor: filterBy === option.value ? '#059669' : 'rgba(16, 185, 129, 0.1)'
                }
              }}
            />
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SortIcon sx={{ color: '#6b7280', fontSize: 20 }} />
          <Typography sx={{ color: '#6b7280', fontWeight: 600, fontSize: '0.9rem' }}>
            Sort by:
          </Typography>
          {sortOptions.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              clickable
              variant={sortBy === option.value ? 'filled' : 'outlined'}
              onClick={() => setSortBy(option.value)}
              size="small"
              sx={{
                bgcolor: sortBy === option.value ? '#f59e0b' : 'transparent',
                color: sortBy === option.value ? 'white' : '#6b7280',
                borderColor: '#f59e0b',
                fontWeight: 600,
                fontSize: '0.8rem',
                '&:hover': {
                  bgcolor: sortBy === option.value ? '#d97706' : 'rgba(245, 158, 11, 0.1)'
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Results Grid */}
      <Grid container spacing={3}>
        {results.map((product, index) => {
          const deliveryTime = getDeliveryTime(product);
          const productHasOffer = hasOffer(product);
          const productIsPopular = isPopular(product);

          return (
            <Grid item xs={6} sm={4} md={3} key={product.productID || index}>
              <Fade in={true} timeout={200 + index * 50}>
                <Card sx={{
                  border: '1px solid #e5e7eb',
                  borderRadius: 3,
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.15)',
                    borderColor: '#10b981'
                  }
                }}>
                  {/* Badges */}
                  <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}>
                    <Chip
                      icon={<ClockIcon sx={{ fontSize: 12 }} />}
                      label={`${deliveryTime} mins`}
                      size="small"
                      sx={{
                        bgcolor: deliveryTime <= 10 ? '#10b981' : deliveryTime <= 15 ? '#f59e0b' : '#6b7280',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        mb: 0.5
                      }}
                    />
                  </Box>

                  <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                    {productIsPopular && (
                      <Chip
                        icon={<TrendingIcon sx={{ fontSize: 10 }} />}
                        label="Popular"
                        size="small"
                        sx={{
                          bgcolor: '#ef4444',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.65rem',
                          height: '18px',
                          mb: 0.5
                        }}
                      />
                    )}
                    {productHasOffer && (
                      <Chip
                        icon={<OfferIcon sx={{ fontSize: 10 }} />}
                        label="20% OFF"
                        size="small"
                        sx={{
                          bgcolor: '#f59e0b',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.65rem',
                          height: '18px'
                        }}
                      />
                    )}
                  </Box>

                  {/* Product Image */}
                  <Box sx={{ 
                    height: 120, 
                    bgcolor: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}>
                    🛒
                  </Box>

                  <CardContent sx={{ p: 2 }}>
                    <Typography sx={{ 
                      fontWeight: 600, 
                      fontSize: '0.9rem',
                      color: '#111827',
                      mb: 1,
                      lineHeight: 1.3
                    }}>
                      {product.productName || 'Product Name'}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography sx={{ 
                        color: '#10b981', 
                        fontWeight: 700,
                        fontSize: '1.1rem'
                      }}>
                        ₹{product.productPrice || 99}
                      </Typography>
                      {productHasOffer && (
                        <Typography sx={{ 
                          color: '#9ca3af',
                          fontSize: '0.8rem',
                          textDecoration: 'line-through'
                        }}>
                          ₹{Math.round((product.productPrice || 99) * 1.25)}
                        </Typography>
                      )}
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart?.(product);
                      }}
                      sx={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        fontWeight: 600,
                        borderRadius: 2,
                        py: 1,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #059669, #047857)',
                        }
                      }}
                    >
                      ADD
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          );
        })}
      </Grid>

      {/* Load More */}
      {results.length > 12 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: '#10b981',
              color: '#10b981',
              fontWeight: 600,
              px: 4,
              '&:hover': {
                bgcolor: 'rgba(16, 185, 129, 0.1)',
                borderColor: '#059669'
              }
            }}
          >
            Load More Results
          </Button>
        </Box>
      )}
    </Box>
  );
}