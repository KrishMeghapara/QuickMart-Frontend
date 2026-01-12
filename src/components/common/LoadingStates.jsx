import React from 'react';
import { Box, Card, CardContent, Skeleton, Grid, Typography } from '@mui/material';

export const ProductCardSkeleton = ({ count = 8 }) => (
  <Grid container spacing={3}>
    {[...Array(count)].map((_, index) => (
      <Grid item xs={6} sm={4} md={3} key={index}>
        <Card sx={{ borderRadius: 3 }}>
          <Skeleton variant="rectangular" height={200} />
          <CardContent>
            <Skeleton variant="text" height={24} width="80%" />
            <Skeleton variant="text" height={20} width="60%" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Skeleton variant="text" height={28} width="40%" />
              <Skeleton variant="circular" width={40} height={40} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export const CarouselSkeleton = () => (
  <Box sx={{ mb: 4 }}>
    <Skeleton variant="text" height={40} width="30%" sx={{ mb: 2 }} />
    <Box sx={{ display: 'flex', gap: 2, overflowX: 'hidden' }}>
      {[...Array(4)].map((_, index) => (
        <Card key={index} sx={{ minWidth: 280, borderRadius: 3 }}>
          <Skeleton variant="rectangular" height={200} />
          <CardContent>
            <Skeleton variant="text" height={24} />
            <Skeleton variant="text" height={20} width="60%" />
            <Skeleton variant="text" height={28} width="40%" />
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
);

export const PageSkeleton = () => (
  <Box sx={{
    minHeight: '100vh',
    width: '100%',
    bgcolor: '#f8fafc',
    overflow: 'hidden'
  }}>
    {/* Hero Section Skeleton */}
    <Box sx={{
      width: '100%',
      height: { xs: 200, md: 280 },
      bgcolor: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mb: 3
    }}>
      <Box sx={{ textAlign: 'center', width: '60%' }}>
        <Skeleton variant="text" height={60} width="80%" sx={{ mx: 'auto', mb: 2 }} />
        <Skeleton variant="text" height={30} width="50%" sx={{ mx: 'auto' }} />
      </Box>
    </Box>

    {/* Category Nav Skeleton */}
    <Box sx={{ px: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'hidden' }}>
        {[...Array(8)].map((_, index) => (
          <Box key={index} sx={{ textAlign: 'center', minWidth: 80 }}>
            <Skeleton variant="circular" width={64} height={64} sx={{ mx: 'auto', mb: 1 }} />
            <Skeleton variant="text" height={16} width={60} sx={{ mx: 'auto' }} />
          </Box>
        ))}
      </Box>
    </Box>

    {/* Trending Section Skeleton */}
    <Box sx={{ px: 3, mb: 4 }}>
      <Skeleton variant="text" height={36} width="25%" sx={{ mb: 2 }} />
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
        ))}
      </Box>
    </Box>

    {/* Product Carousels Skeleton */}
    <Box sx={{ px: 3 }}>
      <CarouselSkeleton />
      <CarouselSkeleton />
      <CarouselSkeleton />
    </Box>
  </Box>
);

export const CartSkeleton = () => (
  <Box sx={{ p: 2 }}>
    {[...Array(3)].map((_, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2 }}>
        <Skeleton variant="circular" width={48} height={48} sx={{ mr: 2 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton variant="text" height={20} width="70%" />
          <Skeleton variant="text" height={16} width="50%" />
        </Box>
        <Skeleton variant="rectangular" width={60} height={32} />
      </Box>
    ))}
  </Box>
);