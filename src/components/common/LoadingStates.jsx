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
  <Box sx={{ p: 3 }}>
    <Skeleton variant="text" height={48} width="40%" sx={{ mb: 3 }} />
    <CarouselSkeleton />
    <CarouselSkeleton />
    <CarouselSkeleton />
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