import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Grid,
  Card,
  CardContent,
  Badge,
  Fade,
  Button
} from '@mui/material';
import {
  AccessTime as ClockIcon,
  TrendingUp as TrendingIcon,
  LocalOffer as OfferIcon,
  FlashOn as FlashIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function SmartCategoryNav({ categories = [] }) {
  const navigate = useNavigate();
  
  const categoryData = [
    {
      id: 1,
      name: 'Fruits & Vegetables',
      emoji: '🥬',
      deliveryTime: '12-15 mins',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      popular: ['Bananas', 'Onions', 'Tomatoes'],
      trending: true,
      offer: '20% OFF'
    },
    {
      id: 2,
      name: 'Dairy & Breakfast',
      emoji: '🥛',
      deliveryTime: '10-12 mins',
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      popular: ['Milk', 'Bread', 'Eggs'],
      trending: false,
      offer: null
    },
    {
      id: 3,
      name: 'Snacks & Beverages',
      emoji: '🍿',
      deliveryTime: '8-10 mins',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      popular: ['Chips', 'Cold Drinks', 'Biscuits'],
      trending: true,
      offer: 'Buy 2 Get 1'
    },
    {
      id: 4,
      name: 'Personal Care',
      emoji: '🧴',
      deliveryTime: '15-18 mins',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      popular: ['Shampoo', 'Soap', 'Toothpaste'],
      trending: false,
      offer: null
    },
    {
      id: 5,
      name: 'Household Items',
      emoji: '🧽',
      deliveryTime: '18-20 mins',
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      popular: ['Detergent', 'Tissues', 'Cleaner'],
      trending: false,
      offer: '15% OFF'
    },
    {
      id: 6,
      name: 'Baby Care',
      emoji: '🍼',
      deliveryTime: '12-15 mins',
      color: '#ec4899',
      bgColor: 'rgba(236, 72, 153, 0.1)',
      popular: ['Diapers', 'Baby Food', 'Wipes'],
      trending: true,
      offer: null
    }
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          color: '#111827',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          🛒 Shop by Category
        </Typography>
        <Chip
          label="All delivered in 20 mins"
          icon={<FlashIcon sx={{ fontSize: 16 }} />}
          sx={{
            bgcolor: '#10b981',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.9rem',
            px: 1
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {categoryData.map((category, index) => (
          <Grid item xs={6} sm={4} md={2} key={category.id}>
            <Fade in={true} timeout={300 + index * 100}>
              <Card
                onClick={() => navigate(`/category/${category.id}`)}
                sx={{
                  cursor: 'pointer',
                  border: `2px solid ${category.color}20`,
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 32px ${category.color}30`,
                    borderColor: category.color,
                  }
                }}
              >
                {/* Trending Badge */}
                {category.trending && (
                  <Chip
                    icon={<TrendingIcon sx={{ fontSize: 12 }} />}
                    label="Trending"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: 8,
                      bgcolor: '#ef4444',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: '20px',
                      zIndex: 1,
                      boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
                    }}
                  />
                )}

                {/* Offer Badge */}
                {category.offer && (
                  <Chip
                    icon={<OfferIcon sx={{ fontSize: 12 }} />}
                    label={category.offer}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: category.trending ? 16 : -8,
                      right: 8,
                      bgcolor: '#f59e0b',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: '20px',
                      zIndex: 1,
                      boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
                    }}
                  />
                )}

                <CardContent sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  bgcolor: category.bgColor,
                  '&:last-child': { pb: 3 }
                }}>
                  <Box sx={{ fontSize: '3rem', mb: 2, lineHeight: 1 }}>
                    {category.emoji}
                  </Box>
                  
                  <Typography sx={{ 
                    fontWeight: 700, 
                    fontSize: '1rem',
                    color: '#111827',
                    mb: 1,
                    lineHeight: 1.2
                  }}>
                    {category.name}
                  </Typography>

                  <Chip
                    icon={<ClockIcon sx={{ fontSize: 12 }} />}
                    label={category.deliveryTime}
                    size="small"
                    sx={{
                      bgcolor: category.color,
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      mb: 2
                    }}
                  />

                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ 
                      fontSize: '0.8rem', 
                      color: '#6b7280',
                      fontWeight: 600,
                      mb: 1
                    }}>
                      Popular:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                      {category.popular.slice(0, 2).map((item, idx) => (
                        <Chip
                          key={idx}
                          label={item}
                          size="small"
                          sx={{
                            bgcolor: 'white',
                            color: category.color,
                            fontSize: '0.7rem',
                            height: '18px',
                            fontWeight: 600,
                            border: `1px solid ${category.color}40`
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Quick Access Bar */}
      <Box sx={{ 
        mt: 4, 
        p: 3, 
        bgcolor: 'white',
        borderRadius: 3,
        border: '2px solid #10b981',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box>
          <Typography sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
            ⚡ Need something urgently?
          </Typography>
          <Typography sx={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Most items delivered in under 15 minutes
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {['Milk', 'Bread', 'Eggs', 'Bananas'].map((item, idx) => (
            <Button
              key={idx}
              variant="outlined"
              size="small"
              sx={{
                borderColor: '#10b981',
                color: '#10b981',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'rgba(16, 185, 129, 0.1)',
                  borderColor: '#059669'
                }
              }}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}